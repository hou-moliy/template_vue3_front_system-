<template>
  <el-form ref="registerFormRef" :model="registerForm" :rules="rules" size="large">
    <el-form-item prop="name">
      <el-input v-model="registerForm.name" placeholder="请输入账号">
        <template #prefix>
          <el-icon class="el-input__icon"><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        type="password"
        v-model="registerForm.password"
        placeholder="请输入密码"
        show-password
        autocomplete="new-password"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="password2">
      <el-input
        type="password"
        v-model="registerForm.password2"
        placeholder="请再次输入密码"
        show-password
        autocomplete="new-password"
      >
        <template #prefix>
          <el-icon class="el-input__icon"><lock /></el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="btn-wrap">
    <el-button size="large" type="primary" :loading="loading" @click="registerClick"> 注册 </el-button>
    <el-link type="primary" @click="goBack">已有账号，去登录</el-link>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import { useRoute } from "vue-router";
import { ElMessage } from "element-plus";
import { HOME_URL } from "@/config/config";
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
const registerFormRef = ref();
const rules = reactive({
  name: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  password2: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

const loading = ref(false);
// 注册
const registerForm = reactive({ name: "", password: "", password2: "" });
const registerClick = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      ElMessage.success("注册成功!");
    } finally {
      loading.value = false;
    }
  });
};
const goBack = () => emit("changeForm", "login");
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
.btn-wrap {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .el-link {
    margin-top: 20px;
  }
}
</style>
