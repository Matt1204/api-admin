<template>
  <div class="tagsview-container display-flex flex-justify-between flex-align-center">
    <TagsScroll :tag-refs="tagRefs">
      <router-link
        v-for="(tag, index) in tagsStore.visitedViews"
        :key="index"
        ref="tagRefs"
        class="tags-view-item display-flex flex-justify-center flex-align-center"
        :to="{ path: tag.path }"
        :class="{ active: isActive(tag) }"
      >
        <div class="title-container flex1 display-flex flex-justify-start flex-align-center">
          <span class="tag-title"> {{ tag.meta.title ? tag.meta.title : tag.path }} </span>
        </div>
        <el-icon :size="20" class="tag-icon" @click.prevent.stop="closeSelectedTag(tag)">
          <Close />
        </el-icon>
      </router-link>
    </TagsScroll>
    <div class="tagsview-right pl5 pr10">
      <el-dropdown @command="handleTagActions" trigger="click">
        <el-icon :size="20" class="dot-icon"><More /></el-icon>
        <template v-slot:dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="closeAll" :disabled="tagsStore.hasOneTag">
              <el-icon><DeleteFilled /></el-icon>
              <span> 关闭全部标签 </span>
            </el-dropdown-item>
            <el-dropdown-item command="closeOthers" :disabled="tagsStore.hasOneTag">
              <el-icon><Delete /></el-icon>
              <span> 关闭其他标签 </span>
            </el-dropdown-item>
            <el-dropdown-item command="closeActive">
              <el-icon><Close /></el-icon>
              <span> 关闭当前标签 </span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>
<script setup>
import { useRoute, useRouter } from "vue-router"
import { ref, onMounted } from "vue"
import TagsScroll from "@/layouts/components/TagsView/TagsScroll.vue"
import { useTagsStore } from "@/stores/tags.js"
const tagsStore = useTagsStore()

const tagRefs = ref(null)

const route = useRoute()
const router = useRouter()
const isActive = (tag) => {
  return tag.path === route.path
}
onMounted(() => {
  console.log("visitedViews:", tagsStore.visitedViews)
})

const handleDeleteCase = (visitedViews, tag) => {
  if (visitedViews.length === 1) {
    // 唯一的tag被删除
    console.log(3)
    return "ONLY_TAG"
  } else {
    let deleteIndex = visitedViews.findIndex((view) => view.path === tag.path)
    if (deleteIndex === visitedViews.length - 1) {
      // 最后一个tag被删除
      console.log(2)
      return "LAST_TAG"
    } else {
      // 一般情况
      console.log(1)
      return "DEFAULT"
    }
  }
}
const handleTagDeleted = (deleteCase, deletedIndex) => {
  switch (deleteCase) {
    case "DEFAULT":
      router.push(tagsStore.visitedViews[deletedIndex].path)
      break
    case "LAST_TAG":
      router.push(tagsStore.visitedViews.slice(-1)[0].path)
      break
    case "ONLY_TAG":
      router.push("/")
      break
    default:
      break
  }
}
const closeSelectedTag = (tag) => {
  let deleteCase
  let deletedIndex = tagsStore.visitedViews.findIndex((view) => view.path === tag.path)
  const activeTagDeleted = isActive(tag)

  activeTagDeleted && (deleteCase = handleDeleteCase(tagsStore.visitedViews, tag))

  tagsStore.deleteTag(tag)

  activeTagDeleted && handleTagDeleted(deleteCase, deletedIndex)
}

// 下拉菜单操作
const handleTagActions = (action) => {
  switch (action) {
    case "closeAll":
      tagsStore.deleteAllTags()
      break
    case "closeOthers":
      tagsStore.deleteOtherTags(route)
      break
    case "closeActive":
      closeSelectedTag(route)
      break
    default:
      break
  }
}
</script>
<style scoped>
.tagsview-container {
  width: 100%;
  height: 35px;
  overflow: hidden;
  box-shadow: 0 0 3px 0 #00000010;
}
.scroll-container {
  padding-top: 1px;
  flex: 1;
  /* width: 500px; */
}
.tags-view-item {
  position: relative;
  width: 180px;
  height: 35px;
  padding: 0 8px;
  border-right: 1px solid #858994f8;
  background-color: #00000011;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  text-decoration: none;
  color: #000;
}
.title-container {
  height: 100%;
  overflow: hidden;
}
.tag-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tag-icon {
  width: 30px;
  padding-left: 8px;
}

.active {
  background-color: #40a0ffd3;
  color: #ffffff;
  border-color: #40a0ffab;
}

.tagsview-right {
}
</style>
