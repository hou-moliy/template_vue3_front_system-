<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="企业客户" prop="cmpy">
      <el-select v-model="form.cmpy" placeholder="请选择企业客户">
        <el-option label="企业客户1" value="shanghai" />
        <el-option label="企业客户2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="分公司" prop="branchCmpy">
      <el-select v-model="form.branchCmpy" placeholder="请选择分公司">
        <el-option label="分公司1" value="shanghai" />
        <el-option label="分公司2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="客户经理" prop="manager">
      <el-select v-model="form.manager" placeholder="请选择客户经理">
        <el-option label="客户经理1" value="shanghai" />
        <el-option label="客户经理2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="渠道商" prop="channel">
      <el-select v-model="form.channel" placeholder="请选择渠道商">
        <el-option label="渠道商1" value="shanghai" />
        <el-option label="渠道商2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="账单月份" prop="month">
      <el-date-picker v-model="form.month" type="month" placeholder="请选择账单月份" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary">上传成本账单</el-button>
      <el-button type="primary">下载成本账单</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData">
    <el-table-column prop="branchCmpy" label="账单月份" />
    <el-table-column prop="branchCmpy" label="分公司" />
    <el-table-column prop="manager" label="客户经理" />
    <el-table-column prop="channel" label="渠道商" />
    <el-table-column prop="cmpy" label="企业客户" />
    <el-table-column prop="cmpy" label="成本账单金额" />
    <el-table-column prop="cmpy" label="成本账单详情">
      <template #default="{ row }">
        <el-button type="primary" link @click="openDetail('cost', row)">查看</el-button>
        <el-button type="primary" link>下载</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="cmpy" label="收入账单金额" />
    <el-table-column prop="cmpy" label="收入账单详情">
      <template #default="{ row }">
        <el-button type="primary" link @click="openDetail('income', row)">查看</el-button>
        <el-button type="primary" link>下载</el-button>
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
import { reactive, ref } from "vue";
import useForm from "@/hooks/useForm";
import costBillDetail from "./components/costBillDetail.vue";
import incomeBillDetail from "./components/incomeBillDetail.vue";
const costBillRef = ref(null);
const incomeBillRef = ref(null);
const initialValues = {
  cmpy: "",
  branchCmpy: "",
  manager: "",
  channel: "",
  month: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = reactive([
  {
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
const getList = () => {
  console.log(form, "获取新数据");
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
</script>
