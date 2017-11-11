class YearChart {

    constructor (usMap) {

        this.usMap=usMap

        // Initializes the svg elements required for this chart
        this.margin = {top: 10, right: 20, bottom: 30, left: 50};
        let divyearChart = d3.select("#year-chart").classed("fullView", true);

        //fetch the svg bounds
        this.svgBounds = divyearChart.node().getBoundingClientRect();
        this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
        this.svgHeight = 100;

        //add the svg to the div
        this.svg = divyearChart.append("svg")
            .attr("width", this.svgWidth)
            .attr("height", this.svgHeight)
    };
    update (data) {
        console.log(data)
        let year=[]
        for (let i=1970; i<=2016; i++){
            year.push(i)
        }
        var yh=20
        var that=this
        var year_chart=d3.select("#year-chart").select("svg");
        year_chart.append("line")
            .attr("x1",0)
            .attr("y1",yh)
            .attr("x2",this.svgWidth)
            .attr("y2",yh)
            .classed("lineChart",true)
        let radius=5
        let yearScale = d3
            .scaleLinear()
            .domain([year[0],year[year.length -1]])
            .range([radius*4,this.svgWidth-5*radius]);

        let t=    year_chart.append("g");
        for (let i of year) {


            t
                .append("circle")
                .attr("cx", function () {
                    return yearScale(i)
                })
                .attr("cy", yh)
                .attr("r", radius);
            // .classed("yearChart",true)
            // .attr("class", function () {
            //     return that.chooseClass(i["PARTY"]);
            // });
            let rot=45
            t.append("text")
                // .attr("transform", "rotate(45)")
                .attr("x",function () {
                    return yearScale(i)})
                .attr("y",50)

                // .attr("dy",".30em")
                // .attr("dx",".10em")
                .text(function() { return i; })
                .attr("transform", function(){
                    let lx=yearScale(i)+10
                    return "rotate(60,"+lx+",42)"})
                // .attr("transform", "rotate(45,350,50)")
                // .attr("transform",function(d,i){
                //     if (i==1){
                //         return "rotate(-90)";
                //     }
                // })
                // .style("text-anchor", "middle").attr("dx", "-.6em")
                // .attr("dy", "-.20em").attr("transform", "rotate(-90)");
                .classed('yearText',true);
        }

    // t.selectAll("text")
    //         .style("text-anchor", "end")
    //         // .attr("dx", "-.8em")
    //         // .attr("dy", ".15em")
    //         .attr("transform", "rotate(45)");

        var brush = d3.brushX().extent([[0,0],[this.svgWidth,this.svgHeight-40]]).on("end", brushed);
        year_chart.append("g").attr("class", "brush").call(brush);
        function brushed(){
            let years=[]

            for (let i=0;i<year.length;i++){
                if (yearScale(year[i])<=d3.event.selection[1] &&  yearScale(year[i]) >=d3.event.selection[0])
                {years.push(year[i])}
            }
            that.usMap.
            console.log(years)

        }

    }
}