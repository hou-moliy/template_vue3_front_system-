<template>
  <el-dialog v-model="dialogVisible" title="新建任务" @close="handleReset">
    <el-form :model="form" ref="formRef" label-position="left" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="类型" prop="type">
        <model-select v-model="form.type" dictType="1" type="radio" />
      </el-form-item>
      <template v-if="form.type === 'AXB' || form.type === 'AX'">
        <el-form-item label="企业客户" prop="groupName">
          <model-select v-model="form.groupName" dictType="1" placeholder="请选择企业客户" />
        </el-form-item>
        <el-form-item label="省份地市" prop="provinceId" v-if="form.type === 'AXB'">
          <regionSelect v-model="address" :level="2" />
        </el-form-item>
      </template>
      <template v-else>
        <el-form-item label="上传文件" prop="file">
          <upload-file v-model="form.file">
            <el-link type="primary" href="https://element-plus.org" target="_blank">下载文件模板</el-link>
          </upload-file>
        </el-form-item>
      </template>
      <el-form-item>
        <el-button @click="handleReset">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 提交 </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";
import useForm from "@/hooks/useForm";
import useRegion from "@/hooks/useRegion.js";
// 表单
const initialValues = {
  title: "",
  type: "",
  groupName: "",
  provinceId: "",
  cityId: "",
  file: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
const rules = reactive({
  title: [{ required: true, message: "请输入标题", trigger: "blur" }],
  type: [{ required: true, message: "请选择类型", trigger: "blur" }],
  groupName: [{ required: true, message: "请选择企业客户", trigger: "blur" }],
  provinceId: [{ required: true, message: "请选择省份", trigger: "blur" }],
  file: [{ required: true, message: "请上传文件", trigger: "blur" }]
});
const { address, setAddress } = useRegion(formRef, form);
const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};
// 提交表单
const onSubmit = () => {
  submitForm().then(() => {
    ElMessage.success("提交成功");
    handleReset();
  });
};
// 重置表单
const handleReset = () => {
  resetForm();
  setAddress([]);
  dialogVisible.value = false;
};
defineExpose({
  openDialog
});
</script>
