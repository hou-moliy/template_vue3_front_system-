<template>
  <div class="tool-bar-ri">
    <div class="header-icon">
      <LockScreen v-if="LOCK_PAGE" />
      <FullScreen v-if="FULL_PAGE" />
      <Language id="language" v-if="I18N" />
      <SearchMenu id="searchMenu" v-if="MENU_SEARCH" />
      <ThemeSetting id="themeSetting" v-if="THEME" />
    </div>
    欢迎登录<span class="line">|</span><span class="username">{{ authStore.userName }}</span
    ><span class="line">|</span>
    <router-link :to="HOME_URL"> 回到首页 </router-link>
    <span class="line">|</span>
    <Avatar />
  </div>
</template>

<script setup>
import SearchMenu from "./components/SearchMenu.vue";
import Language from "./components/Language.vue";
import ThemeSetting from "./components/ThemeSetting.vue";
import LockScreen from "./components/LockScreen.vue";
import FullScreen from "./components/FullScreen.vue";
import Avatar from "./components/Avatar.vue";
import { AuthStore } from "@/stores/modules/auth";
import { LOCK_PAGE, FULL_PAGE, I18N, THEME, MENU_SEARCH, HOME_URL } from "@/config/config";

const authStore = AuthStore();
</script>

<style scoped lang="scss">
@import "@/styles/var.scss";

.tool-bar-ri {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 30px;

  .header-icon {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 140px;
    margin-right: 22px;
  }

  .username {
    margin: 0;
    font-size: 15px;
  }

  .line {
    margin: 10px;
  }
}

.router-link-active,
a {
  text-decoration: none;
  color: $primary-color;
}
</style>
