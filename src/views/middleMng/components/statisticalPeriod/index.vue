<template>
  <el-select :modelValue="modelValue" placeholder="请选择统计周期" @change="onChange">
    <el-option label="日统计" value="0" />
    <el-option label="月统计" value="1" />
    <el-option label="近7日统计" value="2" />
    <el-option label="近30日统计" value="3" />
    <el-option :value="customDate" @click="showPicker('datetime', 'YYYY-MM-DD')">
      <span class="label">自定义日期</span>
      <span class="sub-label">{{ customDate }}</span>
    </el-option>
    <el-option :value="customMonth" @click="showPicker('month', 'YYYY-MM')">
      <span class="label">自定义月份</span>
      <span class="sub-label">{{ customMonth }}</span>
    </el-option>
  </el-select>
  <el-date-picker
    ref="datePickerRef"
    style="display: none"
    v-model="pickerOptions.val"
    :value-format="pickerOptions.format"
    :type="pickerOptions.type"
    :disabled-date="$pickerOptions.disabledDate"
    @change="onPickerChange"
  />
</template>
<script setup>
import { ref, computed, reactive, toRefs } from "vue";

const titleMap = {
  0: "日统计",
  1: "月统计",
  2: "近7日统计",
  3: "近30日统计",
  4: "自定义日期",
  5: "自定义月份"
};
defineProps({
  modelValue: {
    type: [String, Array],
    default: ""
  }
});
const emits = defineEmits(["update:modelValue"]);
const customDate = computed(() => (pickerOptions.type === "datetime" && pickerOptions.val) || "点击选择");
const customMonth = computed(() => (pickerOptions.type === "month" && pickerOptions.val) || "点击选择");
const pickerOptions = reactive({
  val: "点击选择",
  type: "datetime",
  format: "YYYYMMDDHHmmss",
  title: ""
});
const datePickerRef = ref(null);
const onChange = e => {
  pickerOptions.val = "";
  if (e < 4) {
    // 非自定义
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
const resetPicker = () => {
  console.log("resetPicker");
  pickerOptions.val = "";
  pickerOptions.title = "";
};
defineExpose({ ...toRefs(pickerOptions), resetPicker });
</script>
<style lang="scss" scoped>
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
