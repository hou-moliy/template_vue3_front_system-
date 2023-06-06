<template>
  <el-cascader placeholder="请选择地区" :options="options" :model-value="modelValue" @change="onChange" clearable> </el-cascader>
</template>
<script setup>
import { computed } from "vue";
import { regionData, pcaTextArr, pcTextArr, provinceAndCityData } from "element-china-area-data";
// provinceAndCityData省市二级联动数据,汉字+code
// regionData省市区三级联动数据,纯code
// pcTextArr省市二级联动数据，纯汉字
// pcaTextArr省市区三级联动数据，纯汉字
// codeToText是个大对象，属性是区域码，属性值是汉字 用法例如：codeToText['110000']输出北京市
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  // 返回的是code
  showCode: {
    type: Boolean,
    default: true
  },
  // 几级联动
  level: {
    type: Number,
    default: 3,
    validator: val => {
      return val === 2 || val === 3;
    }
  },
  valStr: {
    type: String,
    default: ""
  }
});
const emits = defineEmits(["update:modelValue", "getValStr"]);
const onChange = e => {
  emits("update:modelValue", e);
  if (e.length) {
    const val = e.join(",");
    emits("getValStr", val);
  }
};
const options = computed(() => {
  if (props.level === 2) {
    return props.showCode ? provinceAndCityData : pcTextArr;
  } else {
    return props.showCode ? regionData : pcaTextArr;
  }
});
</script>
