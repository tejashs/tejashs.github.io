/** Class implementing the votePercentageChart. */
class USMap {

    /**
     * Initializes the svg elements required for this chart;
     */
    constructor(){
	    this.margin = {top: 30, right: 20, bottom: 30, left: 50};
	    // self.usmapDiv = d3.select("#usmapdiv").classed("content", true);
      // //fetch the svg bounds
	    // this.svgBounds = self.usmapDiv.node().getBoundingClientRect();
	    // this.svgWidth = this.svgBounds.width - this.margin.left - this.margin.right;
	    // this.svgHeight = 200;
      //
	    // //add the svg to the div
	    // this.svg = self.usmapDiv.select("svg")
	    //     .attr("width",this.svgWidth)
	    //     .attr("height",this.svgHeight);

    }

    drawMap(data){
      // console.log(data);
      // this.svgWidth = 800;
        let Width = 800;
      // this.svgHeight = 600;
        let Height = 600;
      // let projection = d3.geoAlbersUsa()  // a USA-specific projection (that deals with Hawaii / Alaska)
      //       .translate([this.svgWidth / 2, this.svgHeight / 2]) // this centers the map in our SVG element
      //       .scale([700]);
      //
      // let path = d3.geoPath().projection(projection);
      // let geodata = topojson.feature(data, data.objects.states);
      //
      //
      var paths = d3.select("#usmap").selectAll("path")
      //   .data(geodata.features)
      //   .enter()
      //   .append("path")
      //
      //   .attr("d", path).style("stroke", "green")
	   //     .style("stroke-width", "1");

        var svg = d3.select("#usmap");
        let projection = d3.geoAlbersUsa()
            .translate([Width/2, Height/2])    // translate to center of screen
            .scale([1000]);

        let path = d3.geoPath()
            .projection(projection);

        d3.json("us-states.json", function (json) {


            svg.append("g")
                .attr("class", "states")
                .selectAll("path")
                .data(json.features)
                .enter().append("path")
                .attr("d", path);

            // svg.append("path")
            //     .attr("class", "state-borders")
            //     .attr("d", path(topojson.mesh(us, us.objects.states, function(a, b) { return a !== b; })));



        });


        var cord=[37.005105,-89.17626899999999];
        console.log(cord)
        let mark2=svg
            .append("circle")
            .classed("silver",true)
            .attr("cx", projection(cord[0]))
            .attr("cy", projection(cord[1]))
            .attr("r", 6);

}
}
