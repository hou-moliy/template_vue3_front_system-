<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="分公司名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入分公司名称" />
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
    <el-table-column prop="userName" label="分公司名称" />
    <el-table-column prop="createTime" label="创建时间">
      <template #default="{ row }">
        {{ $dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
    <el-table-column prop="operation" label="操作">
      <template #default="{ row }">
        <el-button type="primary" link @click="showDetailDialog(row.userId, false)">详情</el-button>
        <el-button type="primary" link @click="showDetailDialog(row.userId, true)">编辑</el-button>
        <el-button type="danger" link @click="deleteRow(row)">删除</el-button>
        <el-button type="primary" link @click="showCmpyListDialog(row)">查看客户经理列表</el-button>
        <el-button type="primary" link>下载附件</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />

  <!-- 客户经理列表 -->
  <customListDialog ref="customListDialogRef" />
  <!-- 编辑、详情 -->
  <branchDetailDialog ref="branchDetailDialogRef" @submitSuccess="getList" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { branchList, branchDel } from "@/api/branch";
import { ElMessage, ElMessageBox } from "element-plus";
import branchDetailDialog from "./components/branchDetailDialog.vue";
import customListDialog from "./components/customListDialog.vue";
import useForm from "@/hooks/useForm";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const customListDialogRef = ref(null);
const branchDetailDialogRef = ref(null);
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
const total = ref(0);
const getList = () => {
  loadingWrapper(
    branchList(form).then(res => {
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
  ElMessageBox.confirm("是否确定删除该分公司？？？", "删除提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    branchDel({ userId }).then(res => {
      if (res.code == "0000") {
        getList();
        ElMessage.success("删除成功");
      }
    });
  });
};
// 查看企业客户列表
const showCmpyListDialog = row => {
  customListDialogRef?.value?.openDialog(row.userId);
};
// 编辑、详情
const showDetailDialog = (id, isEdit) => {
  branchDetailDialogRef?.value?.openDialog({ id, isEdit });
};
onMounted(() => {
  getList();
});
</script>
