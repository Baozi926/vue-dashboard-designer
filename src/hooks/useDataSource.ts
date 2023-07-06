import { nextTick, onMounted, ref, watch, type Ref } from "vue";



export function useDataSource(source: Function, onLoaded = (val: any) => {}) {
  const loaded: Ref<boolean> = ref(false);
  let result: any | null = null;

  let getSource =
    typeof source === "function"
      ? source
      : () => {
          return source;
        };

  const onDataSourceChange = () => {
    const source = getSource() as DataSource;
    console.log("data source changed");

    switch (source?.type) {
      case "static":
        result =
          source.value && typeof source.value === "string"
            ? JSON.parse(source.value)
            : source.value;
        loaded.value = true;
        onLoaded(result);
        break;
      case "url":
        if (source.value) {
          fetch(source.value).then((res) => {
            res.json().then((json) => {
              result = json;
              loaded.value = true;

              nextTick(() => {
                onLoaded(result);
              });
            });
          });
        } else {
          console.error("source is invalid", source);
        }
        break;
      default:
        break;
    }
  };

  watch(
    getSource,
    () => {
      onDataSourceChange();
    },
    {}
  );

  onMounted(() => {
    onDataSourceChange();
  });

  return { result };
}
