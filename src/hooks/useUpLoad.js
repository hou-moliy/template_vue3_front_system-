import { ref } from "vue";
const useUpload = form => {
  const fileList = ref([]);
  const fileRemove = list => {
    console.log(list, "list");
    fileList.value = list;
    console.log(fileList.value, "fileList.value");
    form.file = null;
  };
  const fileSuccess = file => {
    console.log(file, "file");
    fileList.value.push(file);
    form.file = file;
  };

  return {
    fileList,
    fileSuccess,
    fileRemove
  };
};
export default useUpload;
