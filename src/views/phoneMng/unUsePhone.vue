<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="searchForm" ref="formRef">
    <el-form-item label="省份地市">
      <regionSelect v-model="address" :level="2" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">搜索</el-button>
      <el-button @click="resetForm">重置</el-button>
      <el-button type="primary">上传号码清单</el-button>
      <el-button type="primary">下载号码清单样例</el-button>
      <el-button type="primary">导出</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData">
    <el-table-column label="省份" prop="province" />
    <el-table-column label="地市" prop="city" />
    <el-table-column label="号码量" prop="phoneNum" />
    <el-table-column label="操作">
      <template #default="scope">
        <el-button type="primary">导出号码详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { reactive, ref } from "vue";
import regionSelect from "@/components/regionSelect/index.vue";
import { useRegion } from "@/hooks/useRegion.js";
// 表单
const formRef = ref(null);
const searchForm = reactive({
  province: "",
  city: "",
  createTime: ""
});
const { address, setAddress } = useRegion(formRef, searchForm);
// 表格数据
const tableData = reactive([
  {
    province: "北京市",
    city: "东城区",
    phoneNum: 100
  },
  {
    province: "北京市",
    city: "东城区",
    phoneNum: 100
  },
  {
    province: "北京市",
    city: "东城区",
    phoneNum: 100
  }
]);
// 重置
const resetForm = () => {
  formRef.value.resetFields();
  setAddress([]);
};
// 搜索
const onSubmit = () => {
  console.log(searchForm);
  console.log(address);
};
</script>
