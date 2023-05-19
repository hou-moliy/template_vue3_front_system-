<template>
  <el-dialog v-model="dialogVisible" title="审批操作" width="500px">
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="审批结果" prop="result">
        <el-select v-model="form.result">
          <el-option label="通过" :value="1" />
          <el-option label="不通过" :value="0" />
        </el-select>
      </el-form-item>
      <template v-if="form.type === '1' && form.result === 1">
        <el-form-item label="客户经理" prop="manager">
          <el-select v-model="form.manager" placeholder="请选择客户经理">
            <el-option label="客户经理1" value="shanghai" />
            <el-option label="客户经理1" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="渠道商" prop="channel">
          <el-select v-model="form.channel" placeholder="请选择渠道商">
            <el-option label="渠道商1" value="shanghai" />
            <el-option label="渠道商1" value="beijing" />
          </el-select>
        </el-form-item>
      </template>
      <el-form-item v-else label="审批不通过原因" prop="reason">
        <el-input v-model="form.reason" placeholder="请输入审核不通过的原因" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleReset">取消</el-button>
        <el-button type="primary" @click="onSubmit" :loading="loading">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import useForm from "@/hooks/useForm";
const dialogVisible = ref(false);
//定义校验规则
const rules = reactive({
  result: [{ required: true, message: "请选择操作结果", trigger: "blur" }],
  manager: [{ required: true, message: "请选择客户经理", trigger: "blur" }],
  reason: [{ required: true, message: "审核原因必填", trigger: "blur" }]
});
const loading = ref(false);
// 表单数据
const initialValues = {
  result: "",
  channel: "",
  reason: "",
  manager: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
// openDialog
const openDialog = e => {
  form.result = e.info;
  form.type = e.type;
  dialogVisible.value = true;
};
// 提交
const onSubmit = () => {
  submitForm().then(() => {
    loading.value = true;
  });
};
// 重置，关闭弹窗
const handleReset = () => {
  resetForm();
  dialogVisible.value = false;
  loading.value = false;
};
defineExpose({ openDialog });
</script>
