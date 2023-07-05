import { nextTick, onMounted, ref, type Ref } from "vue";

type DataSource = {
  type: "static" | "url";
  value: string;
};

export function useDataSource(source: DataSource, onLoaded = (val: any) => {}) {
  const loaded: Ref<boolean> = ref(false);

  const result: Ref<any> = ref(null);

  switch (source?.type) {
    case "static":
      result.value =
        source.value && typeof source.value === "string"
          ? JSON.parse(source.value)
          : source.value;
      loaded.value = true;
      onMounted(() => {
        nextTick(() => {
          onLoaded(result);
        });
      });

      break;
    case "url":
      onMounted(() => {
        if (source.value) {
          fetch(source.value).then((res) => {
            res.json().then((json) => {
              result.value = json;
              loaded.value = true;

              nextTick(() => {
                onLoaded(result);
              });
            });
          });
        } else {
          console.error("source is invalid", source);
        }
      });
      break;
    default:
      break;
  }

  return { result };
}
