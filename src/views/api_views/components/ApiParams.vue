<template>
  <div class="param-form-container">
    <el-table :data="editParamArr" class="param-table" border>
      <el-table-column label="变量名"
        ><template #default="scope">
          <CustomInput
            v-model:form-value="scope.row.paramKey.val"
            v-model:form-validity="scope.row.paramKey.validity"
            :validator="[VALIDATOR_REQUIRE()]"
            :in-last-row="scope.$index === editParamArr.length - 1"
            placeholder="输入变量名"
            invalid-warning="变量名必填"
          />
        </template>
      </el-table-column>
      <el-table-column label="变量值">
        <template #default="scope">
          <CustomInput
            v-model:form-value="scope.row.paramValue.val"
            v-model:form-validity="scope.row.paramValue.validity"
            :validator="[VALIDATOR_REQUIRE()]"
            :in-last-row="scope.$index === editParamArr.length - 1"
            placeholder="输入变量值"
            invalid-warning="变量值必填"
          />
        </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template #default="scope">
          <div
            v-if="scope.$index !== editParamArr.length - 1"
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
import { watch, ref } from "vue"
import CustomInput from "@/components/CustomInput.vue"
import { VALIDATOR_REQUIRE } from "@/utils/validators.js"

const props = defineProps({
  paramArr: Array
})
// 初始化
const editParamArr = ref([])
editParamArr.value = JSON.parse(JSON.stringify(props.paramArr))
console.log("editParamArr:", editParamArr.value)

const handleRowDelete = (idx) => {
  editParamArr.value.splice(idx, 1)
}
const handleRowUp = (index) => {
  if (index > 0) {
    ;[editParamArr.value[index], editParamArr.value[index - 1]] = [
      editParamArr.value[index - 1],
      editParamArr.value[index]
    ]
  }
}
const handleRowDown = (index) => {
  if (index < editParamArr.value.length - 2) {
    ;[editParamArr.value[index], editParamArr.value[index + 1]] = [
      editParamArr.value[index + 1],
      editParamArr.value[index]
    ]
  }
}
// 总是在表格最下面添加一行新增行
watch(
  () => editParamArr.value[editParamArr.value.length - 1],
  (newVal) => {
    if (newVal.paramKey.val || newVal.paramValue.val) {
      // checkAndAppendEmptyRow()
      editParamArr.value.push({
        paramKey: { val: "", validity: false },
        paramValue: { val: "", validity: false }
      })
      console.log("Last row added!!", editParamArr.value)
    }
  },
  { deep: true, immediate: true }
)
// 除了最后一行，移除空行
watch(
  editParamArr,
  () => {
    for (let i = editParamArr.value.length - 2; i >= 0; i--) {
      // -2 to skip the last element
      const ele = editParamArr.value[i]
      if (ele.paramKey.val === "" && ele.paramValue.val === "") {
        editParamArr.value.splice(i, 1) // Remove the element if condition is met
        console.log("empty row removed:", editParamArr.value)
      }
    }
  },
  { deep: true, immediate: true }
)

defineExpose({
  editParamArr
})
</script>
<style scoped>
.param-form-container {
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
.param-table .el-input__wrapper {
  box-shadow: none;
}
</style>
