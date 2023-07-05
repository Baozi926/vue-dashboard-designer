<template>
  <div class="number-panel widget">
    <div class="title">{{ title }}</div>
    <div class="num">{{ num || 0 }}</div>
  </div>
</template>
<script setup lang="ts">
import { useDataSource } from "../../hooks/useDataSource";
import { computed } from "vue";

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
});

const { result } = useDataSource(props.source);

const num = computed(() => {
  return result.value?.num;
});
</script>
<style lang="scss" scoped>
.number-panel {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100%;
  height: 100%;
}
</style>
