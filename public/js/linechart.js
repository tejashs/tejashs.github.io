class LineChart {

    constructor(){
    this.margin = {top: 30, right: 30, bottom: 30, left: 60};
        this.width = 1000 - this.margin.left - this.margin.right;
        this.height = 550 - this.margin.top - this.margin.bottom;

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




        function chooseData(){
            var si   = select.property('selectedIndex');
            let s = options.filter(function (d, i) { return i === si });
            let sel_country = s.datum();
            d3.csv("data/Country_grouped_data/"+sel_country+"/data.csv", function(error, data_year) {
                if (error) throw error;
                let year=[]
                let attacks=[]
                for (let i of data_year){
                    year.push(parseInt(i["year"]))
                    attacks.push(parseInt(i["count"]))
                }
                let svg=d3.select("#line-chart")
                let yearScale = d3
                    .scaleLinear()
                    .domain([year[0],year[year.length-1]])
                    .range([0,self.width]);
                let attackScale = d3
                    .scaleLinear()
                    .domain([0,d3.max(attacks)])
                    .range([self.height,0]);

                var line = svg.select("#line")
                    .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");

            let xAxis= svg.select("#xAxis_L")
                .attr("transform", "translate(" + self.margin.left + "," + (550 - self.margin.bottom) + ")");


            let yAxis= svg.select("#yAxis_L")
                .attr("transform", "translate(" + self.margin.left + "," + self.margin.top + ")");

                xAxis.transition().duration(500).
                call(d3.axisBottom(yearScale).tickFormat(d3.format("d")));


                yAxis
                    .transition().duration(500)
                    .call(d3.axisLeft(attackScale))



                var valueline = d3.line()
                    // .interpolate("basis")
                    .x(function(d,i) {
                        // console.log(yearScale(parseInt(d["year"])));
                        return yearScale(parseInt(d["year"])); })
                    .y(function(d,i) {
                        // console.log(attackScale(parseInt(d["count"])))
                        return attackScale(parseInt(d["count"])); })
                    .curve(d3.curveCatmullRom);
                    // .

                let lineGraph=line.selectAll("path").data([data_year]).style("opacity", 1)
                lineGraph.exit().transition().duration(500).style("opacity", 0).remove()
                let lineEnter = lineGraph.enter().append("path");
                lineGraph = lineEnter.merge(lineGraph);


                lineGraph
                    .transition().duration(500)
                    .attr("class", "line")
                    .attr("d", valueline);


            });


        }


    }

}