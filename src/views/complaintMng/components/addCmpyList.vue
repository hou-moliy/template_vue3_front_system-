<template>
  <el-dialog v-model="dialogVisible" title="新增直接发送企业列表" @close="handleResetForm" append-to-body>
    <el-form :model="form" ref="formRef" :rules="rules">
      <el-form-item label="企业客户" prop="cmpy">
        <el-select v-model="form.cmpy" multiple placeholder="请选择企业客户">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="handleResetForm">返回</el-button>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";
import useForm from "@/hooks/useForm";
const dialogVisible = ref(false);
const initialValues = {
  cmpy: ""
};
const options = [
  {
    value: "Option1",
    label: "美团"
  },
  {
    value: "Option2",
    label: "腾讯"
  },
  {
    value: "Option3",
    label: "阿里"
  },
  {
    value: "Option4",
    label: "华为"
  },
  {
    value: "Option5",
    label: "字节"
  }
];
let { form, formRef, resetForm, submitForm } = useForm(initialValues);
const rules = reactive({
  cmpy: [{ required: true, message: "请选择企业客户", trigger: "blur" }]
});
const openDialog = () => {
  dialogVisible.value = true;
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
