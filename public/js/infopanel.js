class InfoPanel{
    constructor(){

    }

    TopLists(data) {
        // console.log("here")
        // console.log(getTopYearInfo(data)[0][0]['value'])
        // console.log(getTopYearInfo(data)[0][0])
        // console.log(getTopYearInfo(data)[0]['key'])
        let panel=getTopYearInfo(data)[0]

        let tgroups = d3.select("#tgroups").selectAll("li").data(panel);
        let Entertgroups = tgroups.enter().append("li")


        tgroups.exit().remove();
        tgroups = tgroups.merge(Entertgroups);

        tgroups
            .attr("class","list-group-item d-flex justify-content-between align-items-start")
            .text(function (d,i) {
            return d["key"]
        });
        let tgroupsS=d3.select("#tgroups").selectAll("li").append("span")
            .attr("class","badge badge-primary badge-pill")
            .attr("justify-content","flex-start")
            // .attr("display","inline-block")
            .text(function (d,i) {
                return panel[i]["value"];
            });


        let panel2=getTopYearInfo(data)[2]

        let weapons = d3.select("#weapons").selectAll("li").data(panel2);
        let Enterweapons = weapons.enter().append("li");



        weapons.exit().remove();
        weapons = weapons.merge(Enterweapons);

        weapons
            .attr("class","list-group-item d-flex justify-content-between align-items-start")

            .text(function (d,i) {
            return d["key"];
        });

        let weaponsS=d3.select("#weapons").selectAll("li").append("span")
            .attr("class","badge badge-primary badge-pill")
            .attr("justify-content","flex-start")
            // .attr("display","inline-block")
            .text(function (d,i) {
            return panel2[i]["value"];
        });


            // .attr("class","badge badge-primary badge-pill")
            // .text(function(d){
            //     return d["value"];
            // })


        let panel3=getTopYearInfo(data)[1]

        let targets = d3.select("#targets").selectAll("li").data(panel3);
        let Entertargets = targets.enter().append("li");



        targets.exit().remove();
        targets= targets.merge(Entertargets);

        targets
            .attr("class","list-group-item d-flex justify-content-between align-items-start")

            .text(function (d,i) {
                return d["key"];
            });

        let TargetS=d3.select("#targets").selectAll("li").append("span")
            .attr("class","badge badge-primary badge-pill")
            .attr("justify-content","flex-start")
            // .attr("display","inline-block")
            .text(function (d,i) {
                return panel3[i]["value"];
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
