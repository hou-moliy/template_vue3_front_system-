<template>
  <el-dropdown trigger="click" id="avatarWrap">
    <div class="avatar">
      <img :src="authStore.avatar" alt="avatar" />
    </div>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="openDialog('infoRef')">
          <el-icon> <User /> </el-icon>个人信息
        </el-dropdown-item>
        <el-dropdown-item @click="openDialog('passwordRef')">
          <el-icon> <Edit /> </el-icon>修改密码
        </el-dropdown-item>
        <el-dropdown-item @click="logout" divided>
          <el-icon> <SwitchButton /> </el-icon>退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  <!-- infoDialog -->
  <InfoDialog ref="infoRef"></InfoDialog>
  <!-- passwordDialog -->
  <PasswordDialog ref="passwordRef"></PasswordDialog>
</template>

<script setup>
import { ref } from "vue";
import { resetRouter } from "@/routers/index";
import InfoDialog from "./InfoDialog.vue";
import PasswordDialog from "./PasswordDialog.vue";
import { AuthStore } from "@/stores/modules/auth";
import { useRouter } from "vue-router";
import { LOGIN_URL } from "@/config/config";
const router = useRouter();
const authStore = AuthStore();

// 退出登录
const logout = () => {
  authStore.logout().then(() => {
    resetRouter();
    router.replace(LOGIN_URL);
    router.push(LOGIN_URL);
  });
};

const infoRef = ref(null);
const passwordRef = ref(null);
// 打开修改密码和个人信息弹窗
const openDialog = refName => {
  if (refName == "infoRef") infoRef.value?.openDialog();
  else passwordRef.value?.openDialog();
};
</script>

<style scoped lang="scss">
.avatar {
  width: 40px;
  height: 40px;
  overflow: hidden;
  cursor: pointer;
  border-radius: 50%;

  img {
    width: 100%;
    height: 100%;
  }
}
</style>
