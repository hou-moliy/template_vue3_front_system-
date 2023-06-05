<template>
  <div class="custom-input" :style="{ width }">
    <el-input v-model="modelValue" @change="onChange" @blur="onBlur" v-bind="$attrs" />
  </div>
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

<style scoped></style>
