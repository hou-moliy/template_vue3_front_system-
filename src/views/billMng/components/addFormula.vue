<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="handleResetForm">
    <!-- 表单 -->
    <el-form :inline="true" :model="form" ref="formRef" :rules="rules">
      <el-form-item label="公式名称" prop="formulaName">
        <el-input v-model="form.formulaName" placeholder="请输入公式名称" />
      </el-form-item>
      <el-form-item label="账单方式" prop="billingMode">
        <model-select v-model="form.billingMode" dictType="billingType" placeholder="请选择账单方式" />
      </el-form-item>
      <el-form-item label="号码月租费(15日前开通)" prop="before15thRent">
        <el-input v-model="form.before15thRent" placeholder="请输入号码月租费(15日前开通)" />
      </el-form-item>
      <el-form-item label="号码月租费(15日后开通)" prop="after15thRent">
        <el-input v-model="form.after15thRent" placeholder="请输入号码月租费(15日后开通)" />
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
import { getBillingFormula } from "@/api/bill";
const customTableRef = ref(null);
const titleMap = {
  1: "新增",
  2: "查看",
  3: "修改",
  4: "复制"
};
const dialogVisible = ref(false);
const initialValues = {
  formulaName: "",
  billingMode: "",
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
const openDialog = ({ streamNumber, type }) => {
  // 1新增，2详情，3修改，4复制
  dialogVisible.value = true;
  title.value = `${titleMap[type]}账单公式`;
  if (type !== 1) {
    getDetail(streamNumber);
  }
};
// 获取详情
const getDetail = streamNumber => {
  getBillingFormula({ streamNumber }).then(res => {
    if (res.code == "0000") {
      Object.assign(form, res.data);
    }
  });
};
const handleSubmit = () => {
  // customTableRef.value?.tableData;
  // console.log(customTableRef.value?.tableData, "ustomTableRef.value?.tableData");
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
