<template>
  <!-- 企业详情 -->
  <el-dialog v-model="dialogVisible" :title="title" width="50%" @close="closeDialog">
    <el-form :model="form" ref="formRef" label-width="120px" label-position="left" :disabled="!isEdit" v-load="isLoading">
      <privacyForm :disabled="!isEdit" ref="privacyFormRef" :commonForm="form">
        <template #center v-if="!isEdit">
          <el-form-item label="业务类型" prop="bindingType">
            <template #default>
              <span>{{ getDictTypeValue("bindingType", form.bindingType) }}</span>
            </template>
          </el-form-item>
          <el-form-item label="企业编号" prop="groupId">
            <el-input v-model="form.groupId" />
          </el-form-item>
          <el-form-item label="platformId" prop="platformId">
            <el-input v-model="form.platformId" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="form.password" />
          </el-form-item>
        </template>
        <template #footer v-if="isEdit">
          <el-form-item label="账单公式" prop="formulaName">
            <model-select v-model="form.billId" dictType="formulaType" placeholder="请选择账单公式" />
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
import DictTypesStore from "@/stores/modules/dictTypes";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const { getDictTypeValue } = DictTypesStore();
const dialogVisible = ref(false);
const privacyFormRef = ref(null);

const emits = defineEmits(["submitSuccess"]);
// 表单
const initialValues = {
  bindingType: "",
  number: "",
  platformId: "",
  password: "",
  id: ""
};
let { form, formRef, resetForm, submitForm } = useForm(initialValues);
// openDialog
const isEdit = ref(false);
let title = ref("");
const openDialog = async ({ id, isEdit: edit }) => {
  try {
    form.id = id;
    isEdit.value = edit;
    title.value = isEdit.value ? "编辑企业信息" : "查看企业信息";
    dialogVisible.value = true;
    await getInfoData(id);
  } catch (e) {
    console.error(e);
  }
};

// 关闭弹窗
const closeDialog = () => {
  dialogVisible.value = false;
  Object.assign(form, initialValues);
  privacyFormRef?.value?.onReset();
  resetForm();
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

const getInfoData = async streamNumber => {
  await loadingWrapper(
    getInfo({ streamNumber }).then(res => {
      if (res.code == "0000" && res.data) {
        Object.assign(form, res.data);
      }
    })
  );
};
const handleUpdateInfo = data => {
  updateInfo(data).then(res => {
    if (res.code == "0000") {
      ElMessage.success("修改成功");
      emits("submitSuccess");
      closeDialog();
    }
  });
};

defineExpose({ openDialog });
</script>
