# custom-ipywidgets

A Custom Jupyter Widget Library

## Installation

To install use pip:

    $ pip install custom_ipywidgets

For a development installation (requires [Node.js](https://nodejs.org) and [Yarn version 1](https://classic.yarnpkg.com/)),

    $ git clone https://github.com/HIAAC/custom-ipywidgets.git
    $ cd custom-ipywidgets
    $ pip install -e .
    $ jupyter nbextension install --py --symlink --overwrite --sys-prefix custom_ipywidgets
    $ jupyter nbextension enable --py --sys-prefix custom_ipywidgets

When actively developing your extension for JupyterLab, run the command:

    $ jupyter labextension develop --overwrite custom_ipywidgets

Then you need to rebuild the JS when you make a code change:

    $ cd js
    $ yarn run build

You then need to refresh the JupyterLab page when your javascript changes.
