import { createRouter, createWebHistory } from 'vue-router'
import { useTagsStore } from "@/stores/tags.js"
import { useActiveProjectStore } from "@/stores/project_detail/activeProject.js"
import { useActiveApiStore } from '@/stores/project_detail/activeApi'
import layout from '../layouts/index.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: "/dashboard/dev-center/project-manage",
  },
  {
    path: '/dashboard',
    component: layout,
    name: 'dashboard',
    children: [
      {
        path: 'dev-center',
        meta: { title: '研发中心' },
        children: [
          {
            path: 'project-manage',
            component: () => import("@/views/project_manage/index.vue"),
            meta: { title: '项目管理' },
          },
          {
            path: 'calendar',
            component: () => import("@/views/demo_calendar/index.vue"),
            meta: { title: '日历demo' },
          },
          {
            path: 'sliders',
            component: () => import("@/views/demo_slider/index.vue"),
            meta: { title: '滑块demo' },
          },
          {
            path: 'sliders2',
            component: () => import("@/views/demo_slider2/index.vue"),
            meta: { title: '滑块demo222' },
          },
          {
            path: 'sliders3',
            component: () => import("@/views/demo_slider3/index.vue"),
            meta: { title: '滑块demo3333' },
          },
          {
            path: 'calendar2',
            component: () => import("@/views/demo_calendar2/index.vue"),
            meta: { title: '日历demo22222222' },
          },
        ]
      },
    ],
  },
  {
    path: "/project/:projectId",
    component: layout,
    name: 'projectLayout',
    children: [
      {
        path: "overview",
        name: "projectOverview",
        component: () => import("@/views/project_overview/index.vue"),
      },
      {
        path: "api/:apiId",
        name: "projectApi",
        component: () => import("@/views/api_views/index.vue")
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const routeStore = useTagsStore();
  routeStore.addTag(to);
  next();
});

router.beforeEach((to, from, next) => {
  // 向标签栏添加标签
  const routeStore = useTagsStore();
  routeStore.addTag(to);

  // 在“项目详情下”, 根据路由参数更新activeProject
  if (to.path.startsWith('/project/') && to.params.projectId && to.params.projectId !== from.params.projectId) {
    const activeProjectStore = useActiveProjectStore();
    activeProjectStore.setActiveProject(to.params.projectId);
  }
  // 更新activeApi
  if (to.path.startsWith('/project/') && to.params.apiId && to.params.apiId !== from.params.apiId) {
    const activeApiStore = useActiveApiStore();
    activeApiStore.setActiveApi(to.params.apiId);
  }

  next();
});

export default router