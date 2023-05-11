<template>
  <el-dialog v-model="dialogVisible" title="号码列表" width="50%">
    <!-- 搜索 -->
    <el-form ref="phoneFormRef" :model="phoneForm" :inline="true">
      <el-form-item label="省份地市" prop="province">
        <el-select v-model="phoneForm.province" placeholder="请选择省份地市">
          <el-option label="四川" :value="1" />
          <el-option label="北京" :value="0" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(phoneFormRef)" :loading="loading">搜索</el-button>
        <el-button @click="resetForm(phoneFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格 -->
    <el-table :data="tableData" border>
      <el-table-column prop="province" label="省份" width="180" />
      <el-table-column prop="city" label="地市" width="180" />
      <el-table-column prop="phone" label="号码量" />
      <el-table-column label="号码详情">
        <template #default="{ row }">
          <el-button text type="primary" @click="innerVisible = true">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 嵌套的号码详情dialog -->
    <el-dialog v-model="innerVisible" width="30%" title="号码详情" append-to-body>
      <phoneDetail />
    </el-dialog>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import phoneDetail from "./phoneDetail.vue";
const dialogVisible = ref(false);
const phoneFormRef = ref(null);
// openDialog
const openDialog = data => {
  console.log(data);
  dialogVisible.value = true;
};

// 审核表单
const phoneForm = reactive({
  province: ""
});
const tableData = [
  {
    province: "四川",
    city: "成都",
    phone: "100"
  },
  {
    province: "四川",
    city: "成都",
    phone: "100"
  },
  {
    province: "四川",
    city: "成都",
    phone: "100"
  },
  {
    province: "四川",
    city: "成都",
    phone: "100"
  }
];
// 提交
const loading = ref(false);
const onSubmit = formEl => {
  if (!formEl) return;
  formEl.validate(async valid => {
    if (!valid) return;
    loading.value = true;
  });
};
// 重置，关闭弹窗
const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
  dialogVisible.value = false;
};
// 号码详情
const innerVisible = ref(false);

defineExpose({ openDialog });
</script>
