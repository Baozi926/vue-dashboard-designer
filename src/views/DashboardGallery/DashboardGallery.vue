<template>
  <el-container
    class="gallery"
    style="height: 100%; width: 100%; overflow-y: hidden"
  >
    <el-header class="header"
      ><div class="title">我的应用列表</div>
      <el-button @click="createDashboard" type="primary">新建</el-button>
    </el-header>
    <el-main class="main-c">
      <div class="app-container">
        <div
          @click="onAppClick(item)"
          v-for="item in appList"
          :key="item.id"
          class="app"
        >
          <div class="icon">
            <div class="toolbox">
              <el-icon @click.stop="deleteDashboard(item)" class="i">
                <Delete />
              </el-icon>
            </div>
          </div>
          <div class="title">{{ item.name }}</div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>
<script setup lang="ts">
import {
  ElMain,
  ElContainer,
  ElHeader,
  ElButton,
  ElIcon,
  ElMessageBox,
  ElMessage,
} from "element-plus";
import { useLocalStore } from "../../hooks/useLocalStore";
import { onMounted, ref } from "vue";
import { useRouter } from "vue-router";
import { uuid } from "../../utils/common";
import { Delete } from "@element-plus/icons-vue";
const router = useRouter();
const localStore = useLocalStore("dashboard");

const appList: any = ref([]);

const createDashboard = () => {
  const route = router.resolve({
    name: "edit",
    params: {
      id: uuid(),
    },
  });

  window.open(route.href);
};

async function refresh() {
  const list = await localStore.getList();

  appList.value = list.sort((a: any, b: any) => {
    return b?.timestamp - a?.timestamp;
  });
}

onMounted(async () => {
  refresh();
});

async function deleteDashboard(item) {
  ElMessageBox.confirm("是否要永久删除这个app", "警告", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  })
    .then(async () => {
      await localStore.deleteItem(item?.id);

      refresh();
      ElMessage({
        type: "success",
        message: "删除成功",
      });
    })
    .catch(() => {
      ElMessage({
        type: "info",
        message: "删除取消",
      });
    });
}

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
  .header {
    box-shadow: rgba(6, 30, 53, 0.1) 0px 1px 0 0;
    border-bottom: 1px solid #ebecee;
    display: flex;
    align-items: center;
    .title {
      margin: 0 20px;
    }
  }
  display: inline-block;
  .app-container {
    display: inline-block;
    .app {
      overflow: hidden;
      display: inline-flex;
      margin: 20px;
      padding: 0;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      cursor: pointer;

      .icon {
        position: relative;
        border-radius: 8px;
        background-image: linear-gradient(135deg, #7ed49a, #46c26f);
        height: 80px;
        width: 80px;

        &:hover {
          .toolbox {
            display: block;
          }
        }
        .toolbox {
          padding: 2px;
          display: none;
          position: absolute;
          top: 0;
          right: 0;

          &:hover {
            color: blue;
          }
        }
      }
      .title {
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        width: 100%;
        text-align: center;
      }
    }
  }
}
</style>
