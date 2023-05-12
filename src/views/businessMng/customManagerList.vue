<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="客户经理名称">
      <el-input v-model="searchForm.name" placeholder="请输入客户经理名称" />
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
    <el-table-column prop="name" label="客户经理名称" />
    <el-table-column prop="secondLevel" label="二级部门" />
    <el-table-column prop="thirdLevel" label="三级部门" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="operation" label="操作">
      <template #default="{ row, $index }">
        <el-button type="primary" size="small" @click="showChannelDetailDialog(row, false)">详情</el-button>
        <el-button type="primary" size="small" @click="showChannelDetailDialog(row, true)">编辑</el-button>
        <el-button type="danger" size="small" @click="deleteRow($index, row)">删除</el-button>
        <el-button type="primary" size="small" @click="showCmpyListDialog(row)">查看客户列表</el-button>
        <el-button type="primary" size="small">下载附件</el-button>
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
    name: "客户经理1",
    secondLevel: "城一分公司",
    thirdLevel: "客户部",
    createTime: "2021-08-09 12:00:00"
  },
  {
    id: 2,
    name: "客户经理2",
    secondLevel: "城一分公司",
    thirdLevel: "客户部",
    createTime: "2021-08-09 12:00:00"
  },
  {
    id: 3,
    name: "客户经理3",
    secondLevel: "城一分公司",
    thirdLevel: "客户部",
    createTime: "2021-08-09 12:00:00"
  },
  {
    id: 4,
    name: "客户经理4",
    secondLevel: "城一分公司",
    thirdLevel: "客户部",
    createTime: "2021-08-09 12:00:00"
  }
]);
// 删除
const deleteRow = (index, row) => {
  console.log(index, row);
  ElMessageBox.confirm("是否确定删除该客户经理？？？", "删除提示", {
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
