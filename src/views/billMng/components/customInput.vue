<template>
  <div class="custom-input">
    <el-input v-model="modelValue" @change="onChange" v-bind="$attrs" />
  </div>
</template>

<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    default: ""
  }
});
const emits = defineEmits(["update:modelValue"]);
const onChange = e => {
  emits("update:modelValue", e);
};
</script>

<style scoped></style>
