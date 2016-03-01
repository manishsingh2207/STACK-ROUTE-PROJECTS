var fs = require("fs");
var filePath = ['../CSV/India2011.csv', '../CSV/IndiaSC2011.csv', '../CSV/IndiaST2011.csv'];

function plot1(ageGroup, totalLiteratePersons) {
    this.ageGroup = ageGroup;
    this.totalLiteratePersons = totalLiteratePersons;
};

var plot1_data = {};
var getProperty1 = function(propertyName) {
    return plot1_data[propertyName];
};

var i = 0;
var plotGraph1 = [];

<!--plot 2-->
var fs1 = require("fs");
var plot2_data = {};

var getProperty2 = function(propertyName) {
    return plot2_data[propertyName];
};

function plot2(state, totalGraduates, totalGraduatesMale, totalGraduatesFemale) {
    this.state = state;
    this.totalGraduatesMale = totalGraduatesMale;
    this.totalGraduatesFemale = totalGraduatesFemale;
};
var j = 0;
var plotGraph2_1 = [];
var plotGraph2_2 = [];

<!-- plot 3 -->
var plot3_data = {};

function plot3(educationCategories, totalPersons) {
    this.educationCategories = educationCategories;
    this.totalPersons = totalPersons;
};
var plotGraph3 = [];
var k = 0;
var l = 0;
var headers = [];

function WriteJson(filePath) {
    while (i < 3) {
        fs.readFileSync(filePath[i]).toString().split('\n').forEach(function(line) {
            if (line != null) {
                var tempRow = line;
                var tempArray = tempRow.split(",");
                if (l == 0) {
                    headers = tempArray;
                    l++;
                }
                /*collect data from file*/
                if (tempArray[4] == "Total") {
                    //-----------------plot1----------------------------------
                    if (tempArray[5] != "All ages") {
                        var tempPlot1 = new plot1;
                        tempPlot1.ageGroup = tempArray[5];
                        tempPlot1.totalLiteratePersons = tempArray[12];
                        if (getProperty1(tempPlot1.ageGroup) == null) {
                            plot1_data[tempPlot1.ageGroup] = tempPlot1.totalLiteratePersons;
                        } else {
                            plot1_data[tempPlot1.ageGroup] = parseInt(plot1_data[tempPlot1.ageGroup]) + parseInt(tempPlot1.totalLiteratePersons);
                        }
                    }

                    //---------------plot2---------------------------------------
                    if (tempArray[5] == "All ages") {
                        var tempPlot2 = new plot2;
                        tempPlot2.state = tempArray[3];
                        tempPlot2.totalGraduatesMale = tempArray[40];
                        tempPlot2.totalGraduatesFemale = tempArray[41];
                        if (getProperty2(tempPlot2.state.split("-")[1].trim()) == null) {
                            plot2_data[tempPlot2.state.split("-")[1].trim()] = [tempPlot2.totalGraduatesMale, tempPlot2.totalGraduatesFemale];
                        } else {
                            plot2_data[tempPlot2.state.split("-")[1].trim()][0] = parseInt(plot2_data[tempPlot2.state.split("-")[1].trim()][0]) + parseInt(tempPlot2.totalGraduatesMale);
                            plot2_data[tempPlot2.state.split("-")[1].trim()][1] = parseInt(plot2_data[tempPlot2.state.split("-")[1].trim()][1]) + parseInt(tempPlot2.totalGraduatesFemale);

                        }



                        //-----plot-3----------------------------------
                        plot3_data[headers[18].split("-")[1].trim()] = (parseInt(plot3_data[headers[18].split("-")[1].trim()]) || 0) + parseInt(tempArray[18]);
                        plot3_data[headers[21].split("-")[1].trim()] = (parseInt(plot3_data[headers[21].split("-")[1].trim()]) || 0) + parseInt(tempArray[21]);
                        plot3_data[headers[24].split("-")[1].trim()] = (parseInt(plot3_data[headers[24].split("-")[1].trim()]) || 0) + parseInt(tempArray[24]);
                        plot3_data[headers[27].split("-")[1].trim()] = (parseInt(plot3_data[headers[27].split("-")[1].trim()]) || 0) + parseInt(tempArray[27]);
                        plot3_data[headers[30].split("-")[1].trim()] = (parseInt(plot3_data[headers[30].split("-")[1].trim()]) || 0) + parseInt(tempArray[30]);
                        plot3_data[headers[33].split("-")[1].trimLeft() + " " + headers[33].split("-")[2].trimRight()] = (parseInt(plot3_data[headers[33].split("-")[1].trimLeft() + " " + headers[33].split("-")[2].trimRight()]) || 0) + parseInt(tempArray[33]);
                        plot3_data[headers[36].split("-")[1].trim()] = (parseInt(plot3_data[headers[36].split("-")[1].trim()]) || 0) + parseInt(tempArray[36]);
                        plot3_data[headers[39].split("-")[1].trim()] = (parseInt(plot3_data[headers[39].split("-")[1].trim()]) || 0) + parseInt(tempArray[39]);
                        plot3_data[headers[42].split("-")[1].trim()] = (parseInt(plot3_data[headers[42].split("-")[1].trim()]) || 0) + parseInt(tempArray[42]);
                    }
                }

            }
        });
        i++;
    }
    var temp;
    for (var key in plot1_data) {
        if (plot1_data.hasOwnProperty(key)) {
            var tempObj = new plot1;
            tempObj.ageGroup = key;
            tempObj.totalLiteratePersons = plot1_data[key] + "";
            if (tempObj.ageGroup == "0-6")
                plotGraph1.unshift(tempObj);
            else {
                plotGraph1.push(tempObj);
            }
        }
    }

    for (var key in plot2_data) {
        if (plot2_data.hasOwnProperty(key)) {
            var tempObj1 = new plot2;
            var tempObj2 = new plot2;
            if ((parseInt(plot2_data[key][0]) > 50000)) {
                tempObj1.state = key;
                tempObj1.totalGraduatesMale = plot2_data[key][0];
                tempObj1.totalGraduatesFemale = plot2_data[key][1];
                plotGraph2_1.push(tempObj1);
            } else {
                tempObj2.state = key;
                tempObj2.totalGraduatesMale = plot2_data[key][0];
                tempObj2.totalGraduatesFemale = plot2_data[key][1];
                plotGraph2_2.push(tempObj2);
            }
        }
    }

    for (var key in plot3_data) {
        if (plot3_data.hasOwnProperty(key)) {
            var tempObj = new plot3;
            tempObj.educationCategories = key;
            tempObj.totalPersons = plot3_data[key];
            plotGraph3.push(tempObj);
        }
    }
}
WriteJson(filePath);
fs.writeFile('../Json/plot1.json', JSON.stringify(plotGraph1));
fs.writeFile('../Json/plot2_1.json', JSON.stringify(plotGraph2_1));
fs.writeFile('../Json/plot2_2.json', JSON.stringify(plotGraph2_2));
fs.writeFile('../Json/plot3.json', JSON.stringify(plotGraph3));
