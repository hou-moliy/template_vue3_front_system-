<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="客户经理名称" prop="userName">
      <el-input v-model="form.userName" placeholder="请输入客户经理名称" />
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
    <el-table-column prop="userName" label="客户经理名称" />
    <el-table-column prop="secondLevel" label="二级部门" />
    <el-table-column prop="thirdLevel" label="三级部门" />
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
import { onMounted, computed, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import channelDetail from "./components/channelDetail.vue";
import cmpyListDialog from "./components/cmpyListDialog.vue";
import useForm from "@/hooks/useForm";
import { managerList, managerDelete } from "@/api/manager";
// 搜索表单
const initialValues = {
  userName: "",
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
      userId: 1,
      userName: "客户经理1",
      cardId: "",
      deptId: 0,
      email: "",
      id: "",
      phoneNumber: "",
      tdName: "",
      createTime: "2021-08-09 12:00:00"
    }
  ];
  managerList().then(res => {
    if (res.code === '0000') {
      tableData.value = res.data.list;
    }
  });
};
const handleResetForm = () => {
  resetForm().then(() => getList());
};
// 删除
const deleteRow = (index, { userId }) => {
  ElMessageBox.confirm("是否确定删除该客户经理？？？", "删除提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    tableData.value.splice(index, 1);
    managerDelete({ userId }).then(res => {
      if (res.code === '0000') {
        ElMessage.success("删除成功");
      }
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
onMounted(() => {
  getList();
});
</script>
