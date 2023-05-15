import { reactive, ref, Ref } from "vue";
import type { FormInstance } from "element-plus";
interface FormValues {
  [key: string]: any;
}

interface FormHooks {
  form: FormValues;
  formRef: Ref<FormInstance | null>;
  resetForm: (successCallback?: () => void) => void;
  submitForm: (successCallback?: () => void, errorCallback?: () => void) => void;
}

export function useForm (initialValues: FormValues): FormHooks {
  let form = reactive<FormValues>(initialValues);
  const formRef = ref<FormInstance | null>(null);

  // const resetForm = (successCallback?: () => void) => {
  //   formRef.value?.resetFields();
  //   if (typeof successCallback === "function") {
  //     successCallback();
  //   }
  // };
  const resetForm = (successCallback?: () => void) => {
    formRef.value?.clearValidate();
    form = reactive<FormValues>(initialValues);
    if (typeof successCallback === "function") {
      successCallback();
    }
  };

  const submitForm = (successCallback?: () => void, errorCallback?: () => void) => {
    formRef.value?.validate((valid: boolean) => {
      if (valid) {
        // 执行表单提交操作

        if (typeof successCallback === "function") {
          successCallback();
        }
      } else {
        // 表单校验失败

        if (typeof errorCallback === "function") {
          errorCallback();
        }
      }
    });
  };

  return {
    form,
    formRef,
    resetForm,
    submitForm
  };
}
export default useForm;
