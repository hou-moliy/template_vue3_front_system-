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
import { ref, computed, reactive, watch } from "vue";
const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  }
});
const emits = defineEmits(["update:modelValue"]);
const customDate = computed(() => (pickerOptions.type === "date" ? pickerOptions.val : "点击选择"));
const customMonth = computed(() => (pickerOptions.type === "month" ? pickerOptions.val : "点击选择"));
const pickerOptions = reactive({
  val: "点击选择",
  type: "date",
  format: "YYYY-MM-DD"
});
const datePickerRef = ref(null);
const onChange = e => {
  emits("update:modelValue", e);
};
const showPicker = (type, format) => {
  pickerOptions.type = type;
  pickerOptions.format = format;
  datePickerRef.value?.handleOpen();
};
const onPickerChange = () => {
  emits("update:modelValue", pickerOptions.val);
};
const dateList = ref([]);
watch(
  () => props.modelValue,
  newVal => {
    console.log(newVal, "modelValue");
    if(newVal === "day") {
      dateList.value = [1];
    } else if(newVal === "month") {
      dateList.value = [30];
    } else if(newVal === "7") {
      dateList.value = [7];
    }
  },
  {
    deep: true
  }
);
defineExpose({ dateList });
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
