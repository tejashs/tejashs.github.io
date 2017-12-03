class InfoPanel{
    constructor(){

    }

    TopLists(data) {
        console.log(getTopYearInfo(data)[0][0]['key'])
        // console.log(getTopYearInfo(data)[0][0])
        // console.log(getTopYearInfo(data)[0]['key'])
        let panel=getTopYearInfo(data)[0]

        let tgroups = d3.select("#tgroups").selectAll("ul").data(panel);
        let Entertgroups = tgroups.enter().append("ul").text(function (d, i) {

        		// console.log("Hi");
        		// console.log(d["key"]);
        		return d['key'];}


        );


        tgroups.exit().remove();
        tgroups = tgroups.merge(Entertgroups);

        tgroups.text(function (d,i) {
            return d["key"]
        });

        let panel2=getTopYearInfo(data)[2]

        let weapons = d3.select("#weapons").selectAll("ul").data(panel2);
        let Enterweapons = weapons.enter().append("ul").text(function (d, i) {

            // console.log("Hi");
            // console.log(d["key"]);
            return d['key'];}


        );


        weapons.exit().remove();
        weapons = weapons.merge(Enterweapons);

        weapons.text(function (d,i) {
            return d["key"]
        });

        let panel3=getTopYearInfo(data)[1]

        let targets = d3.select("#targets").selectAll("ul").data(panel3);
        let Entertargets = targets.enter().append("ul").text(function (d, i) {

            // console.log("Hi");
            // console.log(d["key"]);
            return d['key'];}


        );


        weapons.exit().remove();
        weapons = weapons.merge(Entertargets);

        weapons.text(function (d,i) {
            return d["key"]
        });
    }

    WordCloud(data){
        var word_count = {};
        data.forEach(function(d){
            word_count[d.keyword] = parseFloat(d.val);
      	})

      	// console.log(data)
      	// console.log(word_count)

	    var svg_location = "#word-cloud"
	    var width = 500
	    var height = 600

	    console.log(d3.max(Object.values(word_count)))

      	let colorScale = d3.scaleLinear()
      	.domain([0, d3.max(Object.values(word_count))])
      	.range(["#D46A6A", "#550000"]);

	    var word_entries = d3.entries(word_count);

        var xScale = d3.scaleLinear()
        .domain([0, d3.max(word_entries, function(d) {return d.value;})])
        .range([10,50]);

	    d3.layout.cloud().size([width, height])
	    .timeInterval(20)
	    .words(word_entries)
	    .fontSize(function(d) { return xScale(+d.value); })
	    .text(function(d) { return d.key; })
	    .rotate(0)
	    .font("Impact")
	    .on("end", draw)
	    .start();

        function draw(words) {

            d3.select(svg_location).select("svg").selectAll("g").remove();
	        var svg = d3.select(svg_location).select("svg")
	        .attr("width", width)
	        .attr("height", height)
	        .append("g")
	        .attr("transform", "translate(" + [width >> 1, height >> 1] + ")")

            // svg
            //     .selectAll("g").remove();

	        var texts = svg
	        .selectAll("text").data(words)

				.enter().append("text");




	        // .data(words).style("opacity", 1)
            // texts.

	        // texts.exit().transition().duration(1000).style("opacity", 0).remove();


       		// texts = textsEnter.merge(texts);

	        texts
	        // .transition()
	        // .duration(1000)
	        .style("font-size", function(d) { return xScale(d.value) + "px"; })
	        .style("font-family", "Impact")
	        .style("fill", function(d) { return colorScale(d.value); })
	        .attr("text-anchor", "middle")
	        .attr("transform", function(d) {
	              return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
	        })
	        .text(function(d) { return d.key; });
        }

	      d3.layout.cloud().stop();
	    }
}
