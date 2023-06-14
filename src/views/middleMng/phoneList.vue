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
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" v-hasPermi="['phoneList:export']">导出</el-button>
    </el-form-item>
  </el-form>
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
    <el-table-column prop="numberCount" label="整月号码占用" />
    <el-table-column prop="secondHalfMonthNum" label="下半月号码占用" />
    <el-table-column prop="onlineNum" label="上线号码量" />
    <el-table-column prop="offNum" label="下线号码量" />
    <el-table-column prop="changeNum" label="号码变更量" />
    <el-table-column prop="monthNum" label="本月月末号码量" />
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
</template>
<script setup>
import { onMounted, ref } from "vue";
import useForm from "@/hooks/useForm";
import regionSelect from "@/components/regionSelect/index.vue";
import statisticalPeriod from "./components/statisticalPeriod/index.vue";
import usePeriod from "./hooks/usePeriod";
import useRegion from "@/hooks/useRegion.js";
import { numberList } from "@/api/stats";
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
  startTime: "",
  endTime: "",
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
    numberList(form).then(res => {
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
