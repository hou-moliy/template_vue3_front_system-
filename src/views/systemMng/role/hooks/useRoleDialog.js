import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
const useRoleDialog = () => {
  const formRef = ref(null);
  const form = reactive({
    role: "",
    desc: "",
    permission: []
  });
  const dialogVisible = ref(false);
  const isEdit = ref(false);
  const title = ref("");
  const openDialog = ({ data, isEdit: edit }) => {
    console.log(data);
    isEdit.value = edit;
    dialogVisible.value = true;
    title.value = isEdit.value ? "修改角色" : "新增角色";
  };

  const onSubmit = () => {
    formRef?.value.validate(valid => {
      if (valid) {
        console.log(form, "form");
        ElMessage.success(isEdit.value ? "提交成功" : "修改成功");
        closeDialog();
      } else {
        return false;
      }
    });
  };

  const closeDialog = () => {
    dialogVisible.value = false;
    formRef.value?.resetFields();
  };

  return {
    formRef,
    form,
    dialogVisible,
    isEdit,
    title,
    openDialog,
    onSubmit,
    closeDialog
  };
};
export default useRoleDialog;
