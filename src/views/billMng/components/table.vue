<template>
  <!-- 表格 -->
  <el-table :data="tabelData" border :span-method="arraySpanMethod">
    <el-table-column type="index" label="序号" />
    <el-table-column prop="times" label="万分钟/天">
      <template #default="{ row, $index }">
        <div v-if="$index === 0">
          <span>x</span>
          <span>&lt;=</span>
          <span>【】</span>
        </div>
        <div v-if="$index === len - 2">
          <span>【】</span>
          <span>&lt;</span>
          <span>x</span>
          <span>&lt;=</span>
          <span>【】</span>
        </div>
        <div v-if="$index === len - 1">有绑定未接通</div>
      </template>
    </el-table-column>
    <el-table-column prop="discount" label="折扣优惠">
      <template #default="{ row, $index }">
        <div v-if="$index === 0">标准价格</div>
        <div v-if="$index === len - 2">【】折</div>
        <div v-if="$index === len - 1">指定价格</div>
      </template>
    </el-table-column>
    <el-table-column prop="record" label="录音单价">
      <template #default="{ row, $index }">
        <div v-if="$index === 0">【】</div>
        <div v-if="$index === tabelData.length - 1">【】</div>
      </template>
    </el-table-column>
    <el-table-column prop="unRecord" label="非录音单价">
      <template #default="{ row, $index }">
        <div v-if="$index === 0">【】</div>
      </template>
    </el-table-column>
  </el-table>
  <el-button type="primary" @click="onAddItem">新增</el-button>
  <el-button @click="onDeleteItem">删除</el-button>
</template>
<script setup>
import { ref, reactive } from "vue";
const tabelData = ref([
  {
    times: "",
    discount: "",
    record: "",
    unRecord: ""
  },
  {
    times: "",
    discount: "",
    record: "",
    unRecord: ""
  },
  {
    times: "",
    discount: "",
    record: "",
    unRecord: ""
  }
]);
const len = ref(tabelData.value.length);
const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (rowIndex === tabelData.value.length - 1 && columnIndex === 3) {
    return [1, 2];
  }
};
const onAddItem = () => {
  let item = {
    times: "",
    discount: "",
    record: "",
    unRecord: ""
  };
  const index = len.value - 1;
  tabelData.value.splice(index, 0, item);
};
const onDeleteItem = () => {
  console.log(len.value);
  if (len.value <= 2) {
  } else {
    tabelData.value.splice(len.value - 2, 1);
  }
};
</script>
