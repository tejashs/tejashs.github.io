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

  function getTopYearInfo(country){
    var f = "../data/Country_grouped_data/" + country + "/top_year.csv"

    d3.csv(f, function(error, data) {
      
      if (error) throw error;
      
      data.sort(function(a, b) {
        return  parseInt(b['fatalities']) - parseInt(a['fatalities']);
      });

      if (data.length < 10)
        console.log("Not enough data")
      else{
        groupBy(data, "tgroup")
        groupBy(data, "target")
        groupBy(data, "weapon")
      }
    
    });
  }

  function groupBy(data, colName){
    var bytgroup = d3.nest()
    .key(function(d) { if (d[colName] != "Unknown") return d[colName]; })
    .entries(data);

    console.log(bytgroup)
  }
