class USMap {

    constructor(summary){
      // this.summary = summary;
      let margin = {left:50};
      let width = 650 - margin.left;
      let height = 600;
      let svg = d3.select("#mapSvg").attr("y", margin.left).attr("width", width).attr("height", height);
      this.projection = d3.geoAlbersUsa().translate([width/2, height /2]).scale([800]);
      this.path = d3.geoPath().projection(this.projection);
      this.aggData = null;
      this.colorScale = d3.scaleLinear()
      .range(["#D46A6A", "#550000"])
      .domain([0,500]);
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

    setEntireData(fullData){
      this.allYearsData = fullData;
    }

    drawMap(data){
      let self = this;
      self.svg = d3.select("#mapSvg");
      let paths = self.svg.select("#usmap").selectAll("path")
      .data(data.features)
      .enter()
      .append("path")
      .attr("class", "countries")
      .attr("d", self.path)
      .style("fill", function(d){
        let attacks = self.aggData[d["properties"]["name"]]["attacks"];
        return self.colorScale(attacks);
      });
    }

    plotStates(data){
      let self = this;
      let crapGps = [];
      var circles = self.svg.select("#circleGroup").selectAll("circle").data(data);
      let circlesEnter = circles.enter().append("circle");
      circles.exit().remove();
      circles = circlesEnter.merge(circles);
      circles.attr("r", 3)
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
      .style("fill", "red");
      //for reference:https://github.com/Caged/d3-tip
      self.tip = d3.tip().attr('class', 'd3-tip').direction('se').offset(function() {
                  return [20,30];
              }).html((d)=>{
                let val = self.tooltip_render(d);
                if(!val){
                  return "";
                }
                  return val;
              });
      circles.call(self.tip);
      circles.on('mouseover', function(d,i){
        d3.select(this).classed("attackSelected", true);
        self.tip.show(d);
        self.showSummary(d);
      }).on('mouseout', function(d,i){
        d3.select(this).classed("attackSelected", false);
        self.tip.hide(d);
      });

      circles.on('click', function(d){
        self.showSummary(d);
      });


    }

    showSummary(data){
      // if(!data || data.length == 0){
      //   this.summary.updateText("");
      // }
      // else {
      //   this.summary.updateText(data.summary);
      // }
    }

    plotFilteredData(years){
      let allData = this.allYearsData.slice(0);
      if(years.length > 0){
        let fData = this.filterDataByYear(years, allData);
        this.plotStates(fData);
        this.logData(fData);
      }
      else{
        this.plotStates(allData);
      }
    }

    logData(data){
        // for(var i=0; i<data.length; i++){
        //   console.log();
        //   console.log(data[i]["month"] + "/" + data[i]["day"] + "/" + data[i]["year"] + " -- "+ data[i]["city"]);
        // }
    }
    filterDataByYear(years, data){
      let yearData = data.filter(function(d){
        return years.includes(d.year);
      });
      return yearData;
    }
    setStateAggData(aggData){
      this.aggData = aggData;
    }

}
