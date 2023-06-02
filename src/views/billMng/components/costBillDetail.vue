<template>
  <el-dialog v-model="dialogVisible" title="成本账单详情">
    <!-- 表格 -->
    <el-table border :data="tableData">
      <el-table-column prop="statTime" label="账期" />
      <el-table-column prop="midGroupId" label="细分企业名称" />
      <el-table-column prop="mrMode" label="抵消或月租模式">
        <template #default="{ row }">
          <span v-if="row.mrMode == 0">免月租</span>
          <span v-else-if="row.mrMode == 1">月租</span>
          <span v-else>其它</span>
        </template>
      </el-table-column>
      <el-table-column label="号码使用量(个)">
        <el-table-column prop="wholeMonthNum" label="占用整月号码数" />
        <el-table-column prop="after15thNum" label="占用下半月号码数" />
      </el-table-column>
      <el-table-column label="号码单价(元/月)">
        <el-table-column prop="before15thUnitPrice" label="15日前" />
        <el-table-column prop="after15thUnitPrice" label="15日后" />
      </el-table-column>
      <el-table-column prop="numberUseCost" label="号码使用费(元)" />
      <el-table-column label="收费方式">
        <el-table-column prop="chargeMode" label="按分钟/按次">
          <template #default="{ row }">
            {{ row.chargeMode == 0 ? "按分钟" : "按次" }}
          </template>
        </el-table-column>
      </el-table-column>
      <el-table-column label="通话量(分钟)">
        <el-table-column prop="recordingCallMinutes" label="录音分钟数" />
        <el-table-column prop="nonRecordingCallMinutes" label="非录音分钟数" />
      </el-table-column>
      <el-table-column label="通话单价(元/分钟)">
        <el-table-column prop="recordingCallMUnitPrice" label="录音单价" />
        <el-table-column prop="nonRecordingCallMUnitPrice" label="非录音单价" />
      </el-table-column>
      <el-table-column label="通话量(次)">
        <el-table-column prop="recordingCallNum" label="录音次数" />
        <el-table-column prop="nonRecordingCallNum" label="非录音次数" />
      </el-table-column>
      <el-table-column label="通话单价(元/次)">
        <el-table-column prop="recordingCallNUnitPrice" label="录音单价" />
        <el-table-column prop="nonRecordingCallNUnitPrice" label="非录音单价" />
      </el-table-column>
      <el-table-column prop="communicationFee" label="通信费(元)" />
      <el-table-column prop="smsNum" label="短信量(条/次)" />
      <el-table-column prop="smsUnitPrice" label="短信单价(元/条)" />
      <el-table-column prop="smsFee" label="短信费(元)" />
      <el-table-column label="其他计费项">
        <el-table-column prop="bindingNotConnectedNum" label="有绑定未接通次数" />
        <el-table-column prop="bindingNotConnectedUnitPrice" label="有绑定未接通单价" />
        <el-table-column prop="bindingNotConnectedFee" label="有绑定未接通费用" />
      </el-table-column>
      <el-table-column prop="monthlySubtotal" label="月费用小计(含税：元)" />
      <el-table-column prop="internetSettlement" label="互联网结算(含税：元)" />
    </el-table>
    <template #footer>
      <el-button @click="dialogVisible = false">返回</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive, ref } from "vue";
import { getMonthlyBillingCost } from "@/api/bill";
const dialogVisible = ref(false);
const form = reactive({
  midGroupId: "",
  statTime: ""
});
const tableData = ref([]);
const openDialog = async ({ midGroupId, statTime, midGroupName }) => {
  form.midGroupId = midGroupId;
  form.statTime = statTime;
  form.midGroupName = midGroupName;
  await getDetail();
  dialogVisible.value = true;
};
const getDetail = async () => {
  await getMonthlyBillingCost(form).then(res => {
    if (res.code == "0000") {
      if (res.data) {
        tableData.value = [res.data];
      }
    }
  });
};
defineExpose({ openDialog });
</script>
