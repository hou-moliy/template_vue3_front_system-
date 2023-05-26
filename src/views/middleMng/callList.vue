<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="企业客户" prop="cmpy">
      <el-select v-model="form.cmpy" placeholder="请选择企业客户">
        <el-option label="企业客户1" value="shanghai" />
        <el-option label="企业客户2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="分公司" prop="midGroupId">
      <el-select v-model="form.midGroupId" placeholder="请选择分公司">
        <el-option label="分公司1" value="shanghai" />
        <el-option label="分公司2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="客户经理" prop="manager">
      <el-select v-model="form.manager" placeholder="请选择客户经理">
        <el-option label="客户经理1" value="shanghai" />
        <el-option label="客户经理2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="渠道商" prop="channel">
      <el-select v-model="form.channel" placeholder="请选择渠道商">
        <el-option label="渠道商1" value="shanghai" />
        <el-option label="渠道商2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="省份地市">
      <regionSelect v-model="address" :level="2" />
    </el-form-item>
    <el-form-item label="统计周期" prop="date">
      <statisticalPeriod ref="statisticalRef" v-model="form.date" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary">导出</el-button>
    </el-form-item>
  </el-form>
  <!-- 统计 -->
  <div class="echarts-map-chian" style="width: 100%; height: 300px">
    <stackedLine :xData="LineCharts.xData" :title="LineCharts.title" />
  </div>
  <!-- 表格 -->
  <el-table border :data="tableData">
    <el-table-column prop="createTime" label="时间" />
    <el-table-column prop="branchCmpy" label="分公司" />
    <el-table-column prop="manager" label="客户经理" />
    <el-table-column prop="channel" label="渠道商" />
    <el-table-column prop="cmpy" label="企业客户" />
    <el-table-column prop="cmpy" label="业务类型" />
    <el-table-column prop="cmpy" label="省份" />
    <el-table-column prop="cmpy" label="地市" />
    <el-table-column prop="cmpy" label="订单量" />
    <el-table-column prop="cmpy" label="视频通话透传次数" />
    <el-table-column prop="cmpy" label="呼入平台次数" />
    <el-table-column prop="cmpy" label="成功通话次数" />
    <el-table-column prop="phone" label="成功通话分钟数" />
    <el-table-column prop="times" label="接通率" />
    <el-table-column prop="times" label="语音话单成功推送次数" />
    <el-table-column prop="times" label="语音话单推送成功率" />
    <el-table-column prop="times" label="录音成功率" />
    <el-table-column prop="times" label="录音URL推送成功次数" />
    <el-table-column prop="times" label="录音URL推送成功率" />
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
</template>
<script setup>
import { reactive, watch, ref } from "vue";
import useForm from "@/hooks/useForm";
import regionSelect from "@/components/regionSelect/index.vue";
import useRegion from "@/hooks/useRegion.js";
import stackedLine from "./components/stackedLine/index.vue";
import statisticalPeriod from "./components/statisticalPeriod/index.vue";
import useTime from "@/hooks/useTime";
import useCallTable from "./hooks/useCallTable";
const { getRecentDates, getMonthDates, getCurrentDate, getDateRange } = useTime();
const statisticalRef = ref(null);
const initialValues = {
  cmpy: "",
  branchCmpy: "",
  manager: "",
  channel: "",
  province: "",
  city: "",
  date: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const { total, getList, tableData } = useCallTable(form);
// 地址
const { address, setAddress } = useRegion(formRef, form);
const LineCharts = reactive({
  title: "",
  xData: []
});
// 重置
const handleReset = () => {
  setAddress([]);
  resetForm().then(() => {
    getList();
  });
};
watch(
  () => form.date,
  newVal => {
    LineCharts.title = statisticalRef.value?.title ?? "";
    switch (newVal) {
      case "day":
        const today = getCurrentDate();
        LineCharts.xData = [today];
        break;
      case "month":
        LineCharts.xData = getMonthDates();
        break;
      case "7":
      case "30":
        LineCharts.xData = getRecentDates(parseInt(newVal));
        break;
      default:
        if (statisticalRef.value?.type === "date") {
          LineCharts.xData = [newVal];
        } else if (statisticalRef.value?.type === "month") {
          LineCharts.xData = getMonthDates(newVal);
        } else if (statisticalRef.value?.type === "daterange") {
          LineCharts.xData = getDateRange(newVal[0], newVal[1]);
        }
        break;
    }
  },
  {
    deep: true,
    immediate: true
  }
);
</script>
