import * as Vue from "vue";

const componentMap: any = {};

const componentsMeta: MyComponent[] = [];

const moduleConfigs: any = import.meta.glob("./**/config.ts", {
  eager: true,
});

const modules = import.meta.glob("./**/*.vue");

Object.keys(moduleConfigs).forEach((key: string) => {
  const componentOptions = moduleConfigs[key]?.default;

  const componentPath =
    key.replace("config.ts", componentOptions.name) + ".vue";

  const moduleKey = Object.keys(modules).find((modulePath) => {
    return modulePath === componentPath;
  });

  if (moduleKey) {
    const component = modules[moduleKey];
    componentMap[componentOptions.name] = Vue.defineAsyncComponent(component);
  }

  componentsMeta.push(componentOptions);
});

export function getComponentList() {
  return componentsMeta;
}

export function getComponent(name: string) {
  return componentMap[name];
}
