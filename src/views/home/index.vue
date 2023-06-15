<template>
  <div class="app-container">
    <h4>欢迎登录{{ APP_NAME }}管理系统</h4>
  </div>
</template>

<script setup name="home">
import { APP_NAME } from "@/config/config";
</script>
<style>
.app-container {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
:deep().el-tabs__item {
  display: flex !important;
  align-items: center !important;
  vertical-align: middle;
}
</style>
