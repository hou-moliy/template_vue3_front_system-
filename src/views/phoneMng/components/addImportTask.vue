<template>
  <el-dialog v-model="dialogVisible" title="新建任务" @close="handleReset">
    <!-- 表单 -->
    <el-form :model="form" ref="formRef" :rules="rules">
      <el-form-item label="任务名称" prop="taskName">
        <el-input v-model="form.taskName" />
      </el-form-item>
      <el-form-item label="上传文件" prop="file">
        <upload-file v-model="form.file">
          <el-link type="primary" href="https://element-plus.org" target="_blank">下载文件模板</el-link>
        </upload-file>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">确定</el-button>
        <el-button @click="handleReset">返回</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>
<script setup>
import { ref, reactive } from "vue";
import useForm from "@/hooks/useForm";
// 表单
const initialValues = {
  taskName: "",
  file: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
const rules = reactive({
  taskName: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
  file: [{ required: true, message: "请上传文件", trigger: "blur" }]
});
const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};
// 重置
const handleReset = () => {
  resetForm();
  dialogVisible.value = false;
};
const handleSubmit = () => {
  submitForm().then(() => {
    handleReset();
  });
};
defineExpose({
  openDialog
});
</script>
<style lang="scss" scoped>
.form-item-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
}
</style>
