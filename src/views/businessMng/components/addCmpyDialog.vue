<template>
  <el-dialog v-model="dialogVisible" title="新增企业客户" @close="closeDialog">
    <el-form :model="form" ref="formRef" :rules="rules" label-width="120px" label-position="left">
      <el-form-item label="企业客户" prop="groupIds">
        <el-select v-model="form.groupIds" multiple placeholder="请选择企业客户" style="width: 240px">
          <el-option v-for="item in cmpyList" :key="item.value" :label="item.label" :value="item.value" />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="closeDialog">返回</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref } from "vue";
import useForm from "@/hooks/useForm";
import { ElMessage } from "element-plus";
import { noRelatedGroupList, addGroup } from "@/api/channel";
const dialogVisible = ref(false);
const emits = defineEmits(["submitSuccess"]);
// 表单
const initialValues = {
  groupIds: []
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
const rules = {
  groupIds: [
    {
      required: true,
      message: "请选择企业",
      trigger: "blur"
    }
  ]
};
// openDialog
const openDialog = () => {
  dialogVisible.value = true;
  getNoRelatedGroupList();
};

const cmpyList = ref([]);
const getNoRelatedGroupList = () => {
  noRelatedGroupList().then(res => {
    if (res.code == "0000") {
      cmpyList.value = res.data;
    }
  });
};

// 提交表单
const onSubmit = () => {
  submitForm().then(() => {
    addGroup(form).then(res => {
      if (res.code == "0000") {
        ElMessage.success("提交成功");
        emits("submitSuccess");
        closeDialog();
      }
    });
  });
};

// 关闭弹窗
const closeDialog = () => {
  resetForm().then(() => (dialogVisible.value = false));
};
defineExpose({ openDialog });
</script>
