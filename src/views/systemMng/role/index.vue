<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="角色名称" prop="roleName">
      <el-input v-model="form.roleName" placeholder="请输入角色名称" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleFormReset">重置</el-button>
      <el-button type="primary" v-hasPermi="['roleList:add']" @click="addRole({ isEdit: false })">新增角色</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border v-load="isLoading">
    <el-table-column prop="roleId" label="角色编号" />
    <el-table-column prop="roleName" label="角色名称" />
    <el-table-column prop="roleDesc" label="角色描述" />
    <el-table-column prop="createTime" label="创建时间">
      <template #default="{ row }">
        {{ $dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
    <el-table-column fixed="right" label="操作">
      <template #default="{ row }">
        <el-button
          type="primary"
          v-if="row.roleId != 1"
          link
          v-hasPermi="['roleList:edit']"
          @click="addRole({ data: row, isEdit: true })"
          >修改</el-button
        >
        <el-button type="danger" v-if="parseInt(row.roleId) > 6" link v-hasPermi="['roleList:delete']" @click="handleDelete(row)"
          >删除</el-button
        >
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <!-- 新增或者编辑角色 -->
  <roleDialog ref="roleDialogRef" @submit="getList" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import roleDialog from "./components/roleDialog.vue";
import useForm from "@/hooks/useForm";
import { deleteRole, roleList } from "@/api/role";
import mittBus from "@/utils/mittBus";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
// 搜索表单
const initialValues = {
  roleName: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const handleFormReset = () => {
  resetForm().then(() => getList());
};
// 表格数据
const tableData = ref([]);
const total = ref(0);
// 删除
const handleDelete = ({ roleId, roleName }) => {
  ElMessageBox.confirm(`此操作将永久删除该角色---${roleName}, 是否继续?`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  })
    .then(() => {
      return deleteRole({ roleId });
    })
    .then(() => {
      ElMessage.success("删除成功");
      getList();
    })
    .catch(error => {
      console.log(error);
    });
};
// 新增或者编辑账号
const roleDialogRef = ref(null);
const addRole = ({ data, isEdit }) => {
  roleDialogRef?.value?.handleOpenDialog({ data, isEdit });
};
const getList = () => {
  loadingWrapper(
    roleList(form).then(res => {
      tableData.value = res.rows;
      total.value = res.total;
    })
  );
};
onMounted(() => {
  getList();
  mittBus.on("refreshTable", () => {
    getList();
  });
});
</script>
