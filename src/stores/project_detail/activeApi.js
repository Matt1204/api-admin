import { ref } from 'vue'
import { defineStore } from 'pinia'

import { apis as data } from "@/temp-data/data.js"

export const useActiveApiStore = defineStore('activeApi', () => {
    const activeApi = ref({})

    const setActiveApi = (apiId) => {
        activeApi.value = data.find(api => {
            return api.id == apiId
        })
        console.log("setActiveApi:", activeApi.value)
    }

    return {
        activeApi,
        setActiveApi
    }

})
