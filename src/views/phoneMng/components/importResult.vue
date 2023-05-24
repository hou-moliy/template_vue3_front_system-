<template>
  <el-dialog v-model="dialogVisible" :title="title">
    <!-- 表格 -->
    <el-table border :data="tableData">
      <el-table-column label="号码" prop="id" />
      <el-table-column label="副号imsi" prop="imsi" />
      <el-table-column label="省份编码" prop="provinceId" />
      <el-table-column label="地市编码" prop="cityId" />
      <el-table-column label="操作时间" prop="createTime" />
      <el-table-column label="失败原因" v-if="status == 'fail'">
        <template #default="{ row }">
          {{ row.reason }}
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
    <template #footer>
      <el-button type="primary">导出</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, computed } from "vue";
import useForm from "@/hooks/useForm";
const dialogVisible = ref(false);
// 表单
const initialValues = {
  id: "",
  pageNum: 1,
  pageSize: 10
};
const { form } = useForm(initialValues);
const status = ref("");
const openDialog = ({ data, type }) => {
  Object.assign(form, data);
  status.value = type;
  dialogVisible.value = true;
  getList();
};
const title = computed(() => {
  return status.value === "success" ? `${form.id}任务成功号码详情` : `${form.id}任务失败号码详情`;
});
const tableData = ref([]);
const total = computed(() => tableData.value.length);
const getList = () => {
  tableData.value = [
    {
      id: 1,
      imsi: "imsi1",
      provinceId: "省份编码1",
      cityId: "地市编码1",
      createTime: "2021-08-01",
      reason: "失败原因1"
    },
    {
      id: 2,
      imsi: "imsi2",
      provinceId: "省份编码2",
      cityId: "地市编码2",
      createTime: "2021-08-02",
      reason: "失败原因2"
    }
  ];
  console.log(form);
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
