<template>
  <el-dialog v-model="dialogVisible" title="投诉台账详情" width="70%">
    <el-table border :data="tableData">
      <el-table-column prop="id" label="ID" />
      <el-table-column prop="cmpy" label="举报来源" />
      <el-table-column prop="phone" label="举报号码" />
      <el-table-column prop="phone" label="被举报号码" />
      <el-table-column prop="createTime" label="下发日期" />
      <el-table-column prop="createTime" label="投诉日期" />
      <el-table-column prop="createTime" label="投诉时间" />
      <el-table-column prop="phone" label="显示主叫号码" />
      <el-table-column prop="cmpy" label="企业客户">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleNav(row, cmpyInfoRef)">{{ row.cmpy }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="branchCmpy" label="归属分公司">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleNav(row, branchDetailRef)">{{ row.branchCmpy }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="phone" label="业务类型" />
      <el-table-column prop="phone" label="电话类型" />
      <el-table-column prop="phone" label="被叫号码" />
      <el-table-column prop="phone" label="来电时间" />
      <el-table-column prop="phone" label="通话时长(秒)" />
      <el-table-column prop="phone" label="被叫企业" />
      <el-table-column prop="phone" label="不良类型" />
      <el-table-column prop="phone" label="举报内容" />
      <el-table-column prop="manager" label="客户经理">
        <template #default="{ row }">
          <el-button type="primary" link @click="handleNav(row, customInfoRef)">{{ row.manager }}</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="branchCmpy" label="客户经理电话" />
    </el-table>
    <!-- 企业客户详情 -->
    <cmpyInfoDialog ref="cmpyInfoRef" />
    <!-- 分公司账户详情 -->
    <branchDetailDialog append-to-body ref="branchDetailRef" />
    <!-- 客户经理详情 -->
    <customInfoDialog append-to-body ref="customInfoRef" />
  </el-dialog>
</template>
<script setup>
import { ref, onMounted } from "vue";
import cmpyInfoDialog from "@/views/businessMng/components/cmpyInfoDialog.vue";
import branchDetailDialog from "@/views/businessMng/components/branchDetailDialog.vue";
import customInfoDialog from "@/views/businessMng/components/customInfoDialog.vue";
import { listComplaints } from "@/api/complaint";
const cmpyInfoRef = ref(null);
const branchDetailRef = ref(null);
const customInfoRef = ref(null);
const dialogVisible = ref(false);
const tableData = ref([]);
const getDetail = async () => {
  listComplaints().then(res => {
    if (res.code == "0000") {
      tableData.value = res.data;
    }
  });
};
const openDialog = () => {
  dialogVisible.value = true;
};
const handleNav = (row, formRefEl) => {
  console.log(row);
  formRefEl?.openDialog({ data: row, isEdit: false });
};

onMounted(() => {
  getDetail();
});
defineExpose({ openDialog });
</script>
