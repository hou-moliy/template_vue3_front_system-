<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="企业客户" prop="userId">
      <model-select v-model="form.userId" dictType="userType" placeholder="请选择企业客户" />
    </el-form-item>
    <el-form-item label="省份地市" prop="provinceId">
      <regionSelect v-model="address" :level="2" />
    </el-form-item>
    <el-form-item label="时间范围" prop="date">
      <el-date-picker v-model="form.date" type="datetime" placeholder="请选择时间范围" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary">导出</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData">
    <el-table-column prop="createTime" label="时间" />
    <el-table-column prop="branchCmpy" label="省份" />
    <el-table-column prop="manager" label="地市" />
    <el-table-column prop="channel" label="通话时长总计" />
    <el-table-column prop="cmpy" label="通话次数总计" />
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
</template>
<script setup>
import { ref } from "vue";
import useForm from "@/hooks/useForm";
import regionSelect from "@/components/regionSelect/index.vue";
import useRegion from "@/hooks/useRegion.js";
import { numberActList } from "@/api/stats";
const initialValues = {
  userId: "",
  provinceId: "",
  cityId: "",
  date: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
// 地址
const { address, setAddress } = useRegion(formRef, form);
const tableData = ref([]);
const total = ref(0);
const getList = () => {
  numberActList(form).then(res => {
    if (res.code == "0000") {
      tableData.value = res.data.list;
      total.value = res.data.total;
    }
  });
};
// 重置
const handleReset = () => {
  setAddress([]);
  resetForm().then(() => {
    getList();
  });
};
</script>
