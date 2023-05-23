<template>
  <el-select :modelValue="modelValue" :placeholder="placeholder" @change="onChange">
    <el-option v-for="(item, index) in dictList" :label="item.label" :value="item.value" :key="index" />
  </el-select>
</template>
<script setup>
import useDictTypes from "@/hooks/useDictTypes";
import { onMounted } from "vue";
const props = defineProps({
  modelValue: {
    type: String,
    default: ""
  },
  placeholder: {
    type: String,
    default: "请选择"
  },
  dictType: {
    type: String,
    default: ""
  }
});
const emits = defineEmits(["update:modelValue"]);
const { dictList, getTypeList } = useDictTypes(props.dictType);
const onChange = e => {
  emits("update:modelValue", e);
};
onMounted(() => {
  getTypeList();
});
</script>
