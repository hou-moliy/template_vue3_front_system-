<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="省份地市">
      <regionSelect v-model="address" :level="2" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" @click="handleExport" :disabled="!tableData.length">导出</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData" v-load="isLoading">
    <el-table-column label="省份" prop="provinceId" />
    <el-table-column label="地市" prop="cityId" />
    <el-table-column label="号码量" prop="phoneNum" />
    <el-table-column label="操作">
      <template #default>
        <el-button type="primary" link>导出号码详情</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import regionSelect from "@/components/regionSelect/index.vue";
import useRegion from "@/hooks/useRegion.js";
import useForm from "@/hooks/useForm";
import { unusedList, exportUnusedNumberList } from "@/api/number";
import { exportFile } from "@/hooks/useExport";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
// 表单
const initialValues = {
  provinceId: "",
  cityId: "",
  createTime: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const { address, setAddress } = useRegion(formRef, form);
// 表格数据
const tableData = ref([]);
const total = ref(0);
const getList = () => {
  loadingWrapper(
    unusedList(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.data.rows;
        total.value = res.data.total;
      }
    })
  );
};
// 重置
const handleReset = () => {
  resetForm();
  setAddress([]);
};
// 导出
const handleExport = () => {
  exportUnusedNumberList(form).then(res => {
    if (res.data.size == 0) {
      ElMessage.warning("暂无数据");
      return;
    }
    exportFile(res.data, "xlsx", "成本账单");
  });
};
onMounted(() => {
  getList();
});
</script>
