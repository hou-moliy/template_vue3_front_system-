<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="企业客户" prop="userId">
      <model-select v-model="form.userId" dictType="userType" placeholder="请选择企业客户" />
    </el-form-item>
    <el-form-item label="公式名称" prop="formulaName">
      <el-input v-model="form.formulaName" placeholder="请输入公式名称" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" @click="handleDialog(1)">新建公式</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData">
    <el-table-column prop="formulaName" label="公式名称" />
    <el-table-column prop="userName" label="关联企业" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" link @click="handleDialog(2, row)">详情</el-button>
        <el-button type="primary" link @click="handleDialog(3, row)">修改</el-button>
        <el-button type="primary" link>删除</el-button>
        <el-button type="primary" link @click="handleDialog(4, row)">复制</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <addFormula ref="addFormulaRef" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import useForm from "@/hooks/useForm";
import addFormula from "./components/addFormula.vue";
import { listBillingFormulas } from "@/api/bill";
const addFormulaRef = ref(null);
const initialValues = {
  userId: "",
  formulaName: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = ref([
  {
    cmpy: "美团",
    manager: "美团经理",
    branchCmpy: "美团分公司",
    channel: "渠道商",
    phone: "123",
    times: "2",
    streamNumber: "123",
    createTime: "2023/5/16"
  }
]);
const total = ref(tableData.value.length);
const getList = () => {
  listBillingFormulas(form).then(res => {
    if (res.code == "0000") {
      tableData.value = res.data.list;
      total.value = res.data.total;
    }
  });
};
// 重置
const handleReset = () => {
  resetForm().then(() => {
    getList();
  });
};
const handleDialog = (type, row) => {
  const streamNumber = row ? row.streamNumber : "";
  addFormulaRef.value?.openDialog({ type, streamNumber });
};
onMounted(() => {
  getList();
});
</script>
