(function() {
    var qIdList = [];
    var qId = null;
    var pIdList = [];
    var pId = null;
    var propertyValueList = {};
    var qIdNameList = {};
    var filterList = {};

    var getFilterList = function(propertyName) {
        return filterList[propertyName];
    };
    var getQIdNameList = function(propertyName) {
        return qIdNameList[propertyName];
    };
    var getPropertyValueList = function(propertyName) {
        return propertyValueList[propertyName];
    };

    function getProperties(propertyNames) {
        var link = "https://www.wikidata.org/w/api.php?action=wbsearchentities&search=" + propertyNames + "&language=en&type=property&format=json";
        $.getJSON(link + "&callback=?", function(data) {
            $.each(data["search"], function(k, v) {
                if (k == 0) {
                    pId = v["title"].substr(10);
                }
                $("#propertyNames").append($('<li>', {
                    value: k,
                    text: v["label"] + ":" + v["description"].split(";")[0]
                }).addClass("list-group-item").attr("id", k));
                pIdList.push(v["title"].substr(10));

            });
        });

    }

    <!-- ----------------------------------------------------- -->
    function getEntityHints(item) {
        var link = "https://www.wikidata.org/w/api.php?action=wbsearchentities&search=" + item + "&language=en&format=json";
        $.getJSON(link + "&callback=?", function(data) {
            $.each(data["search"], function(k, v) {
                if (k == 0) {
                    qId = v["title"].substr(1);
                }
                $("#entityOptions").append($('<li>', {
                    value: k,
                    text: v["label"] + ":" + v["description"]
                }).addClass("list-group-item").attr("id", k));
                qIdList.push(v["title"].substr(1));
            });
        });
    }

    function getEntityProperties(qId) {
        var entityUrl = "https://www.wikidata.org/w/api.php?action=wbgetentities&props=claims&ids=Q" + qId + "&languages=en&format=json";
        $.getJSON(entityUrl + "&callback=?", function(data) {
            $.each(data["entities"]["Q" + qId]["claims"], function(key, val) {
                var tempLink1 = "https://www.wikidata.org/wiki/Special:EntityData/" + key + ".json"
                $.getJSON(tempLink1, function(data1) {
                    $.each(val, function(key1, val1) {
                        var numericID = val1["mainsnak"]["datavalue"]["value"]["numeric-id"];
                        var tempLink2 = "https://www.wikidata.org/wiki/Special:EntityData/Q" + numericID + ".json";
                        $.getJSON(tempLink2, function(data2) {
                            if (getPropertyValueList(data1["entities"][key]["labels"]["en"]["value"]) == null) {
                                propertyValueList[data1["entities"][key]["labels"]["en"]["value"]] = data2["entities"]["Q" + numericID]["labels"]["en"]["value"];
                            } else {
                                if (propertyValueList[data1["entities"][key]["labels"]["en"]["value"]].includes(data2["entities"]["Q" + numericID]["labels"]["en"]["value"])) {

                                } else
                                    propertyValueList[data1["entities"][key]["labels"]["en"]["value"]] = propertyValueList[data1["entities"][key]["labels"]["en"]["value"]] + "," + data2["entities"]["Q" + numericID]["labels"]["en"]["value"];
                            }

                            $("#entityPropertyList").append($('<li>', {
                                value: numericID,
                                text: data1["entities"][key]["labels"]["en"]["value"] + ":" + data2["entities"]["Q" + numericID]["labels"]["en"]["value"]
                            }).addClass("list-group-item"));

                        });
                    });
                });
            });
        });
    }
    <!-- ----------------------------------------------------- -->


    function searchText() {
        $("#searchProperty").on("click", function() {
            $("#propertySuggestion").slideDown(1000);
            $("#entity").slideUp("fast");
            $("#entityProperties").slideUp("fast");
            var searchText1 = $("#searchPropertyText").val();
            $("#propertyNames").find('li').remove();
            getProperties(searchText1);
        });

        $("#searchEntity").on("click", function() {
            $("#entity").slideDown(1000);
            $("#propertySuggestion").slideUp("fast");
            $("#propertyValueSuggestion").slideUp("fast");
            var searchText2 = $("#searchEntityText").val();
            $("#entityOptions").find('li').remove();
            getEntityHints(searchText2);
        });
    }
    searchText();


    function getPropertyValues() {
        var resultUrl = 'http://wdq.wmflabs.org/api?q=claim[' + pId + ']';
        var tempURL = 'https://www.wikidata.org/wiki/Special:EntityData/Q';
        $.getJSON(resultUrl + "&callback=?", function(data) {
            $.each(data["items"], function(k, v) {
                if (k < 10) {
                    var link = tempURL + v + ".json";
                    $.getJSON(link, function(data) {
                        var property = data["entities"]["Q" + v]["claims"]["P" + pId];
                        $.each(property, function(k1, v1) {
                            var numericID = v1["mainsnak"]["datavalue"]["value"]["numeric-id"];
                            var tempLink2 = "https://www.wikidata.org/wiki/Special:EntityData/Q" + numericID + ".json"
                            $.getJSON(tempLink2, function(data2) {
                                if (getQIdNameList(numericID) == null) {
                                    qIdNameList[numericID] = data2["entities"]["Q" + numericID]["labels"]["en"]["value"];
                                    $("#valueNames").append($('<li>', {
                                        value: numericID,
                                        text: numericID + ":" + data2["entities"]["Q" + numericID]["labels"]["en"]["value"]
                                    }).addClass("list-group-item"));
                                }
                            });
                        });
                    })
                }
            });
        });
    }

    <!----------------------------------->
    function getFilterProperties(qId) {
        var entityUrl = "https://www.wikidata.org/w/api.php?action=wbgetentities&props=claims&ids=Q" + qId + "&languages=en&format=json";
        $.getJSON(entityUrl + "&callback=?", function(data) {
            $.each(data["entities"]["Q" + qId]["claims"], function(key, val) {
                var tempLink1 = "https://www.wikidata.org/wiki/Special:EntityData/" + key + ".json"
                $.getJSON(tempLink1, function(data1) {
                    $.each(val, function(key1, val1) {
                        var numericID = val1["mainsnak"]["datavalue"]["value"]["numeric-id"];
                        var tempLink2 = "https://www.wikidata.org/wiki/Special:EntityData/Q" + numericID + ".json";
                        $.getJSON(tempLink2, function(data2) {
                            if (getFilterList(data1["entities"][key]["labels"]["en"]["value"] + ":" + key) == null) {
                                filterList[data1["entities"][key]["labels"]["en"]["value"] + ":" + key] = data2["entities"]["Q" + numericID]["labels"]["en"]["value"] + ":" + numericID;
                            } else {
                                if (filterList[data1["entities"][key]["labels"]["en"]["value"] + ":" + key].includes(data2["entities"]["Q" + numericID]["labels"]["en"]["value"] + ":" + numericID)) {

                                } else
                                    filterList[data1["entities"][key]["labels"]["en"]["value"] + ":" + key] = filterList[data1["entities"][key]["labels"]["en"]["value"] + ":" + key] + "," + data2["entities"]["Q" + numericID]["labels"]["en"]["value"] + ":" + numericID;
                            }
                        });
                    });
                });
            });
        });
    }

    function getPropertyValueResult() {
        var claim = 'claim[' + pId + ':' + qId + "]";
        var resultUrl = 'http://wdq.wmflabs.org/api?q=' + claim;
        var tempURL = 'https://www.wikidata.org/wiki/Special:EntityData/Q';
        $.getJSON(resultUrl + "&callback=?", function(data) {
            $.each(data["items"], function(k, v) {
                if (k < 10) {
                    var propertyValueList = getFilterProperties(v);
                    var link = tempURL + v + ".json";
                    $.getJSON(link, function(data) {
                        var name = data["entities"]["Q" + v]["labels"]["en"]["value"];
                        $("#resultList").append($('<li>', {
                            text: name
                        }).addClass("list-group-item"));
                    });
                }
            });
        });
    }
    <!------------------------------------->
    function getSelectedItem() {
        $("#propertyNames").on("click", ".list-group-item", function() {
            $("#propertySuggestion").slideUp(1000);
            $("#propertyValueSuggestion").slideDown(4000);
            pId = pIdList[$(this).val()];
            getPropertyValues();
        });

        $("#entityOptions").on("click", ".list-group-item", function() {
            $("#entity").slideUp(1000);
            $("#entityProperties").slideDown(4000);
            qId = qIdList[$(this).val()];
            getEntityProperties(qId);
        });
    }
    getSelectedItem();


    function getResult() {
        $("#valueNames").on("click", ".list-group-item", function() {
            qId = $(this).val();
            getPropertyValueResult();
        });
        $("#entityOptions").on("click", ".list-group-item", function() {
            qId = qIdList[$(this).val()];
            getPropertyValueResult();
        });
    }
    getResult();

    var property={};
    function filter(){
      $("#filterButton").on("click",function() {
        console.log("manish");
        for (var key in filterList) {
            if (filterList.hasOwnProperty(key)) {
                property[key.split(":")[0]]=key.split(":")[1];
                console.log(property);
            }
        }
          //getPropertyValueResult();
      });
    }
    filter();
})();
