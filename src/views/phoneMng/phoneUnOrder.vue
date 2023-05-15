<template>
  <el-form :model="form" ref="formRef" label-position="left" style="width: 50%">
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" placeholder="请输入标题" />
    </el-form-item>
    <el-form-item label="类型" prop="type">
      <el-radio-group v-model="form.type">
        <el-radio label="1">指定号码退订</el-radio>
        <el-radio label="2">指定地市号码退订</el-radio>
        <el-radio label="2">指定企业客户号码退订</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="文件" prop="file">
      <el-button>上传号码退订清单文件</el-button>
      <span class="gray small ml-10">下载号码退订清单文件样例</span>
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm">取消</el-button>
      <el-button type="primary" @click="onSubmit"> 提交 </el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive, ref } from "vue";
// 表单
const formRef = ref(null);
const form = reactive({
  title: "",
  type: "",
  file: ""
});
// 提交表单
const onSubmit = () => {
  formRef.value.validate(valid => {
    if (valid) {
      ElMessage.success("提交成功");
      formRef.value.resetFields();
    } else {
      return false;
    }
  });
};
// 重置
const resetForm = () => {
  formRef.value.resetFields();
};
</script>
