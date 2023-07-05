// import * as Vue from "vue";

export default {
  // component: Vue.defineAsyncComponent(() => import("./DemoChart.vue")),
  name: "DemoChart",
  alias: "测试组件",
  width: 2,
  height: 2,
  source: {
    type: "static",
    value: {
      xAxisData: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      seriesData: [150, 230, 224, 218, 135, 147, 260],
    },
  },
};
