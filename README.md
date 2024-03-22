# custom_ipywidgets

## Requisitos

- Node.js
- Yarn

## Tutorial de instalação

- Criar ambiente virtual
- pip install -r requirements.txt
- cd custom-ipywidgets
- pip install -e .
- cd js
- npm install
- cd ..
- Para notebook rodar:
```console
    $ jupyter nbextension install --py --symlink --sys-prefix custom_ipywidgets
    $ jupyter nbextension enable --py --sys-prefix custom_ipywidgets
```
- Para jupyterlab rodar:
```console
    $ jupyter labextension develop --overwrite custom_ipywidgets
```