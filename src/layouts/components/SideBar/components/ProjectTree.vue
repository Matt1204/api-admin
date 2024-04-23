<template>
  <div class="tree-container width100">
    <el-input v-model="filterText" class="tree-filter-input" placeholder="搜索内容" size="large"
      ><template #prefix>
        <el-icon class="el-input__icon"><search /></el-icon> </template
    ></el-input>
    <el-tree
      class="sidebar-tree-comp"
      ref="treeRef"
      :data="sourceData"
      node-key="id"
      :props="{ class: customClass }"
      :current-node-key="activeNodeKey"
      @current-change="handleCurrentChange"
      :filter-node-method="filterNode"
      highlight-current
      :indent="18"
    >
      <template #default="{ node, data }">
        <div
          class="custom-node-content display-flex flex-justify-between flex-align-center"
          @mouseover="handleMouseOver(data, node)"
          @mouseleave="handleMouseLeave"
        >
          <!-- :class="{ 'overview-container': data.type === 'overview' }" -->
          <div
            class="display-flex flex-justify-center flex-align-center"
            :style="{ color: calculateTypeColor(data.req_type), width: '30px' }"
          >
            <span v-if="data.type === 'api'" class="item-req-type">{{ data.req_type }}</span>
            <img
              v-if="data.type === 'folder'"
              class="item-icon"
              src="../assets/folder.svg"
              alt="folder"
            />
            <img
              v-if="data.type === 'overview'"
              class="item-icon"
              src="../assets/proj_overview.svg"
              alt="overview"
            />
          </div>

          <div class="item-text-container">
            <h3>{{ node.label }}</h3>
          </div>

          <div
            v-if="data.type !== 'overview'"
            class="display-flex flex-justify-end flex-align-center pr5"
            @click.stop
          >
            <el-dropdown
              v-show="data.id == mouseHoverOn"
              trigger="click"
              @visible-change="
                (visibility) => {
                  dropdownVisible = visibility
                }
              "
            >
              <el-icon :size="15" class="dot-icon"><More /></el-icon>
              <template v-slot:dropdown>
                <el-dropdown-menu v-if="data.type === 'folder'">
                  <el-dropdown-item @click.stop="addApi(data)">
                    <el-icon><Plus /></el-icon>
                    <span> {{ "添加接口" }} </span>
                  </el-dropdown-item>
                  <el-dropdown-item @click.stop="addFolder(data)">
                    <el-icon><FolderAdd /></el-icon>
                    <span> {{ "添加子目录" }} </span>
                  </el-dropdown-item>
                  <el-dropdown-item @click.stop="importFile(data)">
                    <el-icon><Paperclip /></el-icon>
                    <span> {{ "导入文件" }} </span>
                  </el-dropdown-item>
                  <el-dropdown-item @click.stop="displayDoc(data)">
                    <el-icon><Document /></el-icon>
                    <span> {{ "查看文档" }} </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
                <el-dropdown-menu v-if="data.type === 'api'">
                  <el-dropdown-item @click.stop="deleteApi(data)">
                    <el-icon><DeleteFilled /></el-icon>
                    <span> {{ "删除" }} </span>
                  </el-dropdown-item>
                  <el-dropdown-item @click.stop="cloneApi(data)">
                    <el-icon><CopyDocument /></el-icon>
                    <span> {{ "克隆" }} </span>
                  </el-dropdown-item>
                  <el-dropdown-item @click.stop="exportApi(data)">
                    <el-icon><Share /></el-icon>
                    <span> {{ "导出" }} </span>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>
        </div>
      </template>
    </el-tree>
  </div>
</template>
<script setup>
import { ref, watchEffect, watch, computed, nextTick, onUnmounted } from "vue"
import { useRouter, useRoute } from "vue-router"
import { storeToRefs } from "pinia"
import { pinyin } from "pinyin-pro"

import { useActiveProjectStore } from "@/stores/project_detail/activeProject"
import { useActiveApiStore } from "@/stores/project_detail/activeApi"
import { sidebarTreeData } from "@/temp-data/data.js"
const router = useRouter()
const route = useRoute()
const activeProjectStore = useActiveProjectStore()
const { activeProject } = storeToRefs(activeProjectStore)
const activeApiStore = useActiveApiStore()
const { activeApi } = storeToRefs(activeApiStore)
// el-tree的ref
const treeRef = ref(null)

// 当进入‘项目概览’、切换api、切换项目时，计算el-tree选中的item
const activeNodeKey = ref(0)
watch(
  [activeProject, activeApi, () => route.name],
  async () => {
    await nextTick()
    if (route.name === "projectOverview") {
      console.log("set to overview")
      activeNodeKey.value = 0
    }
    if (route.name === "projectApi") {
      console.log(`set activeKey: ${activeApi.value.id}`)
      activeNodeKey.value = activeApi.value.id
    }
  },
  { deep: true, immediate: true }
)

