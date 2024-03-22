<template>
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="省份地市">
      <regionSelect v-model="address" />
    </el-form-item>
    <el-form-item>
      <el-button @click="handleReset">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { onMounted } from "vue";
import useRegion from "@/hooks/useRegion.js";
import useForm from "@/hooks/useForm";
// 表单
const initialValues = {
  provinceId: "",
  cityId: ""
};
const { form, formRef, resetForm } = useForm(initialValues);
const { address, setAddress, getAddress } = useRegion(formRef, form);
// 重置
const handleReset = () => {
  resetForm();
  setAddress([]);
};
onMounted(() => {
  // [省份id, 地市id]
  setAddress([13, 27]);
});
</script>
