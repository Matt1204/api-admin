<template>
  <section class="app-main">
    <router-view v-slot="{ Component, route }">
      <!-- <keep-alive :include="tagsViewStore.cachedViews"> -->
      <keep-alive>
        <component :is="Component" :key="route.path" class="app-container-grow" />
      </keep-alive>
    </router-view>
  </section>
</template>
<script>
export default {}
</script>
<style scoped>
.app-main {
  width: 100%;
  height: 100%;
  display: flex;
}

.app-container-grow {
  flex-grow: 1;
}
</style>
