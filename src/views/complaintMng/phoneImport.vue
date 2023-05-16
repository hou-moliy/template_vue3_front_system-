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
    <el-form-item label="投诉号码" prop="times">
      <el-input v-model="form.phone" placeholder="请输入投诉号码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary">导出</el-button>
      <el-button type="primary">上传投诉工单文件</el-button>
      <el-button type="primary">邮件通知</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
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
</script>
