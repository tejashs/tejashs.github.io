class Summary{
  constructor(){
        this.divShiftChart = d3.select("#summaryDiv").classed("sideBar", true);
    };

  updateText(text){
    this.divShiftChart.select("#summarytext").text(text);
  }
}
