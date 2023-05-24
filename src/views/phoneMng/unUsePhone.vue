<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="省份地市">
      <regionSelect v-model="address" :level="2" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary">导出</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData">
    <el-table-column label="省份" prop="province" />
    <el-table-column label="地市" prop="city" />
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
import { ref, onMounted, computed } from "vue";
import regionSelect from "@/components/regionSelect/index.vue";
import useRegion from "@/hooks/useRegion.js";
import useForm from "@/hooks/useForm";
// 表单
const initialValues = {
  province: "",
  city: "",
  createTime: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const { address, setAddress } = useRegion(formRef, form);
// 表格数据
const tableData = ref([]);
const total = computed(() => tableData.value.length);
const getList = () => {
  tableData.value = [
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
  ];
  console.log(form);
  console.log(address);
};
// 重置
const handleReset = () => {
  resetForm();
  setAddress([]);
};
onMounted(() => {
  getList();
});
</script>
