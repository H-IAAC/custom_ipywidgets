# custom_ipywidgets

## Requisitos

- Node.js
- Yarn

## Tutorial de instalação

- Criar ambiente virtual
- cd custom-ipywidgets
- pip install -e .
- cd js
- npm install
- cd ..
- Para notebook rodar:
```console
    $ pip install --upgrade notebook==6.4.12
    $ pip install traitlets==5.9.0
    $ jupyter nbextension install --py --symlink --sys-prefix custom_ipywidgets
    $ jupyter nbextension enable --py --sys-prefix custom_ipywidgets
```
- Para jupyterlab rodar:
```console
    $ pip install jupyterlab
    $ jupyter labextension develop --overwrite custom_ipywidgets
```
- Para testar, criar notebook e rodar:
```python
    import custom_ipywidgets
    custom_ipywidgets.HelloWorld()