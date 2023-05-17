<template>
  <el-dialog v-model="dialogVisible" title="直接发送企业列表" @close="resetForm">
    <!-- 表单 -->
    <el-form :inline="true" :model="form" ref="formRef">
      <el-form-item label="企业客户" prop="cmpy">
        <el-select v-model="form.cmpy" placeholder="请选择企业客户">
          <el-option label="企业客户1" value="shanghai" />
          <el-option label="企业客户2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="handleAddCmpyList">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table border :data="tableData">
      <el-table-column prop="cmpy" label="企业名称" />
      <el-table-column prop="createTime" label="加入时间" />
      <el-table-column label="操作">
        <template #default="{ row, index }">
          <el-button type="danger" @click="handleDel(row, index)">删除</el-button>
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
    <addCmpyList ref="addCmpyListRef" />
  </el-dialog>
</template>
<script setup>
import { reactive, ref } from "vue";
import useForm from "@/hooks/useForm";
import { ElMessageBox, ElMessage } from "element-plus";
import addCmpyList from "./addCmpyList.vue";
const dialogVisible = ref(false);
const addCmpyListRef = ref(false);
const initialValues = {
  cmpy: "",
  branchCmpy: "",
  manager: "",
  channel: "",
  times: "",
  createTime: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = reactive([
  {
    cmpy: "美团",
    manager: "美团经理",
    branchCmpy: "美团分公司",
    channel: "渠道商",
    phone: "123",
    times: "2",
    createTime: "2023/5/16"
  }
]);
const total = ref(tableData.length);
const getList = () => {
  console.log(form, "获取新数据");
};
const openDialog = () => {
  dialogVisible.value = true;
};
const handleDel = (row, index) => {
  ElMessageBox.confirm("是否确定从直接发送列表中删除该企业客户？？？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    console.log(row);
    tableData.splice(index, 1);
    ElMessage.success("删除成功");
  });
};
const handleAddCmpyList = () => {
  addCmpyListRef.value?.openDialog();
};
defineExpose({ openDialog });
</script>
