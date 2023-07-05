<template>
  <div class="widget-wrapper" :class="{ active: active }">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
defineProps({
  active: {
    default: false,
  },
});
</script>

<style lang="scss">
.widget-wrapper {
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  overflow: hidden;
  border-radius: 8px;
  &.active {
    border: 2px solid #409eff;
    // border-width: 2px;
    // border-color: #409eff;
  
  }
  // border: 2px solid transparent;
}
</style>
