<template>
  <el-dialog v-model="dialogVisible" title="号码列表" width="50%" @close="handleResetForm">
    <!-- 搜索 -->
    <el-form ref="formRef" :model="form" :inline="true">
      <el-form-item label="省份地市">
        <regionSelect v-model="address" :level="2" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="getList">搜索</el-button>
        <el-button @click="handleResetForm">重置</el-button>
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
    <Pagination
      v-show="total > 0"
      :total="total"
      v-model:page="form.pageNum"
      v-model:limit="form.pageSize"
      @pagination="getList"
    />
    <!-- 嵌套的号码详情dialog -->
    <el-dialog v-model="innerVisible" width="30%" title="号码详情" append-to-body @close="handlePhoneReset">
      <phoneDetail ref="phoneDetailRef" />
    </el-dialog>
  </el-dialog>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import phoneDetail from "./phoneDetail.vue";
import regionSelect from "@/components/regionSelect/index.vue";
import { useRegion } from "@/hooks/useRegion.js";
import useForm from "@/hooks/useForm";
const dialogVisible = ref(false);
const phoneDetailRef = ref(false);
// 审核表单
const initialValues = {
  province: "",
  city: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);
// 地址
const { address, setAddress } = useRegion(formRef, form);
// openDialog
const openDialog = data => {
  console.log(data);
  dialogVisible.value = true;
};
// 表格数据
const tableData = ref([]);
const total = computed(() => tableData.value.length);
const getList = () => {
  tableData.value = [
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
};
// 重置
const handleResetForm = () => {
  resetForm();
  setAddress([]);
};
// 号码详情重置
const handlePhoneReset = () => {
  phoneDetailRef.value?.handleResetForm();
};
// 号码详情
const innerVisible = ref(false);
onMounted(() => {
  getList();
});
defineExpose({ openDialog });
</script>
