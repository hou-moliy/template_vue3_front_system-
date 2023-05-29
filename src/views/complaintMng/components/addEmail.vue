<template>
  <el-dialog v-model="dialogVisible" title="投诉台账详情" @close="handleResetForm">
    <el-form :inline="true" :model="form" ref="formRef" :rules="rules">
      <el-form-item label="收件人" prop="recipient">
        <el-input v-model="form.recipient" placeholder="请输入收件人" />
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
import { insertMail, updateMail } from "@/api/complaint";
import { ElMessage } from "element-plus";
const dialogVisible = ref(false);
const initialValues = {
  recipient: "",
  email: ""
};
let { form, formRef, resetForm, submitForm } = useForm(initialValues);
const { validateEmail } = useValidator(formRef, form);
const rules = reactive({
  recipient: [{ required: true, message: "请填写收件人姓名", trigger: "blur" }],
  email: [{ required: true, validator: validateEmail, trigger: "blur" }]
});
const isEdit = ref(false);
const openDialog = (data, edit) => {
  dialogVisible.value = true;
  isEdit.value = edit;
  if (isEdit.value) {
    Object.assign(form, data);
  }
};
const handleSubmit = () => {
  submitForm().then(() => {
    if (isEdit.value) {
      handleUpdate();
    } else {
      handleAdd();
    }
  });
};
const handleAdd = () => {
  insertMail(form).then(res => {
    if (res.cdoe == "0000") {
      ElMessage.success("新增成功");
    }
  });
};
const handleUpdate = () => {
  updateMail(form).then(res => {
    if (res.cdoe == "0000") {
      ElMessage.success("修改成功");
    }
  });
};
const handleResetForm = () => {
  resetForm().then(() => {
    dialogVisible.value = false;
  });
};
defineExpose({ openDialog });
</script>
