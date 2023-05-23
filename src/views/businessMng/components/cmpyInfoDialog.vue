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
          <el-form-item label="账单公式" prop="billId">
            <el-select v-model="form.billId" placeholder="请选择账单公式">
              <el-option label="账单公式1" value="minute" />
              <el-option label="账单公式2" value="count" />
            </el-select>
          </el-form-item>
        </template>
      </privacyForm>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">返回</el-button>
        <el-button type="primary" @click="onSubmit" v-if="isEdit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import privacyForm from "@/views/businessService/components/privacyForm.vue";
import { getInfo, updateInfo } from "@/api/businessCustomer";
import useForm from "@/hooks/useForm";
import { ElMessage } from "element-plus";
const dialogVisible = ref(false);
const privacyFormRef = ref(null);
// 表单
const initialValues = {
  businessType: "",
  number: "",
  platformId: "",
  password: "",
  id: ""
};
let { form, formRef, resetForm, submitForm } = useForm(initialValues);
// openDialog
const isEdit = ref(false);
let title = ref("");
const openDialog = ({ data, isEdit: edit }) => {
  form.groupId = data.groupId;
  isEdit.value = edit;
  dialogVisible.value = true;
  title.value = isEdit.value ? "编辑企业信息" : "查看企业信息";
  getInfoData();
};

// 关闭弹窗
const closeDialog = () => {
  dialogVisible.value = false;
  resetForm();
  privacyFormRef?.value?.onReset();
};
const onSubmit = () => {
  submitForm().then(() => {
    const data = {
      ...form,
      ...privacyFormRef.value?.form
    };
    handleUpdateInfo(data);
  });
};

const getInfoData = async () => {
  getInfo({ groupId: form.groupId }).then(res => {
    form = res.data;
  });
};
const handleUpdateInfo = data => {
  updateInfo(data).then(res => {
    if(res.code === 200) {
      ElMessage.success("修改成功");
      closeDialog();
    }
  });
};

defineExpose({ openDialog });
</script>
