<template>
  <el-select :modelValue="modelValue" placeholder="请选择统计周期" @change="onChange">
    <el-option label="日统计" value="day" />
    <el-option label="月统计" value="month" />
    <el-option label="近7日统计" value="7" />
    <el-option label="近30日统计" value="30" />
    <el-option :value="customDate" @click="showPicker('date', 'YYYY-MM-DD')">
      <span class="label">自定义日期</span>
      <span class="sub-label">{{ customDate }}</span>
    </el-option>
    <el-option :value="customMonth" @click="showPicker('month', 'YYYY-MM')">
      <span class="label">自定义月份</span>
      <span class="sub-label">{{ customMonth }}</span>
    </el-option>
  </el-select>
  <el-date-picker ref="datePickerRef" v-model="pickerOptions.val" :value-format="pickerOptions.format"
    :type="pickerOptions.type" @change="onPickerChange" />
</template>
<script setup>
import { ref, computed, reactive, toRefs } from "vue";
const titleMap = {
  day: "日统计",
  month: "月统计",
  7: "近7日统计",
  30: "近30日统计"
};
defineProps({
  modelValue: {
    type: String,
    default: ""
  }
});
const emits = defineEmits(["update:modelValue"]);
const customDate = computed(() => (pickerOptions.type === "date" && pickerOptions.val) || "点击选择");
const customMonth = computed(() => (pickerOptions.type === "month" && pickerOptions.val) || "点击选择");
const pickerOptions = reactive({
  val: "点击选择",
  type: "date",
  format: "YYYY-MM-DD",
  title: ""
});
const datePickerRef = ref(null);
const onChange = e => {
  pickerOptions.val = "";
  if(e === "day" || e === "month" || e === "7" || e === "30") {
    pickerOptions.title = titleMap[e];
    emits("update:modelValue", e);
  }
};
const showPicker = (type, format) => {
  pickerOptions.type = type;
  pickerOptions.format = format;
  datePickerRef.value?.handleOpen();
};
const onPickerChange = () => {
  pickerOptions.title = `${pickerOptions.val}统计`;
  emits("update:modelValue", pickerOptions.val);
};
defineExpose({ ...toRefs(pickerOptions) });
</script>
<style>
.el-date-editor {
  display: none;
  /* 隐藏日期选择器的输入框 */
}

.label {
  float: left;
}

.sub-label {
  float: right;
  color: var(--el-text-color-secondary);
  font-size: 13px;
  margin-left: 10px;
}
</style>
