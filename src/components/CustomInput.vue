<template>
  <div>
    <el-input
      v-model="modelFormVal"
      style="width: 100%"
      :placeholder="props.placeholder"
      @input="
        () => {
          checkValidity()
        }
      "
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
      :title="!modelFormValidity && !inLastRow ? invalidWarning : ''"
    />
  </div>
</template>

<script setup>
import { defineProps, ref, nextTick, onMounted, computed } from "vue"
import { validate, VALIDATOR_REQUIRE } from "@/utils/validators"

const modelFormVal = defineModel("formValue")
const modelFormValidity = defineModel("formValidity")

const props = defineProps({
  placeholder: { type: String, default: "请输入" },
  validator: { type: Array, default: () => [VALIDATOR_REQUIRE()] },
  inLastRow: { type: Boolean, default: false },
  invalidWarning: { type: String, default: "表单校验不通过" },
  rowIndex: { type: Number }
})

const isBlur = ref(true)
// modelValue = xxx(ref其实没有变,只emit) -> emit给父组件 -> 父组件更新值 -> 子组件值改变
// 要等子组件的ref真正被更新(re-render)之后,最新的modelValue才能被访问,所以nextTick
const checkValidity = async () => {
  await nextTick()
  // beenTouched.value = props.inLastRow ? false : true
  let validity = validate(modelFormVal.value, props.validator)
  modelFormValidity.value = validity
  await nextTick()
}

let showInvalidity = computed(() => {
  // 最后一行的表单不展示校验提醒
  if (props.inLastRow) {
    return false
  }
  if (modelFormValidity.value) {
    return false
  } else {
    // 如果校验为false，且表单为blur。展示提醒
    return isBlur.value
  }
})

// 初始化时，重新校验一次表单，给validity重新赋值
onMounted(async () => {
  await checkValidity()
})
</script>
<style scoped></style>

<style>
.invalid-style > .el-input__wrapper {
  border: 1px solid red;
  box-shadow: none !important;
}
</style>
