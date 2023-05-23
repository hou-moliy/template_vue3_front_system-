<template>
  <el-form :model="form" ref="formRef" label-width="120px" label-position="left" :rules="rules" :disabled="disabled">
    <el-form-item label="企业名称" prop="groupName">
      <el-input v-model="form.groupName" placeholder="请输入企业名称" />
    </el-form-item>
    <slot name="center"></slot>
    <el-form-item label="归属省份地市" prop="province">
      <regionSelect v-model="address" :level="2" />
    </el-form-item>
    <el-form-item label="录音模式" prop="recordMode">
      <el-select v-model="form.recordMode" placeholder="请选择归属省份地市">
        <el-option label="全录音" value="bj" />
        <el-option label="由中间号订单指定是否录音" value="sh" />
      </el-select>
    </el-form-item>
    <el-form-item label="是否开通短信" prop="smsMode">
      <el-switch v-model="form.smsMode" />
    </el-form-item>
    <el-form-item label="是否接收呼叫起始事件" prop="startCallUrl">
      <el-switch v-model="switchForm.start" />
      <el-input v-model="form.startCallUrl" />
    </el-form-item>
    <el-form-item label="是否接收呼叫振铃事件" prop="ringingUrl">
      <el-switch v-model="switchForm.ring" />
      <el-input v-model="form.ringingUrl" />
    </el-form-item>
    <el-form-item label="是否接收呼叫接听事件" prop="connectUrl">
      <el-switch v-model="switchForm.connect" />
      <el-input v-model="form.connectUrl" />
    </el-form-item>
    <el-form-item label="是否接收呼叫结束事件" prop="endCallUrl">
      <el-switch v-model="switchForm.end" />
      <el-input v-model="form.endCallUrl" />
    </el-form-item>
    <el-form-item label="是否接收短信转发事件" prop="smsUrl">
      <el-switch v-model="switchForm.sms" />
      <el-input v-model="form.smsUrl" />
    </el-form-item>
    <el-form-item label="企业ip白名单列表" prop="ipList">
      <el-input v-model="form.ipList" />
    </el-form-item>
    <slot name="footer"></slot>
  </el-form>
</template>
<script setup>
import { useRegion } from "@/hooks/useRegion.js";
import useRules from "../hooks/useRules";
import useBusiness from "../hooks/useBusiness";
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  commonForm: {
    type: Object,
    default: () => ({})
  }
});
const initialValues = {
  groupName: "",
  recordMode: "",
  smsMode: "",
  startCallUrl: "",
  ringingUrl: "",
  connectUrl: "",
  endCallUrl: "",
  smsUrl: "",
  ipList: ""
};
const { onSubmit, form, formRef, resetForm } = useBusiness(initialValues, props.commonForm);
// 地址
const { address, setAddress } = useRegion(formRef, form);
const { rules, switchForm } = useRules();
const onReset = () => {
  resetForm();
  setAddress([]);
};
defineExpose({ form, onSubmit, onReset });
</script>
