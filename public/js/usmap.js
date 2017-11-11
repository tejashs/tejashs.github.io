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

    tooltip_render(tooltip_data) {
      let text = "<h2>" + tooltip_data.state + " - " + tooltip_data.city + "</h2>";
      text += "<ul>"
      text += "<li>"
      text += "Year - "
      text += tooltip_data.year
      text += "</li>"
      text += "<li>"
      text += "Target - "
      text += tooltip_data.target
      text += "</li>"
      text += "<li>"
      text += "Fatalities - "
      text += tooltip_data.fatalities
      text += "</li>"
      text += "<li>"
      text += "Injuries - "
      text += tooltip_data.injuries
      text += "</li>"
      text += "</ul>";
      return text;
    }


    drawMap(data){
      let self = this;
      d3.select("#usmap").selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("d", self.path);
    }

    plotStates(data){

      let self = this;
      let crapGps = [];
      var circles = d3.select("#circleGroup").selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("r", 5)
      .attr("cx", function(d){
        let proj = self.projection([d.longitude, d.latitude]);
        if(proj){
          return proj[0];
        }
        else {
          if(!crapGps.includes(d.state)){
              crapGps.push(d.state);
          }
          return 0;
        }
      })
      .attr("cy", function(d){
        let proj = self.projection([d.longitude, d.latitude]);
        if(proj){
          return proj[1];
        }
        else {
          if(!crapGps.includes(d.state)){
              crapGps.push(d.state);
          }
          return 0;
        }
      })
      .style("fill", "green");


      //for reference:https://github.com/Caged/d3-tip
      //Use this tool tip element to handle any hover over the chart
          let tip = d3.tip().attr('class', 'd3-tip')
              .direction('se')
              .offset(function() {
                  return [-100,0];
              })
              .html((d)=>{
                  return self.tooltip_render(d);
              });

              circles.call(tip);
              circles.on('mouseover', tip.show).on('mouseout', tip.hide);


    }
}
