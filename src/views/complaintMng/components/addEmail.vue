<template>
  <el-dialog v-model="dialogVisible" title="投诉台账详情" @close="handleResetForm">
    <el-form :inline="true" :model="form" ref="formRef" :rules="rules">
      <el-form-item label="收件人" prop="name">
        <el-input v-model="form.name" placeholder="请输入收件人" />
      </el-form-item>
      <el-form-item label="邮箱地址" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱地址" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleResetForm">返回</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";
import useForm from "@/hooks/useForm";
import useValidator from "@/hooks/useValidator";
const dialogVisible = ref(false);
const initialValues = {
  name: "",
  email: ""
};
let { form, formRef, resetForm, submitForm } = useForm(initialValues);
const { validateEmail } = useValidator(formRef, form);
const rules = reactive({
  name: [{ required: true, message: "请填写收件人姓名", trigger: "blur" }],
  email: [{ required: true, validator: validateEmail, trigger: "blur" }]
});
const openDialog = (data, isEdit) => {
  dialogVisible.value = true;
  if (isEdit) {
    Object.assign(form, data);
  }
};
const handleSubmit = () => {
  submitForm()
    .then(() => {
      console.log("校验通过了");
    })
    .catch(() => {
      console.log("校验失败了");
    });
};
const handleResetForm = () => {
  resetForm().then(() => {
    dialogVisible.value = false;
  });
};
defineExpose({ openDialog });
</script>
