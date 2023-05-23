<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="申请人名称" prop="applicantName">
      <el-input v-model="form.applicantName" placeholder="请输入申请人姓名" />
    </el-form-item>
    <el-form-item label="企业名称" prop="groupName">
      <el-select v-model="form.groupName" placeholder="请选择企业名称" size="large">
        <el-option v-for="item in Roles" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
      </el-select>
    </el-form-item>
    <el-form-item label="申请时间" prop="createTime">
      <el-date-picker v-model="form.createTime" type="datetime" placeholder="请选择申请时间" />
    </el-form-item>
    <el-form-item label="审批状态" prop="auditStatus">
      <el-select v-model="form.auditStatus" placeholder="请选择">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubitForm">搜索</el-button>
      <el-button @click="handleFormReset">重置</el-button>
      <el-button type="primary" @click="addService(true)">新增</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="applicantName" label="申请人姓名" />
    <el-table-column prop="groupName" label="企业名称" />
    <el-table-column prop="phone" label="联系方式" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="createTime" label="申请时间" />
    <el-table-column prop="title" label="标题" />
    <el-table-column prop="status" label="审核状态">
      <template #default="{ row }">
        {{ auditStatus[row.status] }}
      </template>
    </el-table-column>
    <el-table-column prop="reason" label="原因" />
    <el-table-column fixed="right" label="审批操作">
      <template #default="{ row }">
        <el-button type="primary" link @click="openAuditDialog(row)">审核</el-button>
        <el-button type="primary" link @click="addService(false)">查看</el-button>
        <el-button type="primary" link @click="addService(true)">修改</el-button>
        <el-button type="danger" link>撤销</el-button>
        <el-button type="primary" link>下载</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <!-- 审核弹窗 -->
  <auditDialog ref="auditDialogRef" />
</template>
<script setup>
import { handleList } from "@/api/businessService";
import auditDialog from "./components/auditDialog.vue";
import { useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";
import useForm from "@/hooks/useForm";
const router = useRouter();
const auditStatus = {
  1: "待审核",
  2: "通过",
  3: "不通过"
};
// 审核弹窗
const auditDialogRef = ref(null);
// 搜索表单
const initialValues = {
  applicantName: "",
  auditStatus: "",
  groupName: "",
  createTime: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
// 表格栏
let tableData = ref([]);
// 账户类型
const Roles = [
  {
    value: "1",
    label: "企业客户"
  },
  {
    value: "2",
    label: "客户经理"
  },
  {
    value: "3",
    label: "分公司管理员"
  },
  {
    value: "4",
    label: "渠道商"
  },
  {
    value: "5",
    label: "项目经理",
    disabled: true
  }
];
const total = computed(() => tableData.value.length);
const getList = () => {
  handleList().then(res => {
    if (res.code === 200) {
      tableData.value = res.data.list;
    }
  });
};
const handleFormReset = () => {
  resetForm().then(() => getList());
};
const handleSubitForm = () => {
  submitForm()
    .then(() => {
      getList();
      console.log("表单提交成功");
    })
    .catch(() => {
      console.log("表单提交失败");
    });
};
const openAuditDialog = data => {
  // info: 1-通过 0-不通过
  auditDialogRef?.value?.openDialog(data);
};
const addService = isEdit => {
  router.push(`/businessService/businessDetail?isEdit=${isEdit}&isAdd=true`);
};
onMounted(() => {
  getList();
});
</script>
