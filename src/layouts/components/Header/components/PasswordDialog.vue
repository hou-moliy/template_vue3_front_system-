<template>
  <el-dialog v-model="dialogVisible" title="修改密码" width="500px" draggable>
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="账号" label-width="100px" prop="loginName">
        <el-input v-model="form.loginName" disabled></el-input>
      </el-form-item>
      <el-form-item label="新密码" label-width="100px" prop="password">
        <el-input type="password" v-model="form.password" placeholder="请输入新密码" show-password></el-input>
      </el-form-item>
      <el-form-item label="确认密码" label-width="100px" prop="confirmPassword">
        <el-input type="password" v-model="form.confirmPassword" placeholder="请再次输入新密码" show-password></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">取消</el-button>
        <el-button type="primary" @click="handleSubmit">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import useForm from "@/hooks/useForm";
import useValidator from "@/hooks/useValidator";
import { AuthStore } from "@/stores/modules/auth";
import { resetPassword } from "@/api/user";
import { ElMessage } from "element-plus";
const { userName } = AuthStore();
const dialogVisible = ref(false);
const initialValues = {
  loginName: userName,
  password: "",
  confirmPassword: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
const { validatePass, validatePass2 } = useValidator(formRef, form);
const rules = reactive({
  loginName: [{ required: true, message: "请输入账号", trigger: "blur" }],
  password: [{ required: true, validator: validatePass, trigger: "blur" }],
  confirmPassword: [{ required: true, validator: validatePass2, trigger: "blur" }]
});
// openDialog
const openDialog = () => {
  dialogVisible.value = true;
};
const closeDialog = () => {
  dialogVisible.value = false;
  resetForm();
};
const handleSubmit = () => {
  submitForm().then(() => {
    resetPassword(form).then(res => {
      if (res.code === '0000') {
        ElMessage.success("修改成功");
        closeDialog();
      }
    });
  });
};

defineExpose({ openDialog });
</script>
