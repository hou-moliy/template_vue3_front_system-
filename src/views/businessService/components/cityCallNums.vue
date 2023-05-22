<template>
  <el-card class="box-card">
    <template #header> 地市号码数量和呼叫量 </template>
    <el-form :model="form" ref="formRef" :disabled="disabled">
      <el-table :data="cityCallNums" max-height="250" border>
        <el-table-column fixed prop="cityName" label="地区" width="150" />
        <el-table-column prop="number" label="数量" width="120" />
        <el-table-column prop="callNum" label="日通话量" width="120" />
        <el-table-column prop="remark" label="备注" width="120" />
      </el-table>
      <div class="btn-wrap">
        <el-button type="primary" @click="onAddItem">新增</el-button>
        <el-button type="danger" @click="onDelete">删除</el-button>
      </div>
    </el-form>
  </el-card>
</template>
<script setup>
import { ref } from "vue";
import useForm from "@/hooks/useForm";
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});
const initialValues = {
  callNum: "",
  cityName: "",
  number: "",
  remark: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
// 城市号码数量和呼叫量
const cityCallNums = ref([]);
const onAddItem = () => {
  cityCallNums.value.push({
    cityName: "上海",
    number: "100",
    callNum: "200",
    remark: "备注信息"
  });
};
const onDelete = () => {
  cityCallNums.value.pop();
};
defineExpose({ form, resetForm, submitForm });
</script>
<style lang="scss" scoped>
@import url("../scss/common.scss");
</style>
