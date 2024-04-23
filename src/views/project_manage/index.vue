<template>
  <div class="top-container display-flex flex-direction-col flex-justify-start">
    <div class="cards-conainer display-flex flex-direction-col flex-justify-between">
      <template v-if="projListStore.projChunks.length">
        <el-row
          v-for="(rowProjects, chunkIdx) in projListStore.projChunks"
          :key="'row-' + chunkIdx"
          class="project-row"
          :gutter="20"
        >
          <el-col
            v-for="(project, projectIdx) in rowProjects"
            :key="'project-' + projectIdx"
            :span="6"
          >
            <ProjectCard
              :project="project"
              @edit-proj="onEditProj"
              @clone-proj="onCloneProj"
              @delete-proj="onDeleteProj"
            ></ProjectCard>
          </el-col>
        </el-row>
      </template>

      <template v-else>
        <el-empty>
          <el-button type="primary">创建项目</el-button>
        </el-empty>
      </template>
    </div>

    <div class="pagination-container display-flex flex-justify-center">
      <el-pagination
        v-model:current-page="currentPage"
        background
        layout="prev, pager, next"
        :total="100"
        :page-size="12"
      />
    </div>

    <Modal v-model="editVisibility" @confirm="onEditConfirm" @cancel="onEditCancel">
      <p>编辑对话框</p>
    </Modal>
    <Modal v-model="cloneVisibility" @confirm="onCloneConfirm" @cancel="onCloneCancel">
      <p>克隆对话框</p>
    </Modal>
    <Modal v-model="deleteVisibility" @confirm="onDeleteConfirm" @cancel="onDeleteCancel">
      <p>删除对话框</p>
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue"
import ProjectCard from "@/views/project_manage/componenets/ProjectCard.vue"
import Modal from "@/components/Modal.vue"
import { useProjListStore } from "@/stores/projList.js"
const projListStore = useProjListStore()

// 分页器
const currentPage = ref(1)
watch(currentPage, () => {
  projListStore.getProjList(currentPage.value)
})

// 处理project数据
onMounted(() => {
  projListStore.getProjList(currentPage.value)
})

// 编辑对话框
let editVisibility = ref(false)
const onEditProj = (project) => {
  console.log("onEditProj", project)
  editVisibility.value = true
}
const onEditConfirm = () => {
  console.log("Edit Confirm")
}
const onEditCancel = () => {
  console.log("Edit Cancel")
}

// 克隆对话框
let cloneVisibility = ref(false)
const onCloneProj = (project) => {
  console.log("onCloneProj", project)
  cloneVisibility.value = true
}
const onCloneConfirm = () => {
  console.log("Edit Confirm")
}
const onCloneCancel = () => {
  console.log("Edit Cancel")
}

// 删除对话框
let deleteVisibility = ref(false)
const onDeleteProj = (project) => {
  console.log("onDeleteProj", project)
  deleteVisibility.value = true
}
const onDeleteConfirm = () => {
  console.log("Delete Confirm")
}
const onDeleteCancel = () => {
  console.log("Delete Cancel")
}
</script>
<style scoped>
.top-container {
  height: 100%;
  width: 100%;
  padding: 20px 30px 10px 30px;
}
.cards-conainer {
  flex: 1;
  width: 100%;
}
.project-row {
  flex: 1;
  width: 100%;
  margin-bottom: 30px;
}
.pagination-container {
}
</style>
