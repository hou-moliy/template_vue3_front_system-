<template>
  <div class="upload_wrap">
    <el-upload
      v-if="!isDisableUpload"
      :class="{ upload: fileList.length }"
      ref="uploadRef"
      :file-list="waitFileList"
      :multiple="isMultiple"
      :limit="limitNum"
      :accept="acceptType"
      :auto-upload="false"
      :show-file-list="listType != listTypeEnum.text"
      :disabled="isDisableUpload"
      :on-change="handleChange"
      :on-exceed="handleExceed"
      :on-remove="removeFile"
      :on-preview="handlePreview"
      :listType="listType"
    >
      <slot name="icon">
        <div class="el-upload__text" v-if="listType == listTypeEnum.text">
          <el-icon><Upload /></el-icon>
          <span>{{ btnText }}</span>
        </div>
        <div v-else-if="listType == listTypeEnum.pictureCard">
          <el-icon><Plus /></el-icon>
        </div>
        <div v-else>
          <el-button type="primary">点击上传</el-button>
        </div>
      </slot>
      <!-- 自定义内容，例如有些页面支持示例文件下载 -->
      <div @click.stop="() => {}"><slot name="default"></slot></div>
    </el-upload>
    <!-- 文件列表展示 -->
    <div class="template_list" v-if="listType == listTypeEnum.text && fileList.length">
      <div class="template" v-for="(item, index) in waitFileList" :key="index">
        <span>
          <el-icon><Link /></el-icon>
        </span>
        <span class="documentName">{{ item.name }}</span>
        <span v-if="!props.isDisableUpload">
          <el-icon color="#000000a6" size="16" @click="removeFile(item)"><Close /></el-icon>
        </span>
        <span v-if="isDownLoad" class="downLoad">
          <el-icon @click="handleDownLoad(item)"><Download /></el-icon>
        </span>
      </div>
    </div>
    <!-- 文件类型和大小支持提示 -->
    <span class="tips" v-if="!props.isDisableUpload && props.acceptTypeDesc"
      >支持{{ acceptTypeDesc }}；文件大小不能超过{{ props.maxFileSize }}M</span
    >
    <!-- 图片放大查看 -->
    <el-dialog v-model="dialogVisible" title="图片预览">
      <img w-full :src="dialogImageUrl" alt="预览图片" />
    </el-dialog>
  </div>
</template>
<script lang="ts" setup>
import { ref, watch, toRefs } from "vue";
import { ElLoading, ElMessage } from "element-plus";
import { uploadIdsFile } from "@/api/upload";
import { Close } from "@element-plus/icons-vue";
const emits = defineEmits(["fileSuccess", "fileRemove"]);
// @ts-expect-error
import { listTypeEnum } from "@/types/upload.d.ts";
interface Props {
  acceptType?: string; // 上传文件类型
  acceptTypeDesc?: string; // 描述 - 上传文件类型,需要用/分割，用来校验类型
  isMultiple?: boolean; //   是否可批量上传
  limitNum?: number; // 允许上传文件的最大数量
  isDisableUpload?: boolean; // 是否禁用上传
  maxFileSize?: number; // 文件大小
  action?: string;
  fileList?: any; // 回显的文件
  isDownLoad?: boolean; // 是否可以下载
  btnText?: string; // 按钮文字
  listType?: listTypeEnum; // 文件列表的类型
}
// 接收父组件传递过来的参数
const props = withDefaults(defineProps<Props>(), {
  acceptType: ".xls,.doc", //
  acceptTypeDesc: "",
  isMultiple: false,
  limitNum: 1,
  isDisableUpload: false,
  maxFileSize: 10,
  action: "",
  fileList: [],
  isDownLoad: false,
  btnText: "上传文件",
  listType: listTypeEnum.text
});

let waitFileList = ref<any[]>([]);
const { fileList } = toRefs(props);
waitFileList.value = fileList.value;
waitFileList.value?.forEach((item: any) => {
  item.name = item.original || item.name;
});

watch(
  () => props.fileList,
  () => {
    waitFileList.value = props.fileList;
    waitFileList.value?.forEach((item: any) => {
      item.name = item.original || item.name;
    });
  },
  {
    immediate: true,
    deep: true
  }
);
// 图片放大查看
const dialogVisible = ref(false);
const dialogImageUrl = ref("");
const handlePreview = async (file: any) => {
  dialogImageUrl.value = file.url || file.response.url;
  dialogVisible.value = true;
};

