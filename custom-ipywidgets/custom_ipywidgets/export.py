import os
import simplejson as json


def export_graph(graph_name, delete_lines, data):
    absolute_path = os.path.dirname(__file__)
    relative_path = "../js/lib/graphs/" + graph_name + ".js"
    read_file_path = os.path.join(absolute_path, relative_path)

    if not os.path.exists("export"):
        os.makedirs("export")

    with open(read_file_path) as read_file, open(
        "export/script.js", "w"
    ) as write_file:
        write_file.write(write_js(graph_name, data.keys()))
        write_file.write("\n")
        lines = read_file.readlines()
        for _ in range(delete_lines):
            lines.pop(0)
        for line in lines:
            write_file.write(line)

    with open("export/data.json", "w") as write_file:
        json_data = json.dumps(data, ignore_nan=True)
        write_file.write(json_data)

    with open("export/index.html", "w") as write_file:
        write_file.write(write_html())

    relative_css_path = "../js/css/widget.css"
    css_file_path = os.path.join(absolute_path, relative_css_path)
    with open(css_file_path) as read_file, open("export/style.css", "w") as write_file:
        lines = read_file.readlines()
        for line in lines:
            write_file.write(line)


def export_lasso():
    absolute_path = os.path.dirname(__file__)
    relative_path = "../js/lib/tools/lasso.js"
    read_file_path = os.path.join(absolute_path, relative_path)

    if not os.path.exists("export"):
        os.makedirs("export")
    with open(read_file_path) as read_file, open("export/script.js", "a") as write_file:
        lines = read_file.readlines()
        lines.pop(0)
        write_file.write("\n")
        for line in lines:
            write_file.write(line)


def write_js(graph_name, data_keys):
    parameters = ""
    for key in data_keys:
        parameters = parameters + "data." + key + ", "

    return """
async function run() {{
  var data = await d3.json(\"data.json\");
  {graph_name}({parameters}\"#d3-container\");
}}

run();
    """.format(
        graph_name=graph_name, parameters=parameters
    )


def write_html():
    return """<!DOCTYPE html>
<html lang=\"en\">
  <head>
    <meta charset=\"UTF-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">
    <link rel=\"stylesheet\" href=\"style.css\">
    <script src=\"https://d3js.org/d3.v7.js\"></script>
  </head>
  <body>
    <div id=\"d3-container\"></div>
    <script src=\"script.js\" type=\"module\"></script>
  </body>
</html>
"""
