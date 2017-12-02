let summary = new Summary();
let usMap = new USMap(summary);
let infoPanel = new InfoPanel();
let linechart = new LineChart(infoPanel);
let worldMap = new WorldMap(linechart);
let yearchart = new YearChart(usMap);
let barChart = new BarChart();

selectedMainOption = null;

// US Map related Data
usMapData = null;
usEntireData = null;

//World Map related data
worldMapData = null;
worldCountriesData = null;

//Bar Chart related data
barChartData = null;

loadDataAsync();

//#################################################################################
// All Functions Below this line

function mainButtonClicked(value){
	selectedMainOption = value;
	if(selectedMainOption === "usa"){
		//USA Components
		d3.select("#usmap").style("opacity", 1);
		d3.select("#year-chart").style("opacity", 1);
		d3.select("#circleGroup").style("opacity", 1);
		//World Components
		d3.select("#worldmap").style("opacity", 0);
		d3.select("#gradient").style("opacity", 0);
		showUSA();
	}
	else{
		//USA Components
		d3.select("#usmap").style("opacity", 0);
		d3.select("#year-chart").style("opacity", 0);
		d3.select("#circleGroup").style("opacity", 0);
		//World Components
		d3.select("#worldmap").style("opacity", 1);
		d3.select("#gradient").style("opacity", 0);
		showWorld();
	}
}

function showWorld(){
	worldMap.setCountriesMappings(worldCountriesData["id_region_map"], worldCountriesData["region_countries_map"] , worldCountriesData["id_counts_map"]);
	worldMap.drawMap(worldMapData);
	barChart.setData(barChartData);
}
function showUSA(){
	usMap.setStateAggData(aggData);
	usMap.drawMap(usMapData);
}

function changeData() {
	let metric = document.getElementById('metric').value;
	barChart.updateBarChart(metric, 'East Asia')
}

/*
###########
LOAD WORLD MAP DATA
############
*/
function loadWorldMapData(callback){
	d3.json("data/world.json", function (error, world) {
		if (error) throw error;
		worldMapData = world;
		console.log("World Map - Map Data Loaded!");
		callback(null);
	});
}
function loadWorldMapFullData(callback){
	d3.csv("data/group_by_counts.csv", function(error, countries) {
		if (error) throw error;
		var id_region_map = new Object();
		var region_countries_map = new Object();
		var id_counts_map = new Object();
		for(var i=0; i < countries.length; i++){
			let c = countries[i];
			let region = c.region
			id_region_map[c.id] = region;
			id_counts_map[c.id] = c.counts;
			if(region in region_countries_map){
				cns = region_countries_map[region];
			}
			else {
				cns = []
			}
			cns.push(c["name"]);
			region_countries_map[region] = cns
		}
		worldCountriesData = Object();
		worldCountriesData["id_region_map"] = id_region_map;
		worldCountriesData["region_countries_map"] = region_countries_map;
		worldCountriesData["id_counts_map"] = id_counts_map;
		console.log("World Map - Full Data Loaded!");
		callback(null);

	});
}
/*
###########
LOAD BAR CHART DATA
############
*/
function loadBarChartData(callback){
	d3.csv("data/group_by_counts.csv", function(error, data) {
		if (error) throw error;
		barChartData = data;
		console.log("World Map - Bar Chart Data Loaded!");
		callback(null);
	});
}
/*
###########
LOAD US MAP DATA
############
*/
function loadUSMapData(callback){
	d3.json("data/ustopo.json", function(error, us) {
		if (error) throw error;
		usMapData = us;
		console.log("US Map - Map Data Loaded!");
		callback(null);
	});
}
function loadUSMapFullData(callback){
	d3.csv("data/us_attacks_agg.csv", function(error, us) {
		if (error) throw error;
		aggData = Object();
		for(var i=0; i < us.length; i++){
			aggData[us[i]["state"]] = us[i];
		}
		usEntireData = aggData;
		console.log("US Map - Full Data Loaded!");
		callback(null);
	});
}
/*
###########
LOAD ENTIRE DATA ASYNC
############
*/
function loadDataAsync(){
	var q = d3.queue();
	q.defer(loadWorldMapData);
	q.defer(loadWorldMapFullData);
	q.defer(loadUSMapData);
	q.defer(loadUSMapFullData);
	q.defer(loadBarChartData);
	q.awaitAll(function(error) {
		if (error) throw error;
		console.log("All Data Loaded!");
	});
}
