<template>
  <el-form
    :model="form"
    ref="formRef"
    :rules="commonRules"
    label-width="120px"
    label-position="left"
    style="width: 50%"
    :disabled="!isEdit"
  >
    <el-form-item label="标题" prop="name">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="接入方式" prop="acceptType">
      <el-radio-group v-model="form.acceptType">
        <el-radio label="1">接入中移互联</el-radio>
        <el-radio label="2">接入北京融昱隐私号</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="业务模式" prop="businessType">
      <el-select v-model="form.businessType" placeholder="请选择业务模式">
        <el-option label="AXB模式" value="AXB" />
        <el-option label="AXYB模式" value="AXYB" />
        <el-option label="AX模式" value="AX" />
        <el-option label="GXB模式" value="GXB" />
      </el-select>
    </el-form-item>
    <privacyForm ref="privacyFormRef" v-if="form.acceptType == 2" :disabled="!isEdit" />
    <interForm ref="interFormRef" v-if="form.acceptType == 1" :disabled="!isEdit" />
    <el-form-item v-if="isEdit">
      <el-button @click="onReset">重置</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="onReset">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, onMounted } from "vue";
import privacyForm from "./components/privacyForm.vue";
import interForm from "./components/interForm.vue";
import useRules from "./hooks/useRules";
import { useRoute } from "vue-router";
import useForm from "@/hooks/useForm";
const route = useRoute();
const privacyFormRef = ref(null);
const interFormRef = ref(null);
const isEdit = ref(true);
const initialValues = {
  name: "",
  acceptType: "1",
  businessType: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
const { commonRules } = useRules();
const onSubmit = () => {
  submitForm()
    .then(() => {
      privacyFormRef.value?.onSubmit();
      // loading.value = true;
      // privacyFormRef?.value?.onSubmit();
      console.log(privacyFormRef?.value?.form);
    })
    .catch(() => privacyFormRef.value?.onSubmit());
};
const onReset = () => {
  resetForm();
  privacyFormRef?.value?.onReset();
  interFormRef?.value?.onReset();
};
onMounted(() => {
  isEdit.value = route.query.isEdit === "true" ? true : false;
});
</script>
<style></style>
