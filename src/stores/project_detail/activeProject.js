import { ref } from 'vue'
import { defineStore } from 'pinia'

import { projects as data } from "@/temp-data/data.js"

export const useActiveProjectStore = defineStore('activeProject', () => {
    const activeProject = ref({})

    const setActiveProject = (projectId) => {
        console.log(projectId);
        activeProject.value = data.find(proj => {
            return proj.id == projectId
        })
        console.log("setActiveProject:", activeProject.value)
    }

    return {
        activeProject,
        setActiveProject
    }

})
