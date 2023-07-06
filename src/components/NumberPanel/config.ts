// import * as Vue from "vue";

export default {
  // component: Vue.defineAsyncComponent(() => import("./NumberPanel.vue")),
  name: "NumberPanel",
  alias: "数字面板",
  width: 2,
  height: 2,
  properties: [
    {
      alias: "标题",
      name: "title",
      type: "input",
    },
  ],
  source: {
    type: "static",
    value: { num: 99 },
  },
  stylesheet: [
    {
      name: "--background",
      value:
        "linear-gradient(101deg, rgba(235, 29, 78, 1) 1%, rgba(245, 81, 30, 1) 100%)",
      alias: "背景颜色",
      editor: "ColorEditor",
    },
    {
      name: "--color",
      value: "rgb(10, 51, 92)",
      alias: "文字颜色",
      editor: "ColorEditor",
    },
  ],
} as MyComponent;
