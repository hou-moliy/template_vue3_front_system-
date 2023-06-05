<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="企业账户名称" prop="groupName">
      <el-input v-model="form.groupName" placeholder="请输入客户名称" />
    </el-form-item>
    <el-form-item label="业务模式" prop="bindingType">
      <model-select v-model="form.bindingType" dictType="bindingType" placeholder="请选择业务模式" />
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-date-picker v-model="form.createTime" value-format="YYYYMMDDHHmmss" type="datetime" placeholder="请选择创建时间" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleResetForm">重置</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border v-load="isLoading">
    <el-table-column prop="groupName" label="企业账户名称" />
    <el-table-column prop="bindingType" label="业务模式">
      <template #default="{ row }">
        <span>{{ getDictTypeValue("bindingType", row.bindingType) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间">
      <template #default="{ row }">
        {{ $dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
    <el-table-column prop="operation" label="操作">
      <template #default="{ row, $index }">
        <el-button type="primary" link @click="showCmpyInfoDialog(row, false)">详情</el-button>
        <el-button type="primary" link @click="showCmpyInfoDialog(row, true)">编辑</el-button>
        <el-button type="danger" link @click="deleteRow($index, row)">删除</el-button>
        <el-button type="primary" link @click="showPhoneDialog(row)">查看号码列表</el-button>
        <el-button type="primary" link>下载附件</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />

  <!-- 号码列表 -->
  <phoneDialog ref="phoneDialogRef" />
  <!-- 编辑、详情 -->
  <cmpyInfoDialog ref="cmpyInfoDialogRef" @submit-success="getList" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import phoneDialog from "./components/phoneDialog.vue";
import cmpyInfoDialog from "./components/cmpyInfoDialog.vue";
import useForm from "@/hooks/useForm";
import { handleList, deleteInfo } from "@/api/businessCustomer";
import DictTypesStore from "@/stores/modules/dictTypes";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const { getDictTypeValue } = DictTypesStore();
const phoneDialogRef = ref(null);
const cmpyInfoDialogRef = ref(null);
// 搜索表单
const initialValues = {
  groupName: "",
  bindingType: "",
  createTime: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
// 表格数据
const tableData = ref([]);
const total = ref(0);
const getList = () => {
  loadingWrapper(
    handleList(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
};
const handleResetForm = () => {
  resetForm().then(() => getList());
};
// 删除
const deleteRow = ({ groupName, groupId }) => {
  ElMessageBox.confirm(`是否确定删除【${groupName}】企业？？？`, "删除提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteInfo({ groupId }).then(() => {
      getList();
      ElMessage.success("删除成功");
    });
  });
};
// 查看号码列表
const showPhoneDialog = row => {
  phoneDialogRef?.value?.openDialog(row);
};
// 编辑、详情
const showCmpyInfoDialog = ({ streamNumber }, isEdit) => {
  cmpyInfoDialogRef?.value?.openDialog({ id: streamNumber, isEdit });
};
onMounted(() => {
  getList();
});
</script>
