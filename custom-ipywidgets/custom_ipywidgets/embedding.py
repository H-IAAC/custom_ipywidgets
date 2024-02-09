import random
import string

import ipywidgets as widgets
from traitlets import Float, List, Unicode

from ._version import NPM_PACKAGE_RANGE
from IPython.display import display


@widgets.register
class Embedding(widgets.DOMWidget):
    _view_name = Unicode("EmbeddingView").tag(sync=True)
    _model_name = Unicode("EmbeddingModel").tag(sync=True)
    _view_module = Unicode("custom-ipywidgets").tag(sync=True)
    _model_module = Unicode("custom-ipywidgets").tag(sync=True)
    _view_module_version = Unicode(NPM_PACKAGE_RANGE).tag(sync=True)
    _model_module_version = Unicode(NPM_PACKAGE_RANGE).tag(sync=True)

    matrix = List().tag(sync=True)
    grid_areas = List().tag(sync=True)
    grid_template_areas = Unicode().tag(sync=True)

    def __init__(self, matrix, **kwargs):
        self._check_matrix_format(matrix)
        self.matrix = matrix

        self.positions_hashs = {}
        self.grid_areas = []
        for num in self.all_numbers:
            random_string = "".join(
                random.choice(string.ascii_letters) for i in range(10)
            )
            self.positions_hashs[num] = random_string
            self.grid_areas.append(random_string)

        self.grid_template_areas = ""
        for row in matrix:
            self.grid_template_areas = self.grid_template_areas + '\n"'
            for num in row:
                self.grid_template_areas = (
                    self.grid_template_areas + self.positions_hashs[num] + " "
                )
            self.grid_template_areas = self.grid_template_areas + '"'
        super().__init__(**kwargs)

    def _check_matrix_format(self, matrix):
        def not_list_of_lists():
            raise Exception("Matrix format must be a list of lists of integers")

        if any([type(row) is not list for row in matrix]):
            not_list_of_lists()
        self.all_numbers = []
        for row in matrix:
            for item in row:
                if type(item) is not int:
                    not_list_of_lists()
                if item < 0:
                    raise Exception("All integers must be positives")
                if not item in self.all_numbers:
                    self.all_numbers.append(item)

        first_row_len = len(matrix[0])
        if any([len(row) != first_row_len for row in matrix]):
            raise Exception("All rows must have the same size")

        self.all_numbers.sort()
        for i in range(1, len(self.all_numbers)):
            if self.all_numbers[i] - self.all_numbers[i - 1] != 1:
                raise Exception("All numbers must be in sequence.")

        self._check_if_has_only_rects(matrix)

    def _check_if_has_only_rects(self, matrix):
        def not_rects():
            raise Exception("Matrix must contain only unduplicate rectangles.")

        all_positions = {}

        for i in range(len(matrix)):
            row = matrix[i]
            for j in range(len(row)):
                item = row[j]
                position = (i, j)
                if not item in all_positions.keys():
                    all_positions[item] = []
                all_positions[item].append(position)

        for num in all_positions.keys():
            rows = {}
            num_positions = all_positions[num]
            num_positions.sort()
            for position in num_positions:
                if not position[0] in rows.keys():
                    rows[position[0]] = []
                rows[position[0]].append(position[1])
            # Check if there are numbers outside the rectangle
            first_row = list(rows.keys())[0]
            for i in range(1, len(rows[first_row])):
                if rows[first_row][i] - rows[first_row][i - 1] != 1:
                    not_rects()
            rows_keys = list(rows.keys())
            for i in range(1, len(rows_keys)):
                if rows_keys[i] - rows_keys[i - 1] != 1:
                    not_rects()
                if len(rows[rows_keys[i]]) != len(rows[first_row]):
                    not_rects()
                if rows[rows_keys[i]][0] != rows[first_row][0]:
                    not_rects()
                if rows[rows_keys[i]][-1] != rows[first_row][-1]:
                    not_rects()

    def add(self, widget, position: int):
        widget.element = self.positions_hashs[position]
        display(widget)