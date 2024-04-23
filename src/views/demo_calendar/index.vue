<template>
  <el-calendar v-model="val" class="calanadar" />
</template>

<script>
import { ref } from "vue"
export default {
  setup() {
    const val = ref(new Date())
    return {
      val
    }
  }
}
</script>
<style scoped>
.calanadar {
  width: 100px;
}
</style>
