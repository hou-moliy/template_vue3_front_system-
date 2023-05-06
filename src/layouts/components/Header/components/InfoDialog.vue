<template>
  <el-dialog v-model="dialogVisible" title="个人信息" width="500px" draggable>
    <span>用户名：{{ authStore.name }}</span>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确认</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref } from "vue";
import { AuthStore } from "@/stores/modules/auth";
const dialogVisible = ref(false);
const authStore = AuthStore();
// openDialog
const openDialog = () => {
  dialogVisible.value = true;
};

defineExpose({ openDialog });
</script>
