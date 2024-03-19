<template>
  <el-dialog v-model="dialogVisible" :title="title" @close="handleColse">
    <el-form :model="form" ref="formRef" label-width="120px" label-position="left" :rules="rules">
      <el-form-item label="角色名称" prop="roleName">
        <el-input v-model="form.roleName" :disabled="isEdit" placeholder="请输入角色名称" />
      </el-form-item>
      <el-form-item label="角色描述" prop="roleDesc">
        <el-input v-model="form.roleDesc" placeholder="请输入角色描述" />
      </el-form-item>
      <el-form-item label="菜单权限" prop="menuIds">
        <el-tree
          :data="treeData"
          ref="treeRef"
          node-key="id"
          show-checkbox
          :props="defaultProps"
          @check="handleCheckChange"
          empty-text="暂无数据"
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

const { formRef, rules, form, dialogVisible, isEdit, title, openDialog, onSubmit, closeDialog } = useRoleDialog();
const { treeData, treeRef, defaultChecked, defaultProps, resetChecked, getRoleTreeSelect } = useTree();
const handleCheckChange = () => {
  const list = treeRef.value.getCheckedNodes(false, true);
  form.menuIds = list.map(item => item.id);
};
const handleColse = () => {
  closeDialog();
  resetChecked();
};
onMounted(() => {
  form.menuIds = defaultChecked.value;
});
const handleOpenDialog = async ({ data, isEdit }) => {
  openDialog({ data, isEdit });
  if (isEdit) {
    await getRoleTreeSelect({ roleId: data.roleId });
  }
};
defineExpose({ handleOpenDialog });
</script>
<style lang="scss" scoped>
.el-tree {
  width: 100%;
}
</style>
