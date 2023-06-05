<template>
  <!-- 直发企业列表 -->
  <el-dialog v-model="dialogVisible" title="直接发送企业列表" @close="resetForm">
    <!-- 表单 -->
    <el-form :inline="true" :model="form" ref="formRef">
      <el-form-item label="企业客户" prop="userId">
        <model-select v-model="form.userId" dictType="businessUser" placeholder="请选择企业客户" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="handleReset">重置</el-button>
        <el-button type="primary" @click="handleAddCmpyList">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table border :data="tableData" v-load="isLoading">
      <el-table-column prop="userName" label="企业名称" />
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="emailIsSendTime" label="加入时间">
        <template #default="{ row }">
          {{ $dayjs(row.emailIsSendTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button type="danger" link @click="handleDel(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="total > 0"
      :total="total"
      v-model:page="form.pageNum"
      v-model:limit="form.pageSize"
      @pagination="getList"
    />
    <!-- 新增直 -->
    <addCmpyList ref="addCmpyListRef" @submit-success="getList" />
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import useForm from "@/hooks/useForm";
import { ElMessageBox, ElMessage } from "element-plus";
import addCmpyList from "./addCmpyList.vue";
import { listEnterpriseCsMails, deleteEnterpriseCsMail } from "@/api/complaint";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const dialogVisible = ref(false);
const addCmpyListRef = ref(false);
const initialValues = {
  userId: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = ref([]);
const total = ref(0);
const getList = () => {
  loadingWrapper(
    listEnterpriseCsMails(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
};
const openDialog = () => {
  dialogVisible.value = true;
  getList();
};
const handleDel = ({ userId }) => {
  ElMessageBox.confirm("是否确定从直接发送列表中删除该企业客户？？？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteEnterpriseCsMail({ userId }).then(res => {
      if (res.code == "0000") {
        ElMessage.success("删除成功");
        getList();
      }
    });
  });
};
const handleAddCmpyList = () => {
  addCmpyListRef.value?.openDialog();
};
const handleReset = () => {
  resetForm();
  getList();
};
defineExpose({ openDialog });
</script>
