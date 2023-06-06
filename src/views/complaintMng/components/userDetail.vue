<template>
  <!-- 企业客户详情 -->
  <el-dialog v-model="dialogVisible" :title="title" @close="closeDialog">
    <el-form :model="form" ref="formRef" label-width="120px" label-position="left" :disabled="!isEdit">
      <el-form-item label="企业名称" prop="groupName">
        <el-input v-model="form.groupName" />
      </el-form-item>
      <el-form-item label="法人联系人名称" prop="legalName">
        <el-input v-model="form.legalName" />
      </el-form-item>
      <el-form-item label="法人身份证号码" prop="cardId">
        <el-input v-model="form.cardId" />
      </el-form-item>
      <el-form-item label="企业联系人名称" prop="userName">
        <el-input v-model="form.userName" />
      </el-form-item>
      <el-form-item label="企业联系人电话" prop="phoneNumber">
        <el-input v-model="form.phoneNumber" />
      </el-form-item>
      <el-form-item label="企业联系人邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">返回</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import useForm from "@/hooks/useForm";
import { businessUserDetail } from "@/api/businessCustomer";
const dialogVisible = ref(false);
// 表单
const initialValues = {
  groupName: "",
  legalName: "",
  cardId: "",
  userName: "",
  phoneNumber: "",
  email: "",
  userId: ""
};
let { form, formRef, resetForm } = useForm(initialValues);
// openDialog
const isEdit = ref(false);
let title = ref("");
const openDialog = async ({ id, isEdit: edit }) => {
  try {
    form.userId = id;
    isEdit.value = edit;
    title.value = isEdit.value ? "修改企业客户账户详情" : "企业客户账户详情";
    await getInfoData(id);
  } catch (e) {
    console.error(e);
  }
};
const getInfoData = async userId => {
  await businessUserDetail({ userId }).then(res => {
    if (res.code == "0000" && res.data) {
      Object.assign(form, res.data);
      dialogVisible.value = true;
    }
  });
};
// 关闭弹窗
const closeDialog = () => {
  dialogVisible.value = false;
  resetForm();
};
defineExpose({ openDialog });
</script>
