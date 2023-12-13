import {
  LinearHistPlotModel,
  LinearHistPlotView,
  ScatterPlotModel,
  ScatterPlotView,
  BarPlotModel,
  BarPlotView,
  HistogramPlotModel,
  HistogramPlotView,
  version,
} from "./index";
import { IJupyterWidgetRegistry } from "@jupyter-widgets/base";

export const helloWidgetPlugin = {
  id: "custom-ipywidgets:plugin",
  requires: [IJupyterWidgetRegistry],
  activate: function (app, widgets) {
    widgets.registerWidget({
      name: "custom-ipywidgets",
      version: version,
      exports: {
        LinearHistPlotModel,
        LinearHistPlotView,
        ScatterPlotModel,
        ScatterPlotView,
        BarPlotModel,
        BarPlotView,
        HistogramPlotModel,
        HistogramPlotView,
      },
    });
  },
  autoStart: true,
};

export default helloWidgetPlugin;
