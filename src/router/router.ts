

import {
  createRouter,
  createWebHashHistory,
} from "vue-router";

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [

  {
    path: "/edit/:id",
    component: () => import("../views/DashboardDesigner/DashboardDesigner.vue"),
    name:"edit",
    meta:{
      title:"editor"
    }
  },
  {
    path: "/viewer/:id",
    component: () => import("../views/DashboardDesigner/DashboardViewer.vue"),
    name:"viewer",
    meta:{
      title:"viewer"
    }
  },
  {
    path: "/gallery",
    component: () => import("../views/DashboardGallery/DashboardGallery.vue"),
    name:"gallery",
    meta:{
      title:"gallery"
    }
  },
  {
    path: "/",
    redirect:"/gallery"
  },
  {
    path: '/:pathMatch(.*)',
    redirect:"/"
  },
];

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});

router.beforeEach((to, from, next) => {//beforeEach是router的钩子函数，在进入路由前执行
  if (to.meta.title) {//判断是否有标题
      // @ts-ignore
      document.title = to.meta.title
  }
  next()//执行进入路由，如果不写就不会进入目标页
})


export default router;
