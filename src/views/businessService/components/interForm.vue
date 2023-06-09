<template>
  <!-- 基本信息 -->
  <baseInfo ref="baseInfoRef" :disabled="disabled" />
  <!-- 联系方式 -->
  <contactInfo ref="contactInfoRef" :disabled="disabled" />
  <!-- 地市号码数量和呼叫量 -->
  <cityCallNums ref="cityCallNumsRef" :disabled="disabled" />
  <!-- 业务生效规则 -->
  <businessRule ref="businessRuleRef" :disabled="disabled" />
</template>
<script setup>
import { reactive, ref, onMounted, toRefs } from "vue";
import baseInfo from "./baseInfo.vue";
import contactInfo from "./contactInfo.vue";
import cityCallNums from "./cityCallNums.vue";
import businessRule from "./businessRule.vue";
import useBusiness from "../hooks/useBusiness";
const props = defineProps({
  disabled: {
    type: Boolean,
    default: false
  },
  commonForm: {
    type: Object,
    default: () => {}
  }
});
const baseInfoRef = ref(null);
const contactInfoRef = ref(null);
const cityCallNumsRef = ref(null);
const businessRuleRef = ref(null);
let interForm = reactive({ baseInfo: null, contactInfo: null, cityCallNums: null, businessRule: null });
const { handleAdd, handleUpdate } = useBusiness();
const onSubmit = isAdd => {
  console.log("点击了提交");
  baseInfoRef.value?.submitForm().then(() => {
    const form = {
      ...props.commonForm,
      ...interForm,
      groupName: interForm.baseInfo.groupName,
      bindingType: interForm.baseInfo.bindingType,
      provinceId: interForm.baseInfo.provinceId,
      cityId: interForm.baseInfo.cityId,
      recordMode: interForm.baseInfo.recordMode
    };
    if (isAdd) {
      handleAdd(form);
    } else {
      handleUpdate(form);
    }
  });
};
const onReset = () => {
  baseInfoRef.value?.onReset();
  contactInfoRef.value?.resetForm();
  cityCallNumsRef.value?.resetForm();
  businessRuleRef.value?.resetForm();
};
onMounted(() => {
  interForm.baseInfo = baseInfoRef.value?.form;
  interForm.contactInfo = contactInfoRef.value?.form;
  interForm.cityCallNums = cityCallNumsRef.value?.cityCallNums;
  interForm.businessRule = businessRuleRef.value?.form;
});
defineExpose({ onSubmit, onReset, ...toRefs(interForm) });
</script>
