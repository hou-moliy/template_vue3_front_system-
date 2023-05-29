<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="企业客户" prop="userId">
      <model-select v-model="form.userId" dictType="userType" placeholder="请选择企业客户" />
    </el-form-item>
    <el-form-item label="分公司" prop="branchId">
      <model-select v-model="form.branchId" dictType="branchType" placeholder="请选择分公司" />
    </el-form-item>
    <el-form-item label="客户经理" prop="managerId">
      <model-select v-model="form.managerId" dictType="managerType" placeholder="请选择客户经理" />
    </el-form-item>
    <el-form-item label="渠道商" prop="channelId">
      <model-select v-model="form.channelId" dictType="channelType" placeholder="请选择渠道商" />
    </el-form-item>
    <el-form-item label="省份地市" prop="provinceId">
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
import { ref } from "vue";
import useForm from "@/hooks/useForm";
import regionSelect from "@/components/regionSelect/index.vue";
import useRegion from "@/hooks/useRegion.js";
import { numberList } from "@/api/stats";
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
  numberList(form).then(res => {
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
