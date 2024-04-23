<template>
  <div
    class="top-container display-flex flex-direction-col flex-justify-start flex-align-center width100"
  >
    <ProjectSelector />
    <ProjectTree />
    <GloabalSetting />
  </div>
</template>
<script setup>
import ProjectSelector from "./components/ProjectSelector.vue"
import ProjectTree from "./components/ProjectTree.vue"
import GloabalSetting from "./components/GloabalSetting.vue"
</script>

<style scoped>
.top-container {
  height: 100%;
}
.proj-select-container {
  text-align: center;
  /* height: 50px; */
}
.proj-select {
  width: 99%;
  border: 0;
}
</style>
<style>
.proj-select .el-select__wrapper {
  height: 40px;
  font-size: 18px;
  background-color: #f9faff;
}
</style>
