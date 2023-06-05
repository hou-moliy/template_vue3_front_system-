<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="渠道商名称" prop="userName">
      <el-input v-model="form.userName" placeholder="请输入渠道商名称" />
    </el-form-item>
    <el-form-item label="创建时间" prop="createTime">
      <el-date-picker v-model="form.createTime" value-format="YYYYMMDDHHmmss" type="datetime" placeholder="请选择创建时间" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleResetForm">重置</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table :data="tableData" border v-load="isLoading">
    <el-table-column prop="userName" label="渠道商名称" />
    <el-table-column prop="createTime" label="创建时间">
      <template #default="{ row }">
        {{ $dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
    <el-table-column prop="operation" label="操作">
      <template #default="{ row }">
        <el-button type="primary" link @click="showChannelDetailDialog(row.userId, false)">详情</el-button>
        <el-button type="primary" link @click="showChannelDetailDialog(row.userId, true)">编辑</el-button>
        <el-button type="danger" link @click="deleteRow(row)">删除</el-button>
        <el-button type="primary" link @click="showCmpyListDialog(row)">查看客户列表</el-button>
        <el-button type="primary" link>下载附件</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />

  <!-- 企业客户列表 -->
  <cmpyListDialog ref="cmpyListDialogRef" />
  <!-- 编辑、详情 -->
  <channelDetail ref="channelDetailRef" @submitSuccess="getList" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import channelDetail from "./components/channelDetail.vue";
import cmpyListDialog from "./components/cmpyListDialog.vue";
import useForm from "@/hooks/useForm";
import { channelList, deleteInfo } from "@/api/channel";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const channelDetailRef = ref(null);
const cmpyListDialogRef = ref(null);
// 搜索表单
const initialValues = {
  userName: "",
  createTime: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
// 表格数据
const tableData = ref([]);
const total = ref(0);
const getList = () => {
  loadingWrapper(
    channelList(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      } else {
        ElMessage.error(res.msg);
      }
    })
  );
};
const handleResetForm = () => {
  resetForm().then(() => getList());
};
// 删除
const deleteRow = ({ userId }) => {
  ElMessageBox.confirm("是否确定删除该渠道商？？？", "删除提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteInfo({ userId }).then(res => {
      if (res.code == "0000") {
        getList();
        ElMessage.success("删除成功");
      } else {
        ElMessage.error(res.msg);
      }
    });
  });
};
// 查看企业客户列表
const showCmpyListDialog = row => {
  cmpyListDialogRef?.value?.openDialog(row);
};
// 编辑、详情
const showChannelDetailDialog = (id, isEdit) => {
  channelDetailRef?.value?.openDialog({ id, isEdit });
};
onMounted(() => {
  getList();
});
</script>
