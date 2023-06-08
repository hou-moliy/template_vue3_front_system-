<template>
  <!-- 表格 -->
  <el-table :data="tableData" border v-bind="$attrs" :key="tableKey" :span-method="arraySpanMethod">
    <el-table-column type="index" label="序号" />
    <el-table-column label="万分钟/天">
      <template #default="{ row, $index }">
        <div v-if="$index === 0" class="flx-center">
          <span>x</span> <span>&lt;=</span>
          <!-- 万分钟/天 存放范围值 x<=  -->
          <customInput
            v-model="row.opRangeEnd"
            :disabled="$attrs.disabled"
            width="70px"
            type="number"
            min="1"
            @on-blur="handleBlur($event, $index)"
          />
        </div>
        <!--万分钟/天 存放范围值 x>=  -->
        <div v-else-if="$index === len - 2" class="flx-center">
          <customInput
            v-model="row.opRangeStart"
            :disabled="$attrs.disabled"
            width="70px"
            type="number"
            min="1"
            @on-blur="handleBlur($event, $index)"
          />
          <span>&lt;</span>
          <span>x</span>
        </div>
        <div v-else-if="$index === len - 1" class="flx-center">有绑定未接通</div>
        <div v-else class="flx-center">
          <!-- 万分钟/天 存放范围值  开始 -->
          <customInput
            v-model="row.opRangeStart"
            :disabled="true"
            width="70px"
            type="number"
            min="1"
            @on-blur="handleBlur($event, $index)"
          />
          <span>&lt;</span>
          <span>x</span>
          <span>&lt;=</span>
          <!-- 万分钟/天 存放范围值 结束 -->
          <customInput
            v-model="row.opRangeEnd"
            :disabled="$attrs.disabled"
            width="70px"
            type="number"
            min="1"
            @on-blur="handleBlur($event, $index)"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="折扣优惠">
      <template #default="{ row, $index }">
        <div v-if="$index === 0" class="flx-center">标准价格</div>
        <div v-else-if="$index === len - 1" class="flx-center">指定价格</div>
        <!-- 折扣优惠 -->
        <div v-else class="flx-center">
          <customInput
            v-model="row.discount"
            :disabled="$attrs.disabled"
            width="70px"
            type="number"
            min="1"
            @on-blur="handleBlur($event, $index)"
          />折
        </div>
      </template>
    </el-table-column>
    <el-table-column label="录音单价">
      <template #default="{ row, $index }">
        <div v-if="$index === 0" class="flx-center">
          <customInput
            v-model="row.recordUnitPrice"
            :disabled="$attrs.disabled"
            width="70px"
            type="number"
            min="1"
            @on-blur="handleBlur($event, $index)"
          />
        </div>
        <!-- 绑定未接通单价 -->
        <div v-else-if="$index === len - 1" class="flx-center">
          <customInput
            v-model="row.bindingNotConnectedUnitPrice"
            :disabled="$attrs.disabled"
            width="70px"
            type="number"
            min="1"
            @on-blur="handleBlur($event, $index)"
          />
        </div>
      </template>
    </el-table-column>
    <el-table-column label="非录音单价">
      <template #default="{ row, $index }">
        <div v-if="$index === 0" class="flx-center">
          <customInput
            v-model="row.nonRecordUnitPrice"
            :disabled="$attrs.disabled"
            width="70px"
            type="number"
            min="1"
            @on-blur="handleBlur($event, $index)"
          />
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
import { ref, computed, watch } from "vue";
import customInput from "./customInput.vue";
import { ElMessage } from "element-plus";
const initData = [
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
  if (rowIndex !== 0 && columnIndex === 3) {
    return [1, 2];
  }
};
// 检查连续性问题
const checkContinuous = () => {
  const ars = tableData.value.filter(
    ({ opRangeStart, opRangeEnd }, index) => index > 0 && index < len.value - 2 && Number(opRangeStart) - Number(opRangeEnd) >= 0
  );
  if (ars.length) {
    ElMessage.error("请检查范围值的连续性！");
    return false;
  }
  return true;
};

