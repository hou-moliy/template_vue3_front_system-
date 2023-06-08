<template>
  <!-- 未使用号码资源-新建任务 -->
  <el-dialog v-model="dialogVisible" title="新建任务" @close="handleReset">
    <!-- 表单 -->
    <el-form :model="form" ref="formRef" :rules="rules">
      <el-form-item label="任务名称" prop="taskName">
        <el-input v-model="form.taskName" />
      </el-form-item>
      <el-form-item label="上传文件" prop="file">
        <UploadFile
          :fileList="fileList"
          acceptType="txt,text"
          acceptTypeDesc="txt/text"
          @file-success="fileSuccess"
          @file-remove="fileRemove"
        >
          <el-link type="primary" href="https://element-plus.org" target="_blank">下载文件模板</el-link>
        </UploadFile>
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
import { importPhone } from "@/api/number";
import { getFormData } from "@/utils/util";
import useUpload from "@/hooks/useUpload";

const emits = defineEmits(["submitSuccess"]);
// 表单
const initialValues = {
  taskName: "",
  file: null
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
const { fileList, fileSuccess, fileRemove } = useUpload(form);
const rules = reactive({
  taskName: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
  file: [{ required: true, message: "请上传文件", trigger: "blur", type: "object" }]
});
const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};
// 重置
const handleReset = () => {
  resetForm();
  dialogVisible.value = false;
  fileList.value = [];
};
const handleSubmit = () => {
  submitForm().then(() => {
    const data = getFormData(form);
    importPhone(data).then(res => {
      if (res.code == "0000") {
        handleReset();
        emits("submitSuccess");
        ElMessage.success("新建任务成功");
      }
    });
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
