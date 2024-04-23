<template lang="">
  <div>
    <!-- 当前route下无子路由的情况 -->
    <!-- :to="route.path" -->
    <router-link
      :to="getFullPath(route.path)"
      v-if="!route.children || !route.children.length"
      class="link-item"
    >
      <el-menu-item :index="getFullPath(route.path)">
        <span class="item-title">
          {{ route.meta.title }}
        </span>
      </el-menu-item>
    </router-link>

    <!-- 当前route下有子路由的情况 -->
    <el-sub-menu v-else :index="getFullPath(route.path)" teleported>
      <template #title>
        <span v-if="route.meta.title">{{ route.meta.title }}</span>
      </template>
      <template v-if="route.children">
        <el-menu-item-group>
          <SidebarItem
            v-for="child in route.children"
            :key="child.path"
            :route="child"
            :base-path="getFullPath(route.path)"
          />
        </el-menu-item-group>
      </template>
    </el-sub-menu>
  </div>
</template>
<script setup>
const props = defineProps({
  route: {
    type: Object,
    default: () => {}
  },
  basePath: {
    type: String,
    default: ""
  }
})

const getFullPath = (curPath) => {
  const fullPath = props.basePath + "/" + curPath
  return fullPath
}
</script>

<style scoped>
.link-item {
  text-decoration: none;
  -webkit-text-decoration-skip: objects;
}
.item-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
