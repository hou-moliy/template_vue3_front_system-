<template>
  <!-- 号码订购-新建任务 -->
  <el-dialog v-model="dialogVisible" title="新建任务" @close="handleReset">
    <el-form :model="form" ref="formRef" :rules="rules" label-position="left">
      <el-form-item label="任务名称" prop="title">
        <el-input v-model="form.title" placeholder="请输入任务名称" />
      </el-form-item>
      <el-form-item label="类型" prop="orderType">
        <model-select v-model="form.orderType" dictType="orderType" type="radio" />
      </el-form-item>
      <!-- 指定号码订购展示 -->
      <template v-if="form.orderType == '1'">
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
      <!-- 指定号码量订购展示 -->
      <template v-else>
        <el-form-item label="企业客户" prop="groupId">
          <model-select v-model="form.groupId" dictType="businessMidgroup" placeholder="请选择企业客户" />
        </el-form-item>
        <el-form-item label="省份地市" prop="provinceId">
          <regionSelect v-model="address" />
        </el-form-item>
        <el-form-item label="号码量" prop="phoneNum">
          <el-input-number v-model="form.phoneNum" :min="0" />
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
import useRegion from "@/hooks/useRegion.js";
import useForm from "@/hooks/useForm";
import { remainingNum, order } from "@/api/number.js";
import { getFormData } from "@/utils/util";
import useUpload from "@/hooks/useUpload";
const dialogVisible = ref(false);
// 表单
const initialValues = {
  title: "",
  orderType: "0",
  poolType: "",
  groupId: "",
  provinceId: "",
  cityId: "",
  file: null,
  phoneNum: 0
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
const { fileList, fileSuccess, fileRemove } = useUpload(form);
const { address, setAddress } = useRegion(formRef, form);
// 校验号码量最大值
const validateMaxNum = (rule, value, callback) => {
  const { provinceId, cityId } = form;
  if (!provinceId || !cityId) {
    callback(new Error("请先选择省份地市"));
  } else {
    remainingNum({ provinceId, cityId }).then(res => {
      if (value > res.data) {
        callback(new Error("该省份地市号码量不足"));
      } else {
        callback();
      }
    });
  }
};
const rules = reactive({
  title: [{ required: true, message: "请输入任务名称", trigger: "blur" }],
  type: [{ required: true, message: "请选择类型", trigger: "change" }],
  groupName: [{ required: true, message: "请选择企业客户", trigger: "change" }],
  provinceId: [{ required: true, message: "请选择省份", trigger: "blur" }],
  file: [{ required: true, message: "请上传文件", trigger: "blur", type: "object" }],
  phoneNum: [
    { required: true, message: "请输入号码量", trigger: "blur" },
    {
      validator: validateMaxNum,
      trigger: "blur"
    }
  ]
});
const openDialog = () => {
  dialogVisible.value = true;
};
// 提交表单
const onSubmit = () => {
  submitForm().then(() => {
    const data = getFormData(form);
    order(data).then(res => {
      if (res.code == "0000") {
        handleReset();
        ElMessage.success("订购任务创建成功");
      }
    });
  });
};
// 重置
const handleReset = () => {
  setAddress([]);
  resetForm();
  dialogVisible.value = false;
  fileList.value = [];
};
defineExpose({
  openDialog
});
</script>
