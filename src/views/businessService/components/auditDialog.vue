<template>
  <el-dialog v-model="dialogVisible" title="审核操作" width="500px">
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="审核结果" prop="auditStatus">
        <el-select v-model="form.auditStatus">
          <el-option label="通过" :value="2" />
          <el-option label="不通过" :value="1" />
        </el-select>
      </el-form-item>
      <template v-if="form.auditStatus === 2">
        <el-form-item label="账单公式" prop="billId">
          <el-select v-model="form.billId" placeholder="请选择账单公式">
            <el-option label="不打折扣" :value="0" />
            <el-option label="统一9折" :value="9" />
          </el-select>
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
//定义校验规则
const rules = reactive({
  auditStatus: [{ required: true, message: "请选择操作结果", trigger: "blur" }]
});
// 审核表单
const initialValues = {
  result: 1,
  reason: "",
  formula: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
// openDialog
const id = ref("");
const openDialog = ({ streamNumber }) => {
  id.value = streamNumber;
  dialogVisible.value = true;
};
// 提交
const handleSubitForm = () => {
  submitForm().then(() => {
    loading.value = true;
    const data = {
      id: id.value,
      ...form,
      userName,
      userId
    };
    audit(data)
      .then(() => {
        handleResetForm();
        ElMessage.success("审核成功");
      })
      .catch(() => {
        loading.value = false;
        ElMessage.error("审核失败");
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
