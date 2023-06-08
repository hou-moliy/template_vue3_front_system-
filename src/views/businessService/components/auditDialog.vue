<template>
  <el-dialog v-model="dialogVisible" title="审核操作" width="500px" @close="handleResetForm">
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="审核结果" prop="auditStatus">
        <el-select v-model="form.auditStatus">
          <el-option label="通过" value="2" />
          <el-option label="不通过" value="1" />
        </el-select>
      </el-form-item>
      <template v-if="form.auditStatus == 2">
        <el-form-item label="账单公式" prop="billId">
          <model-select v-model="form.billId" dictType="formulaType" placeholder="请选择账单公式" />
        </el-form-item>
      </template>
      <el-form-item v-else label="审批不通过原因" prop="auditFailedReason">
        <el-input v-model="form.auditFailedReason" placeholder="请输入审核不通过的原因" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleResetForm">取消</el-button>
        <el-button type="primary" @click="handleSubitForm" :loading="loading">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import useForm from "@/hooks/useForm";
import { audit } from "@/api/businessService";
import { ElMessage } from "element-plus";
import { AuthStore } from "@/stores/modules/auth";
const { userId, userName } = AuthStore();
const dialogVisible = ref(false);
const loading = ref(false);
const emits = defineEmits(["submitSuccess"]);
//定义校验规则
const rules = reactive({
  auditStatus: [{ required: true, message: "请选择操作结果", trigger: "blur" }]
});
// 审核表单
const initialValues = {
  auditStatus: "2",
  auditFailedReason: "",
  billId: "",
  userName,
  userId,
  id: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
// openDialog
const openDialog = ({ streamNumber }) => {
  form.id = streamNumber;
  dialogVisible.value = true;
};
// 提交
const handleSubitForm = () => {
  submitForm().then(() => {
    loading.value = true;
    // form.billId = parseInt(form.billId);
    audit(form)
      .then(() => {
        handleResetForm();
        ElMessage.success("审核成功");
        emits("submitSuccess");
      })
      .finally(() => {
        loading.value = false;
      });
  });
};
// 重置，关闭弹窗
const handleResetForm = () => {
  resetForm().then(() => {
    dialogVisible.value = false;
    loading.value = false;
  });
};

defineExpose({ openDialog });
</script>
