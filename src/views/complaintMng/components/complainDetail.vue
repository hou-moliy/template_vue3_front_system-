<template>
  <!-- 投诉台账详情 -->
  <el-dialog v-model="dialogVisible" title="投诉台账详情" width="70%">
    <el-table border :data="tableData" v-load="isLoading">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="reportResource" label="举报来源" />
      <el-table-column prop="reportNumber" label="举报号码" />
      <el-table-column prop="reportedNumber" label="被举报号码" />
      <el-table-column prop="issuanceDate" label="下发日期" />
      <el-table-column prop="reportTime" label="投诉日期">
        <template #default="{ row }">
          {{ $dayjs(row.reportTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="displayCallingNumber" label="显示主叫号码" />
      <el-table-column prop="userName" label="企业客户">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleNav(row.userId, cmpyInfoRef)">{{ row.userName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="branchName" label="归属分公司">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleNav(row.branchId, branchDetailRef)">{{ row.branchName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="bindingType" label="业务类型" />
      <el-table-column prop="numberType" label="电话类型" />
      <el-table-column prop="calledNumber" label="被叫号码" />
      <el-table-column prop="incomingCallTime" label="来电时间">
        <template #default="{ row }">
          {{ $dayjs(row.reportTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column prop="callDuration" label="通话时长(秒)" />
      <el-table-column prop="calledBusiness" label="被叫企业" />
      <el-table-column prop="badType" label="不良类型" />
      <el-table-column prop="complaintContent" label="举报内容">
        <template #default="{ row }">
          <el-popover placement="top-start" trigger="hover" :content="row.complaintContent">
            <template #reference>
              <el-button type="primary" text>查看</el-button>
            </template>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column prop="managerName" label="客户经理">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleNav(row.managerId, customInfoRef)">{{ row.managerName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="managerPhoneNumber" label="客户经理电话" />
    </el-table>
    <Pagination
      v-show="total > 0"
      :total="total"
      v-model:page="form.pageNum"
      v-model:limit="form.pageSize"
      @pagination="getDetail"
    />

    <!-- 企业客户详情 -->
    <cmpyInfoDialog ref="cmpyInfoRef" />
    <!-- 分公司账户详情 -->
    <branchDetailDialog append-to-body ref="branchDetailRef" />
    <!-- 客户经理详情 -->
    <customInfoDialog append-to-body ref="customInfoRef" />
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import cmpyInfoDialog from "@/views/businessMng/components/cmpyInfoDialog.vue";
import branchDetailDialog from "@/views/businessMng/components/branchDetailDialog.vue";
import customInfoDialog from "@/views/businessMng/components/customInfoDialog.vue";
import { listComplaints } from "@/api/complaint";

import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const cmpyInfoRef = ref(null);
const branchDetailRef = ref(null);
const customInfoRef = ref(null);
const dialogVisible = ref(false);
const tableData = ref([]);
const total = ref(0);
const form = ref({
  branchId: "",
  managerId: "",
  reportedNumber: "",
  userId: "",
  pageSize: 1,
  pageNum: 10
});
const openDialog = async params => {
  try {
    dialogVisible.value = true;
    Object.assign(form.value, params);
    await getDetail(form.value);
  } catch (err) {
    console.error(err);
  }
};
const getDetail = params => {
  loadingWrapper(
    listComplaints(params).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
};
const handleNav = (row, formRefEl) => {
  console.log(row);
  formRefEl?.openDialog({ data: row, isEdit: false });
};

defineExpose({ openDialog });
</script>
