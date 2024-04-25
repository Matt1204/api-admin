<template lang="">
  <div>
    <Modal
      v-model="reqDialogVisibility"
      @confirm="handleReqSubmit"
      @cancel="
        () => {
          reqDialogVisibility = false
        }
      "
      :modal-title="` - 全局参数`"
      :modal-width="800"
    >
      <div class="req-container">
        <ApiReqCom ref="apiVarRef" />
      </div>
    </Modal>
  </div>
</template>
<script setup>
import ApiReqCom from "@/views/api_views/components/ApiReqCom.vue"
import Modal from "@/components/Modal.vue"

const reqDialogVisibility = defineModel()

const handleReqSubmit = () => {
  console.log("handleReqSubmit......")
}
</script>
<style>
.req-container {
  width: 100%;
  height: 400px;
}
</style>
