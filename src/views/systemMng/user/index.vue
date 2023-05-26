<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="账号">
      <el-input v-model="form.loginName" placeholder="请输入账号" />
    </el-form-item>
    <el-form-item label="角色">
      <model-select v-model="form.roleId" dictType="roleType" placeholder="请输入角色类型" />
    </el-form-item>
    <el-form-item label="状态">
      <model-select v-model="form.status" dictType="statusType" placeholder="请选择状态" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleFormReset">重置</el-button>
      <el-button type="primary" @click="addAccount(false)">新增账号</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border>
    <el-table-column prop="loginName" label="账号" />
    <el-table-column prop="userName" label="姓名" />
    <el-table-column prop="phoneNumber" label="手机号" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="roleName" label="角色" />
    <el-table-column prop="status" label="状态">
      <template #default="{ row }">
        <el-button text link :type="statusMap[row.status]?.type"> {{ statusMap[row.status]?.value }}</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column fixed="right" label="操作">
      <template #default="{ row, index }">
        <div v-if="row.status != 0">
          <el-button type="primary" link @click="addAccount(true)">修改</el-button>
          <el-button :type="actionStatusMap[row.status]?.type" link @click="changeBindStatus(row)">
            {{ actionStatusMap[row.status]?.value }}
          </el-button>
          <el-button type="danger" link @click="deleteAccount(row, index)">删除</el-button>
        </div>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <!-- 新增或者编辑账号 -->
  <accountDialog ref="accountDialogRef" />
</template>
<script setup>
import { ref, computed, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import accountDialog from "./components/accountDialog.vue";
import useForm from "@/hooks/useForm";
import { userList, updateUserStatus, deleteSysUser } from "@/api/user";
const statusMap = {
  1: {
    value: "正常",
    type: "primary"
  },
  2: {
    value: "冻结",
    type: "warning"
  },
  0: {
    value: "删除",
    type: "danger"
  }
};
const actionStatusMap = {
  1: {
    value: "冻结",
    type: "warning"
  },
  2: {
    value: "解冻",
    type: "success"
  },
  0: {
    value: "",
    type: ""
  }
};
// 搜索表单
const initialValues = {
  loginName: "",
  roleId: "",
  status: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = ref([]);
const total = computed(() => tableData.value.length);
const getList = () => {
  userList(form).then(res => {
    if (res.code == "0000") {
      tableData.value = res.rows;
    }
  });
};
const handleFormReset = () => {
  resetForm().then(() => getList());
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
      handleUpdateStatus(row);
    });
  } else if (row.status == 2) {
    ElMessageBox.confirm("此操作将永久解冻该账号, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      // 解冻
      handleUpdateStatus(row);
    });
  }
};
const handleUpdateStatus = ({ userId, status }) => {
  updateUserStatus({ userId, status }).then(res => {
    if (res.code == "0000") {
      if (status == 1) {
        ElMessage.success("冻结成功");
      } else if (status == 2) {
        ElMessage.success("解冻成功");
      }
    }
  });
};
// 删除
const deleteAccount = ({ userName, userId }) => {
  ElMessageBox.confirm(`此操作将永久删除该账号---${userName}, 是否继续?`, "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    // 删除
    deleteSysUser({ userId }).then(res => {
      if (res.code == "0000") {
        ElMessage.success("删除成功");
        getList();
      }
    });
  });
};
// 新增或者编辑账号
const accountDialogRef = ref(null);
const addAccount = isEdit => {
  accountDialogRef?.value?.openDialog({ isEdit });
};
onMounted(() => {
  getList();
});
</script>
