import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import router from "@/router"

export const useDsboardRtsStore = defineStore('dsboardRts', () => {
    const routes = ref(router.getRoutes())
    const goodRoutes = computed(() => {
        const dashboardRoute = routes.value.find(route => route.name === 'dashboard')
        return dashboardRoute && dashboardRoute.children ? dashboardRoute.children : []
    })

    return {
        goodRoutes
    }

})
