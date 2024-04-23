<template>
  <div
    class="project-card display-flex flex-direction-col flex-justify-between flex-align-center"
    ref="parentContainer"
  >
    <div class="card-header">
      <el-row type="flex" justify="space-between" align="middle">
        <el-col :span="20">
          <h3>{{ project.name }}</h3>
        </el-col>
        <el-col :span="2" class="display-flex flex-justify-center flex-align-center">
          <el-dropdown @command="handleActions" trigger="click">
            <el-icon :size="20" class="dot-icon"><More /></el-icon>
            <template v-slot:dropdown>
              <el-dropdown-menu>
                <el-dropdown-item command="edit">
                  <el-icon><Edit /></el-icon>
                  <span> 编辑 </span>
                </el-dropdown-item>
                <el-dropdown-item command="clone">
                  <el-icon><CopyDocument /></el-icon>
                  <span> 克隆 </span>
                </el-dropdown-item>
                <el-dropdown-item command="delete">
                  <el-icon><DeleteFilled /></el-icon>
                  <span> 删除 </span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-col>
      </el-row>
    </div>
    <div
      class="card-body display-flexflex-justify-center flex-align-center"
      ref="cardBodyRef"
      :style="{ width: calculatedWidth + 'px' }"
    >
      <p>{{ project.projectDesc }}</p>
    </div>
    <div class="card-footer">
      <el-button class="footer-btn display-flex flex-justify-center" round
        ><el-icon><View /></el-icon>
        <span>查看文档</span>
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect, onUnmounted } from "vue"
const props = defineProps({
  project: {
    type: Object,
    default: () => {}
  }
})
const emit = defineEmits(["edit-proj", "clone-proj", "delete-proj"])

// 下拉菜单操作
const handleActions = (action) => {
  switch (action) {
    case "edit":
      onEdit()
      break
    case "clone":
      onClone()
      break
    case "delete":
      onDelete()
      break
    default:
      break
  }
}
const onEdit = () => {
  emit("edit-proj", props.project)
}
const onClone = () => {
  emit("clone-proj", props.project)
}
const onDelete = () => {
  emit("delete-proj", props.project)
}

const parentContainer = ref(null)
const calculatedWidth = ref(0)
onMounted(() => {
  calculateWidth()
  window.addEventListener("resize", calculateWidth)
})

watchEffect(() => {
  if (parentContainer.value) {
    calculateWidth()
  }
})

function calculateWidth() {
  if (parentContainer.value) {
    const parentWidth = parentContainer.value.offsetWidth
    calculatedWidth.value = parentWidth * 0.99
  }
}

onUnmounted(() => {
  window.removeEventListener("resize", calculateWidth)
})
</script>

<style scoped>
.project-card {
  border: 1px solid #ebeef5;
  border-radius: 10px;
  width: inherit !important;
  height: 100%;
}
.project-card:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-header {
  width: 100%;
  padding: 7px 20px;
  background-color: #f5f7fa;
}
.dot-icon {
  cursor: pointer;
}
.card-body {
  display: block;
  max-height: 100px;
  padding: 5px 10px;
  text-align: center;
  overflow-y: auto;
  overflow-x: hidden;
}
.card-body::-webkit-scrollbar {
  display: none;
}

.card-footer {
  width: 100%;
  padding: 7px 12px;
  text-align: right;
  border-top: 1px solid #ebeef5;
}

.text-right {
  text-align: center;
  justify-content: center;
}
.footer-btn {
  font-size: 12px;
  height: 25px;
  padding: 0px 10px;
}
</style>
