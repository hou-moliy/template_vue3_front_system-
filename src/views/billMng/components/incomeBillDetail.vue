<template>
  <el-dialog v-model="dialogVisible" title="收入账单详情" style="width: 100%">
    <!-- 表格 -->
    <el-table border :data="tableData" :span-method="arraySpanMethod">
      <el-table-column prop="cmpy1" label="业务" align="center" />
      <el-table-column label="号码" align="center">
        <el-table-column prop="cmpy2" label="15日前单价(元)" align="center" />
        <el-table-column prop="cmpy3" label="15日前数量(个)" align="center" />
        <el-table-column prop="cmpy4" label="15日前金额(元)" align="center" />
        <el-table-column prop="cmpy5" label="15日后单价(元)" align="center" />
        <el-table-column prop="cmpy6" label="15日后数量(个)" align="center" />
        <el-table-column prop="cmpy7" label="15日后金额(元)" align="center" />
      </el-table-column>
      <el-table-column prop="cmpy8" label="总金额(元)" align="center" />
      <el-table-column label="通话" align="center">
        <el-table-column prop="cmpy9" label="区间(万/分钟)" align="center" />
        <el-table-column prop="cmpy10" label="折扣优惠" align="center" />
        <el-table-column prop="cmpy11" label="录音单价(元/分钟)" align="center" />
        <el-table-column prop="cmpy12" label="录音分钟数(分钟)" align="center" />
        <el-table-column prop="cmpy13" label="录音费用(元)" align="center" />
        <el-table-column prop="cmpy14" label="非录音单价(元)" align="center" />
        <el-table-column prop="cmpy15" label="非录音分钟数(分钟)" align="center" />
        <el-table-column prop="cmpy16" label="非录音费用(元)" align="center" />
        <el-table-column prop="cmpy17" label="有绑定未接通费用(元)" align="center" />
        <el-table-column prop="cmpy18" label="费用" align="center" />
      </el-table-column>
      <el-table-column prop="cmpy19" label="当月总费用(元)" align="center" />
    </el-table>
    <template #footer>
      <el-button @click="dialogVisible = false">返回</el-button>
      <el-button>调账</el-button>
    </template>
  </el-dialog>
</template>

<script setup>
import { reactive, ref } from "vue";
const dialogVisible = ref(false);

