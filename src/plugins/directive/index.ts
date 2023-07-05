import type { App } from "vue";

import ResizeDomDirective from "./ResizeDomDirective";

export default {
  install(app: App) {
    app.directive("resize", ResizeDomDirective);
  },
};
