<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="企业客户" prop="userId">
      <el-select v-model="form.userId" placeholder="请选择企业客户">
        <el-option label="企业客户1" value="shanghai" />
        <el-option label="企业客户2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="分公司" prop="branchId">
      <el-select v-model="form.branchId" placeholder="请选择分公司">
        <el-option label="分公司1" value="shanghai" />
        <el-option label="分公司2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="客户经理" prop="managerId">
      <el-select v-model="form.managerId" placeholder="请选择客户经理">
        <el-option label="客户经理1" value="shanghai" />
        <el-option label="客户经理2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="渠道商" prop="channelId">
      <el-select v-model="form.channelId" placeholder="请选择渠道商">
        <el-option label="渠道商1" value="shanghai" />
        <el-option label="渠道商2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="投诉号码" prop="reportNumber">
      <el-input v-model="form.reportNumber" placeholder="请输入投诉号码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="handleExport">导出</el-button>
      <el-button type="primary" @click="handleUpload">上传投诉工单文件</el-button>
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
import { emailNotifyComplaints, importComplaintFile } from "@/api/complaint";
import { ElMessage } from "element-plus";
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
const handleExport = () => {};
// 上传投诉工单文件
const handleUpload = () => {
  importComplaintFile(form).then(res => {
    if (res.code == "0000") {
      ElMessage.success("上传成功");
    }
  });
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
