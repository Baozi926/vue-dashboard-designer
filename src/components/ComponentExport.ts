import * as Vue from "vue";

const componentMap: any = {};

const componentsMeta: any[] = [];

const moduleFilesTs: any = import.meta.glob("./**/config.ts", {
  eager: true,
});

Object.keys(moduleFilesTs).forEach((key: string) => {
  const componentOptions = moduleFilesTs[key]?.default;

  const componentPath =
    key.replace("config.ts", componentOptions.name) + ".vue";

  componentMap[componentOptions.name] = Vue.defineAsyncComponent(
    () => import(componentPath)
  );

  componentsMeta.push(componentOptions);
});

export function getComponentList() {
  return componentsMeta;
}

export function getComponent(name: string) {
  return componentMap[name];
}
