<template>
  <el-dialog v-model="dialogVisible" title="审批操作" width="500px">
    <el-form ref="formRef" :model="form" :rules="rules">
      <el-form-item label="审批结果" prop="auditStatus">
        <model-select v-model="form.auditStatus" dictType="1" placeholder="请选择审批结果" />
      </el-form-item>
      <template v-if="form.userType == 1 && form.auditStatus == 1">
        <el-form-item label="客户经理" prop="managerId">
          <model-select v-model="form.managerId" dictType="1" placeholder="请选择客户经理" />
        </el-form-item>
        <el-form-item label="渠道商" prop="channelId">
          <model-select v-model="form.channelId" dictType="1" placeholder="请选择渠道商" />
        </el-form-item>
      </template>
      <el-form-item v-else label="审批不通过原因" prop="auditFailReason">
        <el-input v-model="form.auditFailReason" placeholder="请输入审核不通过的原因" />
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
import { AuthStore } from "@/stores/modules/auth";
import { auditUser } from "@/api/user";
const dialogVisible = ref(false);
const { userName, userId } = AuthStore();
const emits = defineEmits(["refresh"]);
//定义校验规则
const rules = reactive({
  auditStatus: [{ required: true, message: "请选择审批结果", trigger: "change" }]
});

// 表单数据
const initialValues = {
  auditStatus: "",
  auditFailReason: "",
  managerId: "",
  channelId: "",
  userId: "",
  auditUserId: userId,
  auditUserName: userName
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
// openDialog
const openDialog = e => {
  Object.assign(form, e);
  console.log(form, "ffffff");
  dialogVisible.value = true;
};
// 提交
const loading = ref(false);
const onSubmit = () => {
  submitForm().then(() => {
    loading.value = true;
    auditUser(form)
      .then(() => {
        handleReset();
        emits("refresh");
      })
      .catch(() => {
        loading.value = false;
      });
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
