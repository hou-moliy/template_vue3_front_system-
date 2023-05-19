<template>
  <el-dialog title="客户经理列表" v-model="dialogVisible" width="80%">
    <!-- 表单 -->
    <el-form :inline="true" :model="form" ref="formRef">
      <el-form-item label="客户经理名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入客户经理名称" />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="form.createTime" type="datetime" placeholder="请选择创建时间" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="handleResetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="客户经理名称" />
      <el-table-column prop="createTime" label="创建时间" />
    </el-table>
    <Pagination
      v-show="total > 0"
      :total="total"
      v-model:page="form.pageNum"
      v-model:limit="form.pageSize"
      @pagination="getList"
    />
  </el-dialog>
</template>
<script setup>
import { onMounted, computed, ref } from "vue";
import useForm from "@/hooks/useForm";
const dialogVisible = ref(false);
// 搜索表单
const initialValues = {
  name: "",
  createTime: "",
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
  ];
};
const handleResetForm = () => {
  resetForm().then(() => getList());
};
// openDialog
const openDialog = () => {
  dialogVisible.value = true;
};
onMounted(() => {
  getList();
});

defineExpose({ openDialog });
</script>
