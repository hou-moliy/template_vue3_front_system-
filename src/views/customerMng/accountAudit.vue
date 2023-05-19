<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="账户类型" prop="type">
      <el-select v-model="form.type" placeholder="请选择账户类型" size="large">
        <el-option v-for="item in Roles" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
      </el-select>
    </el-form-item>
    <el-form-item label="审批状态" prop="status">
      <el-select v-model="form.status" placeholder="请选择">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="申请人名称" prop="name">
      <el-input v-model="form.name" placeholder="请输入申请人姓名" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubitForm">搜索</el-button>
      <el-button @click="handleResetForm">重置</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="申请人姓名" />
    <el-table-column prop="phone" label="联系方式" />
    <el-table-column prop="createTime" label="申请时间" />
    <el-table-column prop="file" label="资料查看">
      <template #default="scope">
        <el-button type="primary" link>点击下载</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="账户类型">
      <template #default="scope">
        <span>{{ accountMap[scope.row.type] }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="审批状态" />
    <el-table-column prop="auditer" label="审批人" />
    <el-table-column prop="updateTime" label="审批时间" />
    <el-table-column prop="result" label="审批结果" />
    <el-table-column prop="remark" label="备注" />
    <el-table-column fixed="right" label="审批操作" width="180">
      <template #default="{ row }">
        <el-button type="primary" link @click="openAuditDialog(row, 1)">通过</el-button>
        <el-button type="danger" link @click="openAuditDialog(row, 0)">不通过</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 审核弹窗 -->
  <auditDialog ref="auditDialogRef" />
</template>
<script setup>
import auditDialog from "./components/auditDialog.vue";
import { ref, onMounted } from "vue";
import useForm from "@/hooks/useForm";
// 审核弹窗
const auditDialogRef = ref(null);
// 表格栏
let tableData = ref([]);
const accountMap = {
  1: "企业客户",
  2: "客户经理",
  3: "分公司管理员",
  4: "渠道商",
  5: "项目经理"
};
// 搜索表单
const initialValues = {
  type: "",
  status: "",
  name: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
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

const handleResetForm = () => {
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
const getList = () => {
  console.log("获取表单的方法");
  tableData.value = [
    {
      name: "王小虎",
      phone: "12345678901",
      createTime: "2016-05-02",
      file: "查看",
      type: "1",
      status: "待审批",
      auditer: "张三",
      updateTime: "2016-05-02",
      result: "通过",
      remark: "无"
    },
    {
      name: "王小虎",
      phone: "12345678901",
      createTime: "2016-05-02",
      file: "查看",
      type: "2",
      status: "待审批",
      auditer: "张三",
      updateTime: "2016-05-02",
      result: "通过",
      remark: "无"
    },
    {
      name: "王小虎",
      phone: "12345678901",
      createTime: "2016-05-02",
      file: "查看",
      type: "3",
      status: "待审批",
      auditer: "张三",
      updateTime: "2016-05-02",
      result: "通过",
      remark: "无"
    }
  ];
};
const openAuditDialog = ({ type }, info) => {
  // info: 1-通过 0-不通过
  auditDialogRef?.value?.openDialog({ type, info });
};

onMounted(() => {
  getList();
});
</script>
