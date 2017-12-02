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
/*
###########
USA MAP
############
*/
function showUSA(){
	// #################  Data for US map
	if(usMapData == null){
		d3.json("data/ustopo.json", function(error, us) {
			if (error) throw error;
			usMapData = us;
			usMap.drawMap(usMapData);
		});
	}
	else{
		usMap.drawMap(usMapData);
	}

	if(usEntireData == null){
		d3.csv("data/united_states_gtd.csv", function(error, us) {
			if (error) throw error;
			usEntireData = us;
			usMap.setEntireData(usEntireData);
			usMap.plotStates(usEntireData);
			yearchart.update(usEntireData);
		});
	}
	else {
		usMap.setEntireData(usEntireData);
		usMap.plotStates(usEntireData);
		yearchart.update(usEntireData);
	}
}
/*
###########
WORLD MAP
############
*/
function showWorld(){
	// Load World Map Data
	if (worldMapData == null){
		d3.json("data/world.json", function (error, world) {
			if (error) throw error;
			worldMapData = world;
			worldMap.drawMap(worldMapData);
		});
	}
	else {
		worldMap.drawMap(worldMapData);
	}

	// Load other Data for World Countries Mapping
	if(worldCountriesData == null){
		d3.csv("data/group_by_counts.csv", function(error, countries) {
			if (error) throw error;
			var id_name_map = new Object();
			var id_region_map = new Object();
			var region_countries_map = new Object();
			var id_counts_map = new Object();
			for(var i=0; i < countries.length; i++){
				let c = countries[i];
				id_name_map[c.id] = c["name"];
				let region = c["region"];
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
			worldCountriesData["id_name_map"] = id_name_map;
			worldCountriesData["id_region_map"] = id_region_map;
			worldCountriesData["region_countries_map"] = region_countries_map;
			worldCountriesData["id_counts_map"] = id_counts_map;
			worldMap.setCountriesMappings(worldCountriesData["id_name_map"], worldCountriesData["id_region_map"], worldCountriesData["region_countries_map"] , worldCountriesData["id_counts_map"]);
		});
	}
	else {
		worldMap.setCountriesMappings(worldCountriesData["id_name_map"], worldCountriesData["id_region_map"], worldCountriesData["region_countries_map"] , worldCountriesData["id_counts_map"]);
	}

	/*
	###########
	Bar Charts
	############
	*/
	if(barChartData == null){
		d3.csv("data/gtd_by_countries.csv", function(error, data) {
			if (error) throw error;
			barChartData = data;
			barChart.setData(barChartData);
			// barChart.updateBarChart("num_attacks", 'East Asia');
		});
	}
}

function changeData() {
	let metric = document.getElementById('metric').value;
	barChart.updateBarChart(metric, 'East Asia')
}
