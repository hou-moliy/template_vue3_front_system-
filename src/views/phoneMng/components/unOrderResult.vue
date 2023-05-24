<template>
  <!-- 号码退订-查看结果 -->
  <el-dialog v-model="dialogVisible" :title="title">
    <!-- 表格 指定号码退订 -->
    <el-table border :data="tableData" v-if="form.type == 1">
      <el-table-column label="号码" prop="id" />
      <el-table-column label="副号imsi" prop="imsi" />
      <el-table-column label="省份编码" prop="provinceId" />
      <el-table-column label="地市编码" prop="cityId" />
      <el-table-column label="操作时间" prop="createTime" />
      <el-table-column label="失败原因" prop="reason" v-if="status == 'fail'" />
    </el-table>
    <!-- 表格 指定地市号码退订 -->
    <el-table border :data="tableData" v-else-if="form.type == 2">
      <el-table-column label="省份编码" prop="provinceId" />
      <el-table-column label="地市编码" prop="cityId" />
      <el-table-column label="实际号码量" prop="realNum" />
      <el-table-column label="退订成功号码量" prop="realNum" v-if="status == 'success'" />
      <el-table-column label="退订失败号码量" prop="failNum" v-else />
      <el-table-column label="操作时间" prop="createTime" />
    </el-table>
    <!-- 表格 指定企业客户号码退订  -->
    <el-table border :data="tableData" v-else>
      <el-table-column label="企业客户账户名称" prop="phoneNum" />
      <el-table-column label="企业客户账户编号" prop="phoneNum" />
      <el-table-column label="退订成功号码量" prop="realNum" v-if="status == 'success'" />
      <el-table-column label="退订失败号码量" prop="failNum" v-else />
      <el-table-column label="操作时间" prop="createTime" />
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
