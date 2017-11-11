let usMap = new USMap();

let summary = new Summary();


// d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
d3.json("data/ustopo.json", function(error, us) {
  if (error) throw error;
  usMap.drawMap(us);
});


d3.csv("data/united_states_gtd.csv", function(error, us) {
  if (error) throw error;
  usMap.plotStates(us);
});
