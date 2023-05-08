<template>
  <el-dialog v-model="dialogVisible" width="35%" :show-close="false" :close-on-click-modal="false">
    <template #header>
      <h5>账户申请</h5>
    </template>
    <div class="register-wrap">
      <el-form ref="registerFormRef" :model="registerForm" :rules="registerRules" size="large">
        <el-form-item prop="role" label="账户类型">
          <el-select v-model="registerForm.role" placeholder="请选择账户类型" size="large">
            <el-option
              v-for="item in Roles"
              :key="item.value"
              :label="item.label"
              :value="item.value"
              :disabled="item.disabled"
            />
          </el-select>
        </el-form-item>
        <el-form-item prop="username" label="用户名">
          <el-input v-model="registerForm.username" placeholder="请输入用户名"> </el-input>
        </el-form-item>
        <!-- 企业客户 1  渠道商 4-->
        <div class="" v-if="registerForm.role === '1' || registerForm.role === '4'">
          <el-form-item prop="cmpname" label="企业名称">
            <el-input v-model="registerForm.cmpname" placeholder="请输入企业名称"> </el-input>
          </el-form-item>
          <el-form-item prop="username" label="法人代表人姓名">
            <el-input v-model="registerForm.username" placeholder="请输入法人代表人姓名"> </el-input>
          </el-form-item>
          <el-form-item prop="username" label="企业联系人名称">
            <el-input v-model="registerForm.username" placeholder="请输入企业联系人名称"> </el-input>
          </el-form-item>
          <el-form-item prop="username" label="法人身份证号码">
            <el-input v-model="registerForm.username" placeholder="请输入法人身份证号码"> </el-input>
          </el-form-item>
          <el-form-item prop="username" label="账户联系人电话号码">
            <el-input v-model="registerForm.username" placeholder="请输入账户联系人电话号码"> </el-input>
          </el-form-item>
          <el-form-item prop="username" label="账户联系人邮箱">
            <div class="email-wrap">
              <el-input v-model="registerForm.username" placeholder="请输入账户联系人邮箱"> </el-input>
              <el-button size="large" type="primary" :loading="loading" class="code-btn"> 下发验证码 </el-button>
            </div>
          </el-form-item>
        </div>
        <!-- 客户经理 2 分公司管理员 3-->
        <div class="" v-if="registerForm.role === '2' || registerForm.role === '3'">
          <el-form-item prop="username" label="姓名" v-if="registerForm.role === '2'">
            <el-input v-model="registerForm.username" placeholder="请输入姓名"> </el-input>
          </el-form-item>
          <el-form-item prop="phone" label="手机号" v-if="registerForm.role === '2'">
            <el-input v-model="registerForm.phone" placeholder="请输入手机号"> </el-input>
          </el-form-item>
          <el-form-item prop="username" label="邮箱">
            <div class="email-wrap">
              <el-input v-model="registerForm.username" placeholder="请输入邮箱"> </el-input>
              <el-button size="large" type="primary" :loading="loading" class="code-btn"> 下发验证码 </el-button>
            </div>
          </el-form-item>
          <el-form-item prop="username" label="二级部门(分公司)">
            <el-select v-model="registerForm.role" placeholder="下拉选择" size="large"> </el-select>
          </el-form-item>
          <el-form-item prop="username" label="三级部门" v-if="registerForm.role === '3'">
            <el-input v-model="registerForm.username" placeholder="请输入三级部门"> </el-input>
          </el-form-item>
          <el-form-item prop="username" label="工号">
            <el-input v-model="registerForm.username" placeholder="请输入工号"> </el-input>
          </el-form-item>
          <el-form-item prop="username" label="身份证号">
            <el-input v-model="registerForm.username" placeholder="请输入身份证号"> </el-input>
          </el-form-item>
        </div>
        <el-form-item prop="username" label="上传附件">
          <el-button type="primary">点击上传</el-button>
        </el-form-item>
        <el-form-item prop="code" label="验证码">
          <el-input v-model="registerForm.code" auto-complete="off" placeholder="请输入验证码"> </el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="login-btn">
        <el-button @click="goBack"> 返回 </el-button>
        <el-button @click="register(registerFormRef)" type="primary" :loading="loading">确定</el-button>
      </div>
    </template>
  </el-dialog>
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
  cmpname: [{ required: true, message: "请输入企业名", trigger: "blur" }],
  code: [{ required: true, message: "请输入验证码", trigger: "blur" }]
});

const loading = ref(false);
// 注册
const registerForm = reactive({ role: "1", username: "", cmpname: "", code: "" });
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
const dialogVisible = ref(true);

// 账户类型
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
  margin: 0;
  padding: 0;
  text-align: left;
}
:deep(.el-form-item__content) {
  justify-content: space-between;
}
.register-wrap {
  height: 300px;
  overflow: scroll;
}
.email-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.code-btn {
  margin-left: 15px;
}
</style>