// 文件变化Handle 这里监听上传文件的变化是一个一个接收到变化的，所以文件也是一个一个上传到服务器上面的
const handleChange = async (file: any, fileList: any[]) => {
  // 防止多次执行change
  const rawFile = file.raw;
  const list = props.acceptTypeDesc.split("/");
  let acceptTypeList = list.map((its: string) => {
    return getType(its);
  });
  // 如果要检索的字符串值没有出现，则该方法返回 -1
  const ars = acceptTypeList.filter((q: string) => {
    if (!rawFile.type) {
      // 取不到type的时候，用name来判断
      const type = rawFile.name.split(".")[1];
      return type == q;
    }
    return rawFile.type.indexOf(q) > -1;
  });

  // 用于校验是否符合上传条件
  const type = props.acceptTypeDesc.replaceAll("/", ",");
  if (ars.length < 1) {
    ElMessage.error(`仅支持格式为${type}的文件`);
    removeFile(rawFile);
    return false;
  } else if (rawFile.size / 1024 / 1024 > props.maxFileSize) {
    ElMessage.error(`文件大小不能超过${props.maxFileSize}MB!`);
    removeFile(rawFile);
    return false;
  } else {
    handleUpload(rawFile);
  }
  return true;
};

// 校验上传文件格式
const getType = (acceptType: string) => {
  let val = "";
  switch (acceptType) {
    case "xls":
      val = "excel";
      break;
    case "doc":
      val = "word";
      break;
    case "pdf":
      val = "pdf";
      break;
    case "zip":
      val = "zip";
      break;
    case "tar":
      val = "tar";
      break;
    case "rar":
      val = "rar";
      break;
    case "xlsx":
      val = "sheet";
      break;
    case "pptx":
      val = "presentation";
      break;
    case "docx":
      val = "document";
      break;
    case "text":
      val = "text";
      break;
    case "txt":
      val = "txt";
      break;
  }
  return val;
};

// 移除文件
const removeFile = (file: any) => {
  const arr: any[] = [...waitFileList.value];
  waitFileList.value = arr.filter((its: any) => {
    return its.id != file.id;
  });
  emits("fileRemove", waitFileList.value);
};

// 点击下载
const handleDownLoad = (row: { ossFile: string }) => {
  const str = window.location.href.split("#")[0];
  const herf = str.slice(0, str.length - 1);
  window.location.href = herf + row.ossFile;
};

// 上传方法
const handleUpload = (rawFile: any) => {
  // 上传到服务器上面
  const requestURL: string = props.action;
  if (!requestURL) {
    // 自定义上传
    emits("fileSuccess", rawFile);
    return;
  }
  // 直接上传
  let formData = new FormData();
  formData.append("file", rawFile);
  formData.append("fileType", "2");
  const loadingInstance = ElLoading.service({
    text: "正在上传",
    background: "rgba(0,0,0,.2)"
  });
  uploadIdsFile({ url: requestURL, data: formData })
    .then(async (res: any) => {
      loadingInstance.close();
      let obj = {};
      if (res.data) {
        obj = {
          ...res.data,
          name: res.data.original
        };
      }
      ElMessage.success("上传成功");
      emits("fileSuccess", obj);
    })
    .catch(err => {
      loadingInstance.close();
      ElMessage.warning(`文件上传失败`);
    });
};

// 超出限制执行的方法
const handleExceed = (files: any, fileList: any[]) => {
  ElMessage.warning(`当前限制选择 ${props.limitNum} 个文件`);
};
</script>

<style lang="scss" scoped>
.upload_wrap {
  text-align: left;
  .upload {
    padding-bottom: 10px;
  }
  .tips {
    display: block;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
    margin-top: 10px;
  }
}

:deep().el-upload__text {
  padding: 0px 5px;
  box-sizing: border-box;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid rgba(0, 0, 0, 0.15);
  border-radius: 5px;
  margin-right: 10px;
  img {
    display: block;
    width: 14px;
    height: 14px;
  }

  span {
    font-size: 14px;
    padding-left: 6px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
  }
}

.template_list {
  padding-bottom: 4px;
}
.template {
  display: flex;
  align-items: center;
  padding: 5px 0;
  span {
    line-height: 16px;
  }
  img {
    margin-right: 8px;
    width: 16px;
    height: 16px;
  }
  .documentName {
    margin-right: 12px;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
  }
}
.downLoad {
  padding-left: 5px;
}
</style>
<style lang="scss">
.el-dialog__body {
  display: flex;
  justify-content: center;
  height: 500px;
  overflow: scroll;
  img {
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
