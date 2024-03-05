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
    <el-form-item prop="code">
      <div class="code-wrap">
        <el-input v-model="loginForm.code" placeholder="请输入验证码">
          <template #prefix>
            <el-icon class="el-input__icon"><user /></el-icon>
          </template>
        </el-input>
        <div class="login-code">
          <img :src="codeUrl" alt="" @click="getCode" />
        </div>
      </div>
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
import { ref, reactive, watch, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import { ElNotification } from "element-plus";
import { TabsStore } from "@/stores/modules/tabs";
import { HOME_URL, APP_NAME } from "@/config/config";
import { login, getImgCode } from "@/api/user";
import { setToken } from "@/utils/auth";
import { getCookie, setCookie } from "@/utils/cookie";
import { Encrypt, Decrypt } from "@/utils/secret";
const router = useRouter();
const tabsStore = TabsStore();
const emit = defineEmits(["changeForm"]);
const route = useRoute();
let redirect = ref("");
let queryNext = ref({});
// 监听路由变化
watch(
  () => route,
  () => {
    const { query } = route;
    redirect.value = query.redirect || HOME_URL;
    for (const key in query) {
      if (key != "redirect") {
        queryNext.value[key] = query[key];
      }
    }
  },
  {
    immediate: true
  }
);
// 定义 formRef（校验规则）
const loginFormRef = ref();
const loginRules = reactive({
  loginName: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
});

const loading = ref(false);
// 登录
const loginForm = reactive({ loginName: "", password: "", remember: false, uuid: "", code: "" });
const loginClick = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    setUserInfo();
    try {
      const { token } = await login(loginForm);
      setToken(token);
      tabsStore.closeMultipleTab();
      console.log(redirect.value, "redirect");
      router.push({ path: redirect.value, query: queryNext.value });
      ElNotification.success(`欢迎使用${APP_NAME}`);
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
    setCookie("loginName", loginForm.loginName);
    // 加密密码存储
    setCookie("password", Encrypt(loginForm.password));
  } else {
    setCookie("loginName", "");
    setCookie("password", "");
  }
};

// 获取登录信息的cookie
const getCookieInfo = () => {
  const loginName = getCookie("loginName");
  const password = getCookie("password");
  if (loginName && password) {
    loginForm.loginName = loginName;
    loginForm.password = Decrypt(password);
    loginForm.remember = true;
  }
};
getCookieInfo();
// 注册
const registerClick = () => emit("changeForm", "register");

// 获取验证码
const codeUrl = ref("");
const getCode = () => {
  getImgCode().then(res => {
    codeUrl.value = "data:image/gif;base64," + res.img;
    loginForm.uuid = res.uuid;
  });
};
onMounted(() => {
  getCode();
});
</script>

<style lang="scss" scoped>
.code-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.login-code {
  width: 33%;
  height: 100%;
  display: flex;
  align-items: center;
  margin-left: 20px;
  img {
    width: 100%;
    height: 100%;
    cursor: pointer;
    vertical-align: middle;
  }
}
:deep(.el-form-item__content) {
  justify-content: space-between;
}
</style>
