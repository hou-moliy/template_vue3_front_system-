<template>
  <el-dialog title="客户经理列表" v-model="dialogVisible" width="80%">
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
      <el-table-column prop="createTime" label="创建时间">
        <template #default="{ row }">
          {{ $dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
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
import { ref } from "vue";
import useForm from "@/hooks/useForm";
import { branchManaList } from "@/api/branch";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const dialogVisible = ref(false);
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
    branchManaList(form).then(res => {
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
// openDialog
const openDialog = userId => {
  form.userId = userId;
  dialogVisible.value = true;
  getList();
};
defineExpose({ openDialog });
</script>
