<template>
  <el-form
    :model="form"
    ref="formRef"
    :rules="rules"
    label-width="120px"
    label-position="left"
    style="width: 50%"
    :disabled="!isEdit"
  >
    <el-form-item label="标题" prop="title">
      <el-input v-model="form.title" />
    </el-form-item>
    <el-form-item label="接入方式" prop="type">
      <el-radio-group v-model="form.type">
        <el-radio label="1">接入中移互联</el-radio>
        <el-radio label="2">接入北京融昱隐私号</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="业务模式" prop="bindingType">
      <el-select v-model="form.bindingType" placeholder="请选择业务模式">
        <el-option label="AXB模式" value="AXB" />
        <el-option label="AXYB模式" value="AXYB" />
        <el-option label="AX模式" value="AX" />
        <el-option label="GXB模式" value="GXB" />
      </el-select>
    </el-form-item>
    <privacyForm ref="privacyFormRef" v-if="form.type == 2" :disabled="!isEdit" />
    <interForm ref="interFormRef" v-if="form.type == 1" :disabled="!isEdit" />
    <el-form-item v-if="isEdit">
      <el-button @click="onReset">重置</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="onReset">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import privacyForm from "./components/privacyForm.vue";
import interForm from "./components/interForm.vue";
import { useRoute } from "vue-router";
import useForm from "@/hooks/useForm";
const route = useRoute();
const privacyFormRef = ref(null);
const interFormRef = ref(null);
const isEdit = ref(true);
const initialValues = {
  title: "",
  type: "1",
  bindingType: ""
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
const rules = reactive({
  title: [
    {
      required: true,
      message: "请输入标题",
      trigger: "blur"
    }
  ],
  type: [
    {
      required: true,
      message: "请选择接入方式",
      trigger: "blur"
    }
  ],
  bindingType: [
    {
      required: true,
      message: "请选择业务模式",
      trigger: "blur"
    }
  ]
});
const onSubmit = () => {
  submitForm().then(() => {
    if (form.type == 1) {
      interFormRef?.value?.onSubmit(handleInter);
    } else {
      privacyFormRef.value?.onSubmit();
    }
  });
};

// 处理接入中移
const handleInter = () => {
  console.log("新增中移动");
};

// 处理隐私号
const handlePrivacy = () => {
  console.log("新增隐私号");
};
const onReset = () => {
  resetForm();
  privacyFormRef?.value?.onReset();
  interFormRef?.value?.onReset();
};
onMounted(() => {
  isEdit.value = route.query.isEdit === "true" ? true : false;
});
</script>
<style></style>
