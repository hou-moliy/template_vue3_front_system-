<template>
  <el-dialog v-model="dialogVisible" title="审核操作" width="500px">
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="审核结果" prop="result">
        <el-select v-model="form.result">
          <el-option label="通过" :value="1" />
          <el-option label="不通过" :value="0" />
        </el-select>
      </el-form-item>
      <template v-if="form.result === 1">
        <el-form-item label="账单公式" prop="formula">
          <el-select v-model="form.formula" placeholder="请选择账单公式">
            <el-option label="不打折扣" value="shanghai" />
            <el-option label="统一9折" value="beijing" />
          </el-select>
        </el-form-item>
      </template>
      <el-form-item v-else label="审批不通过原因" prop="reason">
        <el-input v-model="form.reason" placeholder="请输入审核不通过的原因" />
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
const dialogVisible = ref(false);
const loading = ref(false);
//定义校验规则
const rules = reactive({
  result: [{ required: true, message: "请选择操作结果", trigger: "blur" }],
  formula: [{ required: true, message: "请选择账单公式", trigger: "blur" }],
  reason: [{ required: true, message: "审核原因必填", trigger: "blur" }]
});
// 审核表单
const initialValues = {
  result: 1,
  reason: "",
  formula: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
// openDialog
const openDialog = () => {
  dialogVisible.value = true;
};
// 提交
const handleSubitForm = () => {
  submitForm()
    .then(() => {
      loading.value = true;
      console.log("表单提交成功");
    })
    .catch(() => {
      console.log("表单提交失败");
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
