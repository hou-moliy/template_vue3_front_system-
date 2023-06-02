<template>
  <!-- 投诉台账列表 -->
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
    <el-form-item label="投诉次数" prop="complaintNum">
      <el-input v-model="form.complaintNum" placeholder="请输入投诉次数" />
    </el-form-item>
    <el-form-item label="投诉日期">
      <el-date-picker v-model="timeRange" type="datetimerange" value-format="YYYYMMDDHHmmss" placeholder="请选择投诉日期范围" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" @click="exportList" :disabled="!tableData.length">导出</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData" v-load="isLoading">
    <el-table-column prop="userName" label="企业名称" />
    <el-table-column prop="managerName" label="客户经理" />
    <el-table-column prop="branchName" label="分公司" />
    <el-table-column prop="channelName" label="渠道商" />
    <el-table-column prop="reportedNumber" label="号码" />
    <el-table-column prop="complaintNum" label="投诉次数" />
    <el-table-column prop="reportTimes" label="投诉日期">
      <template #default="{ row }">
        <div class="times-wrap">
          <el-button type="primary" link @click="openDialog(row)" v-for="(i, index) in row.reportTimes" :key="index">{{
            i
          }}</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <complainDetail ref="complainDetailRef" />
</template>
<script setup>
import { onMounted, ref } from "vue";
import useForm from "@/hooks/useForm";
import { listComplaintLedgers, exportComplaintLedgers } from "@/api/complaint";
import complainDetail from "./components/complainDetail.vue";
import { ElMessage } from "element-plus";
import { exportFile } from "@/hooks/useExport";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const complainDetailRef = ref(null);
const initialValues = {
  userId: "",
  branchId: "",
  managerId: "",
  channelId: "",
  complaintNum: "",
  complaintStartTime: "",
  complaintEndTime: "",
  pageNum: 1,
  pageSize: 10
};
const timeRange = ref([]);
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = ref([]);
const total = ref(0);
const getList = () => {
  if (timeRange.value.length) {
    form.complaintStartTime = timeRange.value[0];
    form.complaintEndTime = timeRange.value[1];
  }
  loadingWrapper(
    listComplaintLedgers(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
};
const exportList = () => {
  exportComplaintLedgers(form).then(res => {
    if (res.data.size == 0) {
      ElMessage.warning("暂无数据");
      return;
    }
    exportFile(res.data, "xlsx", "投诉台账文件");
  });
};
const openDialog = row => {
  const { branchId, managerId, reportedNumber, userId } = row;
  const params = {
    branchId,
    managerId,
    reportedNumber,
    userId
  };
  complainDetailRef.value?.openDialog(params);
};
const handleReset = () => {
  resetForm();
  timeRange.value = [];
  form.complaintStartTime = "";
  form.complaintEndTime = "";
  getList();
};
onMounted(() => {
  getList();
});
</script>
<style>
.times-wrap {
  max-height: 100px;
  overflow-y: scroll;
}
</style>
