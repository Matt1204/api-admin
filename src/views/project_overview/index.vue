<template>
  <div>project overview. project ID: {{ projectId }}</div>
</template>
<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const projectId = computed(() => route.params.projectId)
</script>
<style scoped></style>
