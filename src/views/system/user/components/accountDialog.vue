<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="closeDialog">
    <el-form :model="form" ref="formRef" label-width="120px" label-position="left" :rules="rules">
      <el-form-item label="账户名" prop="accountName">
        <el-input v-model="form.accountName" :disabled="!isEdit" placeholder="请输入账户名" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" placeholder="请输入姓名" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input v-model="form.password2" type="password" placeholder="请再次确认密码" show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">返回</el-button>
        <el-button type="primary" @click="onSubmit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import useAccountRules from "../hooks/useAccountRules";
const formRef = ref(null);
// 表单
const form = reactive({
  accountName: "",
  name: "",
  phone: "",
  email: "",
  password: "",
  password2: ""
});
const { rules } = useAccountRules(formRef, form);
const dialogVisible = ref(false);

// openDialog
const isEdit = ref(false);
let title = ref("");
const openDialog = ({ data, isEdit: edit }) => {
  console.log(data, edit);
  isEdit.value = edit;
  dialogVisible.value = true;
  title.value = isEdit.value ? "新增项目经理账号" : "修改账号信息";
};

// 提交表单
const onSubmit = () => {
  formRef?.value.validate(valid => {
    if (valid) {
      console.log(form);
      ElMessage.success(isEdit.value ? "提交成功" : "修改成功");
      closeDialog();
    } else {
      return false;
    }
  });
};

// 关闭弹窗
const closeDialog = () => {
  dialogVisible.value = false;
  formRef.value.resetFields();
};
defineExpose({ openDialog });
</script>
