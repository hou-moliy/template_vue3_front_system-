<template>
  <div>
    <el-form style="max-width: 600px" :model="form" ref="formRef">
      <el-form-item label="范围类型">
        <el-select v-model="form.actType" placeholder="请选择范围类型" @change="onChange" style="width: 240px">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="disabledDate">
        <el-radio-group v-model="form.disabledType">
          <el-radio :value="timePickerEnums.todayAfter">今天之后日期可选（含今天）</el-radio>
          <el-radio :value="timePickerEnums.todayAfterNoToday">今天之后日期可选（不含今天）</el-radio>
          <el-radio :value="timePickerEnums.OnlyOneYearBeforeNoToday">今天之前可选（不含今天，可选一年）</el-radio>
          <el-radio :value="timePickerEnums.OnlyOneYearBefore">今天之前可选（含今天，可选一年）</el-radio>
        </el-radio-group>
      </el-form-item>
      <template v-if="showDisabledDate">
        <el-form-item label="时间范围">
          <el-date-picker
            v-model="dateRange"
            :type="form.type"
            value-format="YYYYMMDD"
            :disabled-date="pickerDisabledDate.disabledDate"
            placeholder="请选择时间范围"
          />
        </el-form-item>
      </template>
    </el-form>
    <div class="btn-wrap"><el-tag type="primary">获取当前时间</el-tag>{{ getCurrentDate() }}</div>
    <div class="btn-wrap"><el-tag type="primary">获取最近n天的日期</el-tag>{{}}</div>
    <div class="btn-wrap"><el-tag type="primary">获取某个月的所有日期</el-tag>{{}}</div>
    <div class="btn-wrap">
      <el-tag type="primary">两个日期间的所有日期{{}}</el-tag>
    </div>
    <div class="btn-wrap"><el-tag type="primary">获取当前日期</el-tag>{{ getTodayDate() }}</div>
    <div class="btn-wrap"><el-tag type="primary">获取当前月份</el-tag>{{ getThisMonth() }}</div>
  </div>
</template>
<script setup>
import useForm from "@/hooks/useForm";
import useTimeRange from "./hooks/useTimeRange";
import { timePickerEnums } from "@/config/datePicker";
const options = [
  {
    label: "日期范围",
    value: "0"
  },
  {
    label: "月份范围",
    value: "1"
  }
];
const timeTypeEnums = {
  daterange: "daterange",
  monthrange: "monthrange"
};
const initialValues = {
  statTime: "",
  actType: "0",
  type: timeTypeEnums.daterange,
  disabledType: timePickerEnums.todayAfter
};
const { form, formRef } = useForm(initialValues);
const { dateRange, resetDateRange, pickerDisabledDate, showDisabledDate, getTodayDate, getThisMonth, getCurrentDate } =
  useTimeRange(form);
const onChange = e => {
  resetDateRange();
  if (e === "0") {
    form.type = timeTypeEnums.daterange;
  } else {
    form.type = timeTypeEnums.monthrange;
  }
};
</script>
<style lang="scss" scoped>
.btn-wrap {
  justify-content: flex-start;
  margin-top: 20px;
}
</style>
