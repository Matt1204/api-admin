<template>
  <div class="layout-container display-flex">
    <SideBar class="sidebar-container" />
    <div class="app-container display-flex flex-direction-col flex-justify-start">
      <div class="app-headers">
        <TopNav />
        <TagsView />
      </div>
      <AppView />
    </div>
  </div>
</template>
<script>
import SideBar from "@/layouts/components/SideBar/SideBar.vue"
import TopNav from "@/layouts/components/TopNav/TopNav.vue"
import AppView from "@/layouts/components/AppView.vue"
import TagsView from "@/layouts/components/TagsView/TagsView.vue"
export default {
  components: {
    SideBar,
    TopNav,
    AppView,
    TagsView
  }
}
</script>
<style scoped>
.layout-container {
  height: 100%;
}

.app-container {
  flex-grow: 1;
  overflow-y: auto; /* Makes the content area scrollable */
}

.app-headers {
  position: relative;
  width: 100%;
  box-shadow: 0 2px 5px #888888;
}
</style>
