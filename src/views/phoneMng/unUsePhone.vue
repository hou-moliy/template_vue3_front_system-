<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="省份地市">
      <regionSelect v-model="address" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" v-hasPermi="['unUsedList:export']" @click="handleExport" :disabled="!tableData.length">导出</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData" v-load="isLoading">ne
    <el-table-column label="省份" prop="provinceName" />
    <el-table-column label="地市" prop="cityName" />
    <el-table-column label="号码量" prop="numberTotal" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" link v-hasPermi="['unUsedList:detail:export']" @click="handleExportPhoneDetail(row)">导出号码详情</el-button>
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
import { handleDownload, exportExcel } from "@/hooks/useExport";
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
const { address, setAddress, getAddress } = useRegion(formRef, form);
// 表格数据
const tableData = ref([]);
const total = ref(0);
const getList = () => {
  loadingWrapper(
    unusedList(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
};
// 重置
const handleReset = () => {
  resetForm();
  setAddress([]);
  getList();
};
// 导出
const handleExport = () => {
  const { provinceId, cityId } = form;
  let fileName = "";
  if (provinceId && cityId) {
    const address = getAddress([provinceId, cityId]);
    fileName = `${address[0]}-${address[1]}-未用号码资源`;
  } else {
    fileName = "未用号码资源";
  }
  handleDownload(exportUnusedNumberList(form), "xlsx", fileName);
};
// 表格-行导出号码详情
const handleExportPhoneDetail = ({ provinceName, cityName, numberList }) => {
  //导出 把英文表头转成中文
  let Lists = [];
  numberList.map(item => {
    let obj = {};
    obj["省份"] = provinceName;
    obj["城市"] = cityName;
    obj["号码"] = item;
    Lists.push(obj);
  });
  let fields = {
    provinceName: "省份",
    cityName: "城市",
    number: "号码"
  };
  exportExcel(Lists, fields, `${provinceName}-${cityName}号码详情`);
};
onMounted(() => {
  getList();
});
</script>
