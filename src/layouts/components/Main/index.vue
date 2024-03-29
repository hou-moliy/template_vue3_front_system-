<template>
  <Maximize v-if="themeConfig.maximize" />
  <Tabs v-if="themeConfig.tabs" />
  <el-main>
    <router-view v-slot="{ Component, route }">
      <transition appear name="fade-transform" mode="out-in">
        <el-card class="box-card" v-waterMarker="{ text: `${authStore.userName}`, textColor: 'rgba(180, 180, 180, 0.4)' }">
          <keep-alive :include="keepAliveStore.keepLiveName">
            <component :is="Component" :key="route.path" v-if="isRouterShow" />
          </keep-alive>
          <el-backtop target=".el-main" :right="100" :bottom="100"> </el-backtop>
        </el-card>
      </transition>
    </router-view>
  </el-main>
  <el-footer v-if="themeConfig.footer">
    <Footer />
  </el-footer>
</template>

<script setup>
import { ref, computed, onBeforeUnmount, provide } from "vue";
import { GlobalStore } from "@/stores";
import { AuthStore } from "@/stores/modules/auth";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
import Maximize from "./components/Maximize.vue";
import Tabs from "@/layouts/components/Tabs/index.vue";
import Footer from "@/layouts/components/Footer/index.vue";

const globalStore = GlobalStore();
const authStore = AuthStore();
const keepAliveStore = KeepAliveStore();
const themeConfig = computed(() => globalStore.themeConfig);
const isCollapse = computed(() => globalStore.themeConfig.isCollapse);

// 刷新当前页面
const isRouterShow = ref(true);
const refreshCurrentPage = val => {
  isRouterShow.value = val;
};
provide("refresh", refreshCurrentPage);

// 监听窗口大小变化，折叠侧边栏
const screenWidth = ref(0);
const listeningWindow = () => {
  screenWidth.value = document.body.clientWidth;
  if (!isCollapse.value && screenWidth.value < 1200) globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: true });
  if (isCollapse.value && screenWidth.value > 1200) globalStore.setThemeConfig({ ...themeConfig.value, isCollapse: false });
};
window.addEventListener("resize", listeningWindow);
onBeforeUnmount(() => {
  window.removeEventListener("resize", listeningWindow);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
:deep(.el-card) {
  min-height: 100%;
  .el-card__body {
    min-height: 100%;
  }
}
</style>
