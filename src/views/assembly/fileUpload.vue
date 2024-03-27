<template>
  <div class="box">
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
    <div>
      <h3>自定义图片上传</h3>
      <upload-file
        :fileList="imgList"
        acceptType=".jpg,.png,jpeg"
        acceptTypeDesc="jpg/png/jpeg"
        :maxFileSize="10"
        @file-success="handleSuccess('imgList', $event)"
        :listType="listTypeEnum.pictureCard"
      >
      </upload-file>
    </div>
    <div>
      <h3>自定义缩略图片上传</h3>
      <upload-file
        :fileList="picList"
        acceptType=".jpg,.png,jpeg"
        acceptTypeDesc="jpg/png/jpeg"
        :maxFileSize="10"
        @file-success="handleSuccess('picList', $event)"
        :listType="listTypeEnum.picture"
      >
      </upload-file>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { handleDownload } from "@/hooks/useExport";
import { templateExport, templateImport, importPercent, uploadImageFile } from "@/api/upload";
import { listTypeEnum } from "@/types/upload.d.ts";

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
// 自定义图片上传
const imgList = ref([]);
const picList = ref([]);
const handleSuccess = (listName, file) => {
  // file 转formData
  let formData = new FormData();
  formData.append("file", file);
  // 上传loading
  const loading = ElLoading.service({
    lock: true,
    text: "上传中...",
    spinner: "el-icon-loading",
    background: "rgba(0, 0, 0, 0.7)"
  });
  uploadImageFile({
    url: "/material/upload",
    data: formData
  })
    .then(res => {
      loading.close();
      const url = res?.data?.materialUrl || "";
      if (!url) {
        ElMessage.error("图片上传失败");
        return;
      }
      if (listName === "imgList") {
        imgList.value.push({
          url: url,
          name: file.name
        });
      } else {
        picList.value.push({
          url: url,
          name: file.name
        });
      }
    })
    .catch(err => {
      loading.close();
      ElMessage.error(`图片上传失败 catch：${err}`);
    });
};
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  gap: 50px;
}
</style>
