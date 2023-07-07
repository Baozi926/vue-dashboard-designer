<template>
  <div class="editor-container">
    <color-picker
      v-model:pureColor="pureColor"
      v-model:gradientColor="gradientColor"
      useType="pure"
    />
  </div>
</template>
<script setup lang="ts">
import { ElRadioGroup, ElRadio } from "element-plus";
import { reactive, toRefs, watch } from "vue";
import { ColorPicker } from "vue3-colorpicker";
import "vue3-colorpicker/style.css";

const props = defineProps(["modelValue"]);
const emits = defineEmits(["update:modelValue"]);

const data = reactive({
  pureColor: props.modelValue,
  gradientColor: props.modelValue,
  useType: "gradient",
});

function onTypeChange(val) {
  if (val === "gradient") {
    emits("update:modelValue", data.gradientColor);
  } else {
    emits("update:modelValue", data.pureColor);
  }
}

watch(
  () => {
    return props.modelValue;
  },
  (val) => {
    data.gradientColor = val;
      data.pureColor = val;
  }
);

watch(
  () => {
    return data.pureColor;
  },
  (val) => {
    emits("update:modelValue", val);
  }
);

watch(
  () => {
    return data.gradientColor;
  },
  (val) => {
    emits("update:modelValue", val);
  }
);

const { pureColor, gradientColor, useType } = toRefs(data);
</script>
<style scoped lang="scss">
.editor-container {
  display: flex;
  align-items: center;
}
</style>
