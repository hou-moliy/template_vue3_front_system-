<template>
  <el-form :model="form" ref="formRef" label-position="left" style="width: 50%">
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" placeholder="请输入标题" />
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-radio-group v-model="form.type">
        <el-radio label="1">指定号码量订购</el-radio>
        <el-radio label="2">指定号码订购</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="企业客户" prop="cmpy">
      <el-input v-model="form.cmpy" />
    </el-form-item>
    <el-form-item label="省份地市" prop="province">
      <regionSelect v-model="address" :level="2" />
    </el-form-item>
    <el-form-item label="号码量" prop="phoneNum">
      <el-input v-model="form.phoneNum" />
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm">取消</el-button>
      <el-button type="primary" @click="onSubmit"> 提交 </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import regionSelect from "@/components/regionSelect/index.vue";
import { useRegion } from "@/hooks/useRegion.js";
import useForm from "@/hooks/useForm";
// 表单
const initialValues = {
  title: "",
  type: "",
  cmpy: "",
  province: "",
  city: "",
  phoneNum: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
const { address, setAddress } = useRegion(formRef, form);
// 提交表单
const onSubmit = () => {
  submitForm().then(() => {
    handleReset();
    ElMessage.success("提交成功");
  });
};
// 重置
const handleReset = () => {
  resetForm();
  setAddress([]);
};
</script>
