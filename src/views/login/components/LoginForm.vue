<template>
  <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
    <el-form-item prop="username">
      <el-input v-model="loginForm.username" placeholder="请输入用户名">
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
      <el-input v-model="loginForm.code" auto-complete="off" placeholder="请输入验证码" style="width: 67%">
        <template #prefix>
          <el-icon><Checked /></el-icon>
        </template>
      </el-input>
      <div class="login-code">
        <img :src="codeUrl" @click="getCode" alt="" />
      </div>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button @click="login(loginFormRef)" size="large" type="primary" :loading="loading"> 登录 </el-button>
    <el-button @click="resetForm(loginFormRef)" size="large">重置</el-button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { useRouter } from "vue-router";
import { ElNotification } from "element-plus";
import { TabsStore } from "@/stores/modules/tabs";
import { HOME_URL, APP_NAME } from "@/config/config";
import { pageLogin, getCodeImg } from "@/api/login";
import { setToken } from "@/utils/auth";
const router = useRouter();
const tabsStore = TabsStore();

// 定义 formRef（校验规则）
const loginFormRef = ref();
const loginRules = reactive({
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
});

const loading = ref(false);
// 登录
const loginForm = reactive({ username: "", password: "", code: "", uuid: "" });
const login = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      const { token } = await pageLogin(loginForm);
      setToken(token);
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

// 验证码
let codeUrl = ref();
const getCode = () => {
  getCodeImg().then(res => {
    codeUrl.value = "data:image/gif;base64," + res.img;
    loginForm.uuid = res.uuid;
  });
};
getCode();

// resetForm
const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style lang="scss" scoped>
.login-code {
  width: 33%;
  height: 100%;
  display: flex;
  align-items: center;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
</style>
