import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import ElementPlus from "unplugin-element-plus/vite";
// import dynamicImportVars from "@rollup/plugin-dynamic-import-vars";
// import AutoImport from "unplugin-auto-import/vite";
// import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: ["edge90", "chrome90", "firefox90", "safari15"],
  },
  plugins: [
    vue(),
    ElementPlus({
      // options
    }),
 
  ],
});
