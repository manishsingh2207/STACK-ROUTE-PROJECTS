var fs = require("fs");
var filePath = ['../CSV/WDI_Data.csv'];

//----------plot2/3---------------------
function africaData(country, area) {
    this.country = country;
    this.area = area;
};
var africaList = {};
var americaList = {};
var asiaList = {};
var europeList = {};
var oceaniaList = {};

var africaLand = {};
var americaLand = {};
var asiaLand = {};
var europeLand = {};
var oceaniaLand = {};

function plot3(year, asia, africa, europe, america, oceania) {
    this.year = year;
    this.asia = asia;
    this.africa = africa;
    this.europe = europe;
    this.america = america;
    this.oceania = oceania;
};

fs.readFileSync("../CSV/lookup.csv").toString().split('\n').forEach(function(line) {
    if (line != null) {
        var tempRow = line;
        var tempArray = tempRow.split(",");
        if (tempArray[1] != undefined && tempArray[1].trim() == "Africa") {
            africaList[tempArray[0].trim()] = 1;
        }
        if (tempArray[1] != undefined && tempArray[1].trim() == "America") {
            americaList[tempArray[0].trim()] = 1;
        }
        if (tempArray[1] != undefined && tempArray[1].trim() == "Asia") {
            asiaList[tempArray[0].trim()] = 1;

        }
        if (tempArray[1] != undefined && tempArray[1].trim() == "Europe") {
            europeList[tempArray[0].trim()] = 1;
        }
        if (tempArray[1] != undefined && tempArray[1].trim() == "Oceania") {
            oceaniaList[tempArray[0].trim()] = 1;
        }
    }
});
var plot2 = {};
var plot3_data = [];
//------------------plot1------------------
function landArea(year, area) {
    this.year = year;
    this.area = area;
};
var plotGraph1_1 = [];
var plotGraph1_2 = [];
var plotGraph1_3 = [];
var plot1_data_1 = {};
var plot1_data_2 = {};
var plot1_data_3 = {};
var i = 0;
var l = 0;
var headers = [];
var plotGraph2 = [];

function WriteJson(filePath) {
    while (i < 1) {
        fs.readFileSync(filePath[i]).toString().split('\n').forEach(function(line) {
            if (line != null) {
                var tempRow = line;
                var tempArray = tempRow.split(",");
                if (l == 0) {
                    headers = tempArray;
                    l++;
                }
                if (tempArray[2] == "Arable land (% of land area)" && tempArray[1] == "IND") {
                    var tempObj = new landArea();
                    for (var j = 4; j < tempArray.length; j++) {
                        plot1_data_1[headers[j].trim()] = tempArray[j].trim() || 0;
                    }
                }

                if (tempArray[2] == "Arable land (hectares per person)" && tempArray[1] == "IND") {
                    var tempObj = new landArea();
                    for (var j = 4; j < tempArray.length; j++) {
                        plot1_data_2[headers[j].trim()] = tempArray[j].trim() || 0;
                    }
                }

                if (tempArray[2] == "Arable land (hectares)" && tempArray[1] == "IND") {
                    var tempObj = new landArea();
                    for (var j = 4; j < tempArray.length; j++) {
                        plot1_data_3[headers[j].trim()] = tempArray[j].trim() || 0;
                    }
                }

                //---------plot2----------------------------------
                if (africaList[tempArray[0].trim()] != null && tempArray[2] == "Arable land (% of land area)")
                    if (tempArray[54].trim() != undefined)
                        plot2[tempArray[0].trim()] = tempArray[54].trim() || 0;
            }

            //-------------plot3-------------------------------------
            if (africaList[tempArray[0].trim()] != null && tempArray[2] == "Arable land (hectares)") {
                for (var s = 5; s < tempArray.length - 2; s++) {
                    africaLand[headers[s].trim()] = (parseFloat(africaLand[headers[s].trim()]) || 0) + (parseFloat(tempArray[s].trim()) || 0);
                }
            } else if (asiaList[tempArray[0].trim()] != null && tempArray[2] == "Arable land (hectares)") {
                for (var s = 5; s < tempArray.length - 2; s++) {
                    asiaLand[headers[s].trim()] = (parseFloat(asiaLand[headers[s].trim()]) || 0) + (parseFloat(tempArray[s].trim()) || 0);
                }
            } else if (europeList[tempArray[0].trim()] != null && tempArray[2] == "Arable land (hectares)") {
                for (var s = 5; s < tempArray.length - 2; s++) {
                    europeLand[headers[s].trim()] = (parseFloat(europeLand[headers[s].trim()]) || 0) + (parseFloat(tempArray[s].trim()) || 0);
                }
            } else if (americaList[tempArray[0].trim()] != null && tempArray[2] == "Arable land (hectares)") {
                for (var s = 5; s < tempArray.length - 2; s++) {
                    americaLand[headers[s].trim()] = (parseFloat(americaLand[headers[s].trim()]) || 0) + (parseFloat(tempArray[s].trim()) || 0);
                }
            }
            if (oceaniaList[tempArray[0].trim()] != null && tempArray[2] == "Arable land (hectares)") {
                for (var s = 5; s < tempArray.length - 2; s++) {
                    oceaniaLand[headers[s].trim()] = (parseFloat(oceaniaLand[headers[s].trim()]) || 0) + (parseFloat(tempArray[s].trim()) || 0);
                }
            }

        });
        i++;
    }
    for (var key in plot1_data_1) {
        if (plot1_data_1.hasOwnProperty(key)) {
            var tempObj = new landArea();
            tempObj.year = key;
            tempObj.area = plot1_data_1[key];
            plotGraph1_1.push(tempObj);
        }
    }
    for (var key in plot1_data_2) {
        if (plot1_data_2.hasOwnProperty(key)) {
            var tempObj = new landArea();
            tempObj.year = key;
            tempObj.area = plot1_data_2[key];
            plotGraph1_2.push(tempObj);
        }
    }
    for (var key in plot1_data_3) {
        if (plot1_data_3.hasOwnProperty(key)) {
            var tempObj = new landArea();
            tempObj.year = key;
            tempObj.area = plot1_data_3[key];
            plotGraph1_3.push(tempObj);
        }
    }

    for (var key in plot2) {
        if (plot2.hasOwnProperty(key)) {
            var tempObj = new africaData();
            tempObj.country = key;
            tempObj.area = plot2[key];
            plotGraph2.push(tempObj);
        }
    }

    for (var key in asiaLand) {
        if (asiaLand.hasOwnProperty(key)) {
            var tempObj = new plot3();
            tempObj.year = key;
            tempObj.asia = asiaLand[key];
            tempObj.america = americaLand[key];
            tempObj.africa = africaLand[key];
            tempObj.oceania = oceaniaLand[key];
            tempObj.europe = europeLand[key];
            plot3_data.push(tempObj);
        }
    }

}

var landAreaData = {};
var hpp = {};
var hectares = {};
landAreaData.landArea = plotGraph1_1;
hpp.hpp = plotGraph1_2;
hectares.hectares = plotGraph1_3;


var plot1_data = [];
plot1_data.push(landAreaData);
plot1_data.push(hpp);
plot1_data.push(hectares);
WriteJson(filePath);
fs.writeFile('../Json/plot1.json', JSON.stringify(plot1_data));
fs.writeFile('../Json/plot2.json', JSON.stringify(plotGraph2));
fs.writeFile('../Json/plot3.json', JSON.stringify(plot3_data));
