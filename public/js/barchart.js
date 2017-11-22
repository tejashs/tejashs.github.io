class BarChart {

    /**
     * Create a bar chart instance and pass the other views in.
     * @param worldMap
     * @param infoPanel
     * @param allData
     */
    constructor(data) {
        this.data = data
    }

    /**
     * Render and update the bar chart based on the selection of the data type in the drop-down box
     */
    updateBarChart(selectedDimension) {

        var regions = ['Central America & Caribbean', 'North America', 'Southeast Asia',
        'Western Europe','East Asia','South America','Eastern Europe',
        'Sub-Saharan Africa','Middle East & North Africa','Australasia & Oceania',
        'South Asia','Central Asia']


        

        this.data.sort(function(a, b) {
            return parseInt(b[selectedDimension]) - parseInt(a[selectedDimension]);
        });

        var data = this.data.slice(0, 20)

        var svg = d3.select("#barchart")

        let margin = {top: 50, right: 20, bottom: 70, left: 60}
        
        let width = 800 - margin.left - margin.right
        let height = 600 - margin.top - margin.bottom

        var c20b = d3.schemeCategory20

        let xScale = d3.scaleBand()
            .range([0, width])
            .paddingInner(0.05)
            .domain(data.map(d => d.country))

        let yScale = d3.scaleLinear()
            .range([height, 0])
            .domain([0, data[0][selectedDimension]])

        var tooltip = d3.select("body").append("div").attr("class", "toolTip");

        var xAxis = svg.select("#xAxis")
        .attr("transform", "translate(" + margin.left + "," + (600 - margin.bottom) + ")")
        
        var yAxis = svg.select("#yAxis")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        var bars = svg.select("#bars")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
        
        xAxis.call(d3.axisBottom(xScale))
        .selectAll("text")
        .attr("dy", "-0.7em")
        .attr("dx", "1em")
        .attr("transform", "rotate(90)")
        .style("text-anchor", "start");

        yAxis
        .transition().duration(1000)
        .call(d3.axisLeft(yScale))

        var bar = bars.selectAll("rect").data(data).style("opacity", 1)
        bar.exit().transition().duration(1000).style("opacity", 0).remove()

        var mergedBar = bar.enter().append("rect").merge(bar)
        mergedBar
        .transition().duration(1000)
        .attr("x", function(d) { 
            return xScale(d.country); 
        })
        .attr("y", function(d) { 
            return yScale(d[selectedDimension]); 
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) { 
            return height - yScale(d[selectedDimension]); 
        })
        .attr("fill", function(d){
            return c20b[regions.indexOf(d.region)];
        }) 
    }
}