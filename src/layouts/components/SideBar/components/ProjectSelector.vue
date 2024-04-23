<template>
  <div class="proj-select-container display-flex flex-justify-center flex-align-center width100">
    <el-select v-model="selectedProject" filterable class="proj-select">
      <el-option
        v-for="item in projListStore.projList"
        :key="item.id"
        :label="item.name"
        :value="item.id"
        @click="handleProjSelect(item.id)"
      />
    </el-select>
  </div>
</template>
<script setup>
import { useProjListStore } from "@/stores/projList.js"
import { useActiveProjectStore } from "@/stores/project_detail/activeProject.js"
import { computed } from "vue"
import { useRouter } from "vue-router"

const projListStore = useProjListStore()
const activeProjectStore = useActiveProjectStore()
const router = useRouter()

projListStore.getProjList()

const selectedProject = computed(() => activeProjectStore.activeProject.id)
const handleProjSelect = (projectId) => {
  router.push({ path: `/project/${projectId}/overview` })
}
</script>
<style scoped>
.proj-select-container {
  padding: 0;
}
</style>
<style>
.proj-select > .el-select__wrapper {
  border-radius: 0 !important;
  box-shadow: none;
  padding: 10px 15px 10px 20px;
}
</style>
