import { ref, reactive, computed } from "vue";
import { ElMessage } from "element-plus";
import { addRole, updateRole } from "@/api/role";
import mittBus from "@/utils/mittBus";
import useForm from "@/hooks/useForm";

const useRoleDialog = () => {
  // 表单初始数据
  const initialValues = {
    roleName: "",
    roleDesc: "",
    menuIds: []
  };
  const { form, formRef, resetForm } = useForm(initialValues);

  const rules = reactive({
    roleName: [{ required: true, message: "请输入角色名称", trigger: "blur" }]
  });
  const dialogVisible = ref(false);
  const isEdit = ref(false);
  const title = computed(() => (isEdit.value ? "修改角色" : "新增角色"));
  const openDialog = ({ data, isEdit: edit }) => {
    if (edit) {
      Object.assign(form, data);
    }
    isEdit.value = edit;
    dialogVisible.value = true;
  };
  const onSubmit = () => {
    formRef?.value.validate(valid => {
      if (valid) {
        isEdit.value ? handleUpdate() : handleAdd();
        closeDialog();
      } else {
        return false;
      }
    });
  };

  const handleUpdate = () => {
    updateRole(form).then(() => {
      ElMessage.success("修改成功");
      mittBus.emit("refreshTable");
      closeDialog();
    });
  };
  const handleAdd = () => {
    addRole(form).then(() => {
      ElMessage.success("新增成功");
      mittBus.emit("refreshTable");
      closeDialog();
    });
  };

  const closeDialog = () => {
    resetForm();
    dialogVisible.value = false;
  };

  return {
    formRef,
    form,
    rules,
    dialogVisible,
    isEdit,
    title,
    openDialog,
    onSubmit,
    closeDialog
  };
};
export default useRoleDialog;
