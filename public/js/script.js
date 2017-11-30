let summary = new Summary();
let usMap = new USMap(summary);
let worldMap = new WorldMap();
let yearchart = new YearChart(usMap);
let barChart = null;

d3.json("data/ustopo.json", function(error, us) {
  if (error) throw error;
  // usMap.drawMap(us);
  worldMap.drawMap(null)
});

d3.csv("data/gtd_by_countries.csv", function(error, data) {
	if (error) throw error;
  	barChart = new BarChart(data);
    barChart.updateBarChart("num_attacks");
});

d3.csv("data/united_states_gtd.csv", function(error, us) {
  if (error) throw error;
  usMap.setEntireData(us);
  usMap.plotStates(us);
  yearchart.update(us);
});

function changeData() {
    let metric = document.getElementById('metric').value;
    barChart.updateBarChart(metric)
}
