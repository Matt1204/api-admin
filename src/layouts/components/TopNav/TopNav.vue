<template>
  <div class="topnav-container display-flex flex-justify-between">
    <div class="left-nav display-flex flex-justify-start flex-align-center">
      <CollapseBtn />
    </div>
    <div class="right-nav display-flex flex-justify-end flex-align-center">
      <el-dropdown class="right-menu-item" trigger="click">
        <div class="right-menu-avatar display-flex flex-justify-start flex-align-center">
          <el-avatar :icon="UserFilled" :size="30" />
          <span class="ml5">user1</span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item>a...</el-dropdown-item>
            <el-dropdown-item>b...</el-dropdown-item>
            <el-dropdown-item divided>
              <span style="display: block">退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script>
import CollapseBtn from "@/layouts/components/CollapseBtn/CollapseBtn.vue"
import { UserFilled } from "@element-plus/icons-vue"

export default {
  components: {
    CollapseBtn
  },
  setup() {
    return {
      UserFilled
    }
  }
}
</script>
<style scoped>
.topnav-container {
  height: 40px;
}
.left-nav {
  vertical-align: middle;
  margin-left: 5px;
}
.right-nav {
  margin-right: 15px;
}
.right-menu-item {
  cursor: pointer;
}
</style>
