<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="账号">
      <el-input v-model="searchForm.account" placeholder="请输入账号" />
    </el-form-item>
    <el-form-item label="角色">
      <el-select v-model="searchForm.role" placeholder="请输入角色类型">
        <el-option label="角色1" value="shanghai" />
        <el-option label="角色2" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="状态">
      <el-select v-model="searchForm.status" placeholder="请选择状态">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">搜索</el-button>
      <el-button>重置</el-button>
      <el-button type="primary" @click="addAccount(true)">新增账号</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border>
    <el-table-column prop="account" label="账号" />
    <el-table-column prop="name" label="姓名" />
    <el-table-column prop="phone" label="手机号" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="role" label="角色" />
    <el-table-column prop="status" label="状态" />
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column fixed="right" label="操作">
      <template #default="{ row, index }">
        <el-button type="primary" @click="addAccount(false)">修改</el-button>
        <el-button type="danger" @click="changeBindStatus(row)">{{ showStatusText(row.status) }}</el-button>
        <el-button type="danger" @click="deleteAccount(row, index)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 新增或者编辑账号 -->
  <accountDialog ref="accountDialogRef" />
</template>
<script setup>
import { reactive, ref } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import accountDialog from "./components/accountDialog.vue";
// 搜索表单
const searchForm = reactive({
  account: "",
  role: "",
  status: ""
});
const tableData = reactive([
  {
    id: "1",
    account: "admin",
    name: "张三",
    phone: "12345678901",
    email: "",
    role: "企业客户",
    status: "1", // 1:正常 2:冻结0:删除
    createTime: "2021-08-01 12:00:00"
  },
  {
    id: "2",
    account: "admin",
    name: "张三",
    phone: "12345678901",
    email: "",
    role: "企业客户",
    status: "0",
    createTime: "2021-08-01 12:00:00"
  },
  {
    id: "3",
    account: "admin",
    name: "张三",
    phone: "12345678901",
    email: "",
    role: "企业客户",
    status: "2",
    createTime: "2021-08-01 12:00:00"
  },
  {
    id: "4",
    account: "admin",
    name: "张三",
    phone: "12345678901",
    email: "",
    role: "企业客户",
    status: "1",
    createTime: "2021-08-01 12:00:00"
  }
]);

const showStatusText = status => {
  if (status == 1) {
    return "正常";
  } else if (status == 2) {
    return "冻结";
  } else if (status == 0) {
    return "删除";
  }
};

// 修改绑定状态
const changeBindStatus = row => {
  if (row.status == 1) {
    ElMessageBox.confirm("此操作将永久冻结该账号, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      // 冻结
      row.status = 2;
      ElMessage.success("冻结成功");
    });
  } else if (row.status == 2) {
    ElMessageBox.confirm("此操作将永久解冻该账号, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      // 解冻
      row.status = 1;
      ElMessage.success("解冻成功");
    });
  }
};
// 删除
const deleteAccount = ({ name }, index) => {
  ElMessageBox.confirm(`此操作将永久删除该账号---${name}, 是否继续?`, "提示", {
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
const accountDialogRef = ref(null);
const addAccount = isEdit => {
  accountDialogRef?.value?.openDialog({ isEdit });
};
</script>
