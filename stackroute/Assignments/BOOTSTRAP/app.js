
var fs  = require("fs");
//var filePath=['../CSV/India2011.csv','../CSV/IndiaSC2011.csv','../CSV/IndiaST2011.csv'];
<!--plot 1-->
function plot1(ageGroup, totalLiteratePersons) {
    this.ageGroup = ageGroup;
    this.totalLiteratePersons = totalLiteratePersons;
};

var plot1_data={};
var getProperty1 = function (propertyName) {
    return plot1_data[propertyName];
};

var i=0;
var plotGraph1=[];
var filePath=['../CSV/India2011.csv','../CSV/IndiaSC2011.csv','../CSV/IndiaST2011.csv'];
function firstWrite(filePath){
  while(i<3){
fs.readFileSync(filePath[i]).toString().split('\n').forEach(function (line) {
    if(line!=null){
    var tempRow=line;
    var tempArray = tempRow.split(",");
    /*collect data from file*/
    if(tempArray[4]=="Total"){
      var tempPlot1=new plot1;
      tempPlot1.ageGroup=tempArray[5];
      tempPlot1.totalLiteratePersons=tempArray[12];
      if(getProperty1(tempPlot1.ageGroup)==null){
      plot1_data[tempPlot1.ageGroup]=tempPlot1.totalLiteratePersons;
    }
      else {
        plot1_data[tempPlot1.ageGroup]=parseInt(plot1_data[tempPlot1.ageGroup])+parseInt(tempPlot1.totalLiteratePersons);
      }
}}
});
i++;
}
for (var key in plot1_data) {
  if (plot1_data.hasOwnProperty(key)) {
    var tempObj=new plot1;
    tempObj.ageGroup=key;
    tempObj.totalLiteratePersons=plot1_data[key];
    plotGraph1.push(tempObj);
  }
}
}

firstWrite(filePath);
fs.writeFile('./plot1.json', JSON.stringify(plotGraph1));


<!--plot 2-->
var fs1  = require("fs");
var plot2_data_male={};
var plot2_data_female={};
var getProperty2_male = function (propertyName) {
    return plot2_data_male[propertyName];
};
var getProperty2_male = function (propertyName) {
    return plot2_data_female[propertyName];
};
function plot2(state, totalGraduates, totalGraduatesMale, totalGraduatesFemale) {
    this.state = state;
    this.totalGraduatesMale = totalGraduatesMale;
    this.totalGraduatesFemale = totalGraduatesFemale;
};
var j=0;
var plotGraph2=[];

function secondWrite(filePath){
  while(j<3){
fs1.readFileSync(filePath[j]).toString().split('\n').forEach(function (line) {
    if(line!=null){
    var tempRow=line;
    var tempArray = tempRow.split(",");
    /*collect data from file*/
    if(tempArray[4]=="Total" && tempArray[5]=="All ages"){
      var tempPlot2=new plot2;
      tempPlot2.state=tempArray[3];
      tempPlot2.totalGraduatesMale=tempArray[40];
      tempPlot2.totalGraduatesFemale=tempArray[41];
      if(getProperty2_male(tempPlot2.state)==null){
      plot2_data_male[tempPlot2.state]=tempPlot2.totalGraduatesMale;
    }
      else {
        plot2_data_male[tempPlot2.state]=parseInt(plot2_data_male[tempPlot2.state])+parseInt(tempPlot2.totalGraduatesMale);
      }


      if(plot2_data_female[tempPlot2.state]==null){
      plot2_data_female[tempPlot2.state]=tempPlot2.totalGraduatesFemale;
    }
      else {
        plot2_data_female[tempPlot2.state]=parseInt(plot2_data_female[tempPlot2.state])+parseInt(tempPlot2.totalGraduatesFemale);
      }
}}
});
j++;
}
for (var key in plot2_data_male) {
  if (plot2_data_male.hasOwnProperty(key)) {
    var tempObj=new plot2;
    tempObj.state=key;
    tempObj.totalGraduatesMale=plot2_data_male[key];
    tempObj.totalGraduatesFemale=plot2_data_female[key];
    plotGraph2.push(tempObj);
  }
}
}
secondWrite(filePath);
fs.writeFile('./plot2.json', JSON.stringify(plotGraph2));



<!-- plot 3 -->
var fs2  = require("fs");
var plot3_data={};
var k=0;
var l=0;
var headers=[];
function thirdWrite(filePath){
  while(k<3){
fs2.readFileSync(filePath[k]).toString().split('\n').forEach(function (line) {
    var tempRow=line;
    var tempArray = tempRow.split(",");
    if(l==0)
    {
      headers=tempArray;
      l++;
    }
    if(line!=null){
    /*collect data from file*/
    if(tempArray[4]=="Total" && tempArray[5]=="All ages"){
      plot3_data[headers[18].split("-")[1]]=(parseInt(plot3_data[headers[18].split("-")[1]])||0)+parseInt(tempArray[18]);
      plot3_data[headers[21].split("-")[1]]=(parseInt(plot3_data[headers[21].split("-")[1]])||0)+parseInt(tempArray[21]);
      plot3_data[headers[24].split("-")[1]]=(parseInt(plot3_data[headers[24].split("-")[1]])||0)+parseInt(tempArray[24]);
      plot3_data[headers[27].split("-")[1]]=(parseInt(plot3_data[headers[27].split("-")[1]])||0)+parseInt(tempArray[27]);
      plot3_data[headers[30].split("-")[1]]=(parseInt(plot3_data[headers[30].split("-")[1]])||0)+parseInt(tempArray[30]);
      plot3_data[headers[33].split("-")[1]+headers[33].split("-")[2]]=(parseInt(plot3_data[headers[33].split("-")[1]+headers[33].split("-")[2]])||0)+parseInt(tempArray[33]);
      plot3_data[headers[36].split("-")[1]]=(parseInt(plot3_data[headers[36].split("-")[1]])||0)+parseInt(tempArray[36]);
      plot3_data[headers[39].split("-")[1]]=(parseInt(plot3_data[headers[39].split("-")[1]])||0)+parseInt(tempArray[39]);
      plot3_data[headers[42].split("-")[1]]=(parseInt(plot3_data[headers[42].split("-")[1]])||0)+parseInt(tempArray[42]);
};
}
});
k++;
}
}
thirdWrite(filePath);
fs.writeFile('./plot3.json', JSON.stringify(plot3_data));
