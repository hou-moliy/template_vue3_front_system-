<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="渠道商名称">
      <el-input v-model="searchForm.name" placeholder="请输入渠道商名称" />
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
    <el-table-column prop="name" label="渠道商名称" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="operation" label="操作">
      <template #default="{ row, $index }">
        <el-button type="primary" @click="showChannelDetailDialog(row, false)">详情</el-button>
        <el-button type="primary" @click="showChannelDetailDialog(row, true)">编辑</el-button>
        <el-button type="danger" @click="deleteRow($index, row)">删除</el-button>
        <el-button type="primary" @click="showCmpyListDialog(row)">查看客户列表</el-button>
        <el-button type="primary">下载附件</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 企业客户列表 -->
  <cmpyListDialog ref="cmpyListDialogRef" />
  <!-- 编辑、详情 -->
  <channelDetail ref="channelDetailRef" />
</template>
<script setup>
import { reactive, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import channelDetail from "./components/channelDetail.vue";
import cmpyListDialog from "./components/cmpyListDialog.vue";
// 搜索表单
const searchForm = reactive({
  name: "",
  createTime: ""
});
// 表格数据
const tableData = reactive([
  {
    id: 1,
    name: "头条",
    createTime: "2021-08-09 12:00:00"
  },
  {
    id: 2,
    name: "美团",
    createTime: "2021-08-09 12:00:00"
  },
  {
    id: 3,
    name: "饿了么",
    createTime: "2021-08-09 12:00:00"
  },
  {
    id: 4,
    name: "百度",
    createTime: "2021-08-09 12:00:00"
  }
]);
// 删除
const deleteRow = (index, row) => {
  console.log(index, row);
  ElMessageBox.confirm("是否确定删除该渠道商？？？", "删除提示", {
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
// 查看企业客户列表
const cmpyListDialogRef = ref(null);
const showCmpyListDialog = row => {
  cmpyListDialogRef?.value?.openDialog(row);
};
// 编辑、详情
const channelDetailRef = ref(null);
const showChannelDetailDialog = (data, isEdit) => {
  channelDetailRef?.value?.openDialog({ data, isEdit });
};
</script>
