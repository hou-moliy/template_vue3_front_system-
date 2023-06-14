<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="企业客户" prop="userId">
      <model-select v-model="form.userId" dictType="businessUser" placeholder="请选择企业客户" />
    </el-form-item>
    <el-form-item label="公式名称" prop="formulaName">
      <el-input v-model="form.formulaName" placeholder="请输入公式名称" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" v-hasPermi="['billFormula:add']" @click="handleDialog(1)">新建公式</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData" v-load="isLoading">
    <el-table-column prop="formulaName" label="公式名称" />
    <el-table-column prop="midGroupList" label="关联企业">
      <template #default="{ row }">
        <div v-if="row.midGroupList && row.midGroupList.length">
          <span v-for="(midGroup, index) in row.midGroupList" :key="index">{{ midGroup.groupName }}</span>
        </div>
        <div v-else>暂无关联企业</div>
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间">
      <template #default="{ row }">
        {{ $dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="primary" link v-hasPermi="['billFormula:detail']" @click="handleDialog(2, row)">详情</el-button>
        <el-button type="primary" link v-hasPermi="['billFormula:edit']" @click="handleDialog(3, row)">修改</el-button>
        <el-button type="primary" link v-hasPermi="['billFormula:delete']" @click="handleDel(row)" handleDel>删除</el-button>
        <el-button type="primary" link v-hasPermi="['billFormula:copy']" @click="handleDialog(4, row)">复制</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <addFormula ref="addFormulaRef" @submit-success="getList" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import useForm from "@/hooks/useForm";
import addFormula from "./components/addFormula.vue";
import { listBillingFormulas, deleteBillingFormula } from "@/api/bill";
import { ElMessage } from "element-plus";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const addFormulaRef = ref(null);
const initialValues = {
  userId: "",
  formulaName: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = ref([]);
const total = ref(0);
const getList = () => {
  loadingWrapper(
    listBillingFormulas(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
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
// 删除
const handleDel = ({ streamNumber }) => {
  ElMessageBox.confirm(`是否确定删除该账单公式？？？`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      return deleteBillingFormula({ streamNumber });
    })
    .then(res => {
      if (res.code == "0000") {
        ElMessage.success("删除成功");
        getList();
      }
    })
    .catch(error => {
      console.log(error);
    });
};
onMounted(() => {
  getList();
});
</script>
