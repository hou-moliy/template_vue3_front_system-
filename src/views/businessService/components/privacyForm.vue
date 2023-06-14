<template>
  <el-form :model="form" ref="formRef" label-width="120px" label-position="left" :rules="rules" :disabled="disabled">
    <el-form-item label="企业名称" prop="groupName">
      <el-input v-model="form.groupName" placeholder="请输入企业名称" />
    </el-form-item>
    <slot name="center"></slot>
    <el-form-item label="归属省份地市" prop="cityId">
      <regionSelect v-model="address" />
    </el-form-item>
    <el-form-item label="录音模式" prop="recordMode">
      <el-select v-model="form.recordMode" placeholder="请选择录音模式">
        <el-option label="全不录音" value="0" />
        <el-option label="全录音" value="1" />
				<el-option label="跟随订单，绑定未指定默认不开启录音" value="2" />
				<el-option label="跟随订单，绑定未指定默认开启录音" value="3" />
      </el-select>
    </el-form-item>
    <el-form-item label="是否开通短信" prop="smsMode">
      <el-switch v-model="form.smsMode" active-value="1" inactive-value="0" />
    </el-form-item>
    <el-form-item label="是否接收呼叫起始事件" prop="startCallUrl">
      <el-switch v-model="switchForm.start" @change="onSwitchChange('startCallUrl')" />
      <el-input v-model="form.startCallUrl" />
    </el-form-item>
    <el-form-item label="是否接收呼叫振铃事件" prop="ringingUrl">
      <el-switch v-model="switchForm.ring" @change="onSwitchChange('ringingUrl')" />
      <el-input v-model="form.ringingUrl" />
    </el-form-item>
    <el-form-item label="是否接收呼叫接听事件" prop="connectUrl">
      <el-switch v-model="switchForm.connect" @change="onSwitchChange('connectUrl')" />
      <el-input v-model="form.connectUrl" />
    </el-form-item>
    <el-form-item label="是否接收呼叫结束事件" prop="endCallUrl">
      <el-switch v-model="switchForm.end" @change="onSwitchChange('endCallUrl')" />
      <el-input v-model="form.endCallUrl" />
    </el-form-item>
    <el-form-item label="是否接收短信转发事件" prop="smsUrl">
      <el-switch v-model="switchForm.sms" @change="onSwitchChange('smsUrl')" />
      <el-input v-model="form.smsUrl" />
    </el-form-item>
    <el-form-item label="企业ip白名单列表" prop="ipList">
      <el-input v-model="form.ipList" />
    </el-form-item>
    <slot name="footer"></slot>
  </el-form>
</template>
<script setup>
import { watch } from "vue";
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
  cityId: "",
  provinceId: "",
  smsMode: 0,
  startCallUrl: "",
  ringingUrl: "",
  connectUrl: "",
  endCallUrl: "",
  smsUrl: "",
  ipList: ""
};
const { onSubmit, form, formRef, resetForm, address, setAddress } = useBusiness(initialValues, props.commonForm);

const { rules, switchForm } = useRules();
const onReset = () => {
  resetForm();
  setAddress([]);
};
watch(
  [
    () => form.startCallUrl,
    () => form.ringingUrl,
    () => form.connectUrl,
    () => form.endCallUrl,
    () => form.smsUrl,
    () => form.provinceId,
    () => form.cityId
  ],
  ([startCallUrl, ringingUrl, connectUrl, endCallUrl, smsUrl, provinceId, cityId]) => {
    switchForm.value.start = startCallUrl !== "";
    switchForm.value.ring = ringingUrl !== "";
    switchForm.value.connect = connectUrl !== "";
    switchForm.value.end = endCallUrl !== "";
    switchForm.value.sms = smsUrl !== "";
    setAddress([String(provinceId), String(cityId)]);
  },
  {
    immediate: true,
    deep: true
  }
);
watch(
  () => props.commonForm,
  newVal => {
    Object.assign(form, newVal);
  },
  {
    immediate: true,
    deep: true
  }
);
const onSwitchChange = type => {
  if (!switchForm.value[type]) {
    form[type] = ""; // 清空对应的输入框值
  }
};
defineExpose({ form, onSubmit, onReset });
</script>
