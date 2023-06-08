<template>
  <el-card class="box-card">
    <template #header> 地市号码数量和呼叫量 </template>
    <el-form :model="form" ref="formRef" :disabled="disabled">
      <el-table :data="cityCallNums" max-height="250" border>
        <el-table-column fixed prop="cityName" label="地区" width="150">
          <template #default="{ row }">
            <regionSelect v-model="row.address" :showCode="false" @get-label="getLabel($event, row)" />
          </template>
        </el-table-column>
        <el-table-column prop="number" label="数量">
          <template #default="{ row }">
            <el-input-number v-model="row.number" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="callNum" label="日通话量">
          <template #default="{ row }">
            <el-input-number v-model="row.callNum" :min="0" />
          </template>
        </el-table-column>
        <el-table-column prop="remark" label="备注">
          <template #default="{ row }">
            <el-input v-model="row.remark" :min="0" place-holder="请输入备注" />
          </template>
        </el-table-column>
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
  cityName: "",
  number: 0,
  callNum: 0,
  remark: "",
  address: []
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
// 城市号码数量和呼叫量
const cityCallNums = ref([]);
const onAddItem = () => {
  cityCallNums.value.push({
    cityName: "",
    number: 0,
    callNum: 0,
    remark: "",
    address: []
  });
};
const onDelete = () => {
  cityCallNums.value.pop();
};
const getLabel = (e, row) => {
  row.cityName = e[1];
};
defineExpose({ form, resetForm, submitForm, cityCallNums });
</script>
<style lang="scss" scoped>
@import url("../scss/common.scss");
</style>
