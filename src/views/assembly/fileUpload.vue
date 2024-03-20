<template>
  <div>
    <h3>自定义文件上传</h3>
    <upload-file
      :fileList="fileList"
      acceptType=".xls,.xlsx"
      acceptTypeDesc="xls/xlsx"
      :maxFileSize="10"
      @file-success="handleImport"
      btnText="批量新增"
    >
      <el-link type="primary" @click="handleTemp">模板下载</el-link>
    </upload-file>
    <el-progress
      v-if="percentNum"
      :percentage="percentNum"
      :status="`${percentNum === 100 ? 'success' : ''}`"
      :indeterminate="true"
    />
  </div>
</template>
<script setup>
import { ref } from "vue";
import { handleDownload } from "@/hooks/useExport";
import { templateExport, templateImport, importPercent } from "@/api/upload";
const handleTemp = () => {
  // templateExport() 为导出模板接口
  handleDownload(templateExport(), "xlsx", "批量新增短号码模板").then(() => {
    ElMessage.success("模板下载成功");
  });
};
// 批量上传
let percentNum = ref(0);
let timer = null;
let fileList = ref([]);
const handleImport = fileRow => {
  fileList.value.push(fileRow);
  let formData = new FormData();
  formData.append("file", fileRow);
  templateImport(formData)
    .then(() => {
      ElMessage.success("导入中，请稍后");
      percentNum.value = 3;
      timer = setInterval(() => {
        getPercent();
      }, 1000);
    })
    .finally(() => {
      fileList.value = [];
    });
};
const getPercent = () => {
  importPercent().then(res => {
    percentNum.value = res.data;
    if (res.data == 100) {
      clearInterval(timer);
      percentNum.value = 0;
      getList();
      ElMessage.success("导入成功");
    }
  });
};
</script>
