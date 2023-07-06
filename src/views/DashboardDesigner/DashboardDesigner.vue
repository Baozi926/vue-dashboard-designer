<script setup lang="ts">
import {
  ref,
  onMounted,
  onBeforeUnmount,
  nextTick,
  toRefs,
  reactive,
} from "vue";
import { useRouter } from "vue-router";
import WidgetWrapper from "./WidgetWrapper.vue";
import { deelCloneJson, uuid } from "../../utils/common";
import { Delete, Monitor, DocumentAdd ,BrushFilled} from "@element-plus/icons-vue";

import {
  ElMessageBox,
  ElInput,
  ElTooltip,
  ElAside,
  ElMain,
  ElContainer,
  ElHeader,
  ElButton,
  ElMessage,
  // ElTooltip
  // ElTooltip
} from "element-plus";

import PropertiesPanel from "./PropertiesPanel/PropertiesPanel.vue";
import { throttle } from "@vexip-ui/utils";

import { GridLayout } from "grid-layout-plus";
import "element-plus/es/components/message/style/css";

import {
  getComponentList,
  getComponent,
} from "../../components/ComponentExport";
import { useLocalStore } from "../../hooks/useLocalStore";
import WidgetRenderer from "./WidgetRenderer.vue";

const CONFIG_ID = "dashboard-id";

const router = useRouter();

const activeItem: any = ref(null);

const appName = ref("");

function getAppId() {
  const id = router.currentRoute.value.params.id as string;
  return id || CONFIG_ID;
}

function setActiveItem(item: any, evt: MouseEvent) {
  if (evt) {
    evt.stopPropagation();
  }

  activeItem.value = item;
  console.log("activeItem", activeItem.value, activeItem.value.i);
}

const localStore = useLocalStore("dashboard");

async function saveConfig() {
  const data = JSON.parse(JSON.stringify(layout.value));
  console.log("config", data);
  await localStore.setItem(getAppId(), {
    name: appName.value,
    layout: data,
    id: getAppId(),
    timestamp: new Date().getTime(),
  });

  ElMessage.success("保存成功！");
}

let draggingItem: any = null;

const onDragStart = (item) => {
  draggingItem = item;
};

const data = reactive({
  layout: [
    {
      x: 0,
      y: 0,
      w: 2,
      h: 2,
      i: "0",
      static: false,
    },
  ],
});

const { layout } = toRefs(data);

function clear() {
  ElMessageBox.confirm("是否要清空所有内容", "警告", {
    confirmButtonText: "清空",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      layout.value = [];
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "清空取消",
      });
    });
}

const wrapper = ref<HTMLElement>();
const gridLayout = ref<InstanceType<typeof GridLayout>>();

onMounted(() => {
  document.addEventListener("dragover", syncMousePosition);

  localStore.getItem(getAppId()).then((res: any) => {
    appName.value = res?.name || "未命名";
    if (res && Array.isArray(res.layout)) {
      layout.value = res.layout.map((v: any) => {
        return {
          ...v,
          i: v.i || uuid(),
        };
      });

      console.log("config", res);
    } else {
      layout.value = [];
    }
  });
});

onBeforeUnmount(() => {
  document.removeEventListener("dragover", syncMousePosition);
});

const mouseAt = { x: -1, y: -1 };

function syncMousePosition(event: MouseEvent) {
  mouseAt.x = event.clientX;
  mouseAt.y = event.clientY;
}

const dropId = "drop" + uuid();
const dragItem = { x: -1, y: -1, w: 2, h: 2, i: "" };

const drag = throttle(() => {
  const parentRect = wrapper.value?.getBoundingClientRect();

  if (!parentRect || !gridLayout.value) return;

  const mouseInGrid =
    mouseAt.x > parentRect.left &&
    mouseAt.x < parentRect.right &&
    mouseAt.y > parentRect.top &&
    mouseAt.y < parentRect.bottom;

  if (mouseInGrid && !layout.value.find((item) => item.i === dropId)) {
    layout.value.push({
      x: (layout.value.length * 2) % 12,
      y: layout.value.length + 12, // puts it at the bottom
      w: 2,
      h: 2,
      i: dropId,
    });
  }

  const index = layout.value.findIndex((item) => item.i === dropId);

  if (index !== -1) {
    const item = gridLayout.value.getItem(dropId);

    if (!item) return;

    try {
      item.wrapper.style.display = "none";
    } catch (e) {}

    Object.assign(item.state, {
      top: mouseAt.y - parentRect.top,
      left: mouseAt.x - parentRect.left,
    });
    const newPos = item.calcXY(
      mouseAt.y - parentRect.top,
      mouseAt.x - parentRect.left
    );

    if (mouseInGrid) {
      gridLayout.value.dragEvent(
        "dragstart",
        dropId,
        newPos.x,
        newPos.y,
        dragItem.h,
        dragItem.w
      );
      dragItem.i = String(index);
      dragItem.x = layout.value[index].x;
      dragItem.y = layout.value[index].y;
    } else {
      gridLayout.value.dragEvent(
        "dragend",
        dropId,
        newPos.x,
        newPos.y,
        dragItem.h,
        dragItem.w
      );
      layout.value = layout.value.filter((item) => item.i !== dropId);
    }
  }
});

