<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="企业客户" prop="userId">
      <model-select v-model="form.userId" dictType="businessUser" placeholder="请选择企业客户" />
    </el-form-item>
    <el-form-item label="分公司" prop="branchId">
      <model-select v-model="form.branchId" dictType="businessBranch" placeholder="请选择分公司" />
    </el-form-item>
    <el-form-item label="客户经理" prop="managerId">
      <model-select v-model="form.managerId" dictType="businessManager" placeholder="请选择客户经理" />
    </el-form-item>
    <el-form-item label="渠道商" prop="channelId">
      <model-select v-model="form.channelId" dictType="businessChannel" placeholder="请选择渠道商" />
    </el-form-item>
    <el-form-item label="省份地市" prop="provinceId">
      <regionSelect v-model="address" />
    </el-form-item>
    <el-form-item label="统计周期" prop="date">
      <statisticalPeriod ref="statisticalRef" v-model="statType" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSearch">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" v-hasPermi="['callList:export']">导出</el-button>
    </el-form-item>
  </el-form>
  <!-- 统计 -->
  <div class="echarts-map-chian" style="width: 100%; height: 300px">
    <stackedLine :xData="LineCharts.xData" :title="LineCharts.title" :seriesData="LineCharts.seriesData" />
  </div>
  <!-- 表格 -->
  <el-table border :data="tableData" v-load="isLoading">
    <el-table-column prop="statTime" label="时间">
      <template #default="{ row }">
        {{ $dayjs(row.statTime).format("YYYY-MM-DD") }}
      </template>
    </el-table-column>
    <el-table-column prop="branchName" label="分公司" />
    <el-table-column prop="managerName" label="客户经理" />
    <el-table-column prop="channelName" label="渠道商" />
    <el-table-column prop="userName" label="企业客户" />
    <el-table-column prop="bindingType" label="业务类型" />
    <el-table-column prop="provinceName" label="省份" />
    <el-table-column prop="cityName" label="地市" />
    <el-table-column prop="callInNum" label="呼入平台次数" />
    <el-table-column prop="callOutNum" label="呼出平台次数" />
    <el-table-column prop="bindNotCallNum" label="有绑定未接通次数" />
    <el-table-column prop="sucCallNum" label="成功通话次数" />
    <el-table-column prop="sucCallMinuteNum" label="成功通话分钟数" />
    <el-table-column prop="callSucRate" label="接通率" />
    <el-table-column prop="pushBillSucNum" label="语音话单成功推送次数" />
    <el-table-column prop="pushBillSucRate" label="语音话单推送成功率" />
    <el-table-column prop="recordSucRate" label="录音成功率" />
    <el-table-column prop="pushRecordSucNum" label="录音URL推送成功次数" />
    <el-table-column prop="pushRecordSucRate" label="录音URL推送成功率" />
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
</template>
<script setup>
import useForm from "@/hooks/useForm";
import useRegion from "@/hooks/useRegion.js";
import stackedLine from "./components/stackedLine/index.vue";
import statisticalPeriod from "./components/statisticalPeriod/index.vue";
import useCallTable from "./hooks/useCallTable";
import usePeriod from "./hooks/usePeriod";
const initialValues = {
  userId: "",
  branchId: "",
  channelId: "",
  managerId: "",
  provinceId: "",
  cityId: "",
  statType: "",
  startTime: "",
  endTime: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const { total, getList, tableData, handleSearch, LineCharts, isLoading } = useCallTable(form);
const { statisticalRef, statType, resetStatType } = usePeriod(form);
// 地址
const { address, setAddress } = useRegion(formRef, form);
// 重置
const handleReset = () => {
  setAddress([]);
  resetStatType();
  resetForm().then(() => {
    getList();
  });
};
</script>
