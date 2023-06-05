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
    <template v-if="form.type == isAdd">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" />
      </el-form-item>
      <el-form-item label="接入方式" prop="type">
        <el-radio-group v-model="form.type">
          <el-radio label="0">接入中移互联</el-radio>
          <el-radio label="1">接入北京融昱隐私号</el-radio>
        </el-radio-group>
      </el-form-item>
    </template>
    <template v-if="form.type == 1">
      <el-form-item label="业务模式" prop="bindingType">
        <el-select v-model="form.bindingType" placeholder="请选择业务模式">
          <el-option label="AXB模式" value="0" />
          <el-option label="AXYB模式" value="1" />
          <el-option label="AX模式" value="2" />
          <el-option label="GXB模式" value="3" />
        </el-select>
      </el-form-item>
      <privacyForm ref="privacyFormRef" :disabled="!isEdit" :commonForm="form" />
    </template>
    <interForm ref="interFormRef" v-if="form.type == 1" :disabled="!isEdit" :commonForm="form" />
    <el-form-item v-if="isEdit">
      <el-button @click="onReset">重置</el-button>
      <el-button type="primary" @click="onSubmit">提交</el-button>
      <el-button @click="onReset">取消</el-button>
    </el-form-item>
  </el-form>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import { AuthStore } from "@/stores/modules/auth";
import privacyForm from "./components/privacyForm.vue";
import interForm from "./components/interForm.vue";
import { useRoute } from "vue-router";
import useForm from "@/hooks/useForm";
const { userId } = AuthStore();
const route = useRoute();
const privacyFormRef = ref(null);
const interFormRef = ref(null);
const isEdit = ref(true);
const isAdd = ref(true);
const initialValues = {
  title: "",
  type: "1",
  bindingType: "",
  userId: userId
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
      interFormRef?.value?.onSubmit(isAdd);
    } else {
      privacyFormRef.value?.onSubmit(isAdd);
    }
  });
};
const onReset = () => {
  resetForm();
  privacyFormRef?.value?.onReset();
  interFormRef?.value?.onReset();
};
onMounted(() => {
  isEdit.value = route.query.isEdit === "true" ? true : false;
  isAdd.value = route.query.isAdd === "true" ? true : false;
});
</script>
