<template>
  <!-- 渠道商详情 -->
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
        <el-button type="primary" @click="onSubmit" v-if="isEdit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import useForm from "@/hooks/useForm";
import { ElMessage } from "element-plus";
import { updateGroup } from "@/api/channel";
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
let { form, formRef, resetForm, submitForm } = useForm(initialValues);
// openDialog
const isEdit = ref(false);
let title = ref("");
const openDialog = ({ data, isEdit: edit }) => {
  isEdit.value = edit;
  dialogVisible.value = true;
  Object.assign(form, data);
  title.value = isEdit.value ? "修改渠道商属性" : "渠道商详情";
};
// 提交表单
const onSubmit = () => {
  submitForm().then(() => {
    updateGroup(form).then(res => {
      if (res.code === "0000") {
        ElMessage.success("提交成功");
      }
    });
  });
};
// 关闭弹窗
const closeDialog = () => {
  dialogVisible.value = false;
  resetForm();
};
defineExpose({ openDialog });
</script>
