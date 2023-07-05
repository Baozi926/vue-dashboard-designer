<template>
  <component
    :style="getStyle()"
    v-bind="mapProperties(component?.properties)"
    :source="component?.source"
    :is="getComponent(component?.name)"
    :mode="mode"
  ></component>
</template>
<script setup lang="ts">
import { getComponent } from "../../components/ComponentExport";

const props = defineProps({
  widgetId: {
    required: false,
  },
  component: {
    default() {
      return {};
    },
    required: true,
  },
  mode: {
    type: String,
    default() {
      return "view";
    },
    required: false,
  },
});

const getStyle = () => {
  return props.mode === "view" ? "" : `pointer-events: none;`;
};

function mapProperties(properties: any[]) {
  if (!Array.isArray(properties)) {
    return {};
  }
  const map: any = {};
  properties.forEach((v) => {
    map[v.name] = v.value;
  });
  return map;
}
</script>