function dragEnd() {
  const parentRect = wrapper.value?.getBoundingClientRect();

  if (!parentRect || !gridLayout.value) return;

  const mouseInGrid =
    mouseAt.x > parentRect.left &&
    mouseAt.x < parentRect.right &&
    mouseAt.y > parentRect.top &&
    mouseAt.y < parentRect.bottom;

  if (mouseInGrid) {
    gridLayout.value.dragEvent(
      "dragend",
      dropId,
      dragItem.x,
      dragItem.y,
      dragItem.h,
      dragItem.w
    );
    layout.value = layout.value.filter((item) => item.i !== dropId);
  } else {
    return;
  }

  layout.value.push({
    x: dragItem.x,
    y: dragItem.y,
    w: dragItem.w,
    h: dragItem.h,
    i: uuid(),
    component: deelCloneJson(draggingItem),
  });

  draggingItem = null;
  gridLayout.value.dragEvent(
    "dragend",
    dragItem.i,
    dragItem.x,
    dragItem.y,
    dragItem.h,
    dragItem.w
  );

  const item = gridLayout.value.getItem(dropId);

  if (!item) return;

  try {
    item.wrapper.style.display = "";
  } catch (e) {}
}

let isPreview = ref(false);

function togglePreview() {
  const route = router.resolve({
    name: "viewer",
    params: {
      id: getAppId(),
    },
  });

  window.open(route.href);
}

function onSourceChange(target: any) {
  const find = layout.value.find((v) => {
    return v.i === target.i;
  });

  nextTick(() => {
    find.component = deelCloneJson(target.component);
  });
}

function deleteWidget(widget: any) {
  if (!widget) {
    return;
  }

  layout.value = layout.value.filter((v) => {
    return v.i !== widget.i;
  });
}

function deleteActiveWidget() {
  deleteWidget(activeItem.value);
  activeItem.value = null;
}
</script>

<template>
  <div class="dashboard-design-container">
    <el-container style="height: 100%; overflow-y: hidden">
      <el-header class="design-header">
        <div class="row">
          <div class="start">
            <el-input v-model="appName" placeholder="应用名称" />
          </div>
          <div class="main">
            <el-button :icon="Monitor" @click="togglePreview">{{
              isPreview ? "编辑" : "预览"
            }}</el-button>
            <el-button :icon="DocumentAdd" @click="saveConfig">保存</el-button>
            <el-button :icon="BrushFilled" @click="clear">清空</el-button>
          </div>
          <div class="end">
            <el-button :icon="Delete" @click="deleteActiveWidget"
              >删除</el-button
            >
          </div>
        </div>
      </el-header>
      <el-main style="padding: 0">
        <el-container style="height: 100%; overflow-y: hidden">
          <el-aside class="a-side left" width="200px">
            <div
              class="component-wrapper"
              :key="item.name"
              v-for="item in getComponentList()"
            >
              <div class="flex-c">
                <el-tooltip
                  class="box-item"
                  :content="item.alias"
                  effect="dark"
                  placement="right"
                >
                  <!-- <div class="alias">{{ item.alias }}</div> -->
                  <div
                    class="droppable-element-wrapper"
                    draggable="true"
                    unselectable="on"
                    @dragstart="onDragStart(item)"
                    @drag="drag"
                    @dragend="dragEnd"
                  >
                    <component
                      class="droppable-element"
                      :source="item?.source"
                      :stylesheet="item?.stylesheet"
                      :is="getComponent(item.name)"
                    ></component>
                  </div>
                </el-tooltip>
              </div>
            </div>
          </el-aside>
          <el-main style="overflow-y: auto; padding: 0">
            <div
              style="overflow-y: auto"
              @click="
                () => {
                  activeItem = null;
                }
              "
              ref="wrapper"
            >
              <GridLayout
                ref="gridLayout"
                v-model:layout="layout"
                style="min-height: 70vh"
                :row-height="30"
              >
                <template #item="{ item }">
                  <WidgetWrapper
                    :active="activeItem && activeItem.i === item.i"
                    @click="
                      (evt) => {
                        setActiveItem(item, evt);
                      }
                    "
                  >
                    <WidgetRenderer
                      mode="edit"
                      :widgetId="item.id"
                      :component="item.component"
                    ></WidgetRenderer>
                  </WidgetWrapper>
                </template>
              </GridLayout>
            </div>
          </el-main>
          <el-aside class="a-side right" width="300px">
            <PropertiesPanel
              @souce-change="onSourceChange"
              v-if="activeItem && activeItem.component"
              :item="activeItem"
            ></PropertiesPanel>
            <div
              style="
                height: 100%;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
              "
              v-else
            >
              请选择一个组件
            </div>
          </el-aside>
        </el-container>
      </el-main>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.row {
  display: flex;
  flex-direction: row;
  width: 100%;
  align-items: center;

  .end {
    margin-left: auto;
  }
}

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
    .main {
      margin-left: 50px;
    }
  }
  .a-side.right {
    border-left: 1px solid #ebecee;
    padding: 0;
    margin: 0;
  }
  .a-side.left {
    height: 100%;
    // width: 100%;
    border-right: 1px solid #ebecee;
    overflow-y: auto;
    .flex-c {
     
      padding: 0;
      margin: 0;
      display: flex;
      flex-direction: column;
      align-items: center;
      .component-wrapper {
        .droppable-element-wrapper {
          cursor: pointer;
        }
        .alias {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        margin-bottom: 5px;
        margin-top: 5px;
        // border-bottom: 1px dashed #838384;
      }
    }
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
.droppable-element-wrapper {
  width: 150px;
  height: 80px;
  overflow: hidden;
  box-shadow: rgba(6, 30, 53, 0.1) 0px 1px 2px 1px;

  margin: 10px;
  border-radius: 8px;
  .droppable-element {
    user-select: none;
    // padding: 10px;
    // margin: 10px 0;
    text-align: center;
    // background-color: #fdd;
    // border: 1px solid black;
    // max-width: 150px;
    // min-width: 150px;

    border-radius: 8px;
  }
}
</style>
