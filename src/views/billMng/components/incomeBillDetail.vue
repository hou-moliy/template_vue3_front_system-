<template>
  <el-dialog v-model="dialogVisible" title="收入账单详情" style="width: 100%">
    <!-- 表格 -->
    <el-table border :data="tableData">
      <el-table-column prop="billingMode" label="业务" align="center" :index="0" />
      <el-table-column label="号码" align="center" :index="1">
        <el-table-column prop="before15thUnitPrice" label="15日前单价(元)" align="center" />
        <el-table-column prop="before15thNum" label="15日前数量(个)" align="center">
          <template #default="{ row }">
            <customInput v-model="row.before15thNum" :disabled="disabled" min="1" type="number"
              @on-blur="handleCalculate('before15thNum', row)" />
          </template>
        </el-table-column>
        <el-table-column prop="before15thAmount" label="15日前金额(元)" align="center">
          <template #default="{ row }">
            <customInput v-model="row.before15thAmount" :disabled="disabled" min="1" type="number"
              @on-blur="handleCalculate('before15thAmount', row)" />
          </template>
        </el-table-column>
        <el-table-column prop="after15thUnitPrice" label="15日后单价(元)" align="center" />
        <el-table-column prop="after15thNum" label="15日后数量(个)" align="center">
          <template #default="{ row }">
            <customInput v-model="row.after15thNum" :disabled="disabled" min="1" type="number"
              @on-blur="handleCalculate('after15thNum', row)" />
          </template>
        </el-table-column>
        <el-table-column prop="after15thAmount" label="15日后金额(元)" align="center">
          <template #default="{ row }">
            <customInput v-model="row.after15thAmount" :disabled="disabled" min="1" type="number"
              @on-blur="handleCalculate('after15thAmount', row)" />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="totalAmount" label="总金额(元)" align="center" :index="2">
        <template #default="{ row }">
          <customInput v-model="row.totalAmount" :disabled="disabled" min="1" type="number"
            @on-blur="handleCalculate('totalAmount', row)" />
        </template>
      </el-table-column>
      <el-table-column label="通话" align="center" :index="3">
        <el-table-column prop="discount" label="折扣优惠" align="center" />
        <el-table-column prop="recordUnitPrice" label="录音单价(元/分钟)" align="center" />
        <el-table-column prop="recordMinutes" label="录音分钟数(分钟)" align="center">
          <template #default="{ row }">
            <customInput v-model="row.recordMinutes" :disabled="disabled" min="1" type="number"
              @on-blur="handleCalculate('recordMinutes', row)" />
          </template>
        </el-table-column>
        <el-table-column prop="recordFee" label="录音费用(元)" align="center">
          <template #default="{ row }">
            <customInput v-model="row.recordFee" :disabled="disabled" min="1" type="number"
              @on-blur="handleCalculate('recordFee', row)" />
          </template>
        </el-table-column>
        <el-table-column prop="nonRecordUnitPrice" label="非录音单价(元)" align="center" />
        <el-table-column prop="nonRecordMinutes" label="非录音分钟数(分钟)" align="center">
          <template #default="{ row }">
            <customInput v-model="row.nonRecordMinutes" :disabled="disabled" min="1" type="number"
              @on-blur="handleCalculate('nonRecordMinutes', row)" />
          </template>
        </el-table-column>
        <el-table-column prop="nonRecordFee" label="非录音费用(元)" align="center">
          <template #default="{ row }">
            <customInput v-model="row.nonRecordFee" :disabled="disabled" min="1" type="number"
              @on-blur="handleCalculate('nonRecordFee', row)" />
          </template>
        </el-table-column>
        <el-table-column prop="bindingNotConnectedFee" label="有绑定未接通费用(元)" align="center">
          <template #default="{ row }">
            <customInput v-model="row.bindingNotConnectedFee" :disabled="disabled" min="1" type="number"
              @on-blur="handleCalculate('bindingNotConnectedFee', row)" />
          </template>
        </el-table-column>
        <el-table-column prop="totalFee" label="费用" align="center">
          <template #default="{ row }">
            <customInput v-model="row.totalFee" :disabled="disabled" min="1" type="number"
              @on-blur="handleCalculate('totalFee', row)" />
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column prop="monthlyTotalFee" label="当月总费用(元)" align="center" :index="4">
        <template #default="{ row }">
          <customInput v-model="row.monthlyTotalFee" :disabled="disabled" min="1" type="number"
            @on-blur="handleCalculate('monthlyTotalFee', row)" />
        </template>
      </el-table-column>
    </el-table>
    <template #footer>
      <el-button @click="dialogVisible = false">返回</el-button>
      <el-button @click="disabled = false" v-if="disabled">调账</el-button>
      <el-button @click="onSave" v-else :loading="loading" type="primary">保存</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref, watch } from "vue";
import { getMonthlyBillingIncome, adjustMonthlyBillingIncome } from "@/api/bill";
import { ElMessage } from "element-plus";
import customInput from "./customInput.vue";
const dialogVisible = ref(false);
const disabled = ref(true);
const tableData = ref([]);
const loading = ref(false);
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
  loading.value = true;
  const data = tableData.value[0];
  adjustMonthlyBillingIncome(data)
    .then(res => {
      if(res.code == "0000") {
        ElMessage.success("调账成功");
        dialogVisible.value = false;
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
const getDetail = async () => {
  await getMonthlyBillingIncome(form).then(res => {
    if(res.code == "0000") {
      if(res.data) {
        tableData.value = [res.data];
      }
    }
  });
};
const handlebefore15thNum = newVal => {
  const { before15thNum } = newVal;
  // 15前金额 = 15日前单价*15前数量
  newVal.before15thAmount = (Number(before15thNum) * Number(newVal.before15thUnitPrice)).toFixed(3);
  // 总金额 = 15前金额+15后金额
  newVal.totalAmount = (Number(newVal.before15thAmount) + Number(newVal.after15thAmount)).toFixed(3);
};
const handleafter15thNum = newVal => {
  const { after15thNum } = newVal;
  // 15后金额 = 15日后单价*15后数量
  newVal.after15thAmount = (Number(after15thNum) * Number(newVal.after15thUnitPrice)).toFixed(3);
  // 总金额 = 15前金额+15后金额
  newVal.totalAmount = (Number(newVal.before15thAmount) + Number(newVal.after15thAmount)).toFixed(3);
};
const handleRecordMinutes = newVal => {
  const { recordMinutes } = newVal;
  // 录音费用 = 录音单价*录音分钟数
  newVal.recordFee = (Number(recordMinutes) * Number(newVal.recordUnitPrice)).toFixed(3);
  // 总费用 = 录音费用+非录音费用+有绑定未接通费用
  newVal.totalFee = (Number(newVal.recordFee) + Number(newVal.nonRecordFee) + Number(newVal.bindingNotConnectedFee)).toFixed(3);
};
const handleNonRecordMinutes = newVal => {
  const { nonRecordMinutes } = newVal;
  // 非录音费用 = 非录音单价*非录音分钟数
  newVal.nonRecordFee = (Number(nonRecordMinutes) * Number(newVal.nonRecordUnitPrice)).toFixed(3);
  // 总费用 = 录音费用+非录音费用+有绑定未接通费用
  newVal.totalFee = (Number(newVal.recordFee) + Number(newVal.nonRecordFee) + Number(newVal.bindingNotConnectedFee)).toFixed(3);
};
const handleCalculate = (type, rowData) => {
  switch(type) {
    case "before15thNum": // 15日前数量
      handlebefore15thNum(rowData);
      break;
    case "after15thNum": // 15后数量
      handleafter15thNum(rowData);
      break;
    case "before15thAmount": // 15前金额
    case "after15thAmount": // 15后金额
      rowData.totalAmount = (Number(rowData.before15thAmount) + Number(rowData.after15thAmount)).toFixed(3);
      break;
    case "recordMinutes": // 录音分钟数
      handleRecordMinutes(rowData);
      break;
    case "nonRecordMinutes": // 非录音分钟数
      handleNonRecordMinutes(rowData);
      break;
    case "bindingNotConnectedFee": // 有绑定未接通
    case "recordFee":
    case "nonRecordFee":
      // 总费用 = 录音费用+非录音费用+有绑定未接通费用
      rowData.totalFee = (
        Number(rowData.recordFee) +
        Number(rowData.nonRecordFee) +
        Number(rowData.bindingNotConnectedFee)
      ).toFixed(3);
      break;
    default:
      break;
  }
  // 当月总费用 = 总金额+总费用
  rowData.monthlyTotalFee = (Number(rowData.totalAmount) + Number(rowData.totalFee)).toFixed(3);
};
defineExpose({ openDialog });
</script>
