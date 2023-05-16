import { Ref } from "vue";
import type { FormInstance } from "element-plus";
import { isPassword, isEmail, isPhone } from "@/utils/validate";

export default function useValidator(ruleFormRef: Ref<FormInstance>, ruleForm: any) {
  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback(new Error("请输入密码!"));
    } else {
      if (ruleForm.password !== "") {
        if (!ruleFormRef?.value) return;
        ruleFormRef?.value?.validateField("password", () => {
          if (!isPassword(ruleForm.password)) {
            callback(new Error("密码格式不正确"));
          } else {
            callback();
          }
        });
      }
    }
  };
  const validatePass2 = (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback(new Error("请再次输入密码!"));
    } else if (value !== ruleForm.password) {
      callback(new Error("两次密码不一致!"));
    } else {
      callback();
    }
  };
  const validateEmail = (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback(new Error("请输入邮箱"));
    } else {
      if (!ruleFormRef?.value) return;
      ruleFormRef?.value?.validateField("email", () => {
        if (!isEmail(value)) {
          callback(new Error("邮箱格式不正确"));
        } else {
          callback();
        }
      });
    }
  };

  const validatePhone = (rule: any, value: any, callback: any) => {
    if (value === "") {
      callback(new Error("请输入手机号"));
    } else {
      if (!ruleFormRef?.value) return;
      ruleFormRef?.value?.validateField("phone", () => {
        if (!isPhone(value)) {
          callback(new Error("手机号格式不正确"));
        } else {
          callback();
        }
      });
    }
  };
  return {
    validateEmail,
    validatePhone,
    validatePass2,
    validatePass
  };
}
