<template>
  <div class="tags-scroll-container display-flex">
    <el-scrollbar
      ref="scrollbarRef"
      class="flex1"
      @scroll="syncScroll"
      @wheel.passive="wheelScroll"
    >
      <div
        ref="scrollbarContentRef"
        class="scrollbar-content display-flex flex-justify-start flex-align-center"
      >
        <slot />
      </div>
    </el-scrollbar>
  </div>
</template>
<script setup>
import { ref, watch } from "vue"
import { useRoute } from "vue-router"

const route = useRoute()
const props = defineProps({
  tagRefs: {
    type: Object,
    default: () => {}
  }
})
// 滚动条的位置、默认滚动距离
let scrollDistance = 0
const defaultScrollDistance = 50

// 滚动条、滚动条内容区域的ref
const scrollbarRef = ref(null)
const scrollbarContentRef = ref(null)

const syncScroll = (distance) => {
  scrollDistance = distance.scrollLeft
}

// 鼠标滚轮事件
const wheelScroll = (event) => {
  if (event.deltaY < 0) {
    scrollTo("left")
  } else {
    scrollTo("right")
  }
}
const getWidth = () => {
  if (scrollbarRef.value && scrollbarRef.value) {
    const scrollbarWidth = scrollbarRef.value.$el.clientWidth
    const scrollbarContentWidth = scrollbarContentRef.value.scrollWidth
    const distanceRemain = scrollbarContentWidth - scrollbarWidth - scrollDistance
    return { scrollbarContentWidth, scrollbarWidth, distanceRemain }
  } else {
    return null
  }
}
// 向左/右移动一定距离
const scrollTo = (direction, distance = defaultScrollDistance) => {
  let scrollLeft = 0
  let widthResult = getWidth()
  if (!widthResult) return

  if (direction === "left") {
    scrollLeft = Math.max(0, scrollDistance - distance)
  } else {
    let { distanceRemain } = widthResult
    scrollLeft = Math.min(scrollDistance + distance, scrollDistance + distanceRemain)
  }
  scrollbarRef.value.setScrollLeft(scrollLeft)
}

// 滚动到某一位置
const scrollToPos = (targetPosition) => {
  if (targetPosition < 0) {
    // 目标位置超过左侧
    targetPosition = 0
  }

  let widthResult = getWidth()
  if (!widthResult) return
  let { scrollbarContentWidth, scrollbarWidth } = widthResult
  if (targetPosition > scrollbarContentWidth - scrollbarWidth) {
    // 目标位置超过右侧
    targetPosition = scrollbarContentWidth - scrollbarWidth
  }
  scrollbarRef.value.setScrollLeft(targetPosition)
}
const checkTagVisibility = (path) => {
  const tagRefs = props.tagRefs
  tagRefs.forEach((tag) => {
    if (tag.to.path === path) {
      const el = tag.$el
      const offsetWidth = el.offsetWidth
      const offsetLeft = el.offsetLeft // tag在scrollbarContentRef的left distance
      // console.log(`width:${offsetWidth}, offsetLeft:${offsetLeft}`)

      // active标签在左侧
      if (offsetLeft < scrollDistance) {
        scrollToPos(offsetLeft)
        return
      }
      let result = getWidth()
      if (!result) return
      let { scrollbarWidth } = result
      // active标签在右侧
      if (offsetLeft + offsetWidth > scrollDistance + scrollbarWidth) {
        scrollToPos(offsetLeft + offsetWidth - scrollbarWidth)
        return
      }
    }
  })
}
watch(route, (value) => {
  checkTagVisibility(value.path)
})
</script>
<style scoped>
.tags-scroll-container {
  /* padding-top: 1px; */
  /* flex: 1; */
  height: 100%;
  width: 1300px;
  /* width: 100%; */
  /* background-color: aqua; */
}
.el-scrollbar {
  height: 100%;
  white-space: nowrap;
}

.el-scrollbar::-webkit-scrollbar {
  display: none;
}

.scrollbar-content {
}
</style>
