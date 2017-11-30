class WorldMap {
  constructor(){
    let width = 1200;
    let height = 800;

    this.projection = d3.geoPatterson().scale(153)
    .translate([width / 2, height / 2])
    .precision(0.1);
    this.path = d3.geoPath().projection(this.projection);
  }

  drawMap(data){
    let self = this;
    let svg = d3.select("#usmap");
    svg.append("path")
    .datum(d3.geoGraticule10())
    .attr("class", "graticule")
    .attr("d", path);

    d3.json("https://d3js.org/world-50m.v1.json", function(error, world) {
      if (error) throw error;

      svg.insert("path", ".graticule")
      .datum(topojson.feature(world, world.objects.land))
      .attr("class", "land")
      .attr("d", path);

      svg.insert("path", ".graticule")
      .datum(topojson.mesh(world, world.objects.countries, function(a, b) { return a !== b; }))
      .attr("class", "boundary")
      .attr("d", path);
    }
  }
