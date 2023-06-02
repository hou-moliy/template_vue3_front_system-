import { add, update } from "@/api/businessService";
import { ElMessage } from "element-plus";
import useForm from "@/hooks/useForm";
const useBusiness = (initialValues, commonForm) => {
  const { form, formRef, resetForm, submitForm } = useForm(initialValues);
  const onSubmit = isAdd => {
    console.log({ ...commonForm, ...form }, "提交");
    submitForm().then(() => {
      Object.assign(form, commonForm);
      if (isAdd) {
        handleAdd();
      } else {
        handleUpdate();
      }
      console.log({ ...commonForm, ...form }, "值");
    });
  };

  const handleAdd = data => {
    Object.assign(form, data);
    console.log("新增", form);
    add(form).then(res => {
      if (res.code == "0000") {
        ElMessage.success("新增成功");
      } else {
        ElMessage.error("新增失败");
      }
    });
  };

  const handleUpdate = data => {
    Object.assign(form, data);
    console.log("修改", form);
    update(form).then(res => {
      if (res.code === "0000") {
        ElMessage.success("修改成功");
      } else {
        ElMessage.error("修改失败");
      }
    });
  };
  return {
    onSubmit,
    form,
    formRef,
    resetForm,
    handleAdd,
    handleUpdate
  };
};
export default useBusiness;
