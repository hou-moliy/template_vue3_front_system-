<template>
  <div class="login-container flx-center">
    <div class="login-box">
      <div class="login-form">
        <div class="login-logo">
          <img class="login-icon" src="@/assets/logo/logo.png" alt="" />
          <h2 class="logo-text">{{ APPNAME }}</h2>
        </div>
        <LoginForm v-if="loginShow" @changeForm="changeForm" />
        <RegisterForm v-else @changeForm="changeForm" />
      </div>
    </div>
    <div class="bruce"></div>
  </div>
</template>

<script setup name="login">
import LoginForm from "./components/LoginForm.vue";
import RegisterForm from "./components/RegisterForm.vue";
import { APP_NAME } from "@/config/config";
import { ref } from "vue";
const APPNAME = APP_NAME;
const loginShow = ref(true);
// 切换表单
const changeForm = () => {
  loginShow.value = !loginShow.value;
};
</script>

<style scoped lang="scss">
.login-container {
  position: relative;
  min-width: 550px;
  height: 100%;
  min-height: 500px;
  background-color: #eeeeee;
  background-position: 50%;
  background-size: 100% 100%;
  background-size: cover;
  .bruce {
    overflow: hidden;
    position: absolute;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(270deg, #8146b4, #6990f6);
  }
  .login-box {
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: space-around;
    width: 96%;
    height: 94%;
    padding: 0 50px;
    background-color: hsl(0deg 0% 100% / 80%);
    border-radius: 10px;
    .login-left {
      width: 800px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .login-form {
      width: 520px;
      padding: 100px 40px;
      border-radius: 10px;
      box-shadow: 2px 3px 7px rgb(0 0 0 / 20%);
      text-align: center;
      z-index: 2;
      background: rgba(255, 255, 255, 0.9);
      .login-logo {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 45px;
        .login-icon {
          width: 60px;
          height: 52px;
        }
        .logo-text {
          padding: 0 0 0 25px;
          margin: 0;
          font-size: 30px;
          font-weight: bold;
          color: #34495e;
          white-space: nowrap;
        }
      }
      .el-form-item {
        margin-bottom: 40px;
      }
      .login-btn {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-top: 40px;
        white-space: nowrap;
        .el-button {
          width: 185px;
        }
      }
    }
  }
}
</style>
