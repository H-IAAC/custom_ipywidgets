import { DOMWidgetModel, DOMWidgetView } from "@jupyter-widgets/base";
import { linearhistplot } from './graphs/linearhistplot';
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

  static model_name = "ScatterplotModel";
  static model_module = data.name;
  static model_module_version = data.version;
  static view_name = "ScatterplotView"; // Set to null if no view
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
