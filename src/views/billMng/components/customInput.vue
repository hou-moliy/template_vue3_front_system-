<template>
  <el-tooltip :content="String(modelValue)" placement="top-start">
    <div class="custom-input" :style="{ width }">
      <el-input v-model="modelValue" @change="onChange" @blur="onBlur" v-bind="$attrs" />
    </div>
  </el-tooltip>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ""
  },
  width: {
    type: String,
    default: "100%"
  }
});
const emits = defineEmits(["update:modelValue", "onBlur"]);
const onChange = e => {
  emits("update:modelValue", e);
};
const onBlur = e => {
  emits("onBlur", e.target.value);
};
</script>
<style lang="scss" scoped>
.btn-wrap {
  margin-top: 15px;
  width: 100%;
}
:deep()input::-webkit-outer-spin-button,
:deep()input::-webkit-inner-spin-button {
  -webkit-appearance: none !important;
}
:deep()input[type="'number'"] {
  -moz-appearance: textfield !important;
}
</style>
