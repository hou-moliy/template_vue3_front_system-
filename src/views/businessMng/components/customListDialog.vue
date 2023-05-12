<template>
  <el-dialog title="客户经理列表" v-model="dialogVisible" width="80%">
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
      <el-table-column prop="createTime" label="创建时间" />
    </el-table>
  </el-dialog>
</template>
<script setup>
import { reactive, ref } from "vue";
const dialogVisible = ref(false);
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

// openDialog
const openDialog = () => {
  dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
