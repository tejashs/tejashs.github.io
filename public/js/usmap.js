/** Class implementing the votePercentageChart. */
class USMap {

    /**
     * Initializes the svg elements required for this chart;
     */
    constructor(){
	    this.margin = {top: 30, right: 20, bottom: 30, left: 50};
    }

    drawMap(data){
      console.log(data);
      // var svg = d3.select("svg");
      // var path = d3.geoPath();
      // svg.append("g")
      // .attr("class", "states")
      // .selectAll("path")
      // .data(topojson.feature(data, data.objects.states).features)
      // .enter().append("path")
      // .attr("d", path).style("stroke", "green")
      // .style("stroke-width", "1")
      // .style("fill", function(d){
      //   console.log(d);
      //   return "steelblue";
      // });

      let width = 800;
      let height = 600;
      let projection = d3.geoAlbersUsa().translate([width / 2, height / 2]).scale([700]);
      let path = d3.geoPath().projection(projection);
      d3.select("#usmap").selectAll("path")
                .data(data.features)
                .enter()
                .append("path")
                // here we use the familiar d attribute again to define the path
                .attr("d", path);

  }
}
