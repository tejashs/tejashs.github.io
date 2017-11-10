/** Class implementing the votePercentageChart. */
class USMap {

    /**
     * Initializes the svg elements required for this chart;
     */
    constructor(){
      this.margin = {top: 30, right: 20, bottom: 30, left: 50};
      let width = 1200;
      let height = 800;

      this.projection = d3.geoAlbersUsa().translate([width/ 2, height / 2]).scale([1200]);
      this.path = d3.geoPath().projection(this.projection);
    }

    drawMap(data){
      console.log(data);
      let self = this;
      d3.select("#usmap").selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", self.path);
    }

    plotStates(data){
      console.log(data);
      let self = this;
      d3.select("#circleGroup").selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", function(d){
        console.log(d);
        let proj = self.projection([d.longitude, d.latitude]);
        if(proj){
          return proj[0];
        }
        else {
          return 0;
        }
      })
      .attr("cy", function(d){
        let proj = self.projection([d.longitude, d.latitude]);
        if(proj){
          return proj[1];
        }
        else {
          return 0;
        }
      })
      .style("fill", "green");
    }
}
