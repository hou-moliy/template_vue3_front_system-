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
    <el-form-item label="类型" prop="type">
      <el-select v-model="form.type" placeholder="请选择类型">
        <el-option label="按次数" value="1" />
        <el-option label="按分钟" value="2" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary">导出</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData" v-load="isLoading">
    <el-table-column prop="branchName" label="分公司" />
    <el-table-column prop="managerName" label="客户经理" />
    <el-table-column prop="channelName" label="渠道商" />
    <el-table-column prop="userName" label="企业客户" />
    <el-table-column prop="numberCount" label="总号码量" />
    <el-table-column prop="firstHalfMonthNum" label="上半月号码量" />
    <el-table-column prop="secondHalfMonthNum" label="下半月号码量" />
    <el-table-column prop="newOrderNum" label="新增订单量" />
    <template v-if="form.type == '1'">
      <el-table-column prop="recordNum" label="录音通话次数" />
      <el-table-column prop="nonRecordNum" label="非录音呼叫次数" />
      <el-table-column prop="bindCallSucNum" label="有绑定呼叫成功次数" />
      <el-table-column prop="bindNotCallNum" label="有绑定呼叫未接通次数" />
    </template>
    <template v-else>
      <el-table-column prop="recordMin" label="录音通话分钟数" />
      <el-table-column prop="nonRecordMin" label="非录音呼叫分钟数" />
      <el-table-column prop="bindCallSucMin" label="有绑定呼叫成功分钟数" />
    </template>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
</template>
<script setup>
import { onMounted, ref } from "vue";
import useForm from "@/hooks/useForm";
import regionSelect from "@/components/regionSelect/index.vue";
import statisticalPeriod from "./components/statisticalPeriod/index.vue";
import useRegion from "@/hooks/useRegion.js";
import { monthBillList } from "@/api/stats";
import usePeriod from "./hooks/usePeriod";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const initialValues = {
  userId: "",
  branchId: "",
  managerId: "",
  channelId: "",
  provinceId: "",
  cityId: "",
  statType: "",
  statTime: "202210",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const { statisticalRef, statType, resetStatType } = usePeriod(form);
// 地址
const { address, setAddress } = useRegion(formRef, form);
const tableData = ref([]);
const total = ref(0);
const getList = () => {
  loadingWrapper(
    monthBillList(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
};
// 重置
const handleReset = () => {
  setAddress([]);
  resetStatType();
  resetForm().then(() => {
    getList();
  });
};

onMounted(() => {
  getList();
});
</script>
