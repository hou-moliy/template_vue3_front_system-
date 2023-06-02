import { reactive, Ref } from "vue";
import type { FormRules, FormInstance } from "element-plus";
import { isPassword, isEmail, isPhone } from "@/utils/validate";

export default function useAccountRules(ruleFormRef: Ref<FormInstance>, ruleForm: any) {
  const validatePass = (rule: any, value: any, callback: any) => {
    if (value === "") {
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
      ruleFormRef?.value?.validateField(rule.field, () => {
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
      ruleFormRef?.value?.validateField(rule.field, () => {
        if (!isPhone(value)) {
          callback(new Error("手机号格式不正确"));
        } else {
          callback();
        }
      });
    }
  };

  const rules = reactive<FormRules>({
    loginName: [
      {
        required: true,
        message: "请输入账户名",
        trigger: "blur"
      }
    ],
    userName: [
      {
        required: true,
        message: "请输入姓名",
        trigger: "blur"
      }
    ],
    phoneNumber: [
      {
        required: true,
        validator: validatePhone,
        trigger: "blur"
      }
    ],
    email: [
      {
        required: true,
        validator: validateEmail,
        trigger: "blur"
      }
    ],
    password: [
      {
        validator: validatePass,
        trigger: "blur",
        required: true
      }
    ],
    password2: [
      {
        validator: validatePass2,
        trigger: "blur",
        required: true
      }
    ]
  });

  return {
    rules,
    validateEmail
  };
}
