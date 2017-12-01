class WorldMap {
  constructor(){
    let width = 1000;
    let height = 600;

    this.projection = d3.geoPatterson().scale(175)
    .translate([width / 2, height / 2])
    .precision(0.1);

    this.path = d3.geoPath().projection(this.projection);
  }

  setCountriesMappings(id_name_map, id_region_map){
    this.id_name_map = id_name_map
    this.id_region_map = id_region_map;
  }

  drawMap(world){
    let self = this;
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
      svg.select("#worldmap").selectAll(region).classed("countries_hovered", true);
    }).
    on("mouseout", function(d){
      let region = self.id_region_map[d.id];
      region = "." + region;
      svg.select("#worldmap").selectAll(region).classed("countries_hovered", false);
    })
    .on("click", function(d){
      let region = self.id_region_map[d.id];
      console.log("Region Clicked " + region);
    });
    paths.classed("countries_hovered", false);
  }
}
