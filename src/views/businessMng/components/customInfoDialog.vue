<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="closeDialog">
    <el-form :model="form" ref="formRef" label-width="120px" label-position="left" :disabled="!isEdit">
      <el-form-item label="用户名" prop="accountName">
        <el-input v-model="form.accountName" />
      </el-form-item>
      <el-form-item label="姓名" prop="userName">
        <el-input v-model="form.userName" />
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="form.phoneNumber" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="二级部门(分公司)" prop="deptId">
        <el-input v-model="form.deptId" />
      </el-form-item>
      <el-form-item label="三级部门" prop="tdName">
        <el-input v-model="form.tdName" />
      </el-form-item>
      <el-form-item label="工号" prop="id">
        <el-input v-model="form.id" />
      </el-form-item>
      <el-form-item label="身份证号码" prop="cardId">
        <el-input v-model="form.cardId" />
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
import { managerUpdate } from "@/api/manager";
const dialogVisible = ref(false);
// 表单
const initialValues = {
  cardId: "",
  deptId: 0,
  email: "",
  id: "",
  phoneNumber: "",
  tdName: "",
  userId: "",
  userName: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
// openDialog
const isEdit = ref(false);
let title = ref("");
const openDialog = ({ data, isEdit: edit }) => {
  Object.assign(form, data);
  isEdit.value = edit;
  dialogVisible.value = true;
  title.value = isEdit.value ? "修改客户经理属性" : "客户经理详情";
};

// 提交表单
const onSubmit = () => {
  submitForm().then(() => {
    managerUpdate(form).then(res => {
      if(res.code === 200) {
        ElMessage.success("提交成功");
        closeDialog();
      }
    });
  });
};
// 关闭弹窗
const closeDialog = () => {
  resetForm().then(() => (dialogVisible.value = false));
};
defineExpose({ openDialog });
</script>
