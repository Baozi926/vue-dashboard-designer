// import * as Vue from "vue";

export default {
  name: "BarChart",
  alias: "折线图",
  width: 2,
  height: 2,
  properties: [
    {
      name: "title",
      alias: "标题",
      value: "标题",
    },
  ],
  source: {
    type: "static",
    value: {
      xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      seriesData: [150, 230, 224, 218, 135, 147, 260],
    },
  },
  stylesheet: [
  ],
} as MyComponent;
