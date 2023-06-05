<template>
  <el-dialog v-model="dialogVisible" title="新增直接发送企业列表" @close="handleResetForm" append-to-body>
    <el-form :model="form" ref="formRef" :rules="rules">
      <el-form-item label="企业客户" prop="userId">
        <model-select v-model="form.userId" dictType="businessUser" placeholder="请选择企业客户" multiple />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="handleResetForm">返回</el-button>
      <el-button type="primary" @click="handleSubmit" :loading="loading">确定</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";
import useForm from "@/hooks/useForm";
import { insertEnterpriseCsMail } from "@/api/complaint";
import { ElMessage } from "element-plus";
const dialogVisible = ref(false);
const loading = ref(false);
const emits = defineEmits(["submitSuccess"]);
const initialValues = {
  userId: []
};
let { form, formRef, resetForm, submitForm } = useForm(initialValues);
const rules = reactive({
  userId: [{ required: true, message: "请选择企业客户", trigger: "blur", type: "array" }]
});
const openDialog = () => {
  dialogVisible.value = true;
};
const handleSubmit = () => {
  submitForm().then(() => {
    const userIds = form.userId.join(",");
    loading.value = true;
    insertEnterpriseCsMail({ userIds })
      .then(res => {
        if (res.code == "0000") {
          ElMessage.success("新增成功");
          handleResetForm();
          emits("submitSuccess");
        }
      })
      .finally(() => {
        loading.value = false;
      });
  });
};
const handleResetForm = () => {
  resetForm().then(() => {
    dialogVisible.value = false;
  });
};
defineExpose({ openDialog });
</script>
