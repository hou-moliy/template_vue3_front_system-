<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="任务名称" prop="taskName">
      <el-input v-model="form.taskName" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" @click="handleAdd">新建任务</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData">
    <el-table-column label="任务编号" prop="id" />
    <el-table-column label="任务名称" prop="taskName" />
    <el-table-column label="创建时间" prop="createTime" />
    <el-table-column label="实际导入号码量" prop="phoneNum" />
    <el-table-column label="导入状态" prop="status" />
    <el-table-column label="详情">
      <template #default="{ row }">
        <el-button type="primary" link @click="handleResult(row, 'success')">查看成功</el-button>
        <el-button type="primary" link @click="handleResult(row, 'fail')">查看失败</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <!-- 新建任务 -->
  <add-task ref="addTaskRef" />
  <!-- 任务结果 -->
  <task-result ref="taskResultRef" />
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import useForm from "@/hooks/useForm";
import addTask from "./components/addImportTask.vue";
import taskResult from "./components/importResult.vue";
// 表单
const initialValues = {
  taskName: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
// 表格数据
const tableData = ref([]);
const total = computed(() => tableData.value.length);
const getList = () => {
  tableData.value = [
    {
      id: 1,
      taskName: "任务1",
      createTime: "2021-08-01",
      phoneNum: 100,
      status: "成功"
    },
    {
      id: 2,
      taskName: "任务2",
      createTime: "2021-08-02",
      phoneNum: 200,
      status: "失败"
    }
  ];
};
// 重置
const handleReset = () => {
  resetForm();
};
const addTaskRef = ref(null);
const handleAdd = () => {
  addTaskRef.value?.openDialog();
};
const taskResultRef = ref(null);
const handleResult = (data, type) => {
  taskResultRef.value?.openDialog({ data, type });
};
onMounted(() => {
  getList();
});
</script>
