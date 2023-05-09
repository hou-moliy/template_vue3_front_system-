<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="searchForm">
    <el-form-item label="账户类型">
      <el-select v-model="searchForm.type" placeholder="请选择账户类型" size="large">
        <el-option v-for="item in Roles" :key="item.value" :label="item.label" :value="item.value" :disabled="item.disabled" />
      </el-select>
    </el-form-item>
    <el-form-item label="审批状态">
      <el-select v-model="searchForm.status" placeholder="请选择">
        <el-option label="Zone one" value="shanghai" />
        <el-option label="Zone two" value="beijing" />
      </el-select>
    </el-form-item>
    <el-form-item label="申请人名称">
      <el-input v-model="searchForm.name" placeholder="请输入申请人姓名" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary">搜索</el-button>
      <el-button>重置</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border style="width: 100%">
    <el-table-column prop="name" label="申请人姓名" />
    <el-table-column prop="phone" label="联系方式" />
    <el-table-column prop="createTime" label="申请时间" />
    <el-table-column prop="file" label="资料查看">
      <template #default="scope">
        <el-button type="primary" link size="small">点击下载</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="type" label="账户类型">
      <template #default="scope">
        <span>{{ accountType(scope.row.type) }}</span>
      </template>
    </el-table-column>
    <el-table-column prop="status" label="审批状态" />
    <el-table-column prop="auditer" label="审批人" />
    <el-table-column prop="updateTime" label="审批时间" />
    <el-table-column prop="result" label="审批结果" />
    <el-table-column prop="remark" label="备注" />
    <el-table-column fixed="right" label="审批操作" width="180">
      <template #default="{ row }">
        <el-button type="primary" size="small" @click="openAuditDialog(row, 1)">通过</el-button>
        <el-button type="primary" size="small" @click="openAuditDialog(row, 0)">不通过</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 审核弹窗 -->
  <auditDialog ref="auditDialogRef" />
</template>
<script setup>
import auditDialog from "./components/auditDialog.vue";
import { reactive, ref } from "vue";
// 搜索表单
const searchForm = reactive({
  type: "",
  status: "",
  name: ""
});
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
// 表格栏
const tableData = [
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
// 打开审核弹窗
const auditDialogRef = ref(null);

const openAuditDialog = ({ type }, info) => {
  // info: 1-通过 0-不通过
  auditDialogRef?.value?.openDialog({ type, info });
};

const accountType = type => {
  if (type === "1") {
    return "企业客户";
  } else if (type === "2") {
    return "客户经理";
  } else if (type === "3") {
    return "分公司管理员";
  } else if (type === "4") {
    return "渠道商";
  } else if (type === "5") {
    return "项目经理";
  }
  return "";
};
</script>
