<template>
  <el-dialog title="企业客户列表" v-model="dialogVisible" width="80%">
    <!-- 表单 -->
    <el-form :inline="true" :model="form" ref="formRef">
      <el-form-item label="企业名称" prop="groupName">
        <el-input v-model="form.groupName" placeholder="请输入企业名称" />
      </el-form-item>
      <el-form-item label="业务模式" prop="bindingType">
        <model-select v-model="form.bindingType" dictType="bindingType" placeholder="请选择业务模式" />
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="form.createTime" value-format="YYYYMMDDHHmmss" type="datetime" placeholder="请选择创建时间" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="handleResetForm">重置</el-button>
         <!--v-hasPermi="['channel']" -->
        <el-button type="primary" v-hasPermi="['channelInfoList:groupList:add']" @click="handleAdd">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" border v-load="isLoading">
      <el-table-column prop="groupName" label="客户名称" />
      <el-table-column prop="bindingType" label="业务模式">
        <template #default="{ row }">
          <span>{{ getDictTypeValue("bindingType", row.bindingType) }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createTime" label="创建时间">
        <template #default="{ row }">
          {{ $dayjs(row.createTime).format("YYYY-MM-DD HH:mm:ss") }}
        </template>
      </el-table-column>
      <!-- v-hasPermi="['channel']" -->
      <el-table-column prop="operation" label="操作">
        <template #default="{ row }">
          <el-button type="danger" link v-hasPermi="['channelInfoList:groupList:del']" @click="deleteRow(row)">删除</el-button>
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
    <!-- 嵌套的新增企业客户dialog -->
    <addCmpyDialog ref="addCmpyRef" @submit-success="getList" />
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import useForm from "@/hooks/useForm";
import { groupList, deleteGroup } from "@/api/channel";
import addCmpyDialog from "./addCmpyDialog.vue";
import DictTypesStore from "@/stores/modules/dictTypes";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const { getDictTypeValue } = DictTypesStore();
const dialogVisible = ref(false);
const addCmpyRef = ref(null);
// 搜索表单
const initialValues = {
  userId: "",
  groupName: "",
  bindingType: "",
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
    groupList(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
};
const handleResetForm = () => {
  resetForm().then(() => getList());
};
// 删除
const deleteRow = (index, { groupId }) => {
  ElMessageBox.confirm("是否确定删除渠道商下该企业客户？？？", "删除提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    deleteGroup({ groupId }).then(res => {
      if (res.code == "0000") {
        ElMessage.success("删除成功");
      }
    });
  });
};
// 新增
const handleAdd = () => {
  addCmpyRef.value?.openDialog();
};
// openDialog
const openDialog = () => {
  dialogVisible.value = true;
  getList();
};
defineExpose({ openDialog });
</script>
