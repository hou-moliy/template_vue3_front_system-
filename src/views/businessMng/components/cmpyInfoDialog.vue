<template>
  <el-dialog v-model="dialogVisible" :title="title" width="50%" @close="closeDialog">
    <el-form :model="form" ref="formRef" label-width="120px" label-position="left" :disabled="!isEdit">
      <privacyForm :disabled="!isEdit" ref="privacyFormRef">
        <template #center v-if="!isEdit">
          <el-form-item label="业务类型" prop="businessType">
            <el-input v-model="form.businessType" />
          </el-form-item>
          <el-form-item label="企业编号" prop="number">
            <el-input v-model="form.number" />
          </el-form-item>
          <el-form-item label="platformId" prop="platformId">
            <el-input v-model="form.platformId" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" />
          </el-form-item>
        </template>
        <template #footer v-else>
          <el-form-item label="账单公式" prop="billType">
            <el-select v-model="form.billType" placeholder="请选择账单公式">
              <el-option label="账单公式1" value="minute" />
              <el-option label="账单公式2" value="count" />
            </el-select>
          </el-form-item>
        </template>
      </privacyForm>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import privacyForm from "@/views/businessService/components/privacyForm.vue";
import useForm from "@/hooks/useForm";
const dialogVisible = ref(false);
const privacyFormRef = ref(null);
// 表单
const initialValues = {
  businessType: "",
  number: "",
  platformId: "",
  password: ""
};
const { form, formRef, resetForm } = useForm(initialValues);
// openDialog
const isEdit = ref(false);
let title = ref("");
const openDialog = ({ data, isEdit: edit }) => {
  console.log(data, edit);
  isEdit.value = edit;
  dialogVisible.value = true;
  title.value = isEdit.value ? "编辑企业信息" : "查看企业信息";
};

// 关闭弹窗
const closeDialog = () => {
  dialogVisible.value = false;
  resetForm();
  privacyFormRef?.value?.onReset();
};
defineExpose({ openDialog });
</script>
