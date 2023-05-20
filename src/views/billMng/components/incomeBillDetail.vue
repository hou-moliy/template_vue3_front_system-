<template>
  <el-dialog v-model="dialogVisible" title="收入账单详情" style="width: 100%">
    <!-- 表格 -->
    <el-table border :data="tableData" :span-method="arraySpanMethod">
      <el-table-column prop="cmpy1" label="业务" align="center" :index="0" />
      <el-table-column label="号码" align="center" :index="1">
        <el-table-column prop="cmpy2" label="15日前单价(元)" align="center" />
        <el-table-column prop="cmpy3" label="15日前数量(个)" align="center">
          <template #default="{ row }">
            <el-input v-model="row.cmpy3" :disabled="disabled"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="cmpy4" label="15日前金额(元)" align="center" />
        <el-table-column prop="cmpy5" label="15日后单价(元)" align="center" />
        <el-table-column prop="cmpy6" label="15日后数量(个)" align="center" />
        <el-table-column prop="cmpy7" label="15日后金额(元)" align="center" />
      </el-table-column>
      <el-table-column prop="cmpy8" label="总金额(元)" align="center" :index="2" />
      <el-table-column label="通话" align="center" :index="3">
        <el-table-column prop="cmpy9" label="区间(万/分钟)" align="center" />
        <el-table-column prop="cmpy10" label="折扣优惠" align="center" />
        <el-table-column prop="cmpy11" label="录音单价(元/分钟)" align="center" />
        <el-table-column prop="cmpy12" label="录音分钟数(分钟)" align="center" />
        <el-table-column prop="cmpy13" label="录音费用(元)" align="center" />
        <el-table-column prop="cmpy14" label="非录音单价(元)" align="center" />
        <el-table-column prop="cmpy15" label="非录音分钟数(分钟)" align="center" />
        <el-table-column prop="cmpy16" label="非录音费用(元)" align="center" />
        <el-table-column prop="cmpy17" label="未接通费用(元)" align="center" />
        <el-table-column prop="cmpy18" label="费用" align="center" />
      </el-table-column>
      <el-table-column prop="cmpy19" label="当月总费用(元)" align="center" :index="4" />
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
import useTable from "@/hooks/useTable";
const dialogVisible = ref(false);
const { getRowSpanMethod } = useTable();
const disabled = ref(true);
const tableData = reactive([
  {
    cmpy1: "号码月租费",
    cmpy2: "5",
    cmpy3: "150",
    cmpy4: "750",
    cmpy5: "2.5",
    cmpy6: "0",
    cmpy7: "0",
    cmpy8: "750",
    cmpy9: "cmpy9-1",
    cmpy10: "cmpy10-1",
    cmpy11: "cmpy11-1",
    cmpy12: "cmpy12-1",
    cmpy13: "cmpy13-1",
    cmpy14: "cmpy14-1",
    cmpy15: "cmpy15-1",
    cmpy16: "cmpy16-1",
    cmpy17: "cmpy17-1",
    cmpy18: "100",
    cmpy19: "56"
  },
  {
    cmpy1: "号码月租费",
    cmpy2: "5",
    cmpy3: "150",
    cmpy4: "750",
    cmpy5: "2.5",
    cmpy6: "0",
    cmpy7: "0",
    cmpy8: "750",
    cmpy9: "cmpy9-2",
    cmpy10: "cmpy10-2",
    cmpy11: "cmpy11-2",
    cmpy12: "cmpy12-2",
    cmpy13: "cmpy13-2",
    cmpy14: "cmpy14-2",
    cmpy15: "cmpy15-2",
    cmpy16: "cmpy16-2",
    cmpy17: "cmpy17-2",
    cmpy18: "100",
    cmpy19: "56"
  },
  {
    cmpy1: "号码月租费",
    cmpy2: "5",
    cmpy3: "150",
    cmpy4: "750",
    cmpy5: "2.5",
    cmpy6: "0",
    cmpy7: "0",
    cmpy8: "750",
    cmpy9: "cmpy9-3",
    cmpy10: "cmpy10-3",
    cmpy11: "cmpy11-3",
    cmpy12: "cmpy12-3",
    cmpy13: "cmpy13-3",
    cmpy14: "cmpy14-3",
    cmpy15: "cmpy15-3",
    cmpy16: "cmpy16-3",
    cmpy17: "cmpy17-3",
    cmpy18: "100",
    cmpy19: "56"
  },
  {
    cmpy1: "号码月租费",
    cmpy2: "5",
    cmpy3: "150",
    cmpy4: "750",
    cmpy5: "2.5",
    cmpy6: "0",
    cmpy7: "0",
    cmpy8: "750",
    cmpy9: "cmpy9-4",
    cmpy10: "cmpy10-4",
    cmpy11: "cmpy11-4",
    cmpy12: "cmpy12-4",
    cmpy13: "cmpy13-4",
    cmpy14: "cmpy14-4",
    cmpy15: "cmpy15-4",
    cmpy16: "cmpy16-4",
    cmpy17: "cmpy17-4",
    cmpy18: "100",
    cmpy19: "56"
  },
  {
    cmpy1: "号码月租费",
    cmpy2: "5",
    cmpy3: "150",
    cmpy4: "750",
    cmpy5: "2.5",
    cmpy6: "0",
    cmpy7: "0",
    cmpy8: "750",
    cmpy9: "cmpy9-5",
    cmpy10: "cmpy10-5",
    cmpy11: "cmpy11-5",
    cmpy12: "cmpy12-5",
    cmpy13: "cmpy13-5",
    cmpy14: "cmpy14-5",
    cmpy15: "cmpy15-5",
    cmpy16: "cmpy16-5",
    cmpy17: "cmpy17-5",
    cmpy18: "100",
    cmpy19: "56"
  }
]);
const openDialog = row => {
  // console.log(row, "请求详情数据");
  dialogVisible.value = true;
};

// 合并行列
const arraySpanMethod = getRowSpanMethod(tableData, [
  "cmpy1",
  "cmpy2",
  "cmpy3",
  "cmpy4",
  "cmpy5",
  "cmpy6",
  "cmpy7",
  "cmpy8",
  "cmpy18",
  "cmpy19"
]);

const onSave = () => {
  console.log(tableData, "tableData");
};

defineExpose({ openDialog });
</script>
