<template>
  <el-card class="box-card">
    <template #header> 业务生效规则 </template>
    <el-form :model="form" ref="formRef" :disabled="disabled">
      <div class="form-item-wrap">
        <el-form-item label="业务生效时间">
          <el-date-picker v-model="form.effectiveTime" type="datetime" placeholder="请选择业务生效时间" />
        </el-form-item>
        <el-form-item label="收费开始时间">
          <el-date-picker v-model="form.chargesTime" type="datetime" placeholder="请选择收费开始时间" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="业务起始时间">
          <el-date-picker v-model="form.startTime" type="datetime" placeholder="请选择业务起始时间" />
        </el-form-item>
        <el-form-item label="业务终止时间">
          <el-date-picker v-model="form.endTime" type="datetime" placeholder="请选择业务终止时间" />
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>
<script setup>
import useForm from "@/hooks/useForm";
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});
const initialValues = {
  effectiveTime: "",
  chargesTime: "",
  startTime: "",
  endTime: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
defineExpose({ form, resetForm, submitForm });
</script>
<style lang="scss" scoped>
@import url("../scss/common.scss");
</style>
