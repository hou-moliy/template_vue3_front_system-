<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="客户名称">
      <el-input v-model="searchForm.name" placeholder="请输入客户名称" />
    </el-form-item>
    <el-form-item label="业务模式" prop="businessType">
      <el-select v-model="searchForm.businessType" placeholder="请选择业务模式">
        <el-option label="AXB模式" value="AXB" />
        <el-option label="AXYB模式" value="AXYB" />
        <el-option label="AX模式" value="AX" />
        <el-option label="GXB模式" value="GXB" />
      </el-select>
    </el-form-item>
    <el-form-item label="创建时间">
      <el-date-picker v-model="searchForm.createTime" type="datetime" placeholder="请选择创建时间" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary">搜索</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border>
    <el-table-column prop="name" label="客户名称" />
    <el-table-column prop="businessType" label="业务模式" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="operation" label="操作">
      <template #default="{ row, $index }">
        <el-button type="primary" size="small" @click="showCmpyInfoDialog(row, false)">详情</el-button>
        <el-button type="primary" size="small" @click="showCmpyInfoDialog(row, true)">编辑</el-button>
        <el-button type="danger" size="small" @click="deleteRow($index, row)">删除</el-button>
        <el-button type="primary" size="small" @click="showPhoneDialog(row)">查看号码列表</el-button>
        <el-button type="primary" size="small">下载附件</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 号码列表 -->
  <phoneDialog ref="phoneDialogRef" />
  <!-- 编辑、详情 -->
  <cmpyInfoDialog ref="cmpyInfoDialogRef" />
</template>
<script setup>
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import phoneDialog from "./components/phoneDialog.vue";
import cmpyInfoDialog from "./components/cmpyInfoDialog.vue";
// 搜索表单
const searchForm = reactive({
  name: "",
  businessType: "",
  createTime: ""
});
// 表格数据
const tableData = reactive([
  {
    id: 1,
    name: "头条",
    businessType: "AXB模式",
    createTime: "2021-08-09 12:00:00"
  },
  {
    id: 2,
    name: "美团",
    businessType: "AXB模式",
    createTime: "2021-08-09 12:00:00"
  },
  {
    id: 3,
    name: "饿了么",
    businessType: "AXB模式",
    createTime: "2021-08-09 12:00:00"
  },
  {
    id: 4,
    name: "百度",
    businessType: "AXB模式",
    createTime: "2021-08-09 12:00:00"
  }
]);
// 删除
const deleteRow = (index, row) => {
  ElMessageBox.confirm("是否确定删除该企业？？？", "删除提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    tableData.splice(index, 1);
    ElMessage({
      type: "success",
      message: "删除成功"
    });
  });
};
// 查看号码列表
const phoneDialogRef = ref(null);
const showPhoneDialog = row => {
  phoneDialogRef?.value?.openDialog(row);
};
// 编辑、详情
const cmpyInfoDialogRef = ref(null);
const showCmpyInfoDialog = (data, isEdit) => {
  cmpyInfoDialogRef?.value?.openDialog({ data, isEdit });
};
</script>
