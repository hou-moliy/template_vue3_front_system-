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
  <el-table :data="tableData" border v-load="isLoading">
    <el-table-column prop="userName" label="客户经理名称" />
    <el-table-column prop="deptName" label="二级部门" />
    <el-table-column prop="tdName" label="三级部门" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column prop="operation" label="操作">
      <template #default="{ row }">
        <el-button type="primary" link @click="showManagerDetailDialog(row.userId, false)">详情</el-button>
        <el-button type="primary" link @click="showManagerDetailDialog(row.userId, true)">编辑</el-button>
        <el-button type="danger" link @click="deleteRow(row)">删除</el-button>
        <el-button type="primary" link @click="showCmpyListDialog(row.userId)">查看客户列表</el-button>
        <el-button type="primary" link>下载附件</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <!-- 客户经理下的所有企业客户信息 -->
  <managerUserList ref="userListDialogRef" />
  <!-- 编辑、详情 -->
  <customInfoDialog ref="customInfoDialogRef" @submit-success="getList" />
</template>
<script setup>
import { onMounted, ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import managerUserList from "./components/managerUserList.vue";
import customInfoDialog from "./components/customInfoDialog.vue";
import useForm from "@/hooks/useForm";
import { managerList, managerDelete } from "@/api/manager";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
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
const total = ref(0);
const getList = () => {
  loadingWrapper(
    managerList(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
};
const handleResetForm = () => {
  resetForm().then(() => getList());
};
// 删除
const deleteRow = ({ userId }) => {
  ElMessageBox.confirm("是否确定删除该客户经理？？？", "删除提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    managerDelete({ userId }).then(res => {
      if (res.code == "0000") {
        ElMessage.success("删除成功");
      }
    });
  });
};
// 查看客户列表
const userListDialogRef = ref(null);
const showCmpyListDialog = userId => {
  userListDialogRef?.value?.openDialog(userId);
};
// 编辑、详情
const customInfoDialogRef = ref(null);
const showManagerDetailDialog = (id, isEdit) => {
  customInfoDialogRef?.value?.openDialog({ id, isEdit });
};
onMounted(() => {
  getList();
});
</script>
