<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="handleColse">
    <el-form :model="form" ref="formRef" label-width="120px" label-position="left">
      <el-form-item label="角色名称" prop="role">
        <el-input v-model="form.role" :disabled="isEdit" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色描述" prop="desc">
        <el-input v-model="form.desc" placeholder="请输入角色描述" />
      </el-form-item>
      <el-form-item label="菜单权限" prop="permission">
        <el-tree
          :data="treeData"
          ref="treeRef"
          node-key="id"
          :default-checked-keys="defaultChecked"
          show-checkbox
          :props="defaultProps"
          @check="handleCheckChange"
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleColse">返回</el-button>
        <el-button type="primary" @click="onSubmit"> 提交 </el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup>
import useTree from "../hooks/useTree";
import useRoleDialog from "../hooks/useRoleDialog";
import { onMounted } from "vue";

const { formRef, form, dialogVisible, isEdit, title, openDialog, onSubmit, closeDialog } = useRoleDialog();
const { treeData, treeRef, defaultChecked, defaultProps, resetChecked, getRoleTreeSelect } = useTree();
const handleCheckChange = () => {
  const list = treeRef.value.getCheckedNodes();
  form.permission = list.map(item => item.id);
  console.log(form.permission);
};
const handleColse = () => {
  closeDialog();
  resetChecked();
};
onMounted(() => {
  form.permission = defaultChecked.value;
});
const handleOpenDialog = async ({ data, isEdit }) => {
  if (isEdit) {
    await getRoleTreeSelect({ roleId: data.id });
  }
  openDialog({ data, isEdit });
};
defineExpose({ handleOpenDialog });
</script>
