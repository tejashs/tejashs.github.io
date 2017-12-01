class LineChart {

    constructor(){
    this.margin = {top: 50, right: 20, bottom: 30, left: 160};
        this.width = 1000 - this.margin.left - this.margin.right;
        this.height = 550 - this.margin.top - this.margin.bottom;
        let divlinechart=d3.select("#line-chart")
        this.svg = divlinechart.append("svg")
            .attr("width", this.width)
            .attr("height", this.height)

    }

    dropMenu(countries){
        let self=this;
        let select = d3.select("#country").on("change", chooseData);
        let options = select.selectAll('option').data(countries);
        let options_enter=options.enter().append("option");
        options.exit().remove();
        options=options.merge(options_enter);
        options.text(function(d) { return d });

        // Set the dimensions of the canvas / graph
        let yearScale = d3
            .scaleLinear()
            .domain([1973,2016])
            .range([self.margin.left,self.margin.left+self.width]);

        let attackScale = d3
            .scaleLinear()
            .domain([0,2000])
            .range([self.height+self.margin.bottom,self.margin.bottom]);




        function chooseData(){
            console.log("hello")
        }

        // console.log(countries)
    }

}