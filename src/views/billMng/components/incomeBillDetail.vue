<template>
  <el-dialog v-model="dialogVisible" title="收入账单详情" style="width: 100%">
    <!-- 表格 -->
    <el-table border :data="tableData">
      <el-table-column prop="cmpy1" label="业务" align="center" :index="0" />
      <el-table-column label="号码" align="center" :index="1">
        <el-table-column prop="before15thUnitPrice" label="15日前单价(元)" align="center" />
        <el-table-column prop="before15thNum" label="15日前数量(个)" align="center">
          <template #default="{ row }">
            <el-input v-model="row.before15thNum" :disabled="disabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="before15thAmount" label="15日前金额(元)" align="center">
          <template #default="{ row }">
            <el-input v-model="row.before15thAmount" :disabled="disabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="after15thUnitPrice" label="15日后单价(元)" align="center" />
        <el-table-column prop="after15thNum" label="15日后数量(个)" align="center">
          <template #default="{ row }">
            <el-input v-model="row.after15thNum" :disabled="disabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="after15thAmount" label="15日后金额(元)" align="center">
          <template #default="{ row }">
            <el-input v-model="row.after15thAmount" :disabled="disabled"></el-input>
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="totalAmount" label="总金额(元)" align="center" :index="2" />
      <el-table-column label="通话" align="center" :index="3">
        <el-table-column prop="discount" label="折扣优惠" align="center" />
        <el-table-column prop="recordUnitPrice" label="录音单价(元/分钟)" align="center" />
        <el-table-column prop="recordMinutes" label="录音分钟数(分钟)" align="center" />
        <el-table-column prop="recordFee" label="录音费用(元)" align="center" />
        <el-table-column prop="nonRecordUnitPrice" label="非录音单价(元)" align="center" />
        <el-table-column prop="nonRecordMinutes" label="非录音分钟数(分钟)" align="center" />
        <el-table-column prop="nonRecordFee" label="非录音费用(元)" align="center" />
        <el-table-column prop="bindingNotConnectedFee" label="有绑定未接通费用(元)" align="center" />
        <el-table-column prop="totalFee" label="费用" align="center" />
      </el-table-column>
      <el-table-column prop="monthlyTotalFee" label="当月总费用(元)" align="center" :index="4" />
    </el-table>
    <template #footer>
      <el-button @click="dialogVisible = false">返回</el-button>
      <el-button @click="disabled = false" v-if="disabled">调账</el-button>
      <el-button @click="onSave" v-else>保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";
import { getMonthlyBillingIncome, adjustMonthlyBillingIncome } from "@/api/bill";
import { ElMessage } from "element-plus";
const dialogVisible = ref(false);
const disabled = ref(true);
const tableData = ref([]);
const form = reactive({
  midGroupId: "",
  midGroupName: "",
  statTime: ""
});
const openDialog = async ({ midGroupId, statTime, midGroupName }) => {
  form.midGroupId = midGroupId;
  form.statTime = statTime;
  form.midGroupName = midGroupName;
  await getDetail();
  dialogVisible.value = true;
};
// 调账
const onSave = () => {
  const data = tableData.value[0];
  adjustMonthlyBillingIncome(data).then(res => {
    if (res.code == "0000") {
      ElMessage.success("调账成功");
      dialogVisible.value = false;
    }
  });
};
const getDetail = async () => {
  await getMonthlyBillingIncome(form).then(res => {
    if (res.code == "0000") {
      if (res.data) {
        tableData.value = [res.data];
      }
    }
  });
};

defineExpose({ openDialog });
</script>
