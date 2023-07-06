import { ElInput } from "element-plus";

const editorMap: any = {};

const moduleFilesTs: any = import.meta.glob("./**.vue", {
  eager: true,
});

console.log(moduleFilesTs);

Object.keys(moduleFilesTs).forEach((v) => {
  const component = moduleFilesTs[v].default;
  editorMap[component.__name] = component;
});

export function getEditorComponent(name: string) {
  return editorMap[name] || ElInput;
}
