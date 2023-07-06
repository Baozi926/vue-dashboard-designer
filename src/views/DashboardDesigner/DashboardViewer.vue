<script setup lang="ts">
import { ref, onMounted } from "vue";
import { GridLayout } from "grid-layout-plus";
import "element-plus/es/components/message/style/css";
import { useRouter } from "vue-router";
import WidgetRenderer from "./WidgetRenderer.vue";
import { useLocalStore } from "../../hooks/useLocalStore";

// const CONFIG_ID = "dashboard-id";

const localStore = useLocalStore("dashboard");

const layout = ref<any[]>([]);

const router = useRouter();

const id = router.currentRoute.value.params.id as string;

console.log("id", id);

onMounted(() => {
  localStore.getItem(id).then((res: any) => {
    if (res.name) {
      document.title = res.name;
    }

    if (res && Array.isArray(res.layout)) {
      layout.value = res.layout.map((v: any) => {
        return {
          ...v,
          static: true,
        };
      });
    }
  });
});
</script>

<template>
  <GridLayout ref="gridLayout" v-model:layout="layout" :row-height="30">
    <template #item="{ item }">
      <WidgetRenderer :component="item.component"></WidgetRenderer>
    </template>
  </GridLayout>
</template>

<style scoped lang="scss">
.dashboard-design-container {
  height: 100%;
  width: 100%;
  overflow: hidden;
  padding: 0px;
  margin: 0;
  .design-header {
    display: flex;
    align-items: center;
    flex-direction: row;
    box-shadow: rgba(6, 30, 53, 0.1) 0px 1px 0 0;
    border-bottom: 1px solid #ebecee;
  }
}

.vgl-layout {
  background-color: #eee;
}

:deep(.vgl-item:not(.vgl-item--placeholder)) {
  background-color: #fff;
  /* border: 1px solid black; */
  box-shadow: rgba(6, 30, 53, 0.1) 0px 1px 2px 1px;
  border-radius: 8px;
  overflow: hidden;
}

:deep(.vgl-item--resizing) {
  opacity: 90%;
}

:deep(.vgl-item--static) {
  background-color: #cce;
}

.text {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  margin: auto;
  font-size: 24px;
  text-align: center;
}

.layout-json {
  padding: 10px;
  margin-top: 10px;
  background-color: #ddd;
  border: 1px solid black;
}

.columns {
  columns: 120px;
}

.droppable-element {
  width: 150px;
  max-height: 100px;
  padding: 10px;
  margin: 10px 0;
  text-align: center;
  // background-color: #fdd;
  // border: 1px solid black;
  max-width: 150px;

  box-shadow: rgba(6, 30, 53, 0.1) 0px 1px 2px 1px;
  border-radius: 8px;
}
</style>
