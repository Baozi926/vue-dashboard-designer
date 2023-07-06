import "./mock/mock";
import { createApp } from "vue";

import App from "./App.vue";
import Directive from "./plugins/directive";
import router from "./router/router";

// import VueGridLayout from "vue-grid-layout";

import "./style.css";

const app = createApp(App);

app.use(Directive);
app.use(router);

// app.use(VueGridLayout);

app.mount("#app");
