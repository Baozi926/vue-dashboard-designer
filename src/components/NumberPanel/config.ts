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
    }
  ],
  source: {
    type: "static",
    value: { num: 99 },
  },
};
