<template>
  <el-dialog v-model="dialogVisible" title="审批操作" width="500px" draggable>
    <el-form :model="auditForm" ref="auditFormRef">
      <el-form-item label="审批结果">
        <el-select v-model="auditForm.result">
          <el-option label="通过" :value="1" />
          <el-option label="不通过" :value="0" />
        </el-select>
      </el-form-item>
      <template v-if="auditForm.type === '1'">
        <el-form-item label="客户经理">
          <el-select v-model="auditForm.manager" placeholder="Activity zone">
            <el-option label="客户经理1" value="shanghai" />
            <el-option label="客户经理1" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="渠道商">
          <el-select v-model="auditForm.channel" placeholder="Activity zone">
            <el-option label="渠道商1" value="shanghai" />
            <el-option label="渠道商1" value="beijing" />
          </el-select>
        </el-form-item>
      </template>

      <el-form-item label="审批不通过原因">
        <el-input v-model="auditForm.reason" placeholder="请输入审核不通过的原因" />
      </el-form-item>
      <el-form-item>
        <el-button @click="resetForm(auditFormRef)">取消</el-button>
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
const dialogVisible = ref(false);
const auditFormRef = ref(null);
// openDialog
const openDialog = e => {
  auditForm.result = e.info;
  auditForm.type = e.type;
  dialogVisible.value = true;
};

const auditForm = reactive({
  result: "",
  channel: "",
  reason: "",
  manager: ""
});

const onSubmit = () => {};
const resetForm = formEl => {
  if (!formEl) return;
  formEl.resetFields();
  dialogVisible.value = false;
};

defineExpose({ openDialog });
</script>
