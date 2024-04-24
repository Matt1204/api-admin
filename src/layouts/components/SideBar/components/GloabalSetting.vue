<template>
  <div class="global-setting-container width100">
    <el-row>
      <el-col :span="8" class="setting-bar-col display-flex flex-justify-center flex-align-center">
        <img class="setting-icon" src="../assets/global_config.svg" alt="folder" />
        <span class="item-req-type">{{ "全局配置" }}</span>
      </el-col>
      <el-col
        :span="8"
        class="setting-bar-col display-flex flex-justify-center flex-align-center"
        @click="handleParamOpen"
      >
        <img class="setting-icon" src="../assets/global_param.svg" alt="folder" />
        <span class="item-req-type">{{ "全局参数" }}</span>
      </el-col>
      <el-col :span="8" class="setting-bar-col display-flex flex-justify-center flex-align-center">
        <img class="setting-icon" src="../assets/global_script.svg" alt="folder" />
        <span class="item-req-type">{{ "全局脚本" }}</span>
      </el-col>
    </el-row>
  </div>
  <div v-if="paramDialogVisibility">
    <Modal
      v-model="paramDialogVisibility"
      @confirm="handleParamSubmit"
      @cancel="
        () => {
          paramDialogVisibility = false
        }
      "
      :modal-title="`${activeProject.name} 全局参数`"
      :modal-width="700"
    >
      <div class="param-container">
        <ApiParams :param-arr="paramData" ref="apiParamsRef" />
      </div>
    </Modal>
  </div>
</template>

<script setup>
// import { projects as projectsList } from "@/temp-data/data.js"

import { ref } from "vue"
import { storeToRefs } from "pinia"
import cloneDeep from "lodash/cloneDeep"
import { ElMessage } from "element-plus"

import Modal from "@/components/Modal.vue"
import ApiParams from "@/views/api_views/components/ApiParams.vue"
import { useActiveProjectStore } from "@/stores/project_detail/activeProject.js"
const activeProjectStore = useActiveProjectStore()

const { activeProject } = storeToRefs(activeProjectStore)

// 全局参数逻辑
const paramDialogVisibility = ref(false)
const paramData = ref([])
const apiParamsRef = ref(null)
// 获取数据
const getGlobalParam = () => {
  if ("globalParams" in activeProject.value && activeProject.value.globalParams) {
    return activeProject.value.globalParams
  } else {
    return null
  }
}
const handleParamOpen = () => {
  let data = getGlobalParam()
  if (!data) return
  paramData.value = data
  paramDialogVisibility.value = true
}
const handleParamSubmit = () => {
  if (apiParamsRef.value && apiParamsRef.value.editParamArr) {
    let paramArr = cloneDeep(apiParamsRef.value.editParamArr)
    paramArr.splice(-1, 1)
    // paramArr.forEach((row) => {
    //   if (!row.paramKey.validity || !row.paramValue.validity) {
    //     ElMessage("表单校验不通过")
    //     return
    //   }
    // })
    // console.log("Submit...", paramArr) // Access the data
  }
}
</script>
<style scoped>
.global-setting-container {
  padding: 0 3px;
}
.setting-bar-col {
  height: 40px;
  /* border: 1px solid #000; */
  font-size: 13px;
  cursor: pointer;
}
.setting-icon {
  width: 16px;
  height: 16px;
  margin-right: 2px;
}
.param-container {
  width: 100%;
  height: 350px;
}
</style>
