<template>
  <div>API view. project ID: {{ projectId }}, api ID: {{ apiId }}</div>
</template>
<script setup>
import { computed } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()

const projectId = computed(() => route.params.projectId)
const apiId = computed(() => route.params.apiId)
</script>
<style scoped></style>
