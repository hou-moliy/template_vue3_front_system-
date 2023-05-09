<template>
  <el-form :model="form" ref="formRef" label-width="120px" label-position="left" style="width: 40%">
    <el-form-item label="标题">
      <el-input v-model="form.name" />
    </el-form-item>
    <el-form-item label="接入方式">
      <el-radio-group v-model="form.acceptType">
        <el-radio label="1">接入中移互联</el-radio>
        <el-radio label="2">接入北京融昱隐私号</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="业务模式">
      <el-select v-model="form.businessType" placeholder="请选择业务模式">
        <el-option label="AXB模式" value="AXB" />
        <el-option label="AXYB模式" value="AXYB" />
        <el-option label="AX模式" value="AX" />
        <el-option label="GXB模式" value="GXB" />
      </el-select>
    </el-form-item>
    <privacyForm v-if="form.acceptType == 2" />
    <el-form-item>
      <el-button>重置</el-button>
      <el-button type="primary" @click="onSubmit(formRef)">提交</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive } from "vue";
import privacyForm from "./components/privacyForm.vue";
const formRef = ref(null);
const form = reactive({
  name: "",
  acceptType: "2",
  businessType: "",
  cmpName: "",
  province: "",
  recordType: "",
  note: false,
  startOpen: false,
  start: "",
  ringOpen: false,
  ring: "",
  acceptOpen: false,
  accept: "",
  endOpen: false,
  end: "",
  forwardOpen: false,
  forward: "",
  whiteList: ""
});

const onSubmit = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
  });
};
</script>
<style></style>
