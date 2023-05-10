import { reactive, watch, ref } from "vue";

interface Rule {
  required: boolean;
  message: string;
  trigger: string;
}

type ValidatorFunc = (rule: Rule, value: any, callback: (error?: Error) => void, errorMessage: string) => void;

const validate: ValidatorFunc = (rule, value, callback, errorMessage) => {
  if (!value) {
    callback(new Error(errorMessage));
  } else {
    callback();
  }
};

const createValidator = (errorMsg: string): ValidatorFunc => {
  return (rule, value, callback) => {
    validate(rule, value, callback, errorMsg);
  };
};

type RuleItem = {
  validator: ValidatorFunc;
  trigger: string;
};

export default (formData: any) => {
  const commonRules = reactive({
    name: [{ required: true, message: "请输入标题", trigger: "blur" }],
    acceptType: [{ required: true, message: "请选择接入方式", trigger: "blur" }],
    businessType: [{ required: true, message: "请选择业务类型", trigger: "blur" }]
  });

  const privacyRules = reactive({
    cmpName: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
    province: [{ required: true, message: "请选择归属省份地市", trigger: "blur" }],
    recordType: [{ required: true, message: "请选择录音模式", trigger: "blur" }],
    start: [] as RuleItem[],
    ring: [] as RuleItem[],
    accept: [] as RuleItem[],
    end: [] as RuleItem[],
    forward: [] as RuleItem[],
    whiteList: [{ required: true, message: "请输入企业ip白名单列表", trigger: "blur" }]
  });
  // 监听 formData 的变化
  // watch 函数的第一个参数应该是一个有效的响应式对象或一个 getter 函数
  const formDataRef = ref(formData);
  watch(
    formDataRef,
    newFormData => {
      privacyRules.start = newFormData?.startOpen
        ? [{ validator: createValidator("请输入接收呼叫起始事件地址"), trigger: "blur" }]
        : [];
      privacyRules.ring = newFormData?.ringOpen
        ? [{ validator: createValidator("请输入接收呼叫振铃事件地址"), trigger: "blur" }]
        : [];
      privacyRules.accept = newFormData?.acceptOpen
        ? [{ validator: createValidator("请输入接收呼叫接听事件地址"), trigger: "blur" }]
        : [];
      privacyRules.end = newFormData?.endOpen
        ? [{ validator: createValidator("请输入接收呼叫结束事件地址"), trigger: "blur" }]
        : [];
      privacyRules.forward = newFormData?.forwardOpen
        ? [{ validator: createValidator("请输入接收短信转发话单事件地址"), trigger: "blur" }]
        : [];
    },
    { deep: true }
  );
  return {
    privacyRules,
    commonRules
  };
};
