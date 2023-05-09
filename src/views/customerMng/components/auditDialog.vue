<template>
  <el-dialog v-model="dialogVisible" title="审批操作" width="500px">
    <el-form ref="auditFormRef" :model="auditForm" :rules="auditRules">
      <el-form-item label="审批结果" prop="result">
        <el-select v-model="auditForm.result">
          <el-option label="通过" :value="1" />
          <el-option label="不通过" :value="0" />
        </el-select>
      </el-form-item>
      <template v-if="auditForm.type === '1' && auditForm.result === 1">
        <el-form-item label="客户经理" prop="manager">
          <el-select v-model="auditForm.manager" placeholder="请选择客户经理">
            <el-option label="客户经理1" value="shanghai" />
            <el-option label="客户经理1" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="渠道商" prop="channel">
          <el-select v-model="auditForm.channel" placeholder="请选择渠道商">
            <el-option label="渠道商1" value="shanghai" />
            <el-option label="渠道商1" value="beijing" />
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
  auditForm.result = e.info;
  auditForm.type = e.type;
  dialogVisible.value = true;
};

// 审核表单
const auditForm = reactive({
  result: "",
  channel: "",
  reason: "",
  manager: ""
});
//定义auditFormRef校验规则
const auditRules = reactive({
  result: [{ required: true, message: "请选择操作结果", trigger: "blur" }],
  manager: [{ required: true, message: "请选择客户经理", trigger: "blur" }],
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
};

defineExpose({ openDialog });
</script>
