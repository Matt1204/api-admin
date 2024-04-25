<template>
  <div class="var-form-container">
    <el-table :data="editVarArray" class="var-table" border>
      <el-table-column label="参数名"
        ><template #default="scope">
          <CustomInput
            v-model:form-value="scope.row.varKey.val"
            v-model:form-validity="scope.row.varKey.validity"
            :validator="[VALIDATOR_MINLENGTH(3)]"
            :in-last-row="scope.$index === editVarArray.length - 1"
            :row-index="scope.$index"
            placeholder="输入参数名"
            invalid-warning="参数名必填"
          />
        </template>
      </el-table-column>
      <el-table-column label="参数值">
        <template #default="scope">
          <CustomInput
            v-model:form-value="scope.row.varValue.val"
            v-model:form-validity="scope.row.varValue.validity"
            :validator="[VALIDATOR_MINLENGTH(3)]"
            :in-last-row="scope.$index === editVarArray.length - 1"
            :row-index="scope.$index"
            placeholder="输入参数值"
            invalid-warning="参数值必填"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template #default="scope">
          <div
            v-if="scope.$index !== editVarArray.length - 1"
            class="display-flex flex-justify-center flex-align-center"
          >
            <el-icon
              @click="handleRowUp(scope.$index)"
              size="23"
              class="arrow-icon"
              style="cursor: pointer"
              ><CaretTop
            /></el-icon>
            <el-icon
              @click="handleRowDown(scope.$index)"
              size="23"
              class="arrow-icon"
              style="cursor: pointer"
              ><CaretBottom
            /></el-icon>
            <el-tag
              class="ml10"
              type="danger"
              @click="handleRowDelete(scope.$index)"
              style="cursor: pointer"
              >删除</el-tag
            >
          </div>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import cloneDeep from "lodash/cloneDeep"
import { watch, ref } from "vue"
import { ElMessage } from "element-plus"

import CustomInput from "@/components/CustomInput.vue"
import { VALIDATOR_REQUIRE, VALIDATOR_MINLENGTH } from "@/utils/validators.js"

const props = defineProps({
  varArr: Array
})
// 初始化
const editVarArray = ref([])
// editVarArray.value = JSON.parse(JSON.stringify(props.varArr))
editVarArray.value = cloneDeep(props.varArr)
console.log("editVarArray:", editVarArray.value)

const handleRowDelete = (idx) => {
  editVarArray.value.splice(idx, 1)
}
const handleRowUp = (index) => {
  if (index > 0) {
    ;[editVarArray.value[index], editVarArray.value[index - 1]] = [
      editVarArray.value[index - 1],
      editVarArray.value[index]
    ]
  }
}
const handleRowDown = (index) => {
  if (index < editVarArray.value.length - 2) {
    ;[editVarArray.value[index], editVarArray.value[index + 1]] = [
      editVarArray.value[index + 1],
      editVarArray.value[index]
    ]
  }
}
// 总是在表格最下面添加一行新增行
watch(
  () => editVarArray.value[editVarArray.value.length - 1],
  (newVal) => {
    if (newVal.varKey.val || newVal.varValue.val) {
      // checkAndAppendEmptyRow()
      editVarArray.value.push({
        varKey: { val: "", validity: false },
        varValue: { val: "", validity: false }
      })
      console.log("Last row added!!", editVarArray.value)
    }
  },
  { deep: true, immediate: true }
)
// 除了最后一行，移除空行
watch(
  editVarArray,
  () => {
    for (let i = editVarArray.value.length - 2; i >= 0; i--) {
      // -2 to skip the last element
      const ele = editVarArray.value[i]
      if (ele.varKey.val === "" && ele.varValue.val === "") {
        editVarArray.value.splice(i, 1) // Remove the element if condition is met
        console.log("empty row removed:", editVarArray.value)
      }
    }
  },
  { deep: true, immediate: true }
)

// submit表单提交逻辑
// 检测是否有重复的键
function findDuplicateKeys(globalVar) {
  const seenValues = new Set()
  const duplicates = new Set()

  for (const item of globalVar) {
    const val = item.varKey.val
    if (seenValues.has(val)) {
      duplicates.add(val)
    }
    seenValues.add(val)
  }
  return Array.from(duplicates) // Convert the set of duplicates to an array
}
const onVarFormSubmit = () => {
  let varArray = cloneDeep(editVarArray.value)
  varArray.splice(-1, 1)

  // 校验表单
  for (let row of varArray) {
    if (!row.varKey.validity || !row.varValue.validity) {
      ElMessage({
        message: "表单校验不通过",
        type: "warning"
      })
      return false
    }
  }

  // 检测是否有重复的参数键名
  let duplicateKeys = findDuplicateKeys(varArray)
  if (duplicateKeys.length) {
    ElMessage({
      message: `键值重复：${duplicateKeys.join(", ")}`,
      type: "warning"
    })
    return false
  }
  return varArray
}

defineExpose({
  onVarFormSubmit
})
</script>
<style scoped>
.var-form-container {
  width: 100%;
  /* border: 1px solid #000; */
}
.el-table {
  width: 100%;
}
.icon-container {
  border: 1px solid;
  border-radius: 10px;
}
.arrow-icon {
  /* display: inline; */
  border: 1px solid;
  border-radius: 5px;
  margin-left: 8px;
}
.arrow-icon:hover {
  border: 2px solid;
}
</style>
<style>
.var-table .el-input__wrapper {
  box-shadow: none;
}
</style>
