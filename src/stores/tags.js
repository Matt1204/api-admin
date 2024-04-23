import { ref, watch, computed } from 'vue'
import { defineStore } from 'pinia'
import router from "@/router"

export const useTagsStore = defineStore('tags', () => {
    // 初始化，从local storage加载标签
    const loadCacheViews = () => {
        const paths = localStorage.getItem('tags');
        if (paths) {
            return JSON.parse(paths);
        } else {
            return null
        }
    }
    const visitedViews = ref(loadCacheViews() || [])

    const hasOneTag = computed(() => {
        return visitedViews.value.length == 1
    })

    watch(visitedViews.value, () => {
        localStorage.setItem('tags', JSON.stringify(visitedViews.value));
    }, { immediate: true })

    // 添加
    const addTag = (routeObj) => {
        if (!visitedViews.value.some(r => r.path === routeObj.path)) {
            const newView = {
                path: routeObj.path,
                // name: routeObj.name,
                // hash: routeObj.hash,
                // query: routeObj.query,
                // params: routeObj.params,
                // meta: routeObj.meta,
            };
            if (routeObj.name) newView['name'] = routeObj.name
            if (routeObj.hash) newView['hash'] = routeObj.hash
            if (routeObj.query) newView['query'] = routeObj.query
            if (routeObj.params) newView['params'] = routeObj.params
            if (routeObj.meta) newView['meta'] = routeObj.meta

            visitedViews.value.push(newView);
            console.log("tags array: ", visitedViews.value);
        }
    }
    // router.afterEach((to) => {
    //     console.log("to:", to);
    //     addTag(to)
    // });

    // 删除
    const deleteTag = (routeObj) => {
        const index = visitedViews.value.findIndex((v) => v.path === routeObj.path)
        if (index !== -1) {
            return visitedViews.value.splice(index, 1)[0]
        }
    }

    // 删除其他
    const deleteOtherTags = (routeObj) => {
        visitedViews.value = visitedViews.value.filter((v) => {
            return v.path === routeObj.path
        })
    }

    // 删除所有
    const deleteAllTags = () => {
        visitedViews.value = []
        router.push("/")
    }

    return {
        visitedViews,
        addTag,
        deleteTag,
        deleteOtherTags,
        deleteAllTags,
        hasOneTag,
    }

})
