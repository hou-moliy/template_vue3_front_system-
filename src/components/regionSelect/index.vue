<template>
  <el-cascader placeholder="请选择地区" :options="options" v-model="modelValue" @change="onChange" />
</template>
<script setup>
import { computed } from "vue";
import { regionData, pcaTextArr, pcTextArr, provinceAndCityData } from "element-china-area-data";
// provinceAndCityData省市二级联动数据,汉字+code
// regionData省市区三级联动数据,纯code
// pcTextArr省市二级联动数据，纯汉字
// pcaTextArr省市区三级联动数据，纯汉字
// codeToText是个大对象，属性是区域码，属性值是汉字 用法例如：codeToText['110000']输出北京市
const emits = defineEmits(["update:modelValue"]);
console.log(props.modelValue, "modelValue");
const onChange = e => {
  emits("update:modelValue", e);
};

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  // 返回的是code
  showCode: {
    type: Boolean,
    default: false
  },
  // 几级联动
  level: {
    type: Number,
    default: 3,
    validator: val => {
      return val === 2 || val === 3;
    }
  }
});

const options = computed(() => {
  if (props.level === 2) {
    return props.showCode ? provinceAndCityData : pcTextArr;
  } else {
    return props.showCode ? regionData : pcaTextArr;
  }
});
</script>
