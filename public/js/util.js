  keys = {};
  keys["fatalities"] = "Fatalities";
  keys["num_attacks"] = "Attacks";
  keys["injuries"] = "Injuries";

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
    .key(function(d) { if (d[colName] != "Unknown") return d[colName]; })
    .rollup(function(v) { return v.length; })
    .entries(data);

    group.sort(function(a, b) {
      return  parseInt(b['value']) - parseInt(a['value']);
    });

    if (group.length > 10)
      group = group.slice(0, 10)
    
    return group
  }
