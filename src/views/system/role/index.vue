<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="角色">
      <el-select v-model="form.role" placeholder="请输入角色类型">
        <el-option label="角色1" value="shanghai" />
        <el-option label="角色2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubitForm">搜索</el-button>
      <el-button @click="handleFormReset">重置</el-button>
      <el-button type="primary" @click="addRole(true)">新增角色</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border>
    <el-table-column type="index" label="序号" />
    <el-table-column prop="role" label="角色" />
    <el-table-column prop="description" label="描述" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column fixed="right" label="操作">
      <template #default="{ row, index }">
        <el-button type="primary" @click="addRole(false)">修改</el-button>
        <el-button type="danger" @click="deleteRole(row, index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize"
    @pagination="getList" />
  <!-- 新增或者编辑角色 -->
  <roleDialog ref="roleDialogRef" />
</template>
<script setup>
import { reactive, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import roleDialog from "./components/roleDialog.vue";
import useForm from "@/hooks/useForm";
// 搜索表单
const initialValues = {
  role: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);

const handleFormReset = () => {
  resetForm(() => getList());
};
const handleSubitForm = () => {
  submitForm(
    () => {
      // 成功回调
      getList();
      console.log("表单提交成功");
    },
    () => {
      // 失败回调
      console.log("表单提交失败");
    }
  );
};
const tableData = reactive([
  {
    role: "角色1",
    description: "描述1",
    createTime: "2021-08-01 12:00:00"
  },
  {
    role: "角色1",
    description: "描述1",
    createTime: "2021-08-01 12:00:00"
  },
  {
    role: "角色1",
    description: "描述1",
    createTime: "2021-08-01 12:00:00"
  }
]);

// 删除
const deleteRole = ({ role }, index) => {
  ElMessageBox.confirm(`此操作将永久删除该角色---${role}, 是否继续?`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    // 删除
    tableData.splice(index, 1);
    ElMessage.success("删除成功");
  });
};
// 新增或者编辑账号
const roleDialogRef = ref(null);
const addRole = isEdit => {
  roleDialogRef?.value?.openDialog({ isEdit });
};
const total = ref(tableData.length);
const getList = () => {
  console.log("请求接口数据", form);
};
</script>
