let summary = new Summary();
let usMap = new USMap(summary);
let infoPanel = new InfoPanel();
let linechart = new LineChart(infoPanel);
let barChart = new BarChart();
let worldMap = new WorldMap(linechart, barChart);
let yearchart = new YearChart(usMap);


selectedMainOption = null;

// US Map related Data
usMapData = null;
usAggData = null;
usYearsData = null;

//World Map related data
worldMapData = null;
worldCountriesData = null;

//Bar Chart related data
barChartData = null;

loadDataAsync();
toggleCommonElements(0);
d3.selectAll(".cheaders").classed("cshow", false).classed("chide", true);

//#################################################################################
// All Functions Below this line
/*
Toggle Common Elements
value 0 - Hidden
value 1 - Shown
*/
function toggleCommonElements(value){
	if(value == 0){
		d3.select("#metricDiv").classed("cshow", false).classed("chide", true);
		d3.select("#country-selector").classed("cshow", false).classed("chide", true);
		d3.select("#info-Panel").classed("cshow", false).classed("chide", true);
		d3.select("#list-panel").classed("cshow", false).classed("chide", true);

	}
	else {
		d3.select("#metricDiv").classed("cshow", true).classed("chide", false);
		d3.select("#country-selector").classed("cshow", true).classed("chide", false);
		d3.select("#info-Panel").classed("cshow", true).classed("chide", false);
		d3.select("#list-panel").classed("cshow", true).classed("chide", false);
	}
}

function toggleUSElements(value){
	if(value == 0){
		d3.select("#usmap").classed("cshow", false).classed("chide", true);
		d3.select("#year-chart").classed("cshow", false).classed("chide", true);
		d3.select("#circleGroup").classed("cshow", false).classed("chide", true);
	}
	else {
		d3.select("#usmap").classed("cshow", true).classed("chide", false);
		d3.select("#year-chart").classed("cshow", true).classed("chide", false);
		d3.select("#circleGroup").classed("cshow", true).classed("chide", false);
	}
}

function toggleWorldElements(value){
	if(value == 0){
		d3.select("#worldmap").classed("cshow", false).classed("chide", true);
		d3.select("#gradient").classed("cshow", false).classed("chide", true);
		d3.select("#barchartdiv").classed("cshow", false).classed("chide", true);
	}
	else {
		d3.select("#worldmap").classed("cshow", true).classed("chide", false);
		d3.select("#gradient").classed("cshow", true).classed("chide", false);
		d3.select("#barchartdiv").classed("cshow", false).classed("chide", false);
	}
}

/*
Main Button Click on the page
*/
function mainButtonClicked(value){
	selectedMainOption = value;
	if(selectedMainOption === "usa"){
		toggleCommonElements(0);
		toggleYearHeight(true);
		toggleUSElements(1);
		toggleWorldElements(0);
		showUSA();
	}
	else{
		toggleCommonElements(1);
		toggleYearHeight(false);
		toggleWorldElements(1);
		toggleUSElements(0);
		showWorld();
	}
}

/*
Main Button Click on the page
*/
function toggleYearHeight(show){
	let self = this;
	if(show){
		d3.select("#year-chart").style("height", self.svgHeight);
	}
	else {
		d3.select("#year-chart").style("height", "1px");
	}
}

function showWorld(){
	worldMap.setCountriesMappings(worldCountriesData["id_region_map"], worldCountriesData["region_countries_map"] , worldCountriesData["id_counts_map"]);
	worldMap.drawMap(worldMapData);
	barChart.setData(barChartData);
	let default_region = "Eastern_Europe";
	setRegionSelected(default_region);
	changeData();
	let countries = worldCountriesData["region_countries_map"][default_region];
	linechart.dropMenu(countries);
}
function showUSA(){
	yearchart.update(usMapData);
	usMap.setStateAggData(usAggData);
	usMap.setEntireData(usYearsData);
	usMap.drawMap(usMapData);
	usMap.plotStates(usYearsData);
}

function changeData() {
	let metric = document.getElementById('metric').value;
	setMetricSelected(metric);
	usMap.updateColors();
	barChart.updateBarChart();
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
		// console.log("World Map - Map Data Loaded!");
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
		// console.log("World Map - Full Data Loaded!");
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
		// console.log("World Map - Bar Chart Data Loaded!");
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
		// console.log("US Map - Map Data Loaded!");
		callback(null);
	});
}
function loadUSYearsData(callback){
	d3.csv("data/united_states_gtd.csv", function(error, us) {
		if (error) throw error;
		usYearsData = us;
		// console.log("US Map - Map Data Loaded!");
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
		usAggData = aggData;
		// console.log("US Map - Full Data Loaded!");
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
	q.defer(loadUSYearsData);
	q.defer(loadUSMapFullData);
	q.defer(loadBarChartData);
	q.awaitAll(function(error) {
		if (error) throw error;
		mainButtonClicked("world");
		console.log("All Data Loaded!");
	});
}
