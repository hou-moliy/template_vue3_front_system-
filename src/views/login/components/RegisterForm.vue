<template>
  <h5>账户申请</h5>
  <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" size="large">
    <el-form-item prop="role" label="账户类型">
      <el-select v-model="registerForm.role" placeholder="请选择账户类型" size="large">
        <el-option v-for="item in Roles" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </el-form-item>
    <el-form-item prop="username" label="用户名">
      <el-input v-model="registerForm.username" placeholder="请输入用户名">
        <template #prefix>
          <el-icon class="el-input__icon"><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="cmpname" label="企业名称">
      <el-input v-model="registerForm.cmpname" placeholder="请输入企业名称">
        <template #prefix>
          <el-icon class="el-input__icon"><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="username" label="法人代表人姓名">
      <el-input v-model="registerForm.username" placeholder="请输入企业名称">
        <template #prefix>
          <el-icon class="el-input__icon"><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="username" label="企业联系人名称">
      <el-input v-model="registerForm.username" placeholder="请输入企业名称">
        <template #prefix>
          <el-icon class="el-input__icon"><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="username" label="企业身份证号码">
      <el-input v-model="registerForm.username" placeholder="请输入企业名称">
        <template #prefix>
          <el-icon class="el-input__icon"><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="username" label="账户联系人电话号码">
      <el-input v-model="registerForm.username" placeholder="请输入企业名称">
        <template #prefix>
          <el-icon class="el-input__icon"><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="username" label="账户联系人邮箱">
      <el-input v-model="registerForm.username" placeholder="请输入企业名称">
        <template #prefix>
          <el-icon class="el-input__icon"><user /></el-icon>
        </template>
      </el-input>
    </el-form-item>
    <el-form-item prop="username" label="上传附件">
      <el-button type="primary">点击上传</el-button>
    </el-form-item>
    <el-form-item prop="code" label="验证码">
      <el-input v-model="registerForm.code" auto-complete="off" placeholder="请输入验证码">
        <template #prefix>
          <el-icon><Checked /></el-icon>
        </template>
      </el-input>
    </el-form-item>
  </el-form>
  <div class="login-btn">
    <el-button @click="goBack" size="large" type="primary" :loading="loading"> 返回 </el-button>
    <el-button @click="register(registerFormRef)" size="large">确定</el-button>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElNotification } from "element-plus";
import { TabsStore } from "@/stores/modules/tabs";
const tabsStore = TabsStore();
const emit = defineEmits(["changeForm"]);

// 定义 formRef（校验规则）
const registerFormRef = ref();
const registerRules = reactive({
  role: [{ required: true, message: "请选择角色", trigger: "blur" }],
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
});

const loading = ref(false);
// 注册
const registerForm = reactive({ role: "", username: "", cmpname: "", code: "" });
const register = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
    try {
      tabsStore.closeMultipleTab();
      ElNotification({
        message: "注册成功",
        type: "success",
        duration: 1000
      });
    } finally {
      loading.value = false;
    }
  });
};

// 返回登录表单
const goBack = () => emit("changeForm", "login");

const Roles = [
  {
    value: "1",
    label: "企业客户"
  },
  {
    value: "2",
    label: "客户经理"
  },
  {
    value: "3",
    label: "分公司管理员"
  },
  {
    value: "4",
    label: "渠道商"
  },
  {
    value: "5",
    label: "项目经理",
    disabled: true
  }
];
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
h5 {
  text-align: left;
}
:deep(.el-form-item__content) {
  justify-content: space-between;
}
</style>
