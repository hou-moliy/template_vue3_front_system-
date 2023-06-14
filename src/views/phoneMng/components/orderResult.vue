<template>
  <!-- 号码订购-查看结果 -->
  <el-dialog v-model="dialogVisible" :title="title" @close="closeDialog">
    <!-- 表格 号码订购 -->
    <el-table border :data="tableData" v-if="form.type == 1">
      <el-table-column label="号码" prop="id" />
      <el-table-column label="副号imsi" prop="imsi" />
      <el-table-column label="省份编码" prop="provinceId">
        <template #default="{ row }">
          <span v-if="row.provinceId && row.cityId">{{ getAddress([row.provinceId, row.cityId])[0] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="地市编码" prop="cityId">
        <template #default="{ row }">
          <span v-if="row.provinceId && row.cityId">{{ getAddress([row.provinceId, row.cityId])[1] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作时间" prop="createTime" />
      <el-table-column label="失败原因" prop="reason" v-if="status == 'fail'" />
    </el-table>
    <!-- 表格 号码量订购 -->
    <el-table border :data="tableData" v-else>
      <el-table-column label="任务需求号码量" prop="phoneNum" />
      <el-table-column label="实际分配号码量" prop="realNum" v-if="status == 'success'" />
      <el-table-column label="失败分配号码量" prop="failNum" v-else />
      <el-table-column label="操作时间" prop="createTime" />
    </el-table>
    <template #footer>
      <el-button type="primary" v-hasPermi="['phoneOrder:result:export']">导出</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, computed } from "vue";
import useForm from "@/hooks/useForm";
import { importDetail } from "@/api/number";
import { GlobalStore } from "@/stores";
const { getAddress } = GlobalStore();
const dialogVisible = ref(false);
// 表单
const initialValues = {
  taskId: "",
  opType: "",
  pageNum: 1,
  pageSize: 10
};
const { form } = useForm(initialValues);
const status = ref("");
const openDialog = ({ taskId, type }) => {
  if (type === "success") {
    form.opType = "2";
  } else {
    form.opType = "1";
  }
  status.value = type;
  form.taskId = taskId;
  dialogVisible.value = true;
  getList();
};
const closeDialog = () => {
  dialogVisible.value = false;
  tableData.value = [];
};
const title = computed(() => {
  return status.value === "success" ? `${form.taskId}任务成功号码详情` : `${form.taskId}任务失败号码详情`;
});
const tableData = ref([]);
const getList = () => {
  importDetail(form).then(res => {
    if (res.code == "0000") {
      tableData.value = res.data;
    }
  });
};

defineExpose({
  openDialog
});
</script>
<style lang="scss" scoped>
.form-item-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
</style>
