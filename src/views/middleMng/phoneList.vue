<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="企业客户" prop="cmpy">
      <el-select v-model="form.cmpy" placeholder="请选择企业客户">
        <el-option label="企业客户1" value="shanghai" />
        <el-option label="企业客户2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="分公司" prop="branchCmpy">
      <el-select v-model="form.branchCmpy" placeholder="请选择分公司">
        <el-option label="分公司1" value="shanghai" />
        <el-option label="分公司2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="客户经理" prop="manager">
      <el-select v-model="form.manager" placeholder="请选择客户经理">
        <el-option label="客户经理1" value="shanghai" />
        <el-option label="客户经理2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="渠道商" prop="channel">
      <el-select v-model="form.channel" placeholder="请选择渠道商">
        <el-option label="渠道商1" value="shanghai" />
        <el-option label="渠道商2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="省份地市">
      <regionSelect v-model="address" :level="2" />
    </el-form-item>
    <el-form-item label="统计周期" prop="date">
      <el-select v-model="form.date" placeholder="请选择统计周期">
        <el-option label="日统计" value="day" />
        <el-option label="月统计" value="month" />
      </el-select>
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
    <el-table-column prop="branchCmpy" label="分公司" />
    <el-table-column prop="manager" label="客户经理" />
    <el-table-column prop="channel" label="渠道商" />
    <el-table-column prop="cmpy" label="企业客户" />
    <el-table-column prop="cmpy" label="业务类型" />
    <el-table-column prop="cmpy" label="省份" />
    <el-table-column prop="cmpy" label="地市" />
    <el-table-column prop="cmpy" label="整月号码占用" />
    <el-table-column prop="cmpy" label="下半月号码占用" />
    <el-table-column prop="cmpy" label="上线号码量" />
    <el-table-column prop="cmpy" label="下线号码量" />
    <el-table-column prop="phone" label="号码变更量" />
    <el-table-column prop="times" label="本月月末号码量" />
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
</template>
<script setup>
import { reactive, ref } from "vue";
import useForm from "@/hooks/useForm";
import regionSelect from "@/components/regionSelect/index.vue";
import useRegion from "@/hooks/useRegion.js";
const initialValues = {
  cmpy: "",
  branchCmpy: "",
  manager: "",
  channel: "",
  province: "",
  city: "",
  date: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
// 地址
const { address, setAddress } = useRegion(formRef, form);
const tableData = reactive([
  {
    cmpy: "美团",
    manager: "美团经理",
    branchCmpy: "美团分公司",
    channel: "渠道商",
    phone: "123",
    times: "2",
    createTime: "2023/5/16"
  }
]);
const total = ref(tableData.length);
const getList = () => {
  console.log(form, "获取新数据");
};
// 重置
const handleReset = () => {
  setAddress([]);
  resetForm().then(() => {
    getList();
  });
};
</script>
