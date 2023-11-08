import { DOMWidgetModel, DOMWidgetView } from "@jupyter-widgets/base";
import { linearhistplot } from './graphs/linearhistplot';
import { scatterplot } from './graphs/scatterplot';
const data = require('../../package.json');

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

    var linearData_x = this.model.get('linearData_x');
    var linearData_y = this.model.get('linearData_y');
    var histogramData = this.model.get('histogramData');
    linearhistplot(
      linearData_x,
      linearData_y,
      histogramData,
      this.el,
      this.setValue
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
      clickedValue: String,
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

    var data = this.model.get('data');
    var x = this.model.get('x');
    var y = this.model.get('y');
    var hue = this.model.get('hue');

    scatterplot(
      data,
      x,
      y,
      hue,
      this.setValue,
      that,
      that.el
    );
  }

  setValue(text, that) {
    that.model.set({ clickedValue: text });
    that.model.save_changes();
  }
}