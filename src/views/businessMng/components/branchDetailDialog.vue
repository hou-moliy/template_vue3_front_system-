<template>
  <!-- 分公司账户详情 -->
  <el-dialog v-model="dialogVisible" :title="title" @close="closeDialog">
    <el-form :model="form" ref="formRef" label-width="120px" label-position="left" :disabled="!isEdit">
      <el-form-item label="用户名" prop="userName">
        <el-input v-model="form.userName" />
      </el-form-item>
      <el-form-item label="手机号" prop="phoneNumber">
        <el-input v-model="form.phoneNumber" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item label="二级部门(分公司)" prop="deptName">
        <el-input v-model="form.deptName" />
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
import { branchDetail } from "@/api/branch";
const dialogVisible = ref(false);

const emits = defineEmits(["submitSuccess"]);
// 表单
const initialValues = {
  userName: "",
  phoneNumber: "",
  email: "",
  deptName: "",
  id: "",
  cardId: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
// openDialog
const isEdit = ref(false);
let title = ref("");
const openDialog = async ({ id, isEdit: edit }) => {
  try {
    isEdit.value = edit;
    dialogVisible.value = true;
    title.value = isEdit.value ? "修改分公司属性" : "分公司详情";
    await getDetail(id);
  } catch (error) {
    console.error(error);
  }
};
const getDetail = async branchId => {
  await branchDetail({ branchId }).then(res => {
    if (res.code == "0000") {
      Object.assign(form, res.data);
    }
  });
};
// 提交表单
const onSubmit = () => {
  submitForm().then(() => {
    console.log(form);
    dialogVisible.value = false;
    ElMessage.success("提交成功");
    emits("submitSuccess");
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