const onAddItem = () => {
  if (checkContinuous()) {
    const index = len.value - 1;
    const beforeData = tableData.value[index - 1];
    let item = {
      opRangeStart: beforeData.opRangeEnd,
      opRangeEnd: "",
      discount: "",
      recordUnitPrice: "",
      nonRecordUnitPrice: "",
      bindingNotConnectedUnitPrice: ""
    };
    tableData.value.splice(index, 0, item);
  }
};

const onDeleteItem = () => {
  if (len.value > 3) {
    tableData.value.splice(len.value - 3, 1);
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
// 处理表格数据=> 生成最终的数据
const data = computed(() => {
  // 过滤调最后一个数据
  const list = tableData.value.filter((i, index) => index != len.value - 1);
  const item = tableData.value[0];
  return list.map((i, index) => {
    if (index == 0) {
      i.opRangeStart = "";
    }
    i.recordUnitPrice = item.recordUnitPrice;
    i.nonRecordUnitPrice = item.nonRecordUnitPrice;
    delete i.bindingNotConnectedUnitPrice;
    return i;
  });
});
// 获取最后一行的有绑定未接通单价
const bindingNotConnectedUnitPrice = computed(() => {
  // 获取最后一行的有绑定未接通单价
  return tableData.value.find((i, index) => index === len.value - 1).bindingNotConnectedUnitPrice;
});
// 处理连续性校验-开始
const handleBlurStart = index => {
  let beforeData = tableData.value[index - 1];
  let currentData = tableData.value[index];
  if (beforeData.opRangeEnd) {
    currentData.opRangeStart = beforeData.opRangeEnd;
    tableData.value.splice(index, 1, currentData);
  }
};

const handleBlur = (e, index) => {
  let currentData = tableData.value[index];
  console.log(currentData, index);
  const { opRangeStart, opRangeEnd } = currentData;
  if (opRangeStart && opRangeEnd) {
    if (Number(opRangeStart) - Number(opRangeEnd) >= 0) {
      ElMessage.error("开始值大于等于结束值,请重新填写！");
    }
  }
};
// 检查是否都填写完成
const checkAll = () => {
  const ars = data.value.filter(({ opRangeStart, opRangeEnd, discount, recordUnitPrice, nonRecordUnitPrice }, index) => {
    if (index == 0) {
      //检查第一行
      return !opRangeEnd || !recordUnitPrice || !nonRecordUnitPrice;
    } else if (index == len.value - 1) {
      //检查最后一行
      return !opRangeStart || !discount || !recordUnitPrice || !nonRecordUnitPrice;
    }
    return !opRangeStart || !discount || !recordUnitPrice || !nonRecordUnitPrice;
  });
  console.log(ars, "ars");
  if (ars.length) {
    ElMessage.error("请检查自定义表格是否都填写完成！");
    return false;
  } else if (bindingNotConnectedUnitPrice.value == "") {
    ElMessage.error("请填写有绑定未接通单价！");
    return false;
  } else if (!checkContinuous()) {
    return false;
  }
  return true;
};
watch(
  () => props.billData,
  newVal => {
    if (newVal.length) {
      // 非新建
      tableData.value = [];
      tableData.value = newVal;
    } else {
      // 新建
      tableData.value = JSON.parse(JSON.stringify(initData)); // 深拷贝
    }
  },
  {
    immediate: true,
    deep: true
  }
);
watch(
  () => tableData.value,
  () => {
    // 过滤调最后一个数据
    const list = tableData.value.filter((i, index) => index != len.value - 1);
    const newList = list.map((i, index) => {
      // 处理连续性校验-开始
      // 1.开始时间必须等于上一条的结束时间
      // 2.结束时间必须等于下一条的开始时间
      const lastIndex = index - 1;
      if (lastIndex >= 0) {
        handleBlurStart(index);
      }
      return i;
    });
    Object.assign(tableData.value, newList);
  },
  {
    immediate: false,
    deep: true
  }
);
defineExpose({ tableData, onResetTable, bindingNotConnectedUnitPrice, data, checkAll });
</script>
<style lang="scss" scoped>
.btn-wrap {
  margin-top: 15px;
  width: 100%;
}
</style>
