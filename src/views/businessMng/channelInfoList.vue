<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="渠道商名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入渠道商名称" />
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
    <el-table-column prop="name" label="渠道商名称" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="operation" label="操作">
      <template #default="{ row, $index }">
        <el-button type="primary" link @click="showChannelDetailDialog(row, false)">详情</el-button>
        <el-button type="primary" link @click="showChannelDetailDialog(row, true)">编辑</el-button>
        <el-button type="danger" link @click="deleteRow($index, row)">删除</el-button>
        <el-button type="primary" link @click="showCmpyListDialog(row)">查看客户列表</el-button>
        <el-button type="primary" link>下载附件</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />

  <!-- 企业客户列表 -->
  <cmpyListDialog ref="cmpyListDialogRef" />
  <!-- 编辑、详情 -->
  <channelDetail ref="channelDetailRef" />
</template>
<script setup>
import { ref, onMounted, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import channelDetail from "./components/channelDetail.vue";
import cmpyListDialog from "./components/cmpyListDialog.vue";
import useForm from "@/hooks/useForm";
const channelDetailRef = ref(null);
const cmpyListDialogRef = ref(null);
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
// 删除
const deleteRow = (index, row) => {
  console.log(index, row);
  ElMessageBox.confirm("是否确定删除该渠道商？？？", "删除提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    tableData.value.splice(index, 1);
    ElMessage({
      type: "success",
      message: "删除成功"
    });
  });
};
// 查看企业客户列表
const showCmpyListDialog = row => {
  cmpyListDialogRef?.value?.openDialog(row);
};
// 编辑、详情
const showChannelDetailDialog = (data, isEdit) => {
  channelDetailRef?.value?.openDialog({ data, isEdit });
};
onMounted(() => {
  getList();
});
</script>
