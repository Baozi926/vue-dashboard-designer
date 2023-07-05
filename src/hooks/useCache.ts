import localforage from "localforage";
const store = localforage.createInstance({
  name: "cache_1",
});

type Cache = {
  data: any;
  timestamp: number;
};

/**
 *
 * 按照时间缓存数据
 *
 */
export function useCache(id: string, fetchData = () => {}, sec: number) {
  async function getData() {
    const item: Cache | null = await store.getItem(id);

    const now = new Date().getTime();

    if (item && now - item.timestamp < sec * 1000 && item.data) {
      return item.data;
    }

    const data = await fetchData();

    await store.setItem(id, {
      timestamp: now,
      data: data,
    });

    return data;
  }

  return { getData };
}
