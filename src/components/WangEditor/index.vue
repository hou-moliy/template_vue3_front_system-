<template>
  <div style="border: 1px solid #ccc; z-index: 99999">
    <!-- 工具栏 -->
    <Toolbar :editor="editorRef" :defaultConfig="toolbarConfig" style="border-bottom: 1px solid #ccc" :mode="mode" />
    <!-- 编辑器 -->
    <Editor
      :defaultConfig="editorConfig"
      v-model="defaultHtml"
      @on-change="handleChange"
      style="height: 500px; overflow-y: hidden"
      :mode="mode"
      @on-created="handleCreated"
    />
  </div>
</template>

<script setup>
import { onBeforeUnmount, shallowRef, reactive, toRefs } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";
import { uploadImageFile, uploadVideoFile } from "@/api/upload";
import { ElLoading, ElMessage } from "element-plus";

const props = defineProps({
  modelValue: {
    type: [String],
    default: ""
  },
  // 图片上传大小限制,单位b
  uploadImgSize: {
    type: [Number],
    default: 5 * 1024 * 1024
  },
  uploadVideoSize: {
    type: [Number],
    default: 1024 * 1024 * 1024
  },
  // 图片上传数量限制
  uploadImgNumber: {
    type: [Number],
    default: 1
  },
  uploadVideoNumber: {
    type: [Number],
    default: 1
  },
  // 是否只读
  readonly: {
    type: [Boolean],
    default: false
  }
});

const emit = defineEmits(["update:modelValue"]);

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef();

const state = reactive({
  toolbarConfig: {},
  editorConfig: {
    placeholder: "请输入内容...",
    MENU_CONF: {
      uploadImage: {
        // 自定义上传
        async customUpload(file, insertFn) {
          // 校验图片大小
          if (file.size > props.uploadImgSize) {
            ElMessage.error(`图片大小不能超过${props.uploadImgSize / 1024 / 1024}M`);
            return;
          }
          // 校验图片类型
          if (!/image\/\w+/.test(file.type)) {
            ElMessage.error("请上传图片");
            return;
          }
          // 校验上传数量
          const editor = editorRef.value;
          const imgList = editor.getHtml().match(/<img.*?(?:>|\/>)/gi) || [];
          if (imgList.length >= props.uploadImgNumber) {
            ElMessage.error(`最多上传${props.uploadImgNumber}张图片`);
            return;
          }
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
            // url: "/activity/commonV2/uploadImg",
            url: "/material/upload",
            data: formData
          })
            .then(res => {
              loading.close();
              console.log(res, "res");
              if (res.code === 200) {
                const url = res?.data?.materialUrl || "";
                insertFn(url, "图片", url);
              } else {
                ElMessage.error(`图片上传失败：${res.msg}`);
              }
            })
            .catch(err => {
              loading.close();
              ElMessage.error(`图片上传失败：${err}`);
            });
        }
      },
      uploadVideo: {
        async customUpload(file, insertFn) {
          //  检查文件大小
          if (file.size > props.uploadVideoSize) {
            ElMessage.error(`视频大小不能超过${props.uploadVideoSize / 1024 / 1024}M`);
            return;
          }
          // 检查文件类型
          if (!/video\/\w+/.test(file.type)) {
            ElMessage.error("请上传视频");
            return;
          }
          // 检查上传数量
          const editor = editorRef.value;
          const videoList = editor.getHtml().match(/<video.*?(?:>|\/>)/gi) || [];
          if (videoList.length >= props.uploadVideoNumber) {
            ElMessage.error(`最多上传${props.uploadVideoNumber}个视频`);
            return;
          }
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
          uploadVideoFile({
            url: "/material/upload",
            data: formData
          })
            .then(res => {
              loading.close();
              console.log(res, "res");
              if (res.code === 200) {
                const url = res?.data?.materialUrl || "";
                const poster = res?.data?.poster || "";
                insertFn(url, poster);
              } else {
                ElMessage.error(`视频上传失败：${res.msg}`);
              }
            })
            .catch(err => {
              loading.close();
              ElMessage.error(`视频上传失败：${err}`);
            });
        }
      }
    }
  },
  defaultHtml: props.modelValue,
  mode: "default"
});
const { toolbarConfig, editorConfig, defaultHtml, mode } = toRefs(state);

const handleCreated = editor => {
  editorRef.value = editor; // 记录 editor 实例，重要！
};

function handleChange(editor) {
  emit("update:modelValue", editor.getHtml());
}

// 组件销毁时，也及时销毁编辑器
onBeforeUnmount(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
