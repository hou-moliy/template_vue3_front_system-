<template>
  <!-- 搜索 -->
  <el-form ref="detailFormRef" :model="detailForm" :inline="true">
    <el-form-item label="号码" prop="phone">
      <el-input v-model="detailForm.phone" placeholder="请输入号码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit(detailFormRef)" :loading="loading">搜索</el-button>
      <el-button @click="resetForm(detailFormRef)">重置</el-button>
      <el-button @click="exportData">导出</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border>
    <el-table-column prop="phone" label="号码" width="180" />
    <el-table-column prop="createTime" label="加入时间" width="180" />
  </el-table>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
const detailFormRef = ref(null);
// 审核表单
const detailForm = reactive({
  phone: ""
});
const tableData = [
  {
    phone: "12345678901",
    createTime: "2021-01-01 12:00:00"
  },
  {
    phone: "12345678901",
    createTime: "2021-01-01 12:00:00"
  },
  {
    phone: "12345678901",
    createTime: "2021-01-01 12:00:00"
  },
  {
    phone: "12345678901",
    createTime: "2021-01-01 12:00:00"
  }
];
// 提交
const loading = ref(false);
const onSubmit = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
  });
};
// 重置
const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
};
// 导出
const exportData = () => {
  ElMessage.success("导出成功");
};
</script>
