<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="closeDialog">
    <el-form :model="form" ref="formRef" label-width="120px" label-position="left" :disabled="!isEdit">
      <el-form-item label="用户名" prop="accountName">
        <el-input v-model="form.accountName" />
      </el-form-item>
      <el-form-item label="姓名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="二级部门(分公司)" prop="secondLevel">
        <el-input v-model="form.secondLevel" />
      </el-form-item>
      <el-form-item label="工号" prop="number">
        <el-input v-model="form.number" />
      </el-form-item>
      <el-form-item label="身份证号码" prop="idCrad">
        <el-input v-model="form.idCrad" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">返回</el-button>
        <el-button type="primary" @click="onSubmit" v-if="isEdit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import useForm from "@/hooks/useForm";
import { ElMessage } from "element-plus";
const dialogVisible = ref(false);
// 表单
const initialValues = {
  accountName: "",
  name: "",
  phone: "",
  email: "",
  secondLevel: "",
  thirdLevel: "",
  number: "",
  idCrad: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
// openDialog
const isEdit = ref(false);
let title = ref("");
const openDialog = ({ data, isEdit: edit }) => {
  console.log(data, edit);
  isEdit.value = edit;
  dialogVisible.value = true;
  title.value = isEdit.value ? "修改分公司属性" : "分公司详情";
};
// 提交表单
const onSubmit = () => {
  submitForm().then(() => {
    console.log(form);
    dialogVisible.value = false;
    ElMessage.success("提交成功");
    formRef.value.resetFields();
  });
};
// 关闭弹窗
const closeDialog = () => {
  resetForm();
  dialogVisible.value = false;
};
defineExpose({ openDialog });
</script>
