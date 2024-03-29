import { Ref } from "vue";
import type { FormInstance } from "element-plus";
import { isPassword, isEmail, isPhone, isCardId, isLoginName, isRealName, isVerCode } from "@/utils/validate";
export default function useValidator(ruleFormRef: Ref<FormInstance>, ruleForm: any) {
  const validatePass = (rule: any, value: any, callback: any, required = true) => {
    if (required && value === "") {
      callback(new Error("请输入密码!"));
    } else {
      if (ruleForm.password !== "") {
        if (!ruleFormRef?.value) return;
        ruleFormRef?.value?.validateField(rule.field, () => {
          if (!isPassword(ruleForm.password)) {
            callback(new Error("密码格式不正确"));
          } else {
            callback();
          }
        });
      }
    }
  };
  const validatePass2 = (rule: any, value: any, callback: any, required = true) => {
    if (required && value === "") {
      callback(new Error("请再次输入密码!"));
    } else if (value !== ruleForm.password) {
      callback(new Error("两次密码不一致!"));
    } else {
      callback();
    }
  };
  const validateEmail = (rule: any, value: any, callback: any, required = true) => {
    if (required && value === "") {
      callback(new Error("请输入邮箱"));
    } else {
      if (!ruleFormRef?.value) return;
      ruleFormRef?.value?.validateField(rule.field, () => {
        if (!isEmail(value)) {
          callback(new Error("邮箱格式不正确"));
        } else {
          callback();
        }
      });
    }
  };

  const validatePhone = (rule: any, value: any, callback: any, required = true) => {
    if (required && value === "") {
      callback(new Error("请输入手机号"));
    } else {
      if (!ruleFormRef?.value) return;
      ruleFormRef?.value?.validateField(rule.field, () => {
        if (!isPhone(value)) {
          callback(new Error("手机号格式不正确"));
        } else {
          callback();
        }
      });
    }
  };

  const validateCardId = (rule: any, value: any, callback: any) => {
    if (!ruleFormRef?.value) return;
    ruleFormRef?.value?.validateField(rule.field, () => {
      if (!isCardId(value)) {
        callback(new Error("身份证格式不正确"));
      } else {
        callback();
      }
    });
  };

  const validateLoginName = (rule: any, value: any, callback: any) => {
    if (!ruleFormRef?.value) return;
    ruleFormRef?.value?.validateField(rule.field, () => {
      if (!isLoginName(value)) {
        callback(new Error("用户名格式不正确"));
      } else {
        callback();
      }
    });
  };
  const validateRealName = (rule: any, value: any, callback: any) => {
    if (!ruleFormRef?.value) return;
    ruleFormRef?.value?.validateField(rule.field, () => {
      if (!isRealName(value)) {
        callback(new Error("姓名格式不正确"));
      } else {
        callback();
      }
    });
  };

  const validateVerCode = (rule: any, value: any, callback: any) => {
    if (!ruleFormRef?.value) return;
    ruleFormRef?.value?.validateField(rule.field, () => {
      if (!isVerCode(value)) {
        callback(new Error("验证码格式不正确"));
      } else {
        callback();
      }
    });
  };
  return {
    validateEmail,
    validatePhone,
    validatePass2,
    validatePass,
    validateCardId,
    validateLoginName,
    validateRealName,
    validateVerCode
  };
}
