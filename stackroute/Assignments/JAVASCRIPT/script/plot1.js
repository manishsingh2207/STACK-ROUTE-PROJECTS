function plot1() {

    var margin = {
            top: 20,
            right: 20,
            bottom: 80,
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
            return "<span style='color:red'>" + d.ageGroup + "</span>" + ": " + d.totalLiteratePersons;
        })

    var svg = d3.select("#bar1").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.call(tip);
    d3.json("Json/plot1.json", function(error, data) {
        if (error) throw error;

        x.domain(data.map(function(d) {
            return d.ageGroup;
        }));
        y.domain([0, d3.max(data, function(d) {
            return parseInt(d.totalLiteratePersons) + 10000000
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
                return x(d.ageGroup);
            })
            .attr("width", x.rangeBand())
            .attr("y", function(d) {
                return y(d.totalLiteratePersons);
            })
            .attr("height", function(d) {
                return height - y(d.totalLiteratePersons);
            })
            .on('mouseover', tip.show)
            .on('mouseout', tip.hide);

            svg.append("g")
            .attr("class", "y axis")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("vertical-align","center")
            .attr("y", 10)
            .attr("dy", "-7.71em")
            .attr("font-family", "'Slabo 30px', serif")
            .attr("font-weight", "bold")
            .attr("font-size", "15")
            .style("text-anchor", "end")
            .text("Total Literate Persons");
    });

}
