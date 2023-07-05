<template>
  <el-container class="gallery" style="height: 100%; overflow-y: hidden">
    <el-header class="header">我的应用列表</el-header>
    <el-main>
      <div
        @click="onAppClick(item)"
        v-for="item in appList"
        :key="item.id"
        class="app"
      >
        <div class="icon"></div>
        <div class="title">{{ item.name }}</div>
      </div>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import {
  ElAside,
  ElMain,
  ElContainer,
  ElHeader,
  ElButton,
  ElMessage,
} from "element-plus";
import { useLocalStore } from "../../hooks/useLocalStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();
const localStore = useLocalStore("dashboard");

const appList: any = ref([]);

onMounted(async () => {
  appList.value = await localStore.getList();
  console.log(appList.value);
});

function onAppClick(item) {
  const id = item.id;

  if (id) {
    const route = router.resolve({
      name: "edit",
      params: {
        id: id,
      },
    });

    window.open(route.href);
  }
}
</script>
<style lang="scss">
.gallery {
  display: inline-block;
  .app {
    overflow: hidden;
    display: flex;
    margin: 0;
    padding: 0;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    cursor: pointer;

    .icon {
      border-radius: 8px;
      background-image: linear-gradient(135deg, #7ed49a, #46c26f);
      height: 50px;
      width: 50px;
    }
  }
}
</style>
