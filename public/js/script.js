let usMap = new USMap();


// d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
d3.json("data/ustopo.json", function(error, us) {
  if (error) throw error;
  usMap.drawMap(us);
});
