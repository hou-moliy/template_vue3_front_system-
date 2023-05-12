<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="省份地市">
      <regionSelect v-model="address" :level="2" />
    </el-form-item>
    <el-form-item label="创建时间">
      <el-date-picker v-model="searchForm.createTime" type="datetime" placeholder="请选择创建时间" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary">搜索</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
</template>
<script setup>
import { reactive } from "vue";
import regionSelect from "@/components/regionSelect/index.vue";
// 表单
const searchForm = reactive({
  province: "北京市",
  city: "东城区",
  createTime: ""
});
const address = reactive([searchForm.province, searchForm.city]);
</script>
