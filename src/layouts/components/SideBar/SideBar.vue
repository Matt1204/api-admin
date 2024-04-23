<template>
  <div class="sidebar-container">
    <div v-if="isDashboardRoute" class="dsboardSidebar">
      <SidebarLogo />
      <el-menu :default-active="activeMenu" :unique-opened="true" background-color="#f9faff">
        <SidebarItem
          v-for="(route, index) in dsboardRtsStore.goodRoutes"
          :key="index"
          :route="route"
          :base-path="'/dashboard'"
        />
      </el-menu>
    </div>
    <div v-if="isProjectRoute" class="projectSidebar height100">
      <ProjectSidebar />
    </div>
  </div>
</template>
<script setup>
import { useRoute } from "vue-router"
import { computed } from "vue"
import SidebarLogo from "@/layouts/components/SidebarLogo/SidebarLogo.vue"
import SidebarItem from "@/layouts/components/SideBar/SidebarItem.vue"
import ProjectSidebar from "@/layouts/components/SideBar/ProjectSidebar.vue"

import { useDsboardRtsStore } from "@/stores/dsboardRts.js"

const dsboardRtsStore = useDsboardRtsStore()
let route = useRoute()

// 根据不同的路由渲染不同的sidebar
const isDashboardRoute = computed(() => route.path.startsWith("/dashboard"))
const isProjectRoute = computed(() => route.path.startsWith("/project"))

const activeMenu = computed(() => {
  const {
    meta: { activeMenu },
    path
  } = route
  let result = activeMenu || path
  return result
})
</script>
<style scoped>
.sidebar-container {
  position: relative;
  height: 100%;
  width: 260px;
  background-color: #f9faff;
  border-right: 1px solid #807e7e1e;
}
.el-menu {
  border: none;
  width: 100% !important;
}
</style>
