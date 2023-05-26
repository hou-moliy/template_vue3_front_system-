import { ref, reactive, computed } from "vue";
import { ElMessage } from "element-plus";
import { addRole, updateRole } from "@/api/role";
const useRoleDialog = () => {
  const formRef = ref(null);
  const form = reactive({
    roleName: "",
    roleDesc: "",
    menuIds: []
  });
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
        isEdit.value ? handleAdd() : handleUpdate();
        closeDialog();
      } else {
        return false;
      }
    });
  };

  const handleUpdate = () => {
    updateRole(form).then(res => {
      if (res.code == "0000") {
        ElMessage.success("修改成功");
        closeDialog();
      }
    });
  };
  const handleAdd = () => {
    addRole(form).then(res => {
      if (res.code == "0000") {
        ElMessage.success("新增成功");
        closeDialog();
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
