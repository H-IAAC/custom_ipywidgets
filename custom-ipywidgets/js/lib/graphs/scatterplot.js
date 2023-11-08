import * as d3 from "d3";

export function scatterplot(
  data,
  x_value,
  y_value,
  hue,
  setValue,
  that,
  element
) {
  d3.select(element).selectAll("*").remove();

  var margin = { top: 20, right: 20, bottom: 30, left: 40 },
    // ****    width = 960 - margin.left - margin.right, ****
    // ****    height = 500 - margin.top - margin.bottom; ****
    width = 720 - margin.left - margin.right,
    height = 375 - margin.top - margin.bottom;

  var x = d3.scaleLinear().range([0, width]);

  var y = d3.scaleLinear().range([height, 0]);

  var color = d3.scaleOrdinal(d3.schemeCategory10);

  var xAxis = d3.axisBottom(x);

  var yAxis = d3.axisLeft(y);

  function mouseover(event, d) {
    focus.style("opacity", 1);
    focusText.style("opacity", 1);
    focus.attr("x", event.offsetX - 30).attr("y", event.offsetY - 40);
    focusText
      .html(
        "x: " +
          Math.round(d[x_value] * 10) / 10 +
          "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;" +
          "y: " +
          Math.round(d[y_value] * 10) / 10
      )
      .attr("x", event.offsetX - 15)
      .attr("y", event.offsetY - 20);
  }

  function mouseout() {
    focus.style("opacity", 0);
    focusText.style("opacity", 0);
  }

  function mouseClick(event, d) {
    const text =
      "x:" +
      Math.round(d[x_value] * 10) / 10 +
      "    " +
      "y:" +
      Math.round(d[y_value] * 10) / 10;
    setValue(text, that);
  }

  var svg = d3
    .select(element)
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
    .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  x.domain(
    d3.extent(data, function (d) {
      return d[x_value];
    })
  ).nice();
  y.domain(
    d3.extent(data, function (d) {
      return d[y_value];
    })
  ).nice();

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)
    .append("text")
    .attr("class", "label")
    .attr("x", width)
    .attr("y", -6)
    .style("text-anchor", "end");

  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("class", "label")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", ".71em")
    .style("text-anchor", "end");

  svg
    .selectAll(".dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("class", "dot")
    .attr("r", 3.5)
    .attr("cx", function (d) {
      return x(d[x_value]);
    })
    .attr("cy", function (d) {
      return y(d[y_value]);
    })
    .style("fill", function (d) {
      return color(d[hue]);
    })
    .on("mouseover", mouseover)
    .on("mouseout", mouseout)
    .on("click", mouseClick);

  var legend = svg
    .selectAll(".legend")
    .data(color.domain())
    .enter()
    .append("g")
    .attr("class", "legend")
    .attr("transform", function (d, i) {
      return "translate(0," + i * 20 + ")";
    });

  legend
    .append("rect")
    .attr("x", width - 18)
    .attr("width", 18)
    .attr("height", 18)
    .style("fill", color);

  legend
    .append("text")
    .attr("x", width - 24)
    .attr("y", 9)
    .attr("dy", ".35em")
    .style("text-anchor", "end")
    .text(function (d) {
      return d;
    });

  const focus = svg
    .append("g")
    .append("rect")
    .style("fill", "none")
    .attr("width", 160)
    .attr("height", 40)
    .attr("stroke", "#69b3a2")
    .attr("stroke-width", 4)
    .style("opacity", 0);

  var focusText = svg
    .append("g")
    .append("text")
    .style("opacity", 0)
    .attr("text-anchor", "left")
    .attr("alignment-baseline", "middle")
    .html("lkjdslkfjsd");
}
