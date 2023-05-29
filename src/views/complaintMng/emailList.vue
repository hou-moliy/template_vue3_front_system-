<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="收件人" prop="recipient">
      <el-input v-model="form.recipient" placeholder="请输入收件人" />
    </el-form-item>
    <el-form-item label="添加日期" prop="createTime">
      <el-date-picker v-model="form.createTime" type="datetime" placeholder="请选择添加日期" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary" @click="handleAddEmail">新增</el-button>
      <el-button type="primary" @click="handleCmpyList">直接发送企业列表</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData">
    <el-table-column prop="recipient" label="收件人" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="createTime" label="添加时间" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="danger" link @click="handleDelEmail(row)">删除</el-button>
        <el-button type="primary" link @click="handleAddEmail(row, true)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <!-- 新增邮箱 -->
  <addEmail ref="addEmailRef" />
  <!--直接发送企业列表  -->
  <cmpyList ref="cmpyListRef" />
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import useForm from "@/hooks/useForm";
import addEmail from "./components/addEmail.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import cmpyList from "./components/cmpyList.vue";
import { listMails, deleteMail } from "@/api/complaint";
const addEmailRef = ref(null);
const cmpyListRef = ref(null);
const initialValues = {
  recipient: "",
  email: "",
  createTime: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = ref([]);
const total = computed(() => tableData.value.length);
const getList = () => {
  tableData.value = [
    {
      id: "34567",
      name: "美团",
      email: "xxx",
      createTime: "2023/5/16"
    }
  ];
  listMails(form).then(res => {
    if (res.code == "0000") {
      tableData.value = res.data.list;
    }
  });
};
const handleAddEmail = (data, isEdit) => {
  addEmailRef.value?.openDialog(data, isEdit);
};
const handleDelEmail = ({ streamNumber }) => {
  ElMessageBox.confirm("是否确定删除该收件人邮箱？？？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteMail({ streamNumber }).then(res => {
      if (res.code == "0000") {
        ElMessage.success("删除成功");
        getList();
      }
    });
  });
};
const handleCmpyList = () => {
  cmpyListRef.value?.openDialog();
};
onMounted(() => {
  getList();
});
</script>
