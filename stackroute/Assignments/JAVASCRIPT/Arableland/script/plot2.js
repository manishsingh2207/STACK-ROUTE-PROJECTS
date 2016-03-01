
function plot2() {
    var margin = {
            top: 20,
            right: 20,
            bottom: 100,
            left: 150
        },
        width = 2000,
        height = 500;

    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);

    var y = d3.scale.linear()
        .range([height, 0]);

    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");

    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left");

   var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<span style='color:red'>"+ d.country + "</span>" + ": " + parseFloat(d.area);
        })
        d3.select("#bar2").html("");
    var svg = d3.select("#bar2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.call(tip);
    d3.json("Json/plot2.json", function(error, data) {
        if (error) throw error;
        x.domain(data.map(function(d) {
            return d.country;
        }));
        y.domain([0, d3.max(data, function(d) {
            return parseFloat(d.area);
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("font-family", "'Slabo 30px', serif")
            .attr("transform", "rotate(-30)")
            .attr("font-weight", "bold")
            .attr("font-size", "15");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("font-family", "'Slabo 30px', serif")
            .attr("font-weight", "bold")
            .attr("font-size", "15");

        svg.selectAll(".bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) {
                return x(d.country);
            })
            .attr("width", x.rangeBand())
            .attr("y", function(d) {
                return y(parseFloat(d.area));
            })
         .attr("height", function(d) {
                return height - y(parseFloat(d.area));
            })
             .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

            svg.append("g")
            .attr("class", "y axis")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("vertical-align","center")
            .attr("y", 10)
            .attr("dy", "1.0em")
            .attr("font-family", "'Slabo 30px', serif")
            .attr("font-weight", "bold")
            .attr("font-size", "15")
            .style("text-anchor", "end")
            .text('Area');
    });
}
