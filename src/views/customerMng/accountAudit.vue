<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="账户类型" prop="userType">
      <model-select v-model="form.userType" dictType="roleType" placeholder="请选择账户类型" />
    </el-form-item>
    <el-form-item label="审批状态" prop="auditStatus">
      <model-select v-model="form.auditStatus" dictType="auditStatus" placeholder="请选择审批状态" />
    </el-form-item>
    <el-form-item label="申请人名称" prop="loginName">
      <el-input v-model="form.loginName" placeholder="请输入申请人姓名" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleResetForm">重置</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border style="width: 100%" v-load="isLoading">
    <el-table-column prop="loginName" label="申请人姓名" />
    <el-table-column prop="phone" label="联系方式" />
    <el-table-column prop="createTime" label="申请时间" />
    <el-table-column prop="file" label="资料查看">
      <template #default>
        <el-button type="primary" link>点击下载</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="userType" label="账户类型">
      <template #default="{ row }">
        <span>{{ getDictTypeLabel("userTypes", row.userType) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="审批状态">
      <template #default="{ row }">
        <span>{{ getDictTypeLabel("auditStatus", row.status) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="auditer" label="审批人">
      <template #default="{ row }">
        <span v-if="row.status == 1">{{ row.auditer }}</span>
        <span v-else class="gray">/</span>
      </template>
    </el-table-column>
    <el-table-column prop="updateTime" label="审批时间" />
    <el-table-column prop="auditStatus" label="审批结果">
      <template #default="{ row }">
        <span v-if="row.status != 0">{{ getDictTypeLabel("auditStatus", row.status) }}</span>
        <span v-else class="gray">/</span>
      </template>
    </el-table-column>
    <el-table-column prop="remark" label="备注" />
    <el-table-column fixed="right" label="审批操作" width="180">
      <template #default="{ row }">
        <div v-if="row.status != 1">
          <el-button type="primary" link @click="openAuditDialog(row, '1')">通过</el-button>
          <el-button type="danger" link @click="openAuditDialog(row, '0')">不通过</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <!-- 审核弹窗 -->
  <auditDialog ref="auditDialogRef" @refresh="getList" />
</template>
<script setup>
import auditDialog from "./components/auditDialog.vue";
import { ref, onMounted } from "vue";
import useForm from "@/hooks/useForm";
import { userList } from "@/api/user";
import DictTypesStore from "@/stores/modules/dictTypes";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const { getDictTypeLabel } = DictTypesStore();
// 审核弹窗
const auditDialogRef = ref(null);

// 搜索表单
const initialValues = {
  userType: "",
  auditStatus: "",
  loginName: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const handleResetForm = () => {
  resetForm().then(() => getList());
};
// 表格栏
let tableData = ref([]);
const total = ref(0);
const getList = () => {
  loadingWrapper(
    userList(form).then(res => {
      if (res.code === 200) {
        tableData.value = res.data.rows;
        total.value = res.data.total;
      }
    })
  );
};
const openAuditDialog = ({ userType }, auditStatus) => {
  // info: 1-通过 0-不通过
  auditDialogRef.value?.openDialog({ userType, auditStatus });
};

onMounted(() => {
  getList();
});
</script>
