<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="任务名称" prop="taskTitle">
      <el-input v-model="form.taskTitle" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" @click="handleAdd">新建任务</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData" v-load="isLoading">
    <el-table-column label="任务编号" prop="taskId" />
    <el-table-column label="任务名称" prop="taskTitle" />
    <el-table-column label="创建时间" prop="createTime" />
    <el-table-column label="企业名称" prop="groupName" />
		<el-table-column label="类型" prop="type" >
			<template #default="{ row }">
				<span>{{ getDictTypeValue("orderType", row.type) }}</span>
			</template>
		</el-table-column>
		<el-table-column label="导入状态" prop="taskStatus" >
			<template #default="{ row }" >
				<el-button v-if="row.taskStatus == '1'" type="success" link>处理中</el-button>
				<el-button v-else type="warning" link>已完成</el-button>
			</template>
		</el-table-column>
    <el-table-column label="详情">
      <template #default="{ row }">
        <el-button type="primary" v-if="row.taskStatus == '2'" link @click="handleResult(row, 'success')">查看成功</el-button>
        <el-button type="primary" v-if="row.taskStatus == '2'" link @click="handleResult(row, 'fail')">查看失败</el-button>
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
import { ref, onMounted } from "vue";
import useForm from "@/hooks/useForm";
import addTask from "./components/addOrderTask.vue";
import taskResult from "./components/orderResult.vue";
import DictTypesStore from "@/stores/modules/dictTypes";
import { numberList } from "@/api/number";
import { useLoading } from "@/hooks/useLoading";
const { getDictTypeValue } = DictTypesStore();
const { isLoading, loadingWrapper } = useLoading();
// import { } from "@/api/number"
// 表单
const initialValues = {
  taskTitle: "",
  taskType: "2",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
// 表格数据
const tableData = ref([]);
const total = ref(0);
const getList = () => {
  loadingWrapper(
    numberList(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
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
