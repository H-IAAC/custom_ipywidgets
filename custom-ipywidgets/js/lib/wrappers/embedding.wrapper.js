import { linearhistplot } from "../graphs/linearhistplot";
import { scatterplot } from "../graphs/scatterplot";
import { barplot } from "../graphs/barplot";
import { histogramplot } from "../graphs/histogramplot";
import "../../css/widget.css";
const data = require("./data.json");

function plot_linearhistplot(
  linearData_x,
  linearData_y,
  histogramData,
  element
) {
  setTimeout(() => {
    linearhistplot(
      linearData_x,
      linearData_y,
      histogramData,
      element,
    );
  }, 50);
}

function plot_scatterplot(data, x, y, hue, element) {
  setTimeout(() => {
    scatterplot(data, x, y, hue, element);
  }, 50);
}

function plot_barplot(data, x, y, hue, element) {
  setTimeout(() => {
    barplot(data, x, y, hue, element);
  }, 50);
}

function plot_histogramplot(data, x, start, end, element) {
  setTimeout(() => {
    histogramplot(data, x, start, end, element);
  }, 50);
}

function main() {
  const node = document.createElement("div");

  const matrix = data.matrix;
  const grid_areas = data.grid_areas;
  const grid_template_areas = data.grid_template_areas;
  const style = data.style;

  if (!style) {
    style = "basic";
  }

  node.classList.add(style);
  node.style.display = "grid";
  node.style.gridTemplateAreas = grid_template_areas;
  node.style.gridTemplateRows = "repeat(" + matrix.length + ", 30vh)";
  node.style.gridTemplateColumns = "repeat(" + matrix[0].length + ", 1fr)";
  node.style.width = "100%";

  grid_areas.forEach((area) => {
    const grid_area = document.createElement("div");
    grid_area.setAttribute("id", area);
    grid_area.style.gridArea = area;
    grid_area.classList.add("dashboard-div");
    node.appendChild(grid_area);
  });

  document.body.appendChild(node);

  const widgets = data.widgets;
  for (const widget of widgets) {
    const widget_name = Object.keys(widget)[0];
    const widget_data = widget[widget_name];
    switch (widget_name) {
      case "linearhistplot":
        plot_linearhistplot(
            widget_data.linearData_x,
            widget_data.linearData_y,
            widget_data.histogramData,
            widget_data.element
          );
        break;
      case "scatterplot":
        plot_scatterplot(
            widget_data.data,
            widget_data.x,
            widget_data.y,
            widget_data.hue,
            widget_data.element
          );
        break;
      case "barplot":
        plot_barplot(
            widget_data.data,
            widget_data.x,
            widget_data.y,
            widget_data.hue,
            widget_data.element
        )
        break;
      case "histogramplot":
        plot_histogramplot(
            widget_data.data,
            widget_data.x,
            widget_data.start,
            widget_data.end,
            widget_data.element
        )
        break;
      default:
    }
  }
}

main();
