import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useSidebarStore = defineStore('sidebar', () => {
    const isCollapsed = ref(false)

    const toggleCollapse = () => {
        isCollapsed.value = !isCollapsed.value
    }

    const expandSidebar = () => {
        isCollapsed.value = false
    }

    const collapseSidebar = () => {
        isCollapsed.value = true
    }

    return {
        isCollapsed: isCollapsed,
        toggleCollapse,
        expandSidebar,
        collapseSidebar
    }

})
