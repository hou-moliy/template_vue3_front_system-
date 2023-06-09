<template>
  <el-card class="box-card">
    <template #header> 联系方式 </template>
    <el-form :model="form" ref="formRef" :disabled="disabled">
      <div class="form-item-wrap">
        <el-form-item label="联系人姓名" prop="contactName" placeholder="请输入联系人姓名">
          <el-input v-model="form.contactName" />
        </el-form-item>
        <el-form-item label="联系人电话" prop="contactMobile" placeholder="请输入联系人电话">
          <el-input v-model="form.contactMobile" />
        </el-form-item>
        <el-form-item label="客户经理姓名" prop="managerName" placeholder="请输入客户经理姓名">
          <el-input v-model="form.managerName" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="客户经理电话" prop="managerMobile" placeholder="请输入客户经理电话">
          <el-input v-model="form.managerMobile" />
        </el-form-item>
        <el-form-item label="产品支撑姓名" prop="productName" placeholder="请输入产品支撑姓名">
          <el-input v-model="form.productName" />
        </el-form-item>
        <el-form-item label="产品支撑电话" prop="productMobile" placeholder="请输入产品支撑电话">
          <el-input v-model="form.productMobile" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="提单人姓名" prop="pickerName" placeholder="请输入提单人姓名">
          <el-input v-model="form.pickerName" />
        </el-form-item>
        <el-form-item label="提单人电话" prop="pickerMobile" placeholder="请输入提单人电话">
          <el-input v-model="form.pickerMobile" />
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>
<script setup>
import useForm from "@/hooks/useForm";
import { onMounted } from "vue";
import mittBus from "@/utils/mittBus";
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});
const initialValues = {
  contactMobile: "",
  contactName: "",
  managerMobile: "",
  managerName: "",
  pickerMobile: "",
  pickerName: "",
  productMobile: "",
  productName: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
onMounted(() => {
  mittBus.on("setForm", data => {
    if (data?.contactInfo) {
      Object.assign(form, data.contactInfo);
    }
  });
});
defineExpose({ form, resetForm, submitForm });
</script>
<style lang="scss" scoped>
@import url("../scss/common.scss");
</style>
