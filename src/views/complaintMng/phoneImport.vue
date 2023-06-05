<template>
  <!-- 表单 -->
  <el-form :inline="true" :model="form" ref="formRef">
    <el-form-item label="企业客户" prop="userId">
      <model-select v-model="form.userId" dictType="businessUser" placeholder="请选择企业客户" />
    </el-form-item>
    <el-form-item label="分公司" prop="branchId">
      <model-select v-model="form.branchId" dictType="businessBranch" placeholder="请选择分公司" />
    </el-form-item>
    <el-form-item label="客户经理" prop="managerId">
      <model-select v-model="form.managerId" dictType="businessManager" placeholder="请选择客户经理" />
    </el-form-item>
    <el-form-item label="被举报号码" prop="reportedNumber">
      <el-input v-model="form.reportedNumber" placeholder="请输入被举报号码" />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="getList">搜索</el-button>
      <el-button @click="handleReset">重置</el-button>
      <el-button type="primary" @click="handleExport" :disabled="!tableData.length">导出</el-button>
      <div style="margin: 0px 15px">
        <el-upload
          class="upload-demo"
          :action="`${baseURL}/complaintManager/importComplaintFile`"
          :headers="headers"
          :show-file-list="false"
          :on-success="handleSuccess"
          :on-progress="handleProgress"
          :on-error="handleError"
          accept=".xls,.xlsx"
        >
          <el-button type="primary">上传投诉工单文件</el-button>
        </el-upload>
        <el-progress
          style="width: 100%"
          v-if="percentage"
          :percentage="percentage"
          :status="percentage == 100 ? 'success' : ''"
        />
      </div>

      <el-button type="primary" :disabled="!tableData.length" @click="handleEmail">邮件通知</el-button>
    </el-form-item>
  </el-form>
  <!-- 表格 -->
  <el-table border :data="tableData" v-load="isLoading">
    <el-table-column prop="id" label="ID" />
    <el-table-column prop="reportResource" label="举报来源" />
    <el-table-column prop="reportNumber" label="举报号码" />
    <el-table-column prop="reportedNumber" label="被举报号码" />
    <el-table-column prop="issuanceDate" label="下发日期" />
    <el-table-column prop="reportTime" label="投诉日期">
      <template #default="{ row }">
        {{ $dayjs(row.reportTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
    <el-table-column prop="displayCallingNumber" label="显示主叫号码" />
    <el-table-column prop="userName" label="企业客户">
      <template #default="{ row }">
        <el-button type="primary" link @click="handleNav(row.userId, cmpyInfoRef)">{{ row.userName }}</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="branchName" label="归属分公司">
      <template #default="{ row }">
        <el-button type="primary" link @click="handleNav(row.branchId, branchDetailRef)">{{ row.branchName }}</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="bindingType" label="业务类型" />
    <el-table-column prop="numberType" label="电话类型" />
    <el-table-column prop="calledNumber" label="被叫号码" />
    <el-table-column prop="incomingCallTime" label="来电时间">
      <template #default="{ row }">
        {{ $dayjs(row.reportTime).format("YYYY-MM-DD HH:mm:ss") }}
      </template>
    </el-table-column>
    <el-table-column prop="callDuration" label="通话时长(秒)" />
    <el-table-column prop="calledBusiness" label="被叫企业" />
    <el-table-column prop="badType" label="不良类型" />
    <el-table-column prop="complaintContent" label="举报内容">
      <template #default="{ row }">
        <el-popover placement="top-start" trigger="hover" :content="row.complaintContent">
          <template #reference>
            <el-button type="primary" text>查看</el-button>
          </template>
        </el-popover>
      </template>
    </el-table-column>
    <el-table-column prop="managerName" label="客户经理">
      <template #default="{ row }">
        <el-button type="primary" link @click="handleNav(row.managerId, customInfoRef)">{{ row.managerName }}</el-button>
      </template>
    </el-table-column>
    <el-table-column prop="managerPhoneNumber" label="客户经理电话" />
  </el-table>
  <Pagination v-show="total > 0" :total="total" v-model:page="form.pageNum" v-model:limit="form.pageSize" @pagination="getList" />
  <!-- 企业客户账户详情 -->
  <cmpyInfoDialog ref="cmpyInfoRef" />
  <!-- 分公司账户详情 -->
  <branchDetailDialog append-to-body ref="branchDetailRef" />
  <!-- 客户经理账户详情 -->
  <customInfoDialog append-to-body ref="customInfoRef" />
</template>
<script setup>
import { ref, onMounted } from "vue";
import { getToken } from "@/utils/auth";
import useForm from "@/hooks/useForm";
import cmpyInfoDialog from "@/views/businessMng/components/cmpyInfoDialog.vue";
import branchDetailDialog from "@/views/businessMng/components/branchDetailDialog.vue";
import customInfoDialog from "@/views/businessMng/components/customInfoDialog.vue";
import { emailNotifyComplaints, listComplaints, exportComplaints } from "@/api/complaint";
import { ElMessage } from "element-plus";
import { exportFile } from "@/hooks/useExport";
import { useLoading } from "@/hooks/useLoading";
const { isLoading, loadingWrapper } = useLoading();
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";
const headers = {
  Authorization: getToken()
};
const cmpyInfoRef = ref();
const branchDetailRef = ref();
const customInfoRef = ref();
const initialValues = {
  userId: "",
  branchId: "",
  managerId: "",
  reportedNumber: "",
  pageNum: 1,
  pageSize: 10
};
const { form, formRef, resetForm } = useForm(initialValues);

const handleNav = (id, formRefEl) => {
  formRefEl?.openDialog({ id, isEdit: false });
};
const tableData = ref([]);
const total = ref(0);
const getList = () => {
  loadingWrapper(
    listComplaints(form).then(res => {
      if (res.code == "0000") {
        tableData.value = res.rows;
        total.value = res.total;
      }
    })
  );
};
// 导出
const handleExport = () => {
  exportComplaints(form).then(res => {
    if (res.data.size == 0) {
      ElMessage.warning("暂无数据");
      return;
    }
    exportFile(res.data, "xlsx", "投诉工单文件");
  });
};
// 邮件通知
const handleEmail = () => {
  emailNotifyComplaints(form).then(res => {
    if (res.code == "0000") {
      ElMessage.success("邮件通知成功");
    }
  });
};
// 上传回调
const handleSuccess = res => {
  if (res.code == "0000") {
    ElMessage.success("上传成功");
    percentage.value = 0;
    getList();
  } else {
    ElMessage.error(res.msg);
  }
};
// 上传中回调
const percentage = ref(0); // 上传进度
const handleProgress = ({ percent }) => {
  percentage.value = Math.floor(percent);
};
// 上传失败回调
const handleError = err => {
  percentage.value = 0;
  ElMessage.error("上传失败");
  console.log(err);
};
// 重置
const handleReset = () => {
  resetForm();
  getList();
};
onMounted(() => {
  getList();
});
</script>
