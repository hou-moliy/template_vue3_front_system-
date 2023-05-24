<template>
  <template v-if="type == 'select'">
    <el-select :modelValue="modelValue" :placeholder="placeholder" @change="onChange">
      <el-option v-for="(item, index) in dictList" :label="item.label" :value="item.value" :key="index" />
    </el-select>
  </template>
  <template v-if="type == 'radio'">
    <el-radio-group :modelValue="modelValue" @change="onChange">
      <el-radio v-for="(item, index) in dictList" :label="item.value" :key="index">{{ item.label }} </el-radio>
    </el-radio-group>
  </template>
</template>
<script setup>
import useDictTypes from "@/hooks/useDictTypes";
import { onMounted } from "vue";
const props = defineProps({
  modelValue: {
    type: String,
    default: "",
    required: true
  },
  type: {
    type: String,
    default: "select",
    validator: val => {
      return ["select", "radio"].includes(val);
    }
  },
  placeholder: {
    type: String,
    default: "请选择"
  },
  dictType: {
    type: String,
    default: "",
    required: true
  }
});
const emits = defineEmits(["update:modelValue"]);
const { dictList, getTypeList } = useDictTypes(props.dictType);
const onChange = e => {
  console.log(e, "eeee");
  emits("update:modelValue", e);
};
onMounted(() => {
  getTypeList();
});
</script>
