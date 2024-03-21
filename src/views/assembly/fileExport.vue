<template>
  <!-- 表格 -->
  <el-table border :data="tableData" v-load="isLoading">
    <el-table-column label="省份" prop="provinceName" />
    <el-table-column label="地市" prop="cityName" />
    <el-table-column label="号码量" prop="numberTotal" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" @click="handleExportPhoneDetail(row)">导出号码详情</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script setup>
import { ref } from "vue";
import { exportExcel } from "@/hooks/useExport";
import useLoading from "@/hooks/useLoading";
const { isLoading } = useLoading();

// 表格数据
const tableData = ref([
  {
    provinceName: "四川",
    cityName: "成都",
    numberTotal: 4,
    numberList: ["123", "123", "567", "7888"]
  },
  {
    provinceName: "湖南",
    cityName: "长沙",
    numberTotal: 4,
    numberList: ["123", "123", "567", "7888"]
  },
  {
    provinceName: "云南",
    cityName: "昆明",
    numberTotal: 4,
    numberList: ["123", "123", "567", "7888"]
  }
]);
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
</script>
