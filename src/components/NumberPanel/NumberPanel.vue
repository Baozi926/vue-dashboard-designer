<template>
  <div :style="styleValue" class="number-panel widget">
    <div class="title">{{ title }}</div>
    <div class="num">{{ num || 0 }}</div>
  </div>
</template>
<script setup lang="ts">
import { useDataSource } from "../../hooks/useDataSource";
import { ref, computed } from "vue";
import { parseStylesheet } from "../ComponentUtil";

const props: any = defineProps({
  title: {
    default() {
      return "标题";
    },
    required: false,
  },
  source: {
    default() {
      return null;
    },
    required: false,
  },
  stylesheet: {
    default() {
      return [];
    },
    required: false,
  },
});

const num = ref(0);

const styleValue = computed(() => {
  return parseStylesheet(props.stylesheet);
});


useDataSource(
  () => {
    return props.source;
  },
  (result) => {
    num.value = result?.num;
  }
);
</script>
<style lang="scss" scoped>
.number-panel {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;

  background: var(--background);
  color: var(--color);
}
</style>
