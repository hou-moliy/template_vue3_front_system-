<template>
  <!-- 搜索 -->
  <el-form ref="formRef" :model="form" :inline="true">
    <el-form-item label="号码" prop="phone">
      <el-input v-model="form.phone" placeholder="请输入号码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList()">搜索</el-button>
      <el-button @click="handleResetForm">重置</el-button>
      <el-button @click="exportData">导出</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border>
    <el-table-column prop="phone" label="号码" width="180" />
    <el-table-column prop="createTime" label="加入时间" width="180" />
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { ElMessage } from "element-plus";
import useForm from "@/hooks/useForm";
// 审核表单
const initialValues = {
  phone: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = ref([]);
const total = computed(() => tableData.value.length);
const getList = () => {
  tableData.value = [
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
};
// 重置
const handleResetForm = () => {
  resetForm().then(() => getList());
};
// 导出
const exportData = () => {
  ElMessage.success("导出成功");
};
onMounted(() => {
  getList();
});
defineExpose({ handleResetForm });
</script>
