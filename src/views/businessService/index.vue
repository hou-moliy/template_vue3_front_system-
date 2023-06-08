<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="申请人名称" prop="applicantName">
      <el-input v-model="form.applicantName" placeholder="请输入申请人姓名" />
    </el-form-item>
    <el-form-item label="企业名称" prop="groupName">
      <el-input v-model="form.groupName" placeholder="请输入企业名称" />
    </el-form-item>
    <el-form-item label="申请时间" prop="createTime">
      <el-date-picker v-model="form.createTime" type="date" placeholder="请选择申请时间" />
    </el-form-item>
    <el-form-item label="审批状态" prop="auditStatus">
      <model-select v-model="form.auditStatus" dictType="auditStatus" placeholder="请选择审批状态" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleFormReset">重置</el-button>
      <el-button type="primary" @click="addService(true, true)">新增</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border style="width: 100%" v-load="isLoading">
    <el-table-column prop="userName" label="申请人姓名" />
    <el-table-column prop="groupName" label="企业名称" />
    <el-table-column prop="phoneNumber" label="联系方式" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="createTime" label="申请时间" />
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="auditStatus" label="审核状态">
      <template #default="{ row }">
        <span>{{ getDictTypeValue("auditStatus", row.auditStatus) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="auditFailedReason" label="审批结果">
      <template #default="{ row }">
        <span v-if="row.auditStatus == 2">{{ getDictTypeValue("auditStatus", row.auditStatus) }}</span>
        <span v-else-if="row.auditStatus == 1">{{ row.auditFailedReason }}</span>
        <span v-else class="gray">/</span>
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="审批操作">
      <template #default="{ row }">
        <el-button type="primary" v-if="row.auditStatus == 0" link @click="openAuditDialog(row)">审核</el-button>
        <el-button type="primary" link @click="addService(false, false, row)">查看</el-button>
        <el-button type="primary" link @click="addService(true, false, row)">修改</el-button>
        <el-button type="danger" link>撤销</el-button>
        <el-button type="primary" link>下载</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <!-- 审核弹窗 -->
  <auditDialog ref="auditDialogRef" @submit-success="getList" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { handleList } from "@/api/businessService";
import DictTypesStore from "@/stores/modules/dictTypes";
import useForm from "@/hooks/useForm";
import auditDialog from "./components/auditDialog.vue";
import { useLoading } from "@/hooks/useLoading";
import { useRouter } from "vue-router";
const { getDictTypeValue } = DictTypesStore();
const router = useRouter();
const { isLoading, loadingWrapper } = useLoading();
// 审核弹窗
const auditDialogRef = ref(null);
// 搜索表单
const initialValues = {
  applicantName: "",
  auditStatus: "",
  groupName: "",
  createTime: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
// 表格栏
let tableData = ref([]);
const total = ref(0);
const getList = () => {
  loadingWrapper(
    handleList(form).then(res => {
      if (res.code === "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
};
const handleFormReset = () => {
  resetForm().then(() => getList());
};
const openAuditDialog = data => {
  // info: 1-通过 0-不通过
  auditDialogRef?.value?.openDialog(data);
};
const addService = (isEdit, isAdd, row) => {
  let url = `/businessService/businessDetail?isEdit=${isEdit}&isAdd=${isAdd}`;
  if (row) {
    url = `${url}&type=${row.type}&streamNumber=${row.streamNumber}`;
  }
  router.push(url);
};
onMounted(() => {
  getList();
});
</script>
