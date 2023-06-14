<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="企业" prop="midGroupId">
      <model-select v-model="form.midGroupId" dictType="businessMidgroup" placeholder="请选择企业" />
    </el-form-item>
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
    <el-form-item label="账单月份" prop="statTime">
      <el-date-picker v-model="form.statTime" type="month" value-format="YYYYMM" placeholder="请选择账单月份" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <div style="margin: 0 15px">
        <upload-file
          action="/monthlyBilling/importMonthlyBilling"
          acceptType=".xls,.xlsx"
          :maxFileSize="10"
          @file-success="getList"
					v-hasPermi="['monthBillList:uploadCost']"
          btnText="上传成本账单"
        />
      </div>
      <el-button
        type="primary"
        :disabled="!tableData.length"
				v-hasPermi="['monthBillList:downCost']"
        @click="handleDownload(downloadMonthlyBilling(form), 'xlsx', '成本账单')"
        >下载成本账单</el-button
      >
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData" v-load="isLoading">
    <el-table-column prop="statTime" label="账单月份">
      <template #default="{ row }">
        {{ $dayjs(row.statTime).format("YYYY-MM") }}
      </template>
    </el-table-column>
    <el-table-column prop="branchName" label="分公司" />
    <el-table-column prop="managerName" label="客户经理" />
    <el-table-column prop="channelName" label="渠道商" />
    <el-table-column prop="userName" label="企业客户" />
    <el-table-column prop="midGroupName" label="企业" />
    <el-table-column prop="costBillingAmount" label="成本账单金额" />
    <el-table-column label="成本账单详情">
      <template #default="{ row }">
        <el-button type="primary" link v-hasPermi="['monthBillList:costDetail']" @click="openDetail('cost', row)">查看</el-button>
        <el-button type="primary" link v-hasPermi="['monthBillList:costDetail:down']" @click="handleDown('cost', row)">下载</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="incomeBillingAmount" label="收入账单金额" />
    <el-table-column label="收入账单详情">
      <template #default="{ row }">
        <el-button type="primary" link v-hasPermi="['monthBillList:incomeDetail']" @click="openDetail('income', row)">查看</el-button>
        <el-button type="primary" link v-hasPermi="['monthBillList:incomeDetail:down']" @click="handleDown('income', row)">下载</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <!-- 成本账单详情 -->
  <costBillDetail ref="costBillRef" />
  <!-- 收入账单详情 -->
  <incomeBillDetail ref="incomeBillRef" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import useForm from "@/hooks/useForm";
import costBillDetail from "./components/costBillDetail.vue";
import incomeBillDetail from "./components/incomeBillDetail.vue";
import { listMonthlyBillings, downloadMonthlyBilling, exportMonthlyBillingCost, exportMonthlyBillingIncome } from "@/api/bill";
import { handleDownload } from "@/hooks/useExport";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();

const costBillRef = ref(null);
const incomeBillRef = ref(null);
const initialValues = {
  midGroupId: "",
  userId: "",
  branchId: "",
  managerId: "",
  channelId: "",
  statTime: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = ref([]);
const total = ref(0);
const getList = () => {
  loadingWrapper(
    listMonthlyBillings(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
};
// 重置
const handleReset = () => {
  resetForm().then(() => {
    getList();
  });
};

const openDetail = (type, row) => {
  if (type === "cost") {
    costBillRef.value?.openDialog(row);
  } else {
    incomeBillRef.value?.openDialog(row);
  }
};
// 表格-行下载
const handleDown = (type, { midGroupId, midGroupName, statTime }) => {
  const data = {
    midGroupId,
    midGroupName,
    statTime
  };
  if (type === "cost") {
    handleDownload(exportMonthlyBillingCost(data), "xlsx", `${midGroupName}-${statTime}成本账单详情`);
  } else {
    handleDownload(exportMonthlyBillingIncome(data), "xlsx", `${midGroupName}-${statTime}收入账单详情`);
  }
};
onMounted(() => {
  getList();
});
</script>
