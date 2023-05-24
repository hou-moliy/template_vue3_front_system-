<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="loginName ">
      <el-input v-model="loginForm.loginName" placeholder="请输入账号">
        <template #prefix>
          <el-icon class="el-input__icon"><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input type="password" v-model="loginForm.password" placeholder="请输入密码" show-password autocomplete="new-password">
        <template #prefix>
          <el-icon class="el-input__icon"><lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <!-- 记住密码 -->
    <el-form-item>
      <el-checkbox v-model="loginForm.remember">记住密码</el-checkbox>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button @click="loginClick(loginFormRef)" size="large" type="primary" :loading="loading"> 登录 </el-button>
    <el-button @click="registerClick()" size="large">注册</el-button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { TabsStore } from "@/stores/modules/tabs";
import { HOME_URL, APP_NAME } from "@/config/config";
import { login } from "@/api/user";
import { setToken } from "@/utils/auth";
import { getCookie, setCookie } from "@/utils/cookie";
import { encode, decode } from "js-base64";
const router = useRouter();
const tabsStore = TabsStore();
const emit = defineEmits(["changeForm"]);

// 定义 formRef（校验规则）
const loginFormRef = ref();
const loginRules = reactive({
  loginName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loading = ref(false);
// 登录
const loginForm = reactive({ loginName: "", password: "", remember: false });
const loginClick = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      const { token } = await login(loginForm);
      setToken(token);
      setUserInfo();
      tabsStore.closeMultipleTab();
      router.push(HOME_URL);
      ElNotification({
        message: `欢迎使用${APP_NAME}`,
        type: "success",
        duration: 2000
      });
    } finally {
      loading.value = false;
    }
  });
};

// 存储表单信息
const setUserInfo = () => {
  // 判断用户是否勾选记住密码，如果勾选，向cookie中储存登录信息，
  // 如果没有勾选，储存的信息为空
  if (loginForm.remember) {
    setCookie("username", loginForm.username);
    // 加密密码存储
    setCookie("password", encode(loginForm.password));
  } else {
    setCookie("username", "");
    setCookie("password", "");
  }
};

// 获取登录信息的cookie
const getCookieInfo = () => {
  const username = getCookie("username");
  const password = getCookie("password");
  if (username && password) {
    loginForm.username = username;
    loginForm.password = decode(password, "base64");
    loginForm.remember = true;
  }
};
getCookieInfo();
// 注册
const registerClick = () => emit("changeForm", "register");
</script>

<style lang="scss" scoped>
.login-code {
  height: 100%;
  display: flex;
  align-items: center;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
:deep(.el-form-item__content) {
  justify-content: space-between;
}
</style>
