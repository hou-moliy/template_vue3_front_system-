<template>
  <el-form :model="form" ref="formRef" label-width="120px" label-position="left" :rules="privacyRules" :disabled="disabled">
    <el-form-item label="企业名称" prop="cmpName">
      <el-input v-model="form.cmpName" placeholder="请输入企业名称" />
    </el-form-item>
    <slot name="center"></slot>
    <el-form-item label="归属省份地市" prop="province">
      <regionSelect v-model="address" :level="2" />
    </el-form-item>
    <el-form-item label="录音模式" prop="recordType">
      <el-select v-model="form.recordType" placeholder="请选择归属省份地市">
        <el-option label="全录音" value="bj" />
        <el-option label="由中间号订单指定是否录音" value="sh" />
      </el-select>
    </el-form-item>
    <el-form-item label="是否开通短信" prop="note">
      <el-switch v-model="form.note" />
    </el-form-item>
    <el-form-item label="是否接收呼叫起始事件" prop="start">
      <el-switch v-model="form.startOpen" />
      <el-input v-model="form.start" />
    </el-form-item>
    <el-form-item label="是否接收呼叫振铃事件" prop="ring">
      <el-switch v-model="form.ringOpen" />
      <el-input v-model="form.ring" />
    </el-form-item>
    <el-form-item label="是否接收呼叫接听事件" prop="accept">
      <el-switch v-model="form.acceptOpen" />
      <el-input v-model="form.accept" />
    </el-form-item>
    <el-form-item label="是否接收呼叫结束事件" prop="end">
      <el-switch v-model="form.endOpen" />
      <el-input v-model="form.end" />
    </el-form-item>
    <el-form-item label="是否接收短信转发事件" prop="forward">
      <el-switch v-model="form.forwardOpen" />
      <el-input v-model="form.forward" />
    </el-form-item>
    <el-form-item label="企业ip白名单列表" prop="whiteList">
      <el-input v-model="form.whiteList" />
    </el-form-item>
    <slot name="footer"></slot>
  </el-form>
</template>
<script setup>
import useRules from "../hooks/useRules.ts";
import { useRegion } from "@/hooks/useRegion.js";
import useForm from "@/hooks/useForm";
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});
const initialValues = {
  cmpName: "",
  province: "",
  city: "",
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
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
// 地址
const { address, setAddress } = useRegion(formRef, form);
const { privacyRules } = useRules(form);
const onSubmit = () => {
  submitForm().then(() => {});
};
const onReset = () => {
  resetForm();
  setAddress([]);
};
defineExpose({ form, onSubmit, onReset });
</script>
<style></style>
