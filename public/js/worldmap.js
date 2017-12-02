class WorldMap {
  constructor(linechart){

    this.linechart=linechart;
    let width = 1000;
    let height = 600;

    this.projection = d3.geoPatterson().scale(175)
    .translate([width / 2, height / 2])
    .precision(0.1);

    this.colorScale = d3.scaleLinear()
    .range(["#D46A6A", "#550000"])
    .domain([0,Math.log(22130)]);

    this.path = d3.geoPath().projection(this.projection);
  }

  setCountriesMappings(id_name_map, id_region_map, region_countries_map, id_counts_map){
    this.id_name_map = id_name_map
    this.id_region_map = id_region_map;
    this.region_countries_map = region_countries_map;
    this.id_counts_map = id_counts_map;
  }

  drawMap(world){
    let self = this;
    self.createGradient();
    let svg = d3.select("#mapSvg");
    let geodata = topojson.feature(world, world.objects.countries);
    let path = d3.geoPath().projection(self.projection);
    var paths = svg.select("#worldmap").selectAll("path")
    .data(geodata.features)
    .enter()
    .append("path")
    .attr("d", path)
    .attr("class", function(d){
      let classes = "countries countries_hovered ";
      classes += self.id_region_map[d.id];
      return classes;
    })
    .attr("id", function(d){
      return d.id;
    })
    .on("mouseover", function(d){
      let region = self.id_region_map[d.id];
      region = "." + region;
      // svg.select("#worldmap").selectAll("path").style("fill", "#C0C0C0");
      svg.select("#worldmap").selectAll(region).classed("countries_hovered", true).style("fill", function(d){
        let attacks = self.id_counts_map[d.id];
        if (attacks != 0){
          attacks = Math.log(attacks);
        }
        return self.colorScale(attacks);
      });
    }).
    on("mouseout", function(d){
      let region = self.id_region_map[d.id];
      region = "." + region;
      svg.select("#worldmap").selectAll(region).style("fill","#C0C0C0").classed("countries_hovered", false);
    })
    .on("click", function(d){
      let region = self.id_region_map[d.id];
      svg.select("#worldmap").selectAll(region).classed("countries_hovered", true).style("fill", function(d){
        let attacks = self.id_counts_map[d.id];
        if (attacks != 0){
          attacks = Math.log(attacks);
        }
        return self.colorScale(attacks);
      });
      setRegionSelected(region);
      let countries = self.region_countries_map[region];
      self.linechart.dropMenu(countries);
    });
    paths.classed("countries_hovered", false);
  }

  createGradient(){
    var width  = 800,
    height = 50,
    padding = 15;

    var div = d3.select('#mapDiv');
    div.select("#gradient").remove();
    let svg = div.append('svg');

    svg.attr("id", "gradient").attr('width', width).attr('height', height);
    var svgDefs = svg.append('defs');

    var mainGradient = svgDefs.append('linearGradient')
    .attr('id', 'mainGradient');

    // Create the stops of the main gradient. Each stop will be assigned
    // a class to style the stop using CSS.
    mainGradient.append('stop')
    .attr('class', 'stop-left')
    .attr('offset', '0');

    mainGradient.append('stop')
    .attr('class', 'stop-right')
    .attr('offset', '1');

    // Use the gradient to set the shape fill, via CSS.
    svg.append('rect')
    .classed('filled', true)
    .attr('x', 100)
    .attr('y', padding)
    .attr('width', width)
    .attr('height', height);

    // Use the gradient to set the shape stroke, via CSS.
    // svg.append('rect')
    // .classed('outlined', true)
    // .attr('x', width / 2 + padding / 2)
    // .attr('y', padding)
    // .attr('width', (width / 2) - 1.5 * padding)
    // .attr('height', height - 2 * padding);
  }
}
