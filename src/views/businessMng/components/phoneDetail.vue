<template>
  <!-- 搜索 -->
  <el-form ref="formRef" :model="form" :inline="true" width="80%">
    <el-form-item label="号码" prop="phoneNumber">
      <el-input v-model="form.phoneNumber" placeholder="请输入号码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList()">搜索</el-button>
      <el-button @click="handleResetForm">重置</el-button>
      <el-button @click="exportData">导出</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border v-load="isLoading">
    <el-table-column prop="phone" label="号码" width="180" />
    <el-table-column prop="createTime" label="加入时间" width="180" />
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
</template>

<script setup>
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import useForm from "@/hooks/useForm";
import { phoneDetail } from "@/api/businessCustomer";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
// 审核表单
const initialValues = {
  groupId: "",
  phoneNumber: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = ref([]);
const total = ref(0);
const getList = groupId => {
  form.groupId = groupId;
  loadingWrapper(
    phoneDetail(form).then(res => {
      tableData.value = res.data.list;
      total.value = res.data.total;
    })
  );
};

// 重置
const handleResetForm = () => {
  resetForm();
  getList();
};
// 导出
const exportData = () => {
  ElMessage.success("导出成功");
};
onMounted(() => {
  getList();
});
defineExpose({ handleResetForm, getList });
</script>
