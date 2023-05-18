<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="handleResetForm">
    <!-- 表单 -->
    <el-form :inline="true" :model="form" ref="formRef" :rules="rules">
      <el-form-item label="公式名称" prop="name">
        <el-input v-model="form.name" placeholder="请输入公式名称" />
      </el-form-item>
      <el-form-item label="账单方式" prop="type">
        <el-select v-model="form.type" multiple placeholder="请选择账单方式">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item label="号码月租费(15日前开通)" prop="before">
        <el-input v-model="form.before" placeholder="请输入号码月租费(15日前开通)" />
      </el-form-item>
      <el-form-item label="号码月租费(15日后开通)" prop="after">
        <el-input v-model="form.after" placeholder="请输入号码月租费(15日后开通)" />
      </el-form-item>
      <el-form-item>
        <el-button @click="handleResetForm">返回</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </el-form-item>
    </el-form>
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
          <div v-if="$index === tabelData.length - 2">
            <span>【】</span>
            <span>&lt;</span>
            <span>x</span>
            <span>&lt;=</span>
            <span>【】</span>
          </div>
          <div v-if="$index === tabelData.length - 1">有绑定未接通</div>
        </template>
      </el-table-column>
      <el-table-column prop="discount" label="折扣优惠">
        <template #default="{ row, $index }">
          <div v-if="$index === 0">标准价格</div>
          <div v-if="$index === tabelData.length - 2">【】折</div>
          <div v-if="$index === tabelData.length - 1">指定价格</div>
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
  </el-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";
import useForm from "@/hooks/useForm";
const titleMap = {
  1: "新增",
  2: "查看",
  3: "修改",
  4: "复制"
};
const dialogVisible = ref(false);
const initialValues = {
  name: "",
  type: "",
  before: "",
  after: ""
};
let { form, formRef, resetForm, submitForm } = useForm(initialValues);
const rules = reactive({
  name: [{ required: true, message: "请输入公式名称", trigger: "blur" }],
  type: [{ required: true, message: "请选择账单方式", trigger: "blur" }],
  before: [{ required: true, message: "请输入号码月租费(15日前开通)", trigger: "blur" }],
  after: [{ required: true, message: "请输入号码月租费(15日后开通)", trigger: "blur" }]
});
const title = ref("新建账单公式");
const options = [
  {
    value: "Option1",
    label: "月租费+按分钟计费"
  },
  {
    value: "Option2",
    label: "月租费+按绑定次数计费"
  },
  {
    value: "Option3",
    label: "低消+按分钟计费"
  },
  {
    value: "Option4",
    label: "低消+按绑定次数计费"
  }
];
const tabelData = reactive([
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
const arraySpanMethod = ({ row, column, rowIndex, columnIndex }) => {
  if (rowIndex === tabelData.length - 1 && columnIndex === 3) {
    return [1, 2];
  }
};
const openDialog = ({ data, type }) => {
  // 1新增，2详情，3修改，4复制
  dialogVisible.value = true;
  title.value = `${titleMap[type]}账单公式`;
  if (type !== 1) {
    Object.assign(form, data);
  }
};
const handleSubmit = () => {
  submitForm()
    .then(() => {
      console.log("校验通过了");
    })
    .catch(() => {
      console.log("校验失败了");
    });
};
const handleResetForm = () => {
  resetForm().then(() => {
    dialogVisible.value = false;
  });
};
defineExpose({ openDialog });
</script>
