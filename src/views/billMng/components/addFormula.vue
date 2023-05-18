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
      <customTable ref="customTableRef" />
      <div class="btn-wrap flx-center">
        <el-form-item>
          <el-button @click="handleResetForm">返回</el-button>
          <el-button type="primary" @click="handleSubmit">确定</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";
import useForm from "@/hooks/useForm";
import customTable from "./table.vue";
const customTableRef = ref(null);
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

const openDialog = ({ data, type }) => {
  // 1新增，2详情，3修改，4复制
  dialogVisible.value = true;
  title.value = `${titleMap[type]}账单公式`;
  if(type !== 1) {
    Object.assign(form, data);
  }
};
const handleSubmit = () => {
  customTableRef.value?.tableData;
  console.log(customTableRef.value?.tableData, "ustomTableRef.value?.tableData");
  submitForm()
    .then(() => {
      console.log("校验通过了");
    })
    .catch(() => {
      console.log("校验失败了");
    });
};
const handleResetForm = () => {
  customTableRef.value?.onResetTable();
  resetForm().then(() => {
    dialogVisible.value = false;
  });
};
defineExpose({ openDialog });
</script>
<style lang="scss" scoped>
.btn-wrap {
  margin-top: 15px;
  width: 100%;
}
</style>
