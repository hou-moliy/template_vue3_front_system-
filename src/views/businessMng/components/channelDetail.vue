<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="closeDialog">
    <el-form :model="form" ref="formRef" label-width="120px" label-position="left" :disabled="!isEdit">
      <el-form-item label="企业名称" prop="cmpyName">
        <el-input v-model="form.cmpyName" />
      </el-form-item>
      <el-form-item label="法人联系人名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="法人身份证号码" prop="idCrad">
        <el-input v-model="form.idCrad" />
      </el-form-item>
      <el-form-item label="企业联系人名称" prop="accoutName">
        <el-input v-model="form.accoutName" />
      </el-form-item>
      <el-form-item label="企业联系人电话" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="企业联系人邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">返回</el-button>
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
  cmpyName: "",
  name: "",
  idCrad: "",
  accoutName: "",
  phone: "",
  email: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
// openDialog
const isEdit = ref(false);
let title = ref("");
const openDialog = ({ data, isEdit: edit }) => {
  console.log(data, edit);
  isEdit.value = edit;
  dialogVisible.value = true;
  title.value = isEdit.value ? "修改渠道商属性" : "渠道商详情";
};
// 提交表单
const onSubmit = () => {
  submitForm().then(() => {
    dialogVisible.value = false;
    ElMessage.success("提交成功");
    resetForm();
  });
};
// 关闭弹窗
const closeDialog = () => {
  dialogVisible.value = false;
  resetForm();
};
defineExpose({ openDialog });
</script>
