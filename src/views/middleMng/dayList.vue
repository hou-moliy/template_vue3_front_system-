<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="企业客户" prop="userId">
      <model-select v-model="form.userId" dictType="businessUser" placeholder="请选择企业客户" />
    </el-form-item>
    <el-form-item label="省份地市" prop="provinceId">
      <regionSelect v-model="address" />
    </el-form-item>
    <el-form-item label="时间范围">
      <el-date-picker
        v-model="dateRange"
        type="daterange"
        value-format="YYYYMMDD"
        :disabled-date="$pickerOptions.disabledDate"
        placeholder="请选择时间范围"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary">导出</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData" v-load="isLoading">
    <el-table-column prop="statTime" label="时间">
      <template #default="{ row }">
        {{ $dayjs(row.statTime).format("YYYY-MM-DD") }}
      </template>
    </el-table-column>
    <el-table-column prop="provinceName" label="省份" />
    <el-table-column prop="cityName" label="地市" />
    <el-table-column prop="callDurationCount" label="通话时长总计" />
    <el-table-column prop="callTimesCount" label="通话次数总计" />
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
</template>
<script setup>
import { onMounted, ref } from "vue";
import useForm from "@/hooks/useForm";
import regionSelect from "@/components/regionSelect/index.vue";
import useRegion from "@/hooks/useRegion.js";
import { numberActList } from "@/api/stats";
import useTimeRange from "./hooks/useTimeRange";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const initialValues = {
  userId: "",
  provinceId: "",
  cityId: "",
  statTime: "",
  actType: "0",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const { dateRange, resetDateRange } = useTimeRange(form);

// 地址
const { address, setAddress } = useRegion(formRef, form);
const tableData = ref([]);
const total = ref(0);
const getList = () => {
  loadingWrapper(
    numberActList(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
};
// 重置
const handleReset = () => {
  setAddress([]);
  resetDateRange();
  resetForm().then(() => {
    getList();
  });
};
onMounted(() => {
  getList();
});
</script>
