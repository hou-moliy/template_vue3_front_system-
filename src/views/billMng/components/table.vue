<template>
  <!-- 表格 -->
  <el-table :data="tableData" border v-bind="$attrs" :key="tableKey">
    <el-table-column type="index" label="序号" />
    <el-table-column label="万分钟/天">
      <template #default="{ row, $index }">
        <div v-if="$index === 0">
          {{ row.opRangeEnd }}hhh
          <span>x</span>
          <span>&lt;=</span>
          <!-- 万分钟/天 存放范围值  开始 -->
          <customInput v-model="row.opRangeEnd" :disabled="$attrs.disabled" />
        </div>
        <div v-else-if="$index === len - 1">有绑定未接通</div>
        <div v-else>
          <!-- 万分钟/天 存放范围值  开始 -->
          <customInput v-model="row.opRangeStart" :disabled="$attrs.disabled" />
          <span>&lt;</span>
          <span>x</span>
          <span>&lt;=</span>
          <!-- 万分钟/天 存放范围值 结束 -->
          <customInput v-model="row.opRangeEnd" :disabled="$attrs.disabled" />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="折扣优惠">
      <template #default="{ row, $index }">
        <div v-if="$index === 0">标准价格</div>
        <div v-else-if="$index === len - 1">指定价格</div>
        <!-- 折扣优惠 -->
        <div v-else><customInput v-model="row.discount" :disabled="$attrs.disabled" />折</div>
      </template>
    </el-table-column>
    <el-table-column label="录音单价">
      <template #default="{ row, $index }">
        <div v-if="$index === 0">
          <customInput v-model="row.recordUnitPrice" :disabled="$attrs.disabled" />
        </div>
        <!-- 绑定未接通单价 -->
        <div v-else-if="$index === len - 1">
          <customInput v-model="row.bindingNotConnectedUnitPrice" :disabled="$attrs.disabled" />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="非录音单价">
      <template #default="{ row, $index }">
        <div v-if="$index === 0">
          <customInput v-model="row.nonRecordUnitPrice" :disabled="$attrs.disabled" />
        </div>
      </template>
    </el-table-column>
  </el-table>
  <div class="btn-wrap">
    <el-button type="primary" @click="onAddItem">新增</el-button>
    <el-button @click="onDeleteItem">删除</el-button>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from "vue";
import customInput from "./customInput.vue";
import { ElMessage } from "element-plus";
let initData = [
  {
    opRangeStart: "",
    opRangeEnd: "",
    discount: "",
    recordUnitPrice: "",
    nonRecordUnitPrice: "",
    bindingNotConnectedUnitPrice: ""
  },
  {
    opRangeStart: "",
    opRangeEnd: "",
    discount: "",
    recordUnitPrice: "",
    nonRecordUnitPrice: "",
    bindingNotConnectedUnitPrice: ""
  },
  {
    opRangeStart: "",
    opRangeEnd: "",
    discount: "",
    recordUnitPrice: "",
    nonRecordUnitPrice: "",
    bindingNotConnectedUnitPrice: ""
  }
];
const props = defineProps({
  billData: {
    type: Array,
    default: () => []
  }
});
let tableData = ref([]);
const len = computed(() => tableData.value.length);

const arraySpanMethod = ({ rowIndex, columnIndex }) => {
  if (rowIndex === len.value - 1 && columnIndex === 3) {
    return [1, 2];
  }
};

const onAddItem = () => {
  let item = {
    opRangeStart: "",
    opRangeEnd: "",
    discount: "",
    recordUnitPrice: "",
    nonRecordUnitPrice: "",
    bindingNotConnectedUnitPrice: ""
  };
  const index = len.value - 1;
  tableData.value.splice(index, 0, item);
};

const onDeleteItem = () => {
  if (len.value > 2) {
    tableData.value.splice(len.value - 2, 1);
    ElMessage.success("删除成功");
  } else {
    ElMessage.error("不能继续删除了喔");
  }
};
// 生成唯一的键
const tableKey = ref(0);
const onResetTable = () => {
  tableData.value.splice(0, len.value - 1, ...initData);
  // 更新键，强制刷新组件
  tableKey.value += 1;
};
//
const data = computed(() => {
  // 过滤调最后一个数据
  const list = tableData.value.filter((i, index) => index != len.value - 1);
  const item = tableData.value[0];
  return list.map(i => {
    i.recordUnitPrice = item.recordUnitPrice;
    i.nonRecordUnitPrice = item.nonRecordUnitPrice;
    return i;
  });
});
const bindingNotConnectedUnitPrice = computed(() => {
  // 获取最后一行的有绑定未接通单价
  return tableData.value.find((i, index) => index === len.value - 1).bindingNotConnectedUnitPrice;
});

watch(
  () => props.billData,
  newVal => {
    if (newVal.length) {
      // 非新建
      console.log("newVal", props.billData);
      tableData.value = [];
      tableData.value = newVal;
      nextTick(() => {
        tableKey.value += 1;
        console.log("非新建", tableData);
      });
    } else {
      // 新建
      tableData.value = initData;
    }
  },
  {
    immediate: true
  }
);
defineExpose({ tableData, onResetTable, bindingNotConnectedUnitPrice, data });
</script>
<style lang="scss" scoped>
.btn-wrap {
  margin-top: 15px;
  width: 100%;
}
</style>
