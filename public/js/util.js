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
