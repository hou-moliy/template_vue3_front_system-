<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="角色" prop="role">
      <el-select v-model="form.role" placeholder="请输入角色类型">
        <el-option label="角色1" value="shanghai" />
        <el-option label="角色2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleFormReset">重置</el-button>
      <el-button type="primary" @click="addRole({ isEdit: false })">新增角色</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border>
    <el-table-column prop="id" label="序号" />
    <el-table-column prop="role" label="角色" />
    <el-table-column prop="description" label="描述" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column fixed="right" label="操作">
      <template #default="{ row, index }">
        <el-button type="primary" link @click="addRole({ data: row, isEdit: true })">修改</el-button>
        <el-button type="danger" link @click="deleteRole(row, index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <!-- 新增或者编辑角色 -->
  <roleDialog ref="roleDialogRef" />
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import roleDialog from "./components/roleDialog.vue";
import useForm from "@/hooks/useForm";
// 搜索表单
const initialValues = {
  role: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);

const handleFormReset = () => {
  resetForm().then(() => getList());
};
// 表格数据
const tableData = ref([]);
const total = computed(() => tableData.value.length);
// 删除
const deleteRole = ({ role }, index) => {
  ElMessageBox.confirm(`此操作将永久删除该角色---${role}, 是否继续?`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    // 删除
    tableData.value.splice(index, 1);
    ElMessage.success("删除成功");
  });
};
// 新增或者编辑账号
const roleDialogRef = ref(null);
const addRole = ({ data, isEdit }) => {
  roleDialogRef?.value?.handleOpenDialog({ data, isEdit });
};
const getList = () => {
  tableData.value = [
    {
      role: "角色1",
      id: 117,
      description: "描述1",
      createTime: "2021-08-01 12:00:00"
    },
    {
      role: "角色1",
      id: 1,
      description: "描述1",
      createTime: "2021-08-01 12:00:00"
    },
    {
      role: "角色1",
      id: 118,
      description: "描述1",
      createTime: "2021-08-01 12:00:00"
    }
  ];
  console.log("请求接口数据", form);
};
onMounted(() => {
  getList();
});
</script>
