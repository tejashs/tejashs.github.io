class WorldMap {
  constructor(){
    let width = 1000;
    let height = 600;

    this.projection = d3.geoPatterson().scale(175)
    .translate([width / 2, height / 2])
    .precision(0.1);

    this.path = d3.geoPath().projection(this.projection);
  }

  drawMap(data){
    let self = this;
    let svg = d3.select("#usmapsvg");
    d3.json("data/world.json", function (error, world) {
        if (error) throw error;
        let geodata = topojson.feature(world, world.objects.countries);
        let path = d3.geoPath().projection(self.projection);
        var paths = d3.select("#usmapsvg").selectAll("path")
        .data(geodata.features)
        .enter()
        .append("path")
        .attr("d", path)
        .attr("class", "land")
        .attr("id", function(d){
          return d.id;
        });
        let graticule = d3.geoGraticule();
        d3.select("#usmapsvg").append('path').datum(graticule).attr('class', "graticule").attr('d', path);
    });




  }
}
