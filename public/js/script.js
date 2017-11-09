let usMap = new USMap();


  d3.json("https://d3js.org/us-10m.v1.json", function (error, usdata) {
        if (error) throw error;
        usMap.drawMap(usdata);
    });
