<template>
  <div class="global-setting-container width100">
    <el-row>
      <el-col
        :span="8"
        class="setting-bar-col display-flex flex-justify-center flex-align-center"
        @click="
          () => {
            reqDialogVisibility = true
          }
        "
      >
        <img class="setting-icon" src="../assets/global_config.svg" alt="folder" />
        <span class="item-req-type">{{ "全局配置" }}</span>
      </el-col>
      <el-col
        :span="8"
        class="setting-bar-col display-flex flex-justify-center flex-align-center"
        @click="
          () => {
            varDialogVisibility = true
          }
        "
      >
        <img class="setting-icon" src="../assets/global_var.svg" alt="folder" />
        <span class="item-req-type">{{ "全局参数" }}</span>
      </el-col>
      <el-col :span="8" class="setting-bar-col display-flex flex-justify-center flex-align-center">
        <img class="setting-icon" src="../assets/global_script.svg" alt="folder" />
        <span class="item-req-type">{{ "全局脚本" }}</span>
      </el-col>
    </el-row>
  </div>

  <!-- 全局变量 -->
  <div v-if="reqDialogVisibility">
    <GlobalReqCom v-model="reqDialogVisibility" />
  </div>

  <!-- 全局变量 -->
  <div v-if="varDialogVisibility">
    <GlobalVarCom v-model="varDialogVisibility" />
  </div>

  <div></div>
</template>

<script setup>
import { ref } from "vue"

import GlobalVarCom from "@/layouts/components/SideBar/components/GlobalVarCom.vue"
import GlobalReqCom from "@/layouts/components/SideBar/components/GlobalReqCom.vue"
// 全局参数
const reqDialogVisibility = ref(false)

// 全局变量
const varDialogVisibility = ref(false)
</script>
<style scoped>
.global-setting-container {
  padding: 0 3px;
}
.setting-bar-col {
  height: 40px;
  /* border: 1px solid #000; */
  font-size: 13px;
  cursor: pointer;
}
.setting-icon {
  width: 16px;
  height: 16px;
  margin-right: 2px;
}
.var-container {
  width: 100%;
  height: 350px;
}
</style>
