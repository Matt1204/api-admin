<template>
  <el-icon size="25" class="icon" @click="handleGoBack"><Back /></el-icon>
</template>
<script setup>
import { Back } from "@element-plus/icons-vue"
import { useRouter } from "vue-router"

const router = useRouter()

const handleGoBack = () => {
  router.back()
}
</script>
<style scoped>
.icon {
  vertical-align: middle;
  cursor: pointer;
}
</style>
