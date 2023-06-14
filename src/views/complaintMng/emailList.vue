<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="邮箱" prop="email">
      <el-input v-model="form.email" placeholder="请输入邮箱" />
    </el-form-item>
    <el-form-item label="收件人" prop="recipient">
      <el-input v-model="form.recipient" placeholder="请输入收件人" />
    </el-form-item>
    <el-form-item label="添加日期" prop="createTime">
      <el-date-picker v-model="form.createTime" type="datetime" value-format="YYYYMMDDHHmmss" placeholder="请选择添加日期" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" v-hasPermi="['emailList:add']" @click="handleAddEmail">新增</el-button>
      <el-button type="primary" v-hasPermi="['emailList:cmpyList']" @click="handleCmpyList">直接发送企业列表</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData" v-load="isLoading">
    <el-table-column prop="recipient" label="收件人" />
    <el-table-column prop="email" label="邮箱" />
    <el-table-column prop="createTime" label="添加时间">
      <template #default="{ row }">
        {{ $dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>

    <el-table-column label="操作">
      <template #default="{ row }">
        <el-button type="danger" link v-hasPermi="['emailList:delete']" @click="handleDelEmail(row)">删除</el-button>
        <el-button type="primary" link v-hasPermi="['emailList:edit']" @click="handleAddEmail(row, true)">编辑</el-button>
      </template>
    </el-table-column>
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <!-- 新增邮箱 -->
  <addEmail ref="addEmailRef" @refresh-list="getList" />
  <!--直接发送企业列表  -->
  <cmpyList ref="cmpyListRef" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import useForm from "@/hooks/useForm";
import addEmail from "./components/addEmail.vue";
import { ElMessageBox, ElMessage } from "element-plus";
import cmpyList from "./components/cmpyList.vue";
import { listMails, deleteMail } from "@/api/complaint";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const addEmailRef = ref(null);
const cmpyListRef = ref(null);
const initialValues = {
  recipient: "",
  email: "",
  createTime: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = ref([]);
const total = ref(0);
const getList = () => {
  loadingWrapper(
    listMails(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
};
const handleAddEmail = (data, isEdit) => {
  addEmailRef.value?.openDialog(data, isEdit);
};
const handleDelEmail = async ({ streamNumber }) => {
  try {
    await ElMessageBox.confirm("是否确定删除该收件人邮箱？？？", {
      confirmButtonText: "确定",
      cancelButtonText: "取消",
      type: "warning"
    });
    const res = await deleteMail({ streamNumber });
    if (res.code == "0000") {
      ElMessage.success("删除成功");
      getList();
    }
  } catch (error) {
    // 处理错误，可以使用 ElMessage.error() 显示错误信息
    console.error("删除邮箱出错：", error);
  }
};

const handleCmpyList = () => {
  cmpyListRef.value?.openDialog();
};

const handleReset = () => {
  resetForm();
  getList();
};
onMounted(() => {
  getList();
});
</script>
