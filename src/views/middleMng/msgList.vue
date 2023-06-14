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
    <el-form-item label="省份地市">
      <regionSelect v-model="address" />
    </el-form-item>
    <el-form-item label="统计方式" prop="date">
      <el-select v-model="form.type" placeholder="请选择统计方式">
        <el-option label="按条数" value="0" />
        <el-option label="按分钟" value="1" />
      </el-select>
    </el-form-item>
    <el-form-item label="统计周期" prop="statType">
      <statisticalPeriod ref="statisticalRef" v-model="statType" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" v-hasPermi="['msgList:export']">导出</el-button>
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
    <template v-if="form.type == '0'">
      <el-table-column prop="smsAcceptNum" label="平台收到短信数" />
      <el-table-column prop="smsSendNum" label="平台发送短信数" />
      <el-table-column prop="cmpy" label="平台转发短信数">
        <el-table-column prop="smsTransNum" label="总计" />
        <el-table-column prop="smsTransSucNum" label="成功" />
        <el-table-column prop="smsTransFailNum" label="失败" />
        <el-table-column prop="smsTransTimeoutNum" label="超时" />
        <el-table-column prop="smsTransNumRate" label="成功率" />
      </el-table-column>
      <el-table-column prop="cmpy" label="平台托收短信数">
        <el-table-column prop="smsCollectionNum" label="总计" />
        <el-table-column prop="smsCollectionSucNum" label="成功" />
        <el-table-column prop="smsCollectionFailNum" label="失败" />
        <el-table-column prop="smsCollectionNumRate" label="成功率" />
      </el-table-column>
      <el-table-column prop="cmpy" label="平台拦截短信数">
        <el-table-column prop="smsPlatformNum" label="总计" />
        <el-table-column prop="smsFirstPlatformNum" label="一级拦截" />
        <el-table-column prop="smsSecondPlatformNum" label="二级拦截" />
        <el-table-column prop="smsOtherPlatformNum" label="其他拦截" />
      </el-table-column>
    </template>
    <template v-else>
      <el-table-column prop="smsAcceptCount" label="平台收到短信数" />
      <el-table-column prop="smsSendCount" label="平台发送短信数" />
      <el-table-column prop="cmpy" label="平台转发短信数">
        <el-table-column prop="smsTransCount" label="总计" />
        <el-table-column prop="smsTransSucCount" label="成功" />
        <el-table-column prop="smsTransFailCount" label="失败" />
        <el-table-column prop="smsTransTimeoutCount" label="超时" />
        <el-table-column prop="smsTransCountRate" label="成功率" />
      </el-table-column>
      <el-table-column prop="cmpy" label="平台托收短信数">
        <el-table-column prop="smsCollectionCount" label="总计" />
        <el-table-column prop="smsCollectionSucCount" label="成功" />
        <el-table-column prop="smsCollectionFailCount" label="失败" />
        <el-table-column prop="smsCollectionCountRate" label="成功率" />
      </el-table-column>
      <el-table-column prop="cmpy" label="平台拦截短信数">
        <el-table-column prop="smsPlatformCount" label="总计" />
        <el-table-column prop="smsFirstPlatformCount" label="一级拦截" />
        <el-table-column prop="smsSecondPlatformCount" label="二级拦截" />
        <el-table-column prop="smsOtherPlatformCount" label="其他拦截" />
      </el-table-column>
    </template>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import useForm from "@/hooks/useForm";
import regionSelect from "@/components/regionSelect/index.vue";
import statisticalPeriod from "./components/statisticalPeriod/index.vue";
import useRegion from "@/hooks/useRegion.js";
import { smsList } from "@/api/stats";
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
const getList = async () => {
  loadingWrapper(
    smsList(form).then(res => {
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
