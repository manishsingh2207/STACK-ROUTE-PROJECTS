(function($) {
  var tempURL = "https://www.wikidata.org/wiki/Special:EntityData/Q";
  var qIdList=[];
  var qId;
  var pIdList=[];
  var pId;
    // var maleCricketerList = 'http://wdq.wmflabs.org/api?q=claim[106:12299841]%20AND%20claim[27:668]%20AND%20claim[21:6581097]';
    // var typeID="#cricketers";
    // getList(tempURL, maleCricketerList, typeID);

    function getHints(item){
      var link="https://www.wikidata.org/w/api.php?action=wbsearchentities&search="+item+"&language=en&format=json";
      //console.log(link);
      $.getJSON(link + "&callback=?", function(data) {
          $.each(data["search"], function(k, v) {
            //console.log(v["label"]+v["description"]);
            if(k==0){
              qId=v["title"].substr(1);
            }
            $("#properties").append($('<option>', {
                                value: k,
                                text: v["label"]+":"+v["description"]
                            }));
                            qIdList.push(v["title"].substr(1));
              });
          });
      }

      function getProperties(propertyNames){
        var link="https://www.wikidata.org/w/api.php?action=wbsearchentities&search="+propertyNames+"&language=en&type=property&format=json";
        $.getJSON(link + "&callback=?", function(data) {
            $.each(data["search"], function(k, v) {
              if(k==0){
                pId=v["title"].substr(10);
              }
              $("#propertyNames").append($('<option>', {
                                  value: k,
                                  text: v["label"]+":"+v["description"]
                              }));
                              pIdList.push(v["title"].substr(10));
                });
            });

        }

    function search(){
      $("#searchButton").on("click",function(){
        var searchText=$("#searchText").val();
        $("#properties").find('option').remove();
        getHints(searchText);
      });

      $("#searchProperty").on("click",function(){
        var searchText=$("#searchPropertyText").val();
        $("#propertyNames").find('option').remove();
        getProperties(searchText);
      });
    }
    search();

    function getSelectedItem(){
      var str = "";
      $( "#properties" ).change(function() {
        $( "#properties option:selected" ).each(function(k, v) {
          str += $( this ).text() + " ";
          qId=qIdList[$( "#properties" ).val()];
        });
      });

      $( "#propertyNames" ).change(function() {
        $( "#propertyNames option:selected" ).each(function(k, v) {
          str += $( this ).text() + " ";
          pId=pIdList[$( "#propertyNames" ).val()];
        });
      });
    }
    getSelectedItem();



    var resultUrl = 'http://wdq.wmflabs.org/api?q=';
    function getResult() {
        var claim='claim['+pId+':'+qId+"]";
        var resultUrl = 'http://wdq.wmflabs.org/api?q='+claim;
        var tempURL = 'https://www.wikidata.org/wiki/Special:EntityData/Q';
        $.getJSON(resultUrl + "&callback=?", function(data) {
            $.each(data["items"], function(k, v) {
                var link = tempURL + v + ".json";
                $.getJSON(link, function(data) {
                    var name = data["entities"]["Q" + v]["labels"]["en"]["value"];
                    $("#result").append({
                        value: k,
                        text: name
                    });
                    //$("#cricketers").append($("<p></p>").text(name));
                });
            });
        });
    }

    function result(){
      $("#getResult").on("click",function(){
        getResult();
      });
    }
    result();


})(jQuery);
