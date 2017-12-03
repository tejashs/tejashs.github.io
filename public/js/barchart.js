class BarChart {

    /**
     * Create a bar chart instance and pass the other views in.
     * @param worldMap
     * @param infoPanel
     * @param allData
     */
    constructor() {
        this.data = null;
    }

    setData(data){
      this.data = data;
    }
    /**
     * Render and update the bar chart based on the selection of the data type in the drop-down box
     */
    updateBarChart() {

        let self = this;
        let selectedDimension = getMetricsSelected();
        let selectedRegion = getRegionSelected();

        var data = self.getCountries(this.data, selectedRegion)

        var selectedData = []
        data.forEach(function(d){
            selectedData.push(parseInt(d[selectedDimension]))
        });

        var svg = d3.select("#barchart")

        let margin = {top: 50, right: 40, bottom: 50, left: 120}

        let width = 600 - margin.left - margin.right
        let height = 600 - margin.top - margin.bottom
        svg.attr("width", 600).attr("height", 600);
        var x = d3.scaleLinear()
                .domain([0, d3.max(selectedData)])
        .range([0, width]);

        // console.log(d3.max(selectedData))
        // console.log(selectedData)

        var y = d3.scaleBand()
        .range([height, 0]);

        let colorScale = d3.scaleLinear()
        .domain([0, d3.max(selectedData)])
        .range(["#D46A6A", "#550000"]);

        var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // x.domain([0, d3.max(data, function(d) { return d[selectedDimension]; })]);
        y.domain(data.map(function(d) { return d.name; })).padding(0.1);

         var xAxis = svg.select("#xAxis")
        .attr("transform", "translate(" + margin.left + "," + (600 - margin.bottom) + ")")

        var yAxis = svg.select("#yAxis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var bars = svg.select("#bars")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        xAxis.transition().duration(1000).call(d3.axisBottom(x));

        yAxis
        .transition().duration(1000)
        .call(d3.axisLeft(y))

        var bar = bars.selectAll("rect").data(data).style("opacity", 1)
        bar.exit().transition().duration(1000).style("opacity", 0).remove()

        var mergedBar = bar.enter().append("rect").merge(bar)

        mergedBar
        .transition().duration(1000)
        .attr("x", 0)
        .attr("y", function(d) {
            return y(d.name);
        })
        .attr("height", y.bandwidth())
        .attr("width", function(d) {
            return x(d[selectedDimension]);
        })
        .attr("fill", function(d){
            return colorScale(d[selectedDimension]);
        })

        // g.selectAll("#bar")
        // .data(data)
        // .enter().append("rect")
        // .attr("x", 0)
        // .attr("height", y.bandwidth())
        // .attr("y", function(d) { return y(d.country); })
        // .attr("width", function(d) { return x(d[selectedDimension]); })

        // let xScale = d3.scaleBand()
        //     .range([0, width])
        //     .paddingInner(0.05)
        //     .domain(data.map(d => d.country))

        // let yScale = d3.scaleLinear()
        //     .range([height, 0])
        //     .domain([0, d3.max(selectedData)])

        // let colorScale = d3.scaleLinear()
        // .domain([0, d3.max(selectedData)])
        // .range(["#D46A6A", "#550000"]);

        // var tooltip = d3.select("body").append("div").attr("class", "toolTip");

        // var xAxis = svg.select("#xAxis")
        // .attr("transform", "translate(" + margin.left + "," + (600 - margin.bottom) + ")")

        // var yAxis = svg.select("#yAxis")
        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // var bars = svg.select("#bars")
        // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        // xAxis.call(d3.axisBottom(xScale))
        // .selectAll("text")
        // .attr("dy", "-0.7em")
        // .attr("dx", "1em")
        // .attr("transform", "rotate(90)")
        // .style("text-anchor", "start");

        // yAxis
        // .transition().duration(1000)
        // .call(d3.axisLeft(yScale))

        // var bar = bars.selectAll("rect").data(data).style("opacity", 1)
        // bar.exit().transition().duration(1000).style("opacity", 0).remove()

        // var mergedBar = bar.enter().append("rect").merge(bar)

        // mergedBar
        // .transition().duration(1000)
        // .attr("x", function(d) {
        //     return xScale(d.country);
        // })
        // .attr("y", function(d) {
        //     return yScale(d[selectedDimension]);
        // })
        // .attr("width", xScale.bandwidth())
        // .attr("height", function(d) {
        //     return height - yScale(d[selectedDimension]);
        // })
        // .attr("fill", function(d){
        //     return colorScale(d[selectedDimension]);
        // })

        // let tip = d3.tip().attr('class', 'd3-tip').direction('se').offset(function() {
        //             return [-100,0];
        //         }).html((d)=>{
        //             return self.getToolTipText(d, selectedDimension);
        //         });
        // mergedBar.call(tip);
        // mergedBar.on('mouseover', tip.show).on('mouseout', tip.hide);
    }

    getToolTipText(data, selectedDimension){
        let val = getStringForKey(selectedDimension) + " : " + data[selectedDimension];
        return val;
    }

    getCountries(data, region){
        var countries = []
        data.forEach(function(d){
            if (d.region == region)
                countries.push(d)
        })

        return countries
    }
}
