<template>
  <el-cascader placeholder="请选择地区" :options="provinceCityData" :model-value="modelValue" @change="onChange" clearable>
  </el-cascader>
</template>
<script setup>
import { GlobalStore } from "@/stores";
const props = defineProps({
  modelValue: {
    type: Array,
    default: () => []
  },
  showCode: {
    type: Boolean,
    default: true
  }
});
const { provinceCityData } = GlobalStore();
const emits = defineEmits(["update:modelValue", "change", "getLabel"]);
const onChange = e => {
  emits("update:modelValue", e); // 返回数组类型的数据
  emits("change", e); // 返回省份和地市数组
  if (!props.showCode) {
    // 获取省份和地市文字数组
    const value = getLabel(e);
    emits("getLabel", value);
  }
};
//  根据value值获取省份和地市数组，返回形式[省份，地市]
const getLabel = value => {
  let label = [];
  if (value.length === 2) {
    label = [
      provinceCityData.find(item => item.value === value[0]).label,
      provinceCityData.find(item => item.value === value[0]).children.find(item => item.value === value[1]).label
    ];
  } else if (value.length === 3) {
    label = [
      provinceCityData.find(item => item.value === value[0]).label,
      provinceCityData.find(item => item.value === value[0]).children.find(item => item.value === value[1]).label,
      provinceCityData
        .find(item => item.value === value[0])
        .children.find(item => item.value === value[1])
        .children.find(item => item.value === value[2]).label
    ];
  }
  return label;
};
</script>
