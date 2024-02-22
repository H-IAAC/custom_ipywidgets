import ipywidgets as widgets
from traitlets import Unicode, List, Float
from ._version import NPM_PACKAGE_RANGE
from .export import export_graph, export_lasso

# See js/lib/example.js for the frontend counterpart to this file.


@widgets.register
class LinearHistPlot(widgets.DOMWidget):
    _view_name = Unicode("LinearHistPlotView").tag(sync=True)
    _model_name = Unicode("LinearHistPlotModel").tag(sync=True)
    _view_module = Unicode("custom-ipywidgets").tag(sync=True)
    _model_module = Unicode("custom-ipywidgets").tag(sync=True)
    _view_module_version = Unicode(NPM_PACKAGE_RANGE).tag(sync=True)
    _model_module_version = Unicode(NPM_PACKAGE_RANGE).tag(sync=True)

    linearData_x = List([]).tag(sync=True)
    linearData_y = List([]).tag(sync=True)
    histogramData = List([]).tag(sync=True)
    element = Unicode().tag(sync=True)
    clickedValue = Unicode().tag(sync=True)

    def export_data(self):
        data = {
            "linearData_x": self.linearData_x,
            "linearData_y": self.linearData_y,
            "histogramData": self.histogramData,
            "element": self.element,
        }

        return {"linearhistplot": data}

    def export(self):
        data = {
            "linearData_x": self.linearData_x,
            "linearData_y": self.linearData_y,
            "histogramData": self.histogramData,
        }

        export_graph("linearhistplot", 1, data)


@widgets.register
class ScatterPlot(widgets.DOMWidget):
    _view_name = Unicode("ScatterPlotView").tag(sync=True)
    _model_name = Unicode("ScatterPlotModel").tag(sync=True)
    _view_module = Unicode("custom-ipywidgets").tag(sync=True)
    _model_module = Unicode("custom-ipywidgets").tag(sync=True)
    _view_module_version = Unicode(NPM_PACKAGE_RANGE).tag(sync=True)
    _model_module_version = Unicode(NPM_PACKAGE_RANGE).tag(sync=True)

    data = List([]).tag(sync=True)
    x = Unicode().tag(sync=True)
    y = Unicode().tag(sync=True)
    hue = Unicode().tag(sync=True)
    element = Unicode().tag(sync=True)
    clickedValue = Unicode().tag(sync=True)
    selectedValues = List([]).tag(sync=True)

    def export_data(self):
        data = {
            "data": self.data,
            "x": self.x,
            "y": self.y,
            "hue": self.hue,
            "element": self.element,
        }

        return {"scatterplot": data}

    def export(self):
        data = {
            "data": self.data,
            "x": self.x,
            "y": self.y,
            "hue": self.hue,
        }

        export_graph("scatterplot", 2, data)
        export_lasso()


@widgets.register
class BarPlot(widgets.DOMWidget):
    _view_name = Unicode("BarPlotView").tag(sync=True)
    _model_name = Unicode("BarPlotModel").tag(sync=True)
    _view_module = Unicode("custom-ipywidgets").tag(sync=True)
    _model_module = Unicode("custom-ipywidgets").tag(sync=True)
    _view_module_version = Unicode(NPM_PACKAGE_RANGE).tag(sync=True)
    _model_module_version = Unicode(NPM_PACKAGE_RANGE).tag(sync=True)

    data = List([]).tag(sync=True)
    x = Unicode().tag(sync=True)
    y = Unicode().tag(sync=True)
    hue = Unicode().tag(sync=True)
    element = Unicode().tag(sync=True)

    def export_data(self):
        data = {
            "data": self.data,
            "x": self.x,
            "y": self.y,
            "hue": self.hue,
            "element": self.element,
        }

        return {"barplot": data}

    def export(self):
        data = {
            "data": self.data,
            "x": self.x,
            "y": self.y,
            "hue": self.hue,
        }

        export_graph("barplot", 1, data)

    def linkData(self, widget, widgetAttr):
        def callback(change):
            self.data = getattr(widget, widgetAttr)

        widget.observe(callback, names=[widgetAttr])


@widgets.register
class HistogramPlot(widgets.DOMWidget):
    _view_name = Unicode("HistogramPlotView").tag(sync=True)
    _model_name = Unicode("HistogramPlotModel").tag(sync=True)
    _view_module = Unicode("custom-ipywidgets").tag(sync=True)
    _model_module = Unicode("custom-ipywidgets").tag(sync=True)
    _view_module_version = Unicode(NPM_PACKAGE_RANGE).tag(sync=True)
    _model_module_version = Unicode(NPM_PACKAGE_RANGE).tag(sync=True)

    data = List([]).tag(sync=True)
    x = Unicode().tag(sync=True)
    start = Float().tag(sync=True)
    end = Float().tag(sync=True)
    element = Unicode().tag(sync=True)

    def export_data(self):
        data = {
            "data": self.data,
            "x": self.x,
            "start": self.start,
            "end": self.end,
            "element": self.element,
        }

        return {"histogramplot": data}

    def export(self):
        data = {
            "data": self.data,
            "x": self.x,
            "start": self.start,
            "end": self.end,
        }

        export_graph("histogramplot", 1, data)
