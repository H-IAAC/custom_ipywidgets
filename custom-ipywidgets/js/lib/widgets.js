import { DOMWidgetModel, DOMWidgetView } from "@jupyter-widgets/base";
import { linearhistplot } from "./graphs/linearhistplot";
import { scatterplot } from "./graphs/scatterplot";
import { barplot } from "./graphs/barplot";
import { histogramplot } from "./graphs/histogramplot";
import "../css/widget.css";
const data = require("../../package.json");

export class LinearHistPlotModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: LinearHistPlotModel.model_name,
      _view_name: LinearHistPlotModel.view_name,
      _model_module: LinearHistPlotModel.model_module,
      _view_module: LinearHistPlotModel.view_module,
      _model_module_version: LinearHistPlotModel.model_module_version,
      _view_module_version: LinearHistPlotModel.view_module_version,

      linearData_x: [],
      linearData_y: [],
      histogramData: [],
      clickedValue: String,
    };
  }

  static model_name = "LinearHistPlotModel";
  static model_module = data.name;
  static model_module_version = data.version;
  static view_name = "LinearHistPlotView"; // Set to null if no view
  static view_module = data.name; // Set to null if no view
  static view_module_version = data.version;
}

export class LinearHistPlotView extends DOMWidgetView {
  render() {
    this.value_changed();

    // Observe and act on future changes to the value attribute
    this.model.on("change:linearData_x", this.value_changed, this);
  }

  value_changed() {
    let that = this;

    var linearData_x = this.model.get("linearData_x");
    var linearData_y = this.model.get("linearData_y");
    var histogramData = this.model.get("histogramData");

    linearhistplot(
      linearData_x,
      linearData_y,
      histogramData,
      "",
      this.setValue,
      that
    );
  }

  setValue(text, that) {
    that.model.set({ clickedValue: text });
    that.model.save_changes();
  }
}

export class ScatterPlotModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: ScatterPlotModel.model_name,
      _view_name: ScatterPlotModel.view_name,
      _model_module: ScatterPlotModel.model_module,
      _view_module: ScatterPlotModel.view_module,
      _model_module_version: ScatterPlotModel.model_module_version,
      _view_module_version: ScatterPlotModel.view_module_version,

      data: [],
      x: String,
      y: String,
      hue: String,
      element: String,
      clickedValue: String,
      selectedValues: [],
    };
  }

  static model_name = "ScatterplotModel";
  static model_module = data.name;
  static model_module_version = data.version;
  static view_name = "ScatterplotView"; // Set to null if no view
  static view_module = data.name; // Set to null if no view
  static view_module_version = data.version;
}

export class ScatterPlotView extends DOMWidgetView {
  render() {
    this.value_changed();

    // Observe and act on future changes to the value attribute
    this.model.on("change:data", this.value_changed, this);
  }

  value_changed() {
    let that = this;

    var data = this.model.get("data");
    var x = this.model.get("x");
    var y = this.model.get("y");
    var hue = this.model.get("hue");
    var element = this.model.get("element");

    scatterplot(
      data,
      x,
      y,
      hue,
      element,
      this.setValue,
      this.setSelectedValues,
      that
    );
  }

  setValue(text) {
    that.model.set({ clickedValue: text });
    that.model.save_changes();
  }

  setSelectedValues(values, that) {
    that.model.set({ selectedValues: values });
    that.model.save_changes();
  }
}

export class BarPlotModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: BarPlotModel.model_name,
      _view_name: BarPlotModel.view_name,
      _model_module: BarPlotModel.model_module,
      _view_module: BarPlotModel.view_module,
      _model_module_version: BarPlotModel.model_module_version,
      _view_module_version: BarPlotModel.view_module_version,

      data: [],
      x: String,
      y: String,
      hue: String,
    };
  }

  static model_name = "BarplotModel";
  static model_module = data.name;
  static model_module_version = data.version;
  static view_name = "BarplotView"; // Set to null if no view
  static view_module = data.name; // Set to null if no view
  static view_module_version = data.version;
}

export class BarPlotView extends DOMWidgetView {
  render() {
    this.value_changed();

    // Observe and act on future changes to the value attribute
    this.model.on("change:data", this.value_changed, this);
  }

  value_changed() {
    let that = this;

    var data = this.model.get("data");
    var x = this.model.get("x");
    var y = this.model.get("y");
    var hue = this.model.get("hue");

    barplot(data, x, y, hue, "", that);
  }
}

export class HistogramPlotModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: HistogramPlotModel.model_name,
      _view_name: HistogramPlotModel.view_name,
      _model_module: HistogramPlotModel.model_module,
      _view_module: HistogramPlotModel.view_module,
      _model_module_version: HistogramPlotModel.model_module_version,
      _view_module_version: HistogramPlotModel.view_module_version,

      data: [],
      x: String,
      start: Number,
      end: Number,
    };
  }

  static model_name = "HistogramplotModel";
  static model_module = data.name;
  static model_module_version = data.version;
  static view_name = "HistogramplotView"; // Set to null if no view
  static view_module = data.name; // Set to null if no view
  static view_module_version = data.version;
}

export class HistogramPlotView extends DOMWidgetView {
  render() {
    this.value_changed();

    // Observe and act on future changes to the value attribute
    this.model.on("change:data", this.value_changed, this);
  }

  value_changed() {
    let that = this;

    var data = this.model.get("data");
    var x = this.model.get("x");
    var start = this.model.get("start");
    var end = this.model.get("end");

    histogramplot(data, x, start, end, "", that);
  }
}

export class EmbeddingModel extends DOMWidgetModel {
  defaults() {
    return {
      ...super.defaults(),
      _model_name: EmbeddingModel.model_name,
      _view_name: EmbeddingModel.view_name,
      _model_module: EmbeddingModel.model_module,
      _view_module: EmbeddingModel.view_module,
      _model_module_version: EmbeddingModel.model_module_version,
      _view_module_version: EmbeddingModel.view_module_version,

      matrix: [],
      grid_areas: [],
      grid_template_areas: String,
    };
  }

  static model_name = "EmbeddingModel";
  static model_module = data.name;
  static model_module_version = data.version;
  static view_name = "EmbeddingView"; // Set to null if no view
  static view_module = data.name; // Set to null if no view
  static view_module_version = data.version;
}

export class EmbeddingView extends DOMWidgetView {
  render() {
    this.value_changed();

    // Observe and act on future changes to the value attribute
    this.model.on("change:data", this.value_changed, this);
  }

  value_changed() {
    let that = this;

    var matrix = this.model.get("matrix");
    var grid_areas = this.model.get("grid_areas");
    var grid_template_areas = this.model.get("grid_template_areas");

    const node = document.createElement("div");

    node.style.display = "grid";
    node.style.gridTemplateAreas = grid_template_areas;
    node.style.gridTemplateRows = "repeat(" + matrix.length + ", 30vh)";
    node.style.gridTemplateColumns = "repeat(" + matrix[0].length + ", 1fr)";
    node.style.width = "100%";

    grid_areas.forEach((area) => {
      const grid_area = document.createElement("div");
      grid_area.setAttribute("id", area);
      grid_area.style.gridArea = area;
      grid_area.setAttribute("class", "dashboard-div");
      node.appendChild(grid_area);
    });

    that.el.appendChild(node);
  }
}
