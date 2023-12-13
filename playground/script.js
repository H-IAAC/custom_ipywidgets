import { barplot } from "../custom-ipywidgets/js/lib/graphs/barplot.js";

const data = [
  { x: "A", y: 1, sex: "male" },
  { x: "B", y: 5, sex: "male" },
  { x: "C", y: 4, sex: "female" },
  { x: "A", y: 8, sex: "female" },
  { x: "B", y: 3, sex: "male" },
  { x: "C", y: 2, sex: "male" },
  { x: "B", y: 7, sex: "female" },
  { x: "C", y: 6, sex: "female" },
  { x: "A", y: 9, sex: "female" },
  { x: "B", y: 2, sex: "male" },
];

const x_axis = "x";
const y_axis = "y";
let hue_axis = "sex";

barplot(
  data,
  x_axis,
  y_axis,
  hue_axis,
  "#d3-container"
)

