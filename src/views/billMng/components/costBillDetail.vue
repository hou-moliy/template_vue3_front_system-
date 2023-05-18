<template>
  <el-dialog v-model="dialogVisible" title="成本账单详情">
    <!-- 表格 -->
    <el-table border :data="tableData">
      <el-table-column prop="createTime" label="账期" />
      <el-table-column prop="cmpy" label="细分企业名称" />
      <el-table-column prop="cmpy" label="抵消或月租模式" />
      <el-table-column prop="cmpy" label="号码使用量(个)">
        <el-table-column prop="cmpy" label="占用整月号码数" />
        <el-table-column prop="cmpy" label="占用下半月号码数" />
      </el-table-column>
      <el-table-column prop="cmpy" label="号码单价(元/月)">
        <el-table-column prop="cmpy" label="15日前" />
        <el-table-column prop="cmpy" label="15日后" />
      </el-table-column>
      <el-table-column prop="cmpy" label="号码使用费(元)" />
      <el-table-column prop="cmpy" label="收费方式">
        <el-table-column prop="cmpy" label="按分钟/按次" />
      </el-table-column>
      <el-table-column prop="cmpy" label="通话量(分钟)">
        <el-table-column prop="cmpy" label="录音分钟数" />
        <el-table-column prop="cmpy" label="非录音分钟数" />
      </el-table-column>
      <el-table-column prop="cmpy" label="通话单价(元/分钟)">
        <el-table-column prop="cmpy" label="录音单价" />
        <el-table-column prop="cmpy" label="非录音单价" />
      </el-table-column>
      <el-table-column prop="cmpy" label="通话量(次)">
        <el-table-column prop="cmpy" label="录音次数" />
        <el-table-column prop="cmpy" label="分录音次数" />
      </el-table-column>
      <el-table-column prop="cmpy" label="通话单价(元/次)">
        <el-table-column prop="cmpy" label="录音单价" />
        <el-table-column prop="cmpy" label="非录音单价" />
      </el-table-column>
      <el-table-column prop="createTime" label="通信费(元)" />
      <el-table-column prop="createTime" label="短信量(条/次)" />
      <el-table-column prop="createTime" label="短信单价(元/条)" />
      <el-table-column prop="createTime" label="短信费(元)" />
      <el-table-column prop="cmpy" label="其他计费项">
        <el-table-column prop="cmpy" label="有绑定未接通次数" />
        <el-table-column prop="cmpy" label="有绑定未接通单价" />
        <el-table-column prop="cmpy" label="有绑定未接通费用" />
      </el-table-column>
      <el-table-column prop="createTime" label="月费用小计(含税：元)" />
      <el-table-column prop="createTime" label="互联网结算(含税：元)" />
    </el-table>
    <template #footer>
      <el-button @click="dialogVisible = false">返回</el-button>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive, ref } from "vue";
const dialogVisible = ref(false);

const tableData = reactive([
  {
    cmpy: "美团",
    manager: "美团经理",
    branchCmpy: "美团分公司",
    channel: "渠道商",
    phone: "123",
    times: "2",
    createTime: "2023/5/16"
  }
]);
const openDialog = row => {
  console.log(row, "请求详情数据");
  dialogVisible.value = true;
};
defineExpose({ openDialog });
</script>
