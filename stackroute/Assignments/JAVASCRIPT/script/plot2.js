function plot2_1() {
    var margin = {
            top: 80,
            right: 80,
            bottom: 120,
            left: 150
        },
        width = 800,
        height = 400;
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);
    var y0 = d3.scale.linear().domain([500, 1100]).range([height, 0]),
        y1 = d3.scale.linear().domain([20, 80]).range([height, 0]);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    // create left yAxis
    var yAxisLeft = d3.svg.axis().scale(y0).ticks(20).orient("left");
    // create right yAxis
    var yAxisRight = d3.svg.axis().scale(y1).ticks(20).orient("right");
    var tip1 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<span style='color:red'>" + "Male" + "</span>" + ":" + d.totalGraduatesMale;
        })
    var tip2 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<span style='color:red'>" + "Female" + "</span>" + ":" + d.totalGraduatesFemale;
        })



    d3.select("#bar2").html("");
    var svg = d3.select("#bar2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("class", "graph")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
    svg.call(tip1);
    svg.call(tip2);
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    d3.json("Json/plot2_2.json", function(error, data) {
        x.domain(data.map(function(d) {
            return d.state;
        }));
        y0.domain([0, d3.max(data, function(d) {
            return d.totalGraduatesMale;
        })]);
        y1.domain([0, d3.max(data, function(d) {
            return d.totalGraduatesMale;
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("font-family", "'Slabo 27px', serif")
            .attr("transform", "rotate(-30)")
            .attr("font-weight", "bold")
            .attr("font-size", "12");
        svg.append("g")
            .attr("class", "y axis axisLeft")
            .attr("transform", "translate(0,0)")
            .call(yAxisLeft)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("font-family", "'Slabo 27px', serif")
            .attr("font-weight", "bold")
            .attr("font-size", "12");

        bars = svg.selectAll(".bar").data(data).enter();


        bars.append("rect")
            .attr("class", "bar1")
            .attr("x", function(d) {
                return x(d.state);
            })
            .attr("width", x.rangeBand() / 2)
            .attr("y", function(d) {
                return y0(d.totalGraduatesMale);
            })
            .attr("height", function(d, i, j) {
                return height - y0(d.totalGraduatesMale);
            })
            .on('mouseover', tip1.show)
            .on('mouseout', tip1.hide);

        bars.append("rect")
            .attr("class", "bar2")
            .attr("x", function(d) {
                return x(d.state) + x.rangeBand() / 2;
            })
            .attr("width", x.rangeBand() / 2)
            .attr("y", function(d) {
                return y1(d.totalGraduatesFemale);
            })
            .attr("height", function(d, i, j) {
                return height - y1(d.totalGraduatesFemale);
            })
            .on('mouseover', tip2.show)
            .on('mouseout', tip2.hide);

            svg.append("g")
            .attr("class", "y axis")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("vertical-align","center")
            .attr("y", 10)
            .attr("dy", "-5.71em")
            .attr("font-family", "'Slabo 30px', serif")
            .attr("font-weight", "bold")
            .attr("font-size", "15")
            .style("text-anchor", "end")
            .text("Total Graduate Male/Female");

    });
}

function plot2_2() {
    var margin = {
            top: 80,
            right: 80,
            bottom: 120,
            left: 150
        },
        width = 2000,
        height = 400;
    var x = d3.scale.ordinal()
        .rangeRoundBands([0, width], .1);
    var y0 = d3.scale.linear().domain([0,100000000]).range([height,height/2,0]),
        y1 = d3.scale.linear().domain([0,100000000]).range([height,height/2,0]);
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom");
    // create left yAxis
    var yAxisLeft = d3.svg.axis().scale(y0).ticks(20).orient("left");
    // create right yAxis
    var yAxisRight = d3.svg.axis().scale(y0).ticks(20).orient("right");

    var tip1 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<span style='color:red'>" + "Male" + "</span>" + ":" + d.totalGraduatesMale;
        })
    var tip2 = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
            return "<span style='color:red'>" + "Female" + "</span>" + ":" + d.totalGraduatesFemale;
        })

    d3.select("#bar2").html("");
    var svg = d3.select("#bar2").append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("class", "graph")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg.call(tip1);
    svg.call(tip2);
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);


    d3.json("Json/plot2_1.json", function(error, data) {
        x.domain(data.map(function(d) {
            return d.state;
        }));
        y0.domain([0, d3.max(data, function(d) {
            return d.totalGraduatesMale;
        })/6,d3.max(data, function(d) {
            return d.totalGraduatesMale;
        })]);
        y1.domain([0, d3.max(data, function(d) {
            return d.totalGraduatesFemale;
        })/6,d3.max(data, function(d) {
            return d.totalGraduatesFemale;
        })]);

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("font-family", "'Slabo 27px', serif")
            .attr("transform", "rotate(-30)")
            .attr("font-weight", "bold")
            .attr("font-size", "12");
        svg.append("g")
            .attr("class", "y axis axisLeft")
            .attr("transform", "translate(0,0)")
            .call(yAxisLeft)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("font-family", "'Slabo 27px', serif")
            .attr("font-weight", "bold")
            .attr("font-size", "12");

        bars = svg.selectAll(".bar").data(data).enter();


        bars.append("rect")
            .attr("class", "bar1")
            .attr("x", function(d) {
                return x(d.state);
            })
            .attr("width", x.rangeBand() / 2)
            .attr("y", function(d) {
                return y0(d.totalGraduatesMale);
            })
            .attr("height", function(d, i, j) {
                return height - y0(d.totalGraduatesMale);
            })
            .on('mouseover', tip1.show)
            .on('mouseout', tip1.hide);


        bars.append("rect")
            .attr("class", "bar2")
            .attr("x", function(d) {
                return x(d.state) + x.rangeBand() / 2;
            })
            .attr("width", x.rangeBand() / 2)
            .attr("y", function(d) {
                return y1(d.totalGraduatesFemale);
            })
            .attr("height", function(d, i, j) {
                return height - y1(d.totalGraduatesFemale);
            })
            .on('mouseover', tip2.show)
            .on('mouseout', tip2.hide);

            svg.append("g")
            .attr("class", "y axis")
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("vertical-align","center")
            .attr("y", 10)
            .attr("dy", "-5.71em")
            .attr("font-family", "'Slabo 30px', serif")
            .attr("font-weight", "bold")
            .attr("font-size", "15")
            .style("text-anchor", "end")
            .text("Total Graduate Male/Female");
    });

}
