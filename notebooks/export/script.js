
async function run() {
  var data = await d3.json("data.json");
  scatterplot(data.data, data.x, data.y, data.hue, data.ContainerID, "#d3-container");
}

run();
    

export function scatterplot(
  data,
  x_value,
  y_value,
  hue,
  element,
  setValue,
  setSelectedValues,
  that
) {
  for (let i = 0; i < data.length; i++) {
    data[i]["id"] = i;
  }
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
    if (setValue !== undefined) {
      setValue(text, that);
    }
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
    .attr("id", function (d, i) {
      return "dot-" + d.id;
    })
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

  function resetColor() {
    svg
      .selectAll(".dot")
      .data(data)
      .attr("r", 3.5)
      .style("fill", function (d) {
        return color(d[hue]);
      });
  }

  function setLassoValues(values) {
    if (setSelectedValues !== undefined) {
      setSelectedValues(values, that);
    }
  }

  lasso(
    element,
    x,
    y,
    x_value,
    y_value,
    margin.left,
    margin.top,
    resetColor,
    setLassoValues
  );

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
    .attr("alignment-baseline", "middle");
}


export function lasso(element, xScale, yScale, x_value, y_value, x_translate, y_translate, resetColor, setLassoValues) {
  // const PATH_COLOR = "black"
  // const PATH_BACKGROUND_COLOR = "#00000054"
  const PATH_COLOR = "blue"
  const PATH_BACKGROUND_COLOR = "#00008854"
  const SELECTED_DOTS_COLOR = "red"

  let coords = [];
  const lineGenerator = d3.line();

  const pointInPolygon = function (point, vs) {
    var x = point[0],
      y = point[1];

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
      var xi = vs[i][0],
        yi = vs[i][1];
      var xj = vs[j][0],
        yj = vs[j][1];

      var intersect =
        yi > y != yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
      if (intersect) inside = !inside;
    }

    return inside;
  };

  const circles = d3.select(element).selectAll(".dot");

  function drawPath() {
    d3.select("#lasso")
      .style("stroke", PATH_COLOR)
      .style("stroke-width", 2)
      .style("fill", PATH_BACKGROUND_COLOR)
      .attr("d", lineGenerator(coords));
  }

  function dragStart() {
    coords = [];
    resetColor()
    d3.select(element).select("svg").append("path").attr("id", "lasso");
  }

  function dragMove(event) {
    let mouseX = event.sourceEvent.offsetX;
    let mouseY = event.sourceEvent.offsetY;
    coords.push([mouseX, mouseY]);
    drawPath();
  }

  function dragEnd() {
    let selectedDots = [];
    circles.each((d, i) => {
      let point = [xScale(d[x_value]) + x_translate, yScale(d[y_value]) + y_translate];
      if (pointInPolygon(point, coords)) {
        d3.select("#dot-" + d.id).style("fill", SELECTED_DOTS_COLOR).attr("r", 6);
        selectedDots.push(d);
      }
    });
    d3.select("#lasso").remove();
    setLassoValues(selectedDots)
  }

  const drag = d3
    .drag()
    .on("start", dragStart)
    .on("drag", dragMove)
    .on("end", dragEnd);

  d3.select(element).call(drag);
}
