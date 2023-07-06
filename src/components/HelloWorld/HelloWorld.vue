<script setup lang="ts">
import { computed, ref } from "vue";
import { useDataSource } from "../../hooks/useDataSource";

const props: any = defineProps({
  title: {
    default() {
      return "title:";
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

const text = ref("");

useDataSource(
  () => {
    return props.source;
  },
  (result) => {
    text.value = result.text;
  }
);
</script>

<template>
  <div class="hello-world">{{ title }} {{ text || "hello world" }}</div>
</template>

<style scoped>
.hello-world {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}
</style>
