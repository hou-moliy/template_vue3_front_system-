<template>
  <el-dialog v-model="dialogVisible" title="审核操作" width="500px">
    <el-form ref="auditFormRef" :model="auditForm" :rules="auditRules">
      <el-form-item label="审核结果" prop="result">
        <el-select v-model="auditForm.result">
          <el-option label="通过" :value="1" />
          <el-option label="不通过" :value="0" />
        </el-select>
      </el-form-item>
      <template v-if="auditForm.result === 1">
        <el-form-item label="账单公式" prop="formula">
          <el-select v-model="auditForm.formula" placeholder="请选择账单公式">
            <el-option label="不打折扣" value="shanghai" />
            <el-option label="统一9折" value="beijing" />
          </el-select>
        </el-form-item>
      </template>
      <el-form-item v-else label="审批不通过原因" prop="reason">
        <el-input v-model="auditForm.reason" placeholder="请输入审核不通过的原因" />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(auditFormRef)">取消</el-button>
        <el-button type="primary" @click="onSubmit(auditFormRef)" :loading="loading">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
const dialogVisible = ref(false);
const auditFormRef = ref(null);
// openDialog
const openDialog = e => {
  dialogVisible.value = true;
};

// 审核表单
const auditForm = reactive({
  result: 1,
  reason: "",
  formula: ""
});
//定义auditFormRef校验规则
const auditRules = reactive({
  result: [{ required: true, message: "请选择操作结果", trigger: "blur" }],
  formula: [{ required: true, message: "请选择账单公式", trigger: "blur" }],
  reason: [{ required: true, message: "审核原因必填", trigger: "blur" }]
});

// 提交
const loading = ref(false);
const onSubmit = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
  });
};
// 重置，关闭弹窗
const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
  dialogVisible.value = false;
  loading.value = false;
};

defineExpose({ openDialog });
</script>
