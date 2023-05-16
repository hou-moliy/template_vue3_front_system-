import { reactive, ref, Ref } from "vue";
import type { FormInstance } from "element-plus";
interface FormValues {
  [key: string]: any;
}

interface FormHooks {
  form: FormValues;
  formRef: Ref<FormInstance | null>;
  resetForm: () => void;
  submitForm: () => void;
}

export function useForm(initialValues: FormValues): FormHooks {
  let form = reactive<FormValues>({ ...initialValues });
  const formRef = ref<FormInstance | null>(null);
  const resetForm = () => {
    // Object.assign(form, initialValues);
    formRef.value?.resetFields();
    return Promise.resolve();
  };

  const submitForm = () => {
    console.log(initialValues, "initialValues");
    return new Promise((resolve, reject) => {
      formRef.value?.validate((valid: boolean) => {
        if (valid) {
          resolve(true);
        } else {
          // 表单校验失败
          reject(false);
        }
      });
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
