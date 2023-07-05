<template>
  <el-tabs v-model="activeTabName" class="tabs">
    <el-tab-pane class="tab-panel" label="属性" name="properties">
      <el-form @submit.native.prevent label-width="80px">
        <el-form-item v-for="item in properties" :label="item.alias">
          <el-input v-model="item.value" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane class="tab-panel" label="样式" name="style">TODO</el-tab-pane>
    <el-tab-pane class="tab-panel" label="数据源" name="source">
      <el-radio-group v-model="dataSouceType" class="ml-4">
        <el-radio label="static" size="large">静态数据</el-radio>
        <el-radio label="url" size="large">远程服务</el-radio>
      </el-radio-group>

      <template v-if="component.source">
        <div class="center-panel" v-if="dataSouceType === 'static'">
          <!-- <div>静态数据源</div> -->
          <el-input
            v-if="component.source.type === 'static'"
            v-model="staticSourceValue"
            :rows="4"
            type="textarea"
            placeholder="配置数据源"
          />
          <ElButton style="margin-top: 10px; width: 100px" @click="applaySource"
            >应用</ElButton
          >
        </div>
        <div class="center-panel" v-else-if="dataSouceType === 'url'">
          <!-- <div>远程服务</div> -->
          <div>TODO</div>
        </div>
      </template>
    </el-tab-pane>
  </el-tabs>
</template>
<script setup lang="ts">
import { computed, ref, toRef, toRefs, watch } from "vue";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElTabs,
  ElTabPane,
  ElButton,
  ElRadioGroup,
  ElRadio,
} from "element-plus";

const emits = defineEmits(["souceChange"]);

const activeTabName = ref("properties");

const dataSouceType = ref("static");

const props: { item: any } = defineProps({
  item: {
    required: true,
    default() {
      return null;
    },
  },
});

console.log("props", props);

// const item: any = computed({
//   get() {
//     return props.item;
//   },
//   set(val) {
//     props.item = val;
//   },
// });

const component: any = computed({
  get() {
    return props.item?.component;
  },
  set(val) {
    if (!props.item) {
      return;
    }
    props.item.component = val;
  },
});

// watch(
//   () => {
//     return props.item;
//   },
//   (val) => {

//     component.value = val;
//   }
// );

console.log("component", component);

const properties = computed({
  get() {
    return props.item.component?.properties;
  },
  set(val) {
    if (!props.item.component) {
      return;
    }

    props.item.component.properties = val;
  },
});

if (!component.value.source) {
  component.value.source = {
    type: "static",
    value: "",
  };
}

console.log("properties", properties);

const staticSourceValue = computed({
  get() {
    if (!component?.value?.source) {
      return "";
    }

    return typeof component.value.source.value === "string"
      ? component.value.source.value
      : JSON.stringify(component.value.source.value);
  },
  set(val) {
    if (!component?.value.source) {
      return;
    }
    component.value.source = {
      type: "static",
      value: val,
    };
  },
});

const applaySource = () => {
  emits("souceChange", props.item);
};
</script>
<style lang="scss" scoped>
.tabs {
  :deep(.el-tabs__nav-scroll) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .tab-panel{
    padding: 10px;
  }
}
.center-panel {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  padding: 5px;
}
</style>
