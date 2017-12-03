  keys = {};
  keys["fatalities"] = "Fatalities";
  keys["counts"] = "Attacks";
  keys["injuries"] = "Injuries";

  regions = {};
  regions["Central_America_Caribbean"] = "Central America & Caribbean";
  regions["North_America"] = "North America";
  regions["Southeast_Asia"] = "Southeast Asia";
  regions["Western_Europe"] = "Western Europe";
  regions["East_Asia"] = "East Asia";
  regions["South_America"] = "South America";
  regions["Eastern_Europe"] = "Eastern Europe";
  regions["Sub-Saharan_Africa"] = "Sub-Saharan Africa";
  regions["Middle_East_North_Africa"] = "Middle East & North Africa";
  regions["Australasia_Oceania"] = "Australasia & Oceania";
  regions["South_Asia"] = "South Asia";
  regions["Central_Asia"] = "Central Asia";

  currentRegionSelected = null;
  currentMetricSelected = "counts";

  function setRegionSelected(region){
    currentRegionSelected = region;
  }

  function setMetricSelected(metric){
    currentMetricSelected = metric;
  }

  function getMetricsSelected(){
    return currentMetricSelected;
  }
  
  function getRegionSelected(){
    return currentRegionSelected;
  }

  function getRegionForKey(regionKey){
    return regions[regionKey];
  }

  function getStringForKey(key){
      if(!keys[key]){
        return key;
      }
      else {
        return keys[key];
      }
  }

  function getTopYearInfo(countryData){

    var tgroups = groupBy(countryData, "tgroup")
    var targets = groupBy(countryData, "target")
    var weapons = groupBy(countryData, "weapon")

    return [tgroups, targets, weapons]

  }

  function groupBy(data, colName){
    var group = d3.nest()
    .key(function(d) { return d[colName]; })
    .rollup(function(v) { return v.length; })
    .entries(data);

    group.sort(function(a, b) {
      return  parseInt(b['value']) - parseInt(a['value']);
    });

    if (group.length > 10)
      group = group.slice(0, 10)

    return group
  }
