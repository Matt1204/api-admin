<template>
  <div class="logo-container display-flex flex-justify-center flex-align-center">
    <router-link
      to="/project/10/overview"
      class="link-container display-flex flex-justify-center flex-align-center"
    >
      <img src="@/assets/sidebar-logo.png" class="logo-img" />
      <span class="logo-text">ZLapi</span>
    </router-link>
  </div>
</template>
<script setup></script>
<style scoped>
.logo-container {
  width: 100%;
  height: 140px;
}
.link-container {
  text-decoration: none;
  -webkit-text-decoration-skip: objects;
  color: #000;
}
.logo-img {
  display: inline-block;
  width: 75px;
  height: 75px;
}
.logo-text {
  font-size: 20px;
  font-weight: 600;
  margin-left: 10px;
}
</style>
