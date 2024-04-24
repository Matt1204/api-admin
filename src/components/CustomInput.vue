<template>
  <div>
    <el-input
      v-model="modelFormVal"
      style="width: 100%"
      :placeholder="props.placeholder"
      @input="checkValidity"
      @blur="
        () => {
          isBlur = true
        }
      "
      @focus="
        () => {
          isBlur = false
        }
      "
      :class="{ 'invalid-style': showInvalidity }"
      :title="showInvalidity ? invalidWarning : ''"
    />
    <!-- <input type="text" v-model="modelFormVal" @input="checkValidity" /> -->
    <!-- @input="validateInput(scope.row, 'key')" -->
  </div>
</template>

<script setup>
import { defineProps, ref, nextTick, onMounted, watch } from "vue"
import { validate, VALIDATOR_REQUIRE } from "@/utils/validators"

const modelFormVal = defineModel("formValue")
const modelFormValidity = defineModel("formValidity")
const props = defineProps({
  placeholder: { type: String, default: "请输入" },
  validator: { type: Array, default: () => [VALIDATOR_REQUIRE()] },
  inLastRow: { type: Boolean, default: false },
  invalidWarning: { type: String, default: "表单校验不通过" }
})

const showInvalidity = ref(false)
const isBlur = ref(true)

// modelValue = xxx(ref其实没有变,只emit) -> emit给父组件 -> 父组件更新值 -> 子组件值改变
// 要等子组件的ref真正被更新(re-render)之后,最新的modelValue才能被访问
const checkValidity = async () => {
  await nextTick()
  let validity = validate(modelFormVal.value, props.validator)
  if (validity) {
    showInvalidity.value = false
  }
  modelFormValidity.value = validity
}
watch(
  () => props.inLastRow,
  () => {
    if (props.inLastRow) {
      showInvalidity.value = false
      return
    }
  }
)
watch(
  [isBlur, modelFormValidity, () => props.inLastRow],
  ([newIsBlur, newValidity], [oldIsBlur, oldValidity]) => {
    oldIsBlur !== newIsBlur && console.log(`isBlur: ${oldIsBlur} to ${newIsBlur}`)
    oldValidity !== newValidity &&
      console.log(`modelFormValidity: ${oldValidity} to ${newValidity}`)
    if (props.inLastRow) {
      showInvalidity.value = false
      return
    } else {
      // 如果blur+校验为false，展示提醒
      if (isBlur.value && !modelFormValidity.value) {
        showInvalidity.value = true
        return
      }
      // 如果校验为true，不展示提醒
      if (modelFormValidity.value) {
        showInvalidity.value = false
        return
      }
    }
  }
)

onMounted(async () => {
  await checkValidity()
})
</script>
<style scoped>
.el-input {
  /* border: 1px solid red; */
}
</style>

<style>
.invalid-style > .el-input__wrapper {
  border: 1px solid red;
  box-shadow: none !important;
  /* box-shadow: 0 0 0 1px #ff1f1f !important; */
}

.invalid-style > .is-focus {
  /* box-shadow: none !important; */
  /* box-shadow: 0 0 0 1px #ff1f1f !important; */
  /* border: 1px solid red; */
}
</style>
