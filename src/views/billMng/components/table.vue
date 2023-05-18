<template>
  <!-- 表格 -->
  <el-table :data="tableData" border :span-method="arraySpanMethod" :key="tableKey">
    <el-table-column type="index" label="序号" />
    <el-table-column prop="times" label="万分钟/天">
      <template #default="{ row, $index }">
        <div v-if="$index === 0">
          <span>x</span>
          <span>&lt;=</span>
          <customInput v-model="row.times1" />
        </div>
        <div v-else-if="$index === len - 1">有绑定未接通</div>
        <div v-else>
          <customInput v-model="row.times1" />
          <span>&lt;</span>
          <span>x</span>
          <span>&lt;=</span>
          <customInput v-model="row.times2" />
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="discount" label="折扣优惠">
      <template #default="{ row, $index }">
        <div v-if="$index === 0">标准价格</div>
        <div v-else-if="$index === len - 1">指定价格</div>
        <div v-else>
          <customInput v-model="row.discount" />折
        </div>
      </template>
    </el-table-column>
    <el-table-column prop="record" label="录音单价">
      <template #default="{ row, $index }">
        <div v-if="$index === 0">
          <customInput v-model="row.record" />
        </div>
        <div v-else-if="$index === len - 1">
          <customInput v-model="row.unRecord" />
        </div>
        <div v-else>{{ row.record }}</div>
      </template>
    </el-table-column>
    <el-table-column prop="unRecord" label="非录音单价">
      <template #default="{ row, $index }">
        <div v-if="$index === 0">
          <customInput />
        </div>

        <div v-else>{{ row.unRecord }}</div>
      </template>
    </el-table-column>
  </el-table>
  <div class="btn-wrap">
    <el-button type="primary" @click="onAddItem">新增</el-button>
    <el-button @click="onDeleteItem">删除</el-button>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from "vue";
import customInput from "./customInput.vue";
import { ElMessage } from "element-plus";
const initData = [
  {
    times1: "",
    times2: "",
    discount: "",
    record: "",
    unRecord: ""
  },
  {
    times1: "",
    times2: "",
    discount: "",
    record: "",
    unRecord: ""
  },
  {
    times1: "",
    times2: "",
    discount: "",
    record: "33",
    unRecord: ""
  }
];
const tableData = reactive([]);
tableData.push(...initData);
const len = computed(() => tableData.length);

const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if(rowIndex === len.value - 1 && columnIndex === 3) {
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
  tableData.splice(index, 0, item);
};

const onDeleteItem = () => {
  if(len.value > 2) {
    tableData.splice(len.value - 2, 1);
    ElMessage.success("删除成功");
  } else {
    ElMessage.error("不能继续删除了喔");
  }
};
// 生成唯一的键
const tableKey = ref(0);
const onResetTable = () => {
  tableData.splice(0, tableData.length, ...initData);
  console.log(tableData, "initData");
  // 更新键，强制刷新组件
  tableKey.value += 1;
};

defineExpose({ tableData, onResetTable });
</script>
<style lang="scss" scoped>
.btn-wrap {
  margin-top: 15px;
  width: 100%;
}
</style>
