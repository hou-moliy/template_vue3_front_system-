<template>
  <el-dialog title="企业客户列表" v-model="dialogVisible" width="80%">
    <!-- 表单 -->
    <el-form :inline="true" :model="form" ref="formRef">
      <el-form-item label="企业名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入企业名称" />
      </el-form-item>
      <el-form-item label="业务模式" prop="businessType">
        <el-select v-model="form.businessType" placeholder="请选择业务模式">
          <el-option label="AXB模式" value="AXB" />
          <el-option label="AXYB模式" value="AXYB" />
          <el-option label="AX模式" value="AX" />
          <el-option label="GXB模式" value="GXB" />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker v-model="form.createTime" type="datetime" placeholder="请选择创建时间" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="handleResetForm">重置</el-button>
        <el-button @click="innerVisible = true" v-hasPermi="['channel']">添加</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" border>
      <el-table-column prop="name" label="客户名称" />
      <el-table-column prop="businessType" label="业务模式" />
      <el-table-column prop="createTime" label="创建时间" />
      <el-table-column prop="operation" label="操作" v-hasPermi="['channel']">
        <template #default="{ row, $index }">
          <el-button type="danger" link @click="deleteRow($index, row)">删除</el-button>
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
    <el-dialog v-model="innerVisible" width="30%" title="新增企业客户" append-to-body> 对这里表单有疑问 </el-dialog>
  </el-dialog>
</template>
<script setup>
import { onMounted, ref, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import useForm from "@/hooks/useForm";
const dialogVisible = ref(false);
// 搜索表单
const initialValues = {
  name: "",
  businessType: "",
  createTime: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
// 表格数据
const tableData = ref([]);
const total = computed(() => tableData.value.length);
const getList = () => {
  tableData.value = [
    {
      id: 1,
      name: "头条",
      businessType: "AXB模式",
      createTime: "2021-08-09 12:00:00"
    },
    {
      id: 2,
      name: "美团",
      businessType: "AXB模式",
      createTime: "2021-08-09 12:00:00"
    },
    {
      id: 3,
      name: "饿了么",
      businessType: "AXB模式",
      createTime: "2021-08-09 12:00:00"
    },
    {
      id: 4,
      name: "百度",
      businessType: "AXB模式",
      createTime: "2021-08-09 12:00:00"
    }
  ];
};
const handleResetForm = () => {
  resetForm().then(() => getList());
};
// 删除
const deleteRow = (index, row) => {
  console.log(index, row);
  ElMessageBox.confirm("是否确定删除渠道商下该企业客户？？？", "删除提示", {
    confirmButtonText: "确认",
    cancelButtonText: "取消",
    type: "warning"
  }).then(() => {
    tableData.value.splice(index, 1);
    ElMessage({
      type: "success",
      message: "删除成功"
    });
  });
};
// openDialog
const openDialog = () => {
  dialogVisible.value = true;
};
// 新增
const innerVisible = ref(false);
onMounted(() => {
  getList();
});
defineExpose({ openDialog });
</script>
