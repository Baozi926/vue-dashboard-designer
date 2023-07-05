import { onBeforeMount } from "vue";
import localforage from "localforage";

export function useLocalStore(name: string) {
  let store: LocalForage;

  onBeforeMount(() => {
    store = localforage.createInstance({
      name: name || "dashboard",
    });
  });

  function setItem(id: string, data: any) {
    if (!store) {
      throw new Error("store is null");
    }
    return store.setItem(id, data);
  }

  function getItem(id: string) {
    return store.getItem(id);
  }

  async function getList() {
    const keys = await store.keys();

    const promises = keys.map((v) => {
      return store.getItem(v);
    });

    const all = await Promise.all(promises);
    return all;
  }

  return { setItem, getItem, getList };
}
