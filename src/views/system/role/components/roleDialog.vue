<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="closeDialog">
    <el-form :model="form" ref="formRef" label-width="120px" label-position="left">
      <el-form-item label="角色名称" prop="role">
        <el-input v-model="form.accountName" :disabled="!isEdit" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色描述" prop="desc">
        <el-input v-model="form.desc" placeholder="请输入角色描述" />
      </el-form-item>
      <el-form-item label="菜单权限" prop="permission"> </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">返回</el-button>
        <el-button type="primary" @click="onSubmit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
// import useAccountRules from "../hooks/useAccountRules";
import { treeselect } from "@/api/menu";
const formRef = ref(null);
// 表单
const form = reactive({
  role: "",
  desc: "",
  permission: []
});
// const { rules } = useAccountRules(formRef, form);
const dialogVisible = ref(false);
treeselect().then(res => {
  console.log(res);
});

// openDialog
const isEdit = ref(false);
let title = ref("");
const openDialog = ({ data, isEdit: edit }) => {
  console.log(data, edit);
  isEdit.value = edit;
  dialogVisible.value = true;
  title.value = isEdit.value ? "新增角色" : "修改角色";
};

// 提交表单
const onSubmit = () => {
  formRef?.value.validate(valid => {
    if (valid) {
      console.log(form);
      ElMessage.success(isEdit.value ? "提交成功" : "修改成功");
      closeDialog();
    } else {
      return false;
    }
  });
};

// 关闭弹窗
const closeDialog = () => {
  dialogVisible.value = false;
  formRef.value.resetFields();
};
defineExpose({ openDialog });
</script>
