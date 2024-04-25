<template>
  <el-dialog
    v-model="modelValue"
    :z-index="101"
    :width="modalWidth"
    :close-on-click-modal="false"
    center
  >
    <template #header>
      <div class="header-container">
        <span>{{ modalTitle }}</span>
      </div>
    </template>

    <template #default>
      <div class="slot-container">
        <slot></slot>
      </div>
    </template>

    <template #footer>
      <el-button @click="onCancel">取消</el-button>
      <el-button type="primary" @click="onConfirm">确认</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { defineModel } from "vue"

defineProps({
  modalWidth: {
    type: Number,
    default: 600
  },
  modalTitle: {
    type: String,
    default: "对话框"
  }
})
const emit = defineEmits(["confirm", "cancel"])
const modelValue = defineModel()

const onConfirm = () => {
  emit("confirm")
  // closeDialog()
}
const onCancel = () => {
  emit("cancel")
  closeDialog()
}
const closeDialog = () => {
  modelValue.value = false
}

// export default {
//   props: {
//     isVisible: {
//       type: Boolean,
//       required: true,
//       default: false
//     },
//     modalWidth: {
//       type: Number,
//       default: 600
//     },
//     modalTitle: {
//       type: String,
//       default: "对话框"
//     }
//   },
//   emits: ["confirm", "cancel", "update:isVisible"],
//   setup(props, { emit }) {
//     const model = defineModel()

//     const onConfirm = () => {
//       emit("confirm")
//       // emit("update:isVisible", false) // Hide dialog
//     }
//     const onCancel = () => {
//       emit("cancel")
//       // emit("update:isVisible", false) // Hide dialog
//     }

//     return { onConfirm, onCancel, model }
//   }
// }
</script>

<style scoped>
.header-container {
  font-size: 16px;
}
.slot-container {
  padding: 15px;
  overflow-y: auto;
  min-height: 150px;
  border-top: 1px solid #ebeef5;
  border-bottom: 1px solid #ebeef5;
}
.el-button {
  margin: 0 5px;
}
</style>
