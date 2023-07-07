<template>
  <el-tabs @tab-change="onTabChange" v-model="activeTabName" class="tabs">
    <el-tab-pane class="tab-panel" label="基础组件" name="component">
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
              @dragstart="dragstart(item)"
              @drag="drag"
              @dragend="dragend"
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
    </el-tab-pane>
    <el-tab-pane class="tab-panel" label="组件超市" name="market">
      <div
        class="component-wrapper"
        :key="item.name"
        v-for="item in shareComponentList"
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
              @dragstart="dragstart(item)"
              @drag="drag"
              @dragend="dragend"
            >
              <WidgetRenderer :component="item"></WidgetRenderer>
              <!-- <component
                class="droppable-element"
                :source="item?.source"
                v-bind=""
                :stylesheet="item?.stylesheet"
                :is="getComponent(item.name)"
              ></component> -->
            </div>
          </el-tooltip>
        </div>
      </div>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup>
import { ElTooltip } from "element-plus";
import { ElTabs, ElTabPane } from "element-plus";
import WidgetRenderer from "../WidgetRenderer.vue";
import {
  getComponentList,
  getComponent,
} from "../../../components/ComponentExport";
import { reactive, toRefs, onMounted } from "vue";

import { fetchShareComponents } from "../../../api/components";

const data = reactive({
  activeTabName: "component",
  shareComponentList: [],
});

const emits = defineEmits(["dragstart", "drag", "dragend"]);

onMounted(() => {});

function onTabChange(val) {
  if (val === "market") {
    fetchShareComponents().then((res) => {
      data.shareComponentList = res;
    });
  }
}

function dragstart(evt) {
  emits("dragstart", evt);
}

function drag(evt) {
  emits("drag", evt);
}

function dragend(evt) {
  emits("dragend", evt);
}

const { activeTabName, shareComponentList } = toRefs(data);
</script>
<style lang="scss" scoped>
.tabs {
  :deep(.el-tabs__nav-scroll) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tab-panel {
    padding: 10px;
  }
}
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
