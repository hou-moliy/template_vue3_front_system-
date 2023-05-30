<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="账号" prop="loginName">
      <el-input v-model="form.loginName" placeholder="请输入账号" />
    </el-form-item>
    <el-form-item label="角色" prop="roleId">
      <model-select v-model="form.roleId" dictType="roleType" placeholder="请输入角色类型" />
    </el-form-item>
    <el-form-item label="状态" prop="status">
      <model-select v-model="form.status" dictType="statusType" placeholder="请选择状态" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleFormReset">重置</el-button>
      <el-button type="primary" @click="addAccount(false)">新增账号</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border v-load="isLoading">
    <el-table-column prop="loginName" label="账号" />
    <el-table-column prop="userName" label="姓名" />
    <el-table-column prop="phoneNumber" label="手机号" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="roleId" label="角色">
      <template #default="{ row }">
        <el-button text link>{{ getRoleName(row.roleId) }}</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="状态">
      <template #default="{ row }">
        <el-button text link :type="getStatusItem(row.status)?.type"> {{ getStatusItem(row.status)?.label }}</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="createTime" label="创建时间" />
    <el-table-column fixed="right" label="操作">
      <template #default="{ row, index }">
        <div v-if="row.status != 2">
          <el-button type="primary" link @click="addAccount(row, true)">修改</el-button>
          <el-button link :type="row.status != 1 ? 'warning' : 'success'" @click="changeBindStatus(row)">
            {{ row.status != 1 ? "冻结" : "解冻" }}
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
import { ref, onMounted } from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import accountDialog from "./components/accountDialog.vue";
import useForm from "@/hooks/useForm";
import { userList, updateSysUser, deleteSysUser } from "@/api/user";
import mittBus from "@/utils/mittBus";
import DictTypesStore from "@/stores/modules/dictTypes";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const { getDictTypeValue, getDictTypeItem } = DictTypesStore();
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
const total = ref(0);
const getList = () => {
  loadingWrapper(
    userList(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
};
const handleFormReset = () => {
  resetForm().then(() => getList());
};
// 修改绑定状态
const changeBindStatus = row => {
  if (row.status == 0) {
    ElMessageBox.confirm("此操作将永久冻结该账号, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      // 冻结
      row.status = 1;
      handleUpdateStatus(row);
    });
  } else if (row.status == 1) {
    ElMessageBox.confirm("此操作将永久解冻该账号, 是否继续?", "提示", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    }).then(() => {
      row.status = 0;
      // 解冻
      handleUpdateStatus(row);
    });
  }
};
const handleUpdateStatus = row => {
  updateSysUser(row).then(res => {
    if (res.code == "0000") {
      if (row.status == 1) {
        ElMessage.success("冻结成功");
      } else if (row.status == 0) {
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
const addAccount = (data, isEdit) => {
  accountDialogRef?.value?.openDialog({ data, isEdit });
};
const getRoleName = roleId => {
  return getDictTypeValue("roleType", String(roleId));
};
const getStatusItem = status => {
  return getDictTypeItem("statusType", String(status));
};
onMounted(() => {
  getList();
  mittBus.on("refreshTable", () => {
    getList();
  });
});
</script>
