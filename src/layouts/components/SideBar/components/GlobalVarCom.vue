<template>
  <div>
    <Modal
      v-model="varDialogVisibility"
      @confirm="handleVarSubmit"
      @cancel="
        () => {
          varDialogVisibility = false
        }
      "
      :modal-title="`${activeProject.name} - 全局变量`"
      :modal-width="700"
    >
      <div class="var-container">
        <ApiVarForm :var-arr="varData" ref="apiVarRef" />
      </div>
    </Modal>
  </div>
</template>
<script setup>
import { ref } from "vue"
import { storeToRefs } from "pinia"
import { ElMessage } from "element-plus"

import Modal from "@/components/Modal.vue"
import ApiVarForm from "@/views/api_views/components/ApiVarForm.vue"

import { useActiveProjectStore } from "@/stores/project_detail/activeProject.js"
const activeProjectStore = useActiveProjectStore()
const { activeProject } = storeToRefs(activeProjectStore)

const varDialogVisibility = defineModel()

const varData = ref([])
// 初始化
const getGlobalVar = () => {
  if ("globalVar" in activeProject.value && activeProject.value.globalVar) {
    return activeProject.value.globalVar
  } else {
    return null
  }
}
const init = () => {
  let data = getGlobalVar()
  if (!data) return
  varData.value = data
  varDialogVisibility.value = true
}
init()

// 对话框submit逻辑
const apiVarRef = ref(null)
const handleVarSubmit = () => {
  if (apiVarRef.value) {
    // 校验在表单组件内完成
    let apiVarResult = apiVarRef.value.onVarFormSubmit()
    if (!apiVarResult) {
      return
    }
    console.log("result from parent com:", apiVarResult)
    ElMessage({ message: "已提交", type: "success" })
    varDialogVisibility.value = false
  }
}
</script>
<style scoped>
.var-container {
  width: 100%;
  height: 350px;
}
</style>
