import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

import { projects as data } from "@/temp-data/data.js"

export const useProjListStore = defineStore('projList', () => {
    const projList = ref([])

    const getProjList = (page = 10) => {
        try {
            projList.value = data
        } catch (error) {
            console.log(error);
        }
    }

    const projChunks = computed(() => {
        let chunks = []
        for (let i = 0; i < projList.value.length; i += 4) {
            chunks.push(projList.value.slice(i, i + 4))
        }
        return chunks
    })

    const projCount = computed(() => {
        return 100
    })

    return {
        projList,
        getProjList,
        projChunks,
        projCount
    }

})