const tableData = reactive([
  {
    cmpy1: "号码月租费",
    cmpy2: "cmpy2-1",
    cmpy3: "cmpy3-1",
    cmpy4: "cmpy4-1",
    cmpy5: "cmpy5-1",
    cmpy6: "cmpy6-1",
    cmpy7: "cmpy7-1",
    cmpy8: "cmpy8-1",
    cmpy9: "cmpy9-1",
    cmpy10: "cmpy10-1",
    cmpy11: "cmpy11-1",
    cmpy12: "cmpy12-1",
    cmpy13: "cmpy13-1",
    cmpy14: "cmpy14-1",
    cmpy15: "cmpy15-1",
    cmpy16: "cmpy16-1",
    cmpy17: "cmpy17-1",
    cmpy18: "cmpy18-1",
    cmpy19: "cmpy19-1"
  },
  {
    cmpy1: "号码月租费",
    cmpy2: "cmpy2-2",
    cmpy3: "cmpy3-2",
    cmpy4: "cmpy4-2",
    cmpy5: "cmpy5-2",
    cmpy6: "cmpy6-2",
    cmpy7: "cmpy7-2",
    cmpy8: "cmpy8-2",
    cmpy9: "cmpy9-2",
    cmpy10: "cmpy10-2",
    cmpy11: "cmpy11-2",
    cmpy12: "cmpy12-2",
    cmpy13: "cmpy13-2",
    cmpy14: "cmpy14-2",
    cmpy15: "cmpy15-2",
    cmpy16: "cmpy16-2",
    cmpy17: "cmpy17-2",
    cmpy18: "cmpy18-2",
    cmpy19: "cmpy19-2"
  },
  {
    cmpy1: "号码月租费",
    cmpy2: "cmpy2-3",
    cmpy3: "cmpy3-3",
    cmpy4: "cmpy4-3",
    cmpy5: "cmpy5-3",
    cmpy6: "cmpy6-3",
    cmpy7: "cmpy7-3",
    cmpy8: "cmpy8-3",
    cmpy9: "cmpy9-3",
    cmpy10: "cmpy10-3",
    cmpy11: "cmpy11-3",
    cmpy12: "cmpy12-3",
    cmpy13: "cmpy13-3",
    cmpy14: "cmpy14-3",
    cmpy15: "cmpy15-3",
    cmpy16: "cmpy16-3",
    cmpy17: "cmpy17-3",
    cmpy18: "cmpy18-3",
    cmpy19: "cmpy19-3"
  },
  {
    cmpy1: "号码月租费",
    cmpy2: "cmpy2-4",
    cmpy3: "cmpy3-4",
    cmpy4: "cmpy4-4",
    cmpy5: "cmpy5-4",
    cmpy6: "cmpy6-4",
    cmpy7: "cmpy7-4",
    cmpy8: "cmpy8-4",
    cmpy9: "cmpy9-4",
    cmpy10: "cmpy10-4",
    cmpy11: "cmpy11-4",
    cmpy12: "cmpy12-4",
    cmpy13: "cmpy13-4",
    cmpy14: "cmpy14-4",
    cmpy15: "cmpy15-4",
    cmpy16: "cmpy16-4",
    cmpy17: "cmpy17-4",
    cmpy18: "cmpy18-4",
    cmpy19: "cmpy19-4"
  },
  {
    cmpy1: "号码月租费",
    cmpy2: "cmpy2-5",
    cmpy3: "cmpy3-5",
    cmpy4: "cmpy4-5",
    cmpy5: "cmpy5-5",
    cmpy6: "cmpy6-5",
    cmpy7: "cmpy7-5",
    cmpy8: "cmpy8-5",
    cmpy9: "cmpy9-5",
    cmpy10: "cmpy10-5",
    cmpy11: "cmpy11-5",
    cmpy12: "cmpy12-5",
    cmpy13: "cmpy13-5",
    cmpy14: "cmpy14-5",
    cmpy15: "cmpy15-5",
    cmpy16: "cmpy16-5",
    cmpy17: "cmpy17-5",
    cmpy18: "cmpy18-5",
    cmpy19: "cmpy19-5"
  }
]);
const openDialog = row => {
  // console.log(row, "请求详情数据");
  dialogVisible.value = true;
};

// 合并行列
// const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
//   if (columnIndex === 0) {
//     // 判断当前列是否是第一列
//     const currentRowValue = tableData[rowIndex][column.property]; // 获取当前行的值
//     let rowspan = 1; // 初始合并行数为1

//     // 遍历下一行开始的连续行，直到值不相等或者超出行数范围
//     for (let i = rowIndex + 1; i < tableData.length; i++) {
//       const nextRowValue = tableData[i][column.property]; // 获取下一行的值
//       if (nextRowValue === currentRowValue) {
//         rowspan++; // 值相等，合并行数加1
//       } else {
//         break; // 值不相等，跳出循环
//       }
//     }

//     if (rowspan > 1) {
//       // 只对第一行进行合并，其余行返回空对象
//       if (rowIndex === 0) {
//         return { rowspan: 4, colspan: 1 }; // 返回合并的行数和列数
//       } else {
//         return { rowspan: 0, colspan: 0 }; // 返回空对象
//       }
//     }
//   }
//   return { rowspan: 1, colspan: 1 }; // 其他列不进行合并
// };
const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if(rowIndex === 0 && columnIndex < 7) {
    return [5, 1];
  }
};

defineExpose({ openDialog });
</script>
