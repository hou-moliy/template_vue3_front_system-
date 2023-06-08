<template>
  <!-- 退订-新建任务 -->
  <el-dialog v-model="dialogVisible" title="新建任务" @close="handleReset">
    <el-form :model="form" ref="formRef" label-position="left" :rules="rules">
      <el-form-item label="标题" prop="taskTitle ">
        <el-input v-model="form.taskTitle" placeholder="请输入标题" />
      </el-form-item>
      <el-form-item label="类型" prop="opType">
        <model-select v-model="form.opType" dictType="opType" type="radio" />
      </el-form-item>
      <template v-if="form.opType === 'AXB' || form.opType === 'AX'">
        <el-form-item label="企业客户" prop="groupId">
          <model-select v-model="form.groupId" dictType="businessUser" placeholder="请选择企业客户" />
        </el-form-item>
        <el-form-item label="省份地市" prop="provinceId" v-if="form.type === 'AXB'">
          <regionSelect v-model="address" />
        </el-form-item>
      </template>
      <template v-else>
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
import useUpload from "@/hooks/useUpload";
import { numberCancel } from "@/api/number";
import { getFormData } from "@/utils/util";
// 表单
const initialValues = {
  taskTitle: "",
  opType: "",
  groupId: "",
  provinceId: "",
  cityId: "",
  file: null
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
const { fileList, fileSuccess, fileRemove } = useUpload(form);
const rules = reactive({
  taskTitle: [{ required: true, message: "请输入标题", trigger: "blur" }],
  opType: [{ required: true, message: "请选择类型", trigger: "blur" }],
  groupId: [{ required: true, message: "请选择企业客户", trigger: "blur" }],
  provinceId: [{ required: true, message: "请选择省份", trigger: "blur" }],
  file: [{ required: true, message: "请上传文件", trigger: "blur", type: "object" }]
});
const { address, setAddress } = useRegion(formRef, form);
const dialogVisible = ref(false);
const openDialog = () => {
  dialogVisible.value = true;
};
// 提交表单
const onSubmit = () => {
  submitForm().then(() => {
    const data = getFormData(form);
    numberCancel(data).then(res => {
      if (res.code == "0000") {
        ElMessage.success("提交成功");
        handleReset();
      }
    });
  });
};
// 重置表单
const handleReset = () => {
  resetForm();
  setAddress([]);
  dialogVisible.value = false;
  fileList.value = [];
};
defineExpose({
  openDialog
});
</script>
