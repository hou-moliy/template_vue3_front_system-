<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="handleResetForm">
    <!-- 表单 -->
    <el-form :inline="true" :model="form" ref="formRef" :rules="rules" :disabled="billType == 2">
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
      <customTable ref="customTableRef" :disabled="billType == 2" :billData="billData" />
      <div class="btn-wrap flx-center">
        <el-form-item>
          <el-button @click="handleResetForm">返回</el-button>
          <el-button type="primary" @click="handleSubmit" :loading="loading">确定</el-button>
        </el-form-item>
      </div>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";
import useForm from "@/hooks/useForm";
import customTable from "./table.vue";
import { getBillingFormula, insertBillingFormula, updateBillingFormula } from "@/api/bill";
import { ElMessage } from "element-plus";
const customTableRef = ref(null);
const loading = ref(false);
const emits = defineEmits(["submitSuccess"]);
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
  before15thRent: "",
  after15thRent: "",
  billingFormulaManagerDetails: []
};
let { form, formRef, resetForm, submitForm } = useForm(initialValues);
const rules = reactive({
  formulaName: [{ required: true, message: "请输入公式名称", trigger: "blur" }],
  billingMode: [{ required: true, message: "请选择账单方式", trigger: "blur" }],
  before15thRent: [{ required: true, message: "请输入号码月租费(15日前开通)", trigger: "blur" }],
  after15thRent: [{ required: true, message: "请输入号码月租费(15日后开通)", trigger: "blur" }]
});
const title = ref("新建账单公式");
const billType = ref(1);
const openDialog = ({ streamNumber, type }) => {
  // 1新增，2详情，3修改，4复制
  title.value = `${titleMap[type]}账单公式`;
  billType.value = type;
  dialogVisible.value = true;
  if (type !== 1) {
    getDetail(streamNumber);
  }
};
// 获取详情
let billData = ref([]);
const getDetail = async streamNumber => {
  await getBillingFormula({ streamNumber }).then(res => {
    if (res.code == "0000") {
      Object.assign(form, res.data);
      let lastData = {
        bindingNotConnectedUnitPrice: res.data.bindingNotConnectedUnitPrice,
        opRangeStart: "",
        opRangeEnd: "",
        discount: "",
        recordUnitPrice: "",
        nonRecordUnitPrice: ""
      };
      let list = [...res.data.billingFormulaManagerDetails, lastData];
      billData.value = [...list];
    }
  });
};
const handleSubmit = () => {
  submitForm()
    .then(() => {
      const data = {
        ...form,
        billingFormulaManagerDetails: customTableRef.value?.data,
        bindingNotConnectedUnitPrice: customTableRef.value?.bindingNotConnectedUnitPrice
      };
      if (billType.value == 1) {
        //新增接口
        handleAdd(data);
      } else if (billType.value == 3) {
        //修改接口
        handleUpdate(data);
      } else if (billType.value == 4) {
        //复制接口
        handleAdd(data);
      }
    })
    .catch(() => {
      console.log("校验失败了");
    });
};
const handleAdd = async data => {
  loading.value = true;
  await insertBillingFormula(data)
    .then(res => {
      if (res.code == "0000") {
        ElMessage.success("账单新增成功!");
        handleResetForm();
        emits("submitSuccess");
      }
    })
    .finally(() => {
      loading.value = false;
    });
};
const handleResetForm = () => {
  customTableRef.value?.onResetTable();
  resetForm().then(() => {
    dialogVisible.value = false;
  });
};
// 修改账单公式
const handleUpdate = async data => {
  loading.value = true;
  await updateBillingFormula(data)
    .then(res => {
      if (res.code == "0000") {
        ElMessage.success("账单修改成功!");
        handleResetForm();
        emits("submitSuccess");
      }
    })
    .finally(() => {
      loading.value = false;
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
