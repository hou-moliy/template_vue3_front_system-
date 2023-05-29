<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="企业客户" prop="userId">
      <model-select v-model="form.userId" dictType="userType" placeholder="请选择企业客户" />
    </el-form-item>
    <el-form-item label="分公司" prop="branchId">
      <model-select v-model="form.branchId" dictType="branchType" placeholder="请选择分公司" />
    </el-form-item>
    <el-form-item label="客户经理" prop="managerId">
      <model-select v-model="form.managerId" dictType="managerType" placeholder="请选择客户经理" />
    </el-form-item>
    <el-form-item label="渠道商" prop="channelId">
      <model-select v-model="form.channelId" dictType="channelType" placeholder="请选择渠道商" />
    </el-form-item>
    <el-form-item label="投诉号码" prop="reportNumber">
      <el-input v-model="form.reportNumber" placeholder="请输入投诉号码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="handleExport">导出</el-button>
      <el-upload
        class="upload-demo"
        :action="`${baseURL}/complaintManager/importComplaintFile`"
        :show-file-list="false"
        :limit="1"
        accept=".xls,.xlsx"
      >
        <el-button type="primary" style="margin: 0px 15px">上传投诉工单文件</el-button>
      </el-upload>
      <el-button type="primary" @click="handleEmail">邮件通知</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="reportResource" label="举报来源" />
    <el-table-column prop="reportNumber" label="举报号码" />
    <el-table-column prop="reportedNumber" label="被举报号码" />
    <el-table-column prop="issuanceDate" label="下发日期" />
    <el-table-column prop="reportTime" label="投诉日期" />
    <el-table-column prop="reportTime" label="投诉时间" />
    <el-table-column prop="displayCallingNumber" label="显示主叫号码" />
    <el-table-column prop="userName" label="企业客户">
      <template #default="{ row }">
        <el-button type="primary" link @click="handleNav(row, cmpyInfoRef)">{{ row.cmpy }}</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="branchName" label="归属分公司">
      <template #default="{ row }">
        <el-button type="primary" link @click="handleNav(row, branchDetailRef)">{{ row.branchCmpy }}</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="bindingType" label="业务类型" />
    <el-table-column prop="numberType" label="电话类型" />
    <el-table-column prop="calledNumber" label="被叫号码" />
    <el-table-column prop="incomingCallTime" label="来电时间" />
    <el-table-column prop="callDuration" label="通话时长(秒)" />
    <el-table-column prop="calledBusiness" label="被叫企业" />
    <el-table-column prop="badType" label="不良类型" />
    <el-table-column prop="complaintContent" label="举报内容" />
    <el-table-column prop="manager" label="客户经理">
      <template #default="{ row }">
        <el-button type="primary" link @click="handleNav(row, customInfoRef)">{{ row.manager }}</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="branchCmpy" label="客户经理电话" />
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <!-- 企业客户详情 -->
  <cmpyInfoDialog ref="cmpyInfoRef" />
  <!-- 分公司账户详情 -->
  <branchDetailDialog append-to-body ref="branchDetailRef" />
  <!-- 客户经理详情 -->
  <customInfoDialog append-to-body ref="customInfoRef" />
</template>
<script setup>
import { ref, reactive } from "vue";
import useForm from "@/hooks/useForm";
import cmpyInfoDialog from "@/views/businessMng/components/cmpyInfoDialog.vue";
import branchDetailDialog from "@/views/businessMng/components/branchDetailDialog.vue";
import customInfoDialog from "@/views/businessMng/components/customInfoDialog.vue";
import { emailNotifyComplaints } from "@/api/complaint";
import { ElMessage } from "element-plus";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";
const cmpyInfoRef = ref();
const branchDetailRef = ref();
const customInfoRef = ref();
const initialValues = {
  cmpy: "",
  branchCmpy: "",
  manager: "",
  channel: "",
  phone: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = reactive([
  {
    id: "34567",
    cmpy: "美团",
    manager: "美团经理",
    branchCmpy: "美团分公司",
    channel: "渠道商",
    phone: "123",
    times: "2",
    createTime: "2023/5/16"
  }
]);
const total = ref(tableData.length);
const handleNav = (row, formRefEl) => {
  console.log(row);
  formRefEl?.openDialog({ data: row, isEdit: false });
};
const getList = () => {
  console.log(form, "获取新数据");
};
// 导出
const handleExport = () => {
  console.log("不知道接口");
};
// 邮件通知
const handleEmail = () => {
  emailNotifyComplaints(form).then(res => {
    if (res.code == "0000") {
      ElMessage.success("邮件通知成功");
    }
  });
};
</script>
