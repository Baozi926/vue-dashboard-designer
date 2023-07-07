import * as localforage from "localforage";
import { deelCloneJson, uuid } from "../utils/common";

const store = localforage.createInstance({
  name: "components",
});

export async function shareComponent(component: MyComponent) {
  await store.setItem(uuid(), deelCloneJson(component));
  return true;
}

export async function fetchShareComponents() {
  const keys = await store.keys();

  const promises = keys.map((v) => {
    return store.getItem(v);
  });

  const all = await Promise.all(promises);
  return all;
}
