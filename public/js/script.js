let usMap = new USMap();

let barChart = null;

// d3.json("https://d3js.org/us-10m.v1.json", function(error, us) {
d3.json("data/ustopo.json", function(error, us) {
  if (error) throw error;
  usMap.drawMap(us);
});

d3.csv("data/gtd_by_countries.csv", function(error, data) {
	if (error) throw error;
  	barChart = new BarChart(data);
});

function changeData() {
    let metric = document.getElementById('metric').value;
    barChart.updateBarChart(metric)

}
