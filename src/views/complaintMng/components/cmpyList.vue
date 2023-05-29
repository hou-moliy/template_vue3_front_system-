<template>
  <el-dialog v-model="dialogVisible" title="直接发送企业列表" @close="resetForm">
    <!-- 表单 -->
    <el-form :inline="true" :model="form" ref="formRef">
      <el-form-item label="企业客户" prop="userId ">
        <el-select v-model="form.userId" placeholder="请选择企业客户">
          <el-option label="企业客户1" value="shanghai" />
          <el-option label="企业客户2" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="resetForm">重置</el-button>
        <el-button type="primary" @click="handleAddCmpyList">新增</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table border :data="tableData">
      <el-table-column prop="cmpy" label="企业名称" />
      <el-table-column prop="createTime" label="加入时间" />
      <el-table-column label="操作">
        <template #default="{ row, index }">
          <el-button type="danger" @click="handleDel(row, index)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <Pagination
      v-show="total > 0"
      :total="total"
      v-model:page="form.pageNum"
      v-model:limit="form.pageSize"
      @pagination="getList"
    />
    <!-- 新增直 -->
    <addCmpyList ref="addCmpyListRef" />
  </el-dialog>
</template>
<script setup>
import { computed, ref, onMounted } from "vue";
import useForm from "@/hooks/useForm";
import { ElMessageBox, ElMessage } from "element-plus";
import addCmpyList from "./addCmpyList.vue";
import { listEnterpriseCsMails } from "@/api/complaint";
const dialogVisible = ref(false);
const addCmpyListRef = ref(false);
const initialValues = {
  userId: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
const tableData = ref([]);
const total = computed(() => tableData.value.total);
const getList = () => {
  listEnterpriseCsMails(form).then(res => {
    if (res.code == "0000") {
      tableData.value = res.data.list;
    }
  });
};
const openDialog = () => {
  dialogVisible.value = true;
};
const handleDel = (row, index) => {
  ElMessageBox.confirm("是否确定从直接发送列表中删除该企业客户？？？", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    console.log(row);
    tableData.value.splice(index, 1);
    ElMessage.success("删除成功");
  });
};
const handleAddCmpyList = () => {
  addCmpyListRef.value?.openDialog();
};
onMounted(() => {
  getList();
});
defineExpose({ openDialog });
</script>
