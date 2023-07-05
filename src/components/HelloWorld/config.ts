// import * as Vue from "vue";

export default {
  // component: Vue.defineAsyncComponent(() => import("./HelloWorld.vue")),
  name: "HelloWorld",
  alias: "测试图表",
  width: 4,
  height: 5,
  properties: [
    {
      name: "title",
      alias: "文字",
      value: "title:",
    },
  ],
  source: {
    type: "static",
    value: { text: "hello world" },
  },
};
