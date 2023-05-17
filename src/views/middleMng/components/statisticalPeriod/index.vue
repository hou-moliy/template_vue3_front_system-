<template>
  {{ date }}
  <el-select v-model="modelValue" placeholder="请选择统计周期" @change="onChange">
    <el-option label="日统计" value="day" />
    <el-option label="月统计" value="month" />
    <el-option label="近7日统计" value="7" />
    <el-option label="近30日统计" value="30" />
    <el-option label="自定义日期" :value="date" @click="showPicker" />
    <!-- <el-option label="自定义月份" :value="month2" @click="showPicker" /> -->
  </el-select>
  <el-date-picker ref="datePickerRef" v-model="customVal" value-format="YYYY-MM-DD" type="date" @change="onPickerChange" />
</template>
<script setup>
import { ref, computed } from "vue";
defineProps({
  modelValue: {
    type: String,
    default: ""
  }
});
const emits = defineEmits(["update:modelValue"]);
const customVal = ref("");
const date = computed(() => customVal.value);
const month2 = ref("456");
const datePickerRef = ref(null);
const onChange = e => {
  emits("update:modelValue", e);
};
const showPicker = () => {
  datePickerRef.value?.handleOpen();
};
const onPickerChange = () => {
  // console.log(customVal.value, "xxx");
  // date.value = customVal.value;
  // month2.value = customVal.value;
  emits("update:modelValue", customVal.value);
};
</script>
<style>
.el-date-editor {
  display: none; /* 隐藏日期选择器的输入框 */
}
</style>
