<template>
  <div class="param-form-container">
    <el-table :data="editParamArr" class="param-table" border>
      <el-table-column prop="key" label="变量名"
        ><template #default="scope">
          <el-input v-model="scope.row.key" style="width: 100%" placeholder="key" />
        </template>
      </el-table-column>
      <el-table-column prop="value" label="变量值">
        <template #default="scope">
          <el-input v-model="scope.row.value" style="width: 100%" placeholder="key" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { watch, ref } from "vue"

const props = defineProps({
  paramArr: Array
})
// 初始化
const editParamArr = ref([])
editParamArr.value = JSON.parse(JSON.stringify(props.paramArr))
console.log("editParamArr:", editParamArr.value)

const checkAndAppendEmptyRow = () => {
  const lastItem = editParamArr.value.slice(-1)[0]
  if (lastItem.key !== "" || lastItem.value !== "") {
    editParamArr.value.push({ key: "", value: "" })
    console.log("Empty row added!!", editParamArr.value)
  }
}
const checkAndDeleteEmptyRow = () => {
  const secondLastItem = editParamArr.value.slice(-2)[0]
  if (secondLastItem.key === "" && secondLastItem.value === "") {
    editParamArr.value.push({ key: "", value: "" })
    console.log("Empty row added!!", editParamArr.value)
  }
}
watch(
  () => editParamArr.value[editParamArr.value.length - 1],
  (newVal, oldVal) => {
    console.log("watch")
    if (newVal.key || newVal.value) {
      console.log("watch in....")
      checkAndAppendEmptyRow()
    }
    // console.log("updated:", editParamArr.value)
  },
  { deep: true, immediate: true }
)
watch(
  editParamArr,
  (newVal, oldVal) => {
    console.log("watch the whole array")
    for (let i = editParamArr.value.length - 2; i >= 0; i--) {
      // -2 to skip the last element
      const ele = editParamArr.value[i]
      if (ele.key === "" && ele.value === "") {
        editParamArr.value.splice(i, 1) // Remove the element if condition is met
      }
    }
  },
  { deep: true, immediate: true }
)
</script>
<style scoped>
.param-form-container {
  width: 100%;
  /* border: 1px solid #000; */
}
.el-table {
  width: 100%;
}
</style>
<style>
.param-table .el-input__wrapper {
  box-shadow: none;
}
</style>