// 下拉菜单逻辑
const dropdownVisible = ref(false)
const mouseHoverOn = ref(null)
const handleMouseOver = (data, node) => {
  if (data.id && !dropdownVisible.value) {
    // console.log(data)
    // console.log(node.isCurrent)
    mouseHoverOn.value = data.id
  }
}
const handleMouseLeave = () => {
  if (!dropdownVisible.value) {
    mouseHoverOn.value = null
  }
}
// 下拉菜单操作
const addApi = (nodeData) => {
  console.log("addApi, ", nodeData)
}
const addFolder = (nodeData) => {
  console.log("addApi, ", nodeData)
}
const importFile = (nodeData) => {
  console.log("importFile, ", nodeData)
}
const displayDoc = (nodeData) => {
  console.log("displayDoc, ", nodeData)
}
const deleteApi = (nodeData) => {
  console.log("deleteApi, ", nodeData)
}
const cloneApi = (nodeData) => {
  console.log("cloneApi, ", nodeData)
}
const exportApi = (nodeData) => {
  console.log("exportApi, ", nodeData)
}
// 搜索框逻辑
const filterText = ref("")
watch(filterText, (val) => {
  if (treeRef.value) {
    treeRef.value.filter(val)
  }
})
const filterNode = (value, data, node) => {
  console.log(node)
  if (data.type === "overview") {
    return 1
  }
  let query = value.trim()
  if (!query) return true

  query = pinyin(query, { toneType: "none" }).replace(/\s+/g, "").toLowerCase()
  let target = pinyin(data.label, { toneType: "none" }).replace(/\s+/g, "").toLowerCase()
  let reqType = `${data.req_type}`.toLowerCase()

  if (target.includes(query) || reqType.includes(query)) {
    return 1
  }
}

// 点击item跳转
const handleCurrentChange = (data, node) => {
  if (data.type === "api") {
    router.push({ path: `/project/${activeProject.value.id}/api/${data.id}` })
  }
  if (data.type === "overview") {
    router.push({ path: `/project/${activeProject.value.id}/overview` })
  }
}

// 计算请求类型的字体颜色
const calculateTypeColor = (str) => {
  // let type = str.toLowerCase()
  switch (str) {
    case "POST":
      return "#ad7a03"
    case "GET":
      return "#007f31"
    case "DEL":
      return "#ce1706"
    case "PATCH":
      return "#623497"
    default:
      return "#000"
  }
}

// 向item添加class
const customClass = (data, node) => {
  let classStr = ""
  if (data.type === "folder") {
    // classStr = classStr.concat("checked-style", " ")
    classStr = classStr + "folder-item" + " "
  } else if (data.type === "overview") {
    classStr = classStr + "overview-item" + " "
  } else {
    classStr = classStr + "item-style"
  }
  return classStr
  //   return classStr.concat("item-style")
}

// 初始化Tree
// const defaultProps = ref({ children: "children", label: "label" })
const sourceData = ref([
  {
    id: 0,
    label: "项目概览",
    type: "overview"
  }
])
const getTreeData = (projectId) => {
  let newData = []
  if (sidebarTreeData[projectId]) {
    newData = JSON.parse(JSON.stringify(sidebarTreeData[projectId]))
  }
  newData.splice(0, 0, { id: 0, label: "项目概览", type: "overview" })
  sourceData.value = newData
}
watch(
  activeProject,
  () => {
    sourceData.value = []
    filterText.value = ""
    console.log("project chenge.............")
    getTreeData(activeProject.value.id)
  },
  { deep: true, immediate: true }
)
</script>
<style scoped>
.tree-container {
  flex: 1;
  border-bottom: 1px solid #00000023;
  border-top: 1px solid #00000023;
  overflow-y: auto;
}
.tree-filter-input {
  position: sticky;
  top: 0;
  width: 100%;
  padding: 5px 10px 8px 10px;
  z-index: 10;
  background-color: #f3f3f385;
}

.item-icon {
  height: 15px;
  width: 15px;
}
.item-text-container {
  margin-left: 5px;
  flex: 1;
}
.item-req-type {
  font-weight: 600;
  line-height: 16px;
  text-align: left;
  font-size: 10px;
}
.sidebar-tree-comp {
  width: 100%;
  background-color: inherit;
}
.custom-node-content {
  width: 100%;
  /* padding: 10px 0; */
  /* overflow-x: auto; */
}
.folder-font {
  font-weight: 800;
}
</style>
<style>
.tree-filter-input > .el-input__wrapper {
  border-radius: 0;
}
.sidebar-tree-comp .el-tree-node__content {
  color: #000;
}
.sidebar-tree-comp .el-tree-node__content:hover {
  background-color: #e9e9e9;
}
.folder-item > .el-tree-node__content {
  font-size: 16px;
  font-weight: 800;
  padding: 16px 0;
}
.item-style > .el-tree-node__content {
  padding-top: 10px;
  padding-bottom: 10px;
}
.overview-item > .el-tree-node__content {
  padding: 20px 0;
  border-bottom: 1px solid #00000013;
}
.el-tree-node.is-current > .el-tree-node__content {
  background-color: #73b1f886 !important;
}
</style>
