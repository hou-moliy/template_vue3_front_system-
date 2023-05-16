<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="收件人" prop="name">
      <el-input v-model="form.name" placeholder="请输入收件人" />
    </el-form-item>
    <el-form-item label="添加日期" prop="createTime">
      <el-date-picker v-model="form.createTime" type="datetime" placeholder="请选择添加日期" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="handleAddEmail">新增</el-button>
      <el-button type="primary">直接发送企业列表</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData">
    <el-table-column prop="name" label="收件人" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="createTime" label="添加时间" />
    <el-table-column label="操作">
      <template #default="{ row, index }">
        <el-button type="danger" @click="handleDelEmail(row, index)">删除</el-button>
        <el-button type="primary" @click="handleAddEmail(row, true)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <!-- 新增邮箱 -->
  <addEmail ref="addEmailRef" />
</template>
<script setup>
import { ref, reactive } from "vue";
import useForm from "@/hooks/useForm";
import addEmail from "./components/addEmail.vue";
import { ElMessageBox, ElMessage } from "element-plus";
const addEmailRef = ref(null);
const initialValues = {
  name: "",
  email: "",
  createTime: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = reactive([
  {
    id: "34567",
    name: "美团",
    email: "xxx",
    createTime: "2023/5/16"
  }
]);
const total = ref(tableData.length);
const getList = () => {
  console.log(form, "获取新数据");
};
const handleAddEmail = (data, isEdit) => {
  addEmailRef.value?.openDialog(data, isEdit);
};
const handleDelEmail = (row, index) => {
  ElMessageBox.confirm("是否确定删除该收件人邮箱？？？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    console.log(row);
    tableData.splice(index, 1);
    ElMessage.success("删除成功");
  });
};
</script>
