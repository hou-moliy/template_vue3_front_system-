import { add, update } from "@/api/businessService";
import { ElMessage } from "element-plus";
import useForm from "@/hooks/useForm";
import { useRouter, useRoute } from "vue-router";
import { TabsStore } from "@/stores/modules/tabs";

import { KeepAliveStore } from "@/stores/modules/keepAlive";

const useBusiness = (initialValues, commonForm) => {
  const router = useRouter();
  const route = useRoute();
  const oldRoute = { ...route };
  const { removeTabs } = TabsStore();
  const { removeKeepLiveName } = KeepAliveStore();
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
        removeTabs(oldRoute.fullPath);
        removeKeepLiveName(oldRoute.name);
        router.replace("/businessService/businessList");
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
        removeTabs(oldRoute.fullPath);
        removeKeepLiveName(oldRoute.name);
        router.replace("/businessService/businessList");
      } else {
        ElMessage.error("修改失败");
      }
      router.replace("businessService/businessList");
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
