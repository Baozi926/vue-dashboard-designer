<template>
  <div class="app-wrapper">
    <!-- <DashboardDesigner></DashboardDesigner> -->
    <RouterView :key="currentRoute.path"  />
  </div>
</template>

<script setup lang="ts">
import { RouterView, useRouter } from "vue-router";

const { currentRoute } = useRouter();
</script>

<style>
#app,
html,
body {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
.app-wrapper {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
