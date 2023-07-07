<template>
  <el-tabs v-model="activeTabName" class="tabs">
    <el-tab-pane class="tab-panel" label="属性" name="properties">
      <div
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 10px;
        "
      >
        {{ item.i }}:{{ component.name }}
      </div>
      <el-form @submit.native.prevent label-width="80px">
        <el-form-item v-for="item in properties" :label="item.alias">
          <el-input v-model="item.value" />
        </el-form-item>
      </el-form>
    </el-tab-pane>
    <el-tab-pane class="tab-panel" label="样式" name="style">
      <template v-if="stylesheet && stylesheet.length">
        <el-form @submit.native.prevent label-width="80px">
          <el-form-item v-for="item in stylesheet" :label="item.alias">
            <!-- <el-input v-model="item.value" /> -->
            <component
              :is="getEditorComponent(item.editor)"
              v-model="item.value"
            >
            </component>
          </el-form-item>
        </el-form>
      </template>
      <template v-else> 该组件没有可自定义的样式！ </template>
    </el-tab-pane>
    <el-tab-pane class="tab-panel" label="数据源" name="source">
      <el-radio-group v-model="dataSouceType" class="ml-4">
        <el-radio label="static" size="large">静态数据</el-radio>
        <el-radio label="url" size="large">远程服务</el-radio>
      </el-radio-group>

      <template v-if="component.source">
        <div class="center-panel" v-if="dataSouceType === 'static'">
          <!-- <div>静态数据源</div> -->
          <el-input
            v-model="sourceValue"
            :rows="4"
            type="textarea"
            placeholder="配置数据源"
          />
        </div>
        <div class="center-panel" v-else-if="dataSouceType === 'url'">
          <!-- <div>远程服务</div> -->

          <el-input
            v-model="sourceValue"
            :rows="4"
            type="textarea"
            placeholder="配置数据源"
          />
        </div>

        <ElButton style="margin-top: 10px; width: 100px" @click="applaySource"
          >应用</ElButton
        >
      </template>
    </el-tab-pane>
    <el-tab-pane class="tab-pabel" label="分享" name=" share">
      <div style="text-align: center;">
        <el-button
          @click="
            shareDialogVisible = true;
            shareForm = {
              desc: '',
              alias: '',
            };
          "
          >分享到组件超市</el-button
        >
      </div>
    </el-tab-pane>

    <el-dialog v-model="shareDialogVisible" title="分享到组件超市" width="30%">
      <span>
        <el-form @submit.native.prevent label-width="80px">
          <el-form-item label="名称">
            <el-input v-model="shareForm.alias" />
          </el-form-item>
          <el-form-item label="描述">
            <el-input v-model="shareForm.desc" />
          </el-form-item>
        </el-form>
      </span>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="shareDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="doShare"> 分享 </el-button>
        </span>
      </template>
    </el-dialog>
  </el-tabs>
</template>
<script setup lang="ts">
import { PropType, computed, reactive, ref, watch, toRefs } from "vue";
import { getEditorComponent } from "./ValueEditor/EditorExport";
import {
  ElForm,
  ElFormItem,
  ElInput,
  ElTabs,
  ElTabPane,
  ElButton,
  ElRadioGroup,
  ElRadio,
  ElMessage,
  ElDialog,
} from "element-plus";
import { deelCloneJson } from "../../../utils/common";
import { shareComponent } from "../../../api/components";

const activeTabName = ref("properties");

const data = reactive({
  shareDialogVisible: false,
  shareForm: {
    alias: "",
    desc: "",
  },
});

const props = defineProps({
  item: {
    required: true,
    default() {
      return null;
    },
    type: Object as PropType<MyComponentInstance>,
  },
});

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

const stylesheet = computed({
  get() {
    return props.item.component?.stylesheet;
  },
  set(val) {
    if (!props.item.component) {
      return;
    }

    props.item.component.stylesheet = val;
  },
});

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

const parseStaticSourceValue = (val: any) => {
  if (!val) {
    return null;
  }
  if (typeof val === "string") {
    return val;
  }

  return JSON.stringify(val);
};

const dataSouceType = ref<"static" | "url" | undefined>(
  props.item.component?.source?.type || "static"
);

const sourceValue = ref(props.item.component?.source?.value);

watch(
  () => {
    return props.item.component?.source;
  },
  () => {
    sourceValue.value = parseStaticSourceValue(
      props.item.component?.source?.value
    );

    dataSouceType.value = props.item.component?.source?.type;
  }
);

//如果是对象就转换成字符
if (!(sourceValue && typeof sourceValue === "string")) {
  sourceValue.value = parseStaticSourceValue(sourceValue.value);
}
const applaySource = () => {
  console.log("applaySource");
  if (!props.item.component) {
    console.warn("component is null");
    return;
  }
  // emits("souceChange", props.item);
  if (dataSouceType.value === "static") {
    try {
      const json = JSON.parse(sourceValue.value);
      props.item.component.source = {
        type: "static",
        value: json,
      };
    } catch (e) {
      ElMessage.error("数据格式不是正确的json格式");
    }

    return;
  }

  if (dataSouceType.value === "url") {
    props.item.component.source = {
      type: "url",
      value: sourceValue.value,
    };
    return;
  }

  throw new Error("not implemented"!);
};
const doShare = () => {
  data.shareDialogVisible = false;
  share(props.item.component);
};
const share = (component: MyComponent) => {
  shareComponent({
    ...component,
    alias: data.shareForm.alias,
    desc: data.shareForm.desc,
  });
};

const { shareDialogVisible, shareForm } = toRefs(data);
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
.center-panel {
  display: flex;
  flex-direction: column;
  // justify-content: center;
  align-items: center;
  padding: 5px;
}
</style>
