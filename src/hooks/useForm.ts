import { reactive, ref, Ref } from "vue";
import type { FormInstance } from "element-plus";
import { ElMessage } from "element-plus";
interface FormValues {
  [key: string]: any;
}

interface FormHooks {
  form: FormValues;
  formRef: Ref<FormInstance | null>;
  resetForm: () => void;
  submitForm: () => void;
}

const useForm = (initialValues: FormValues): FormHooks => {
  let form = reactive<FormValues>(JSON.parse(JSON.stringify(initialValues))); // 深拷贝
  const formRef = ref<FormInstance | null>(null);
  const resetForm = () => {
    Object.assign(form, initialValues);
    // formRef.value?.resetFields(); // 不设置props的情况下，resetFields不能重置
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
          ElMessage.error("请检查表单是否填写正确");
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
};
export default useForm;
