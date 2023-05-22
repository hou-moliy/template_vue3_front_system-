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
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});
const baseInfoRef = ref(null);
const contactInfoRef = ref(null);
const cityCallNumsRef = ref(null);
const businessRuleRef = ref(null);
let interForm = reactive({});
const onSubmit = callBack => {
  baseInfoRef.value?.submitForm().then(() => callBack());
};
const onReset = () => {};
onMounted(() => {
  interForm = {
    baseInfo: baseInfoRef.value?.form,
    contactInfo: contactInfoRef.value?.form,
    cityCallNums: cityCallNumsRef.value?.form,
    businessRule: businessRuleRef.value?.form
    // cityId,
    // provinceId,
    // bindingType,
  };
});
defineExpose({ onSubmit, onReset, ...toRefs(interForm) });
</script>
<style scoped lang="scss"></style>
