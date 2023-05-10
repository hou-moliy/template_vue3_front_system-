<template>
  <el-form :model="privacyForm" ref="privacyFormRef" label-width="120px" :rules="privacyRules" :disabled="disabled">
    <el-form-item label="企业名称" prop="cmpName">
      <el-input v-model="privacyForm.cmpName" placeholder="请输入企业名称" />
    </el-form-item>
    <el-form-item label="归属省份地市" prop="province">
      <el-select v-model="privacyForm.province" placeholder="请选择归属省份地市">
        <el-option label="北京" value="bj" />
        <el-option label="上海" value="sh" />
        <el-option label="四川" value="sc" />
      </el-select>
    </el-form-item>
    <el-form-item label="录音模式" prop="recordType">
      <el-select v-model="privacyForm.recordType" placeholder="请选择归属省份地市">
        <el-option label="全录音" value="bj" />
        <el-option label="由中间号订单指定是否录音" value="sh" />
      </el-select>
    </el-form-item>
    <el-form-item label="是否开通短信" prop="note">
      <el-switch v-model="privacyForm.note" />
    </el-form-item>
    <el-form-item label="是否接收呼叫起始事件" prop="start">
      <el-switch v-model="privacyForm.startOpen" />
      <el-input v-model="privacyForm.start" />
    </el-form-item>
    <el-form-item label="是否接收呼叫振铃事件" prop="ring">
      <el-switch v-model="privacyForm.ringOpen" />
      <el-input v-model="privacyForm.ring" />
    </el-form-item>
    <el-form-item label="是否接收呼叫接听事件" prop="accept">
      <el-switch v-model="privacyForm.acceptOpen" />
      <el-input v-model="privacyForm.accept" />
    </el-form-item>
    <el-form-item label="是否接收呼叫结束事件" prop="end">
      <el-switch v-model="privacyForm.endOpen" />
      <el-input v-model="privacyForm.end" />
    </el-form-item>
    <el-form-item label="是否接收短信转发事件" prop="forward">
      <el-switch v-model="privacyForm.forwardOpen" />
      <el-input v-model="privacyForm.forward" />
    </el-form-item>
    <el-form-item label="企业ip白名单列表" prop="whiteList">
      <el-input v-model="privacyForm.whiteList" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive, ref } from "vue";
import useRules from "../hooks/useRules.ts";
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});

const privacyFormRef = ref(null);
const privacyForm = reactive({
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
const { privacyRules } = useRules(privacyForm);
const onSubmit = () => {
  if (!privacyFormRef.value) return;
  privacyFormRef.value.validate(async valid => {
    if (!valid) return;
  });
};
defineExpose({ privacyForm, onSubmit });
</script>
<style></style>
