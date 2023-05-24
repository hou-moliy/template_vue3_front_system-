<template>
  <div class="upload_wrap">
    <el-upload
      v-if="!props.isDisableUpload"
      class="upload"
      ref="uploadRef"
      :file-list="waitFileList"
      :multiple="props.isMultiple"
      :limit="props.limitNum"
      :accept="props.acceptType"
      :auto-upload="false"
      :show-file-list="false"
      :disabled="props.isDisableUpload"
      :on-change="handleChange"
    >
      <div class="el-upload__text">
        <el-icon><Upload /></el-icon>
        <span>上传文件</span>
      </div>
      <div @click.stop="() => {}"><slot name="default"></slot></div>
    </el-upload>
    <div class="template_list">
      <div class="template" v-for="(item, index) in waitFileList" :key="index">
        <span>
          <el-icon><Link /></el-icon>
        </span>
        <span class="documentName">{{ item.name }}</span>
        <span v-if="!props.isDisableUpload">
          <el-icon color="#000000a6" size="16" @click="removeFile(item)"><Close /></el-icon>
        </span>
        <span v-if="isDownLoad" style="paddingleft: 5px">
          <el-icon @click="handleDownLoad(item)"><Download /></el-icon>
        </span>
      </div>
    </div>
    <span class="tips" v-if="!props.isDisableUpload">支持{{ acceptTypeDesc }}；文件大小不能超过{{ props.maxFileSize }}M</span>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue";
import { ElLoading, ElMessage } from "element-plus";
import { uploadIdsFile } from "@/api/upload";
import { Close } from "@element-plus/icons-vue";
const emits = defineEmits(["fileSuccess", "fileRemove"]);
interface Props {
  acceptType?: string; // 上传文件类型
  acceptTypeDesc?: string; // 描述 - 上传文件类型
  isMultiple?: boolean; //   是否可批量上传
  limitNum?: number; // 允许上传文件的最大数量
  isDisableUpload?: boolean; // 是否禁用上传
  maxFileSize?: number; // 文件大小
  action?: string;
  fileList?: any; // 回显的文件
  isDownLoad?: boolean; // 是否可以下载
}
// 接收父组件传递过来的参数
const props = withDefaults(defineProps<Props>(), {
  acceptType: "", //.xls,.doc
  acceptTypeDesc: "doc/xls",
  isMultiple: true,
  limitNum: 10,
  isDisableUpload: false,
  maxFileSize: 10,
  action: "/activity/resource/uploadFile",
  fileList: [],
  isDownLoad: false
});
let waitFileList = ref<any[]>([]);

waitFileList.value = props.fileList;
waitFileList.value?.forEach((item: any) => {
  item.name = item.original;
});

watch(
  () => props.fileList,
  () => {
    console.log("props.fileList====>", props.fileList);
    waitFileList.value = props.fileList;
    waitFileList.value?.forEach((item: any) => {
      item.name = item.original;
    });
  }
);

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
    return rawFile.type.indexOf(q) > -1;
  });
  // 用于校验是否符合上传条件
  const type = props.acceptTypeDesc.replace("/", ", ");
  if (ars.length < 1) {
    ElMessage.error(`仅支持格式为${type}的文件`);
    return false;
  } else if (rawFile.size / 1024 / 1024 > props.maxFileSize) {
    ElMessage.error(`文件大小不能超过${props.maxFileSize}MB!`);
    const arr = [...waitFileList.value];
    waitFileList.value = arr.filter((item: any) => {
      return item.uid != rawFile.uid;
    });
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
  let formData = new FormData();
  formData.append("file", rawFile);
  formData.append("fileType", "2");
  const loadingInstance = ElLoading.service({
    text: "正在上传",
    background: "rgba(0,0,0,.2)"
  });
  // 上传到服务器上面
  const requestURL: string = props.action;
  uploadIdsFile({ url: requestURL, data: formData })
    .then(async (res: any) => {
      console.log(res);
      if (res.code == 0) {
        loadingInstance.close();
        let obj = {
          ...res.data,
          name: res.data.original
        };
        emits("fileSuccess", obj);
      } else {
        loadingInstance.close();
        ElMessage.warning(`文件上传失败`);
      }
    })
    .catch(() => {
      loadingInstance.close();
      // ElMessage.warning(`文件上传失败`);
    });
};
</script>

<style lang="scss" scoped>
.upload_wrap {
  text-align: left;
  .upload {
    // min-width: 468px;
    padding-bottom: 10px;
  }
  .tips {
    display: block;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: rgba(0, 0, 0, 0.65);
  }
}

:deep().el-upload__text {
  width: 106px;
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
</style>