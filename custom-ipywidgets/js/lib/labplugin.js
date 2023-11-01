import {LinearHistPlotModel, LinearHistPlotView, ScatterPlotModel, ScatterPlotView, version} from './index';
import {IJupyterWidgetRegistry} from '@jupyter-widgets/base';

export const helloWidgetPlugin = {
  id: 'custom-ipywidgets:plugin',
  requires: [IJupyterWidgetRegistry],
  activate: function(app, widgets) {
      widgets.registerWidget({
          name: 'custom-ipywidgets',
          version: version,
          exports: { LinearHistPlotModel, LinearHistPlotView, ScatterPlotModel, ScatterPlotView }
      });
  },
  autoStart: true
};

export default helloWidgetPlugin;
