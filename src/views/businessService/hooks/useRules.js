import { ref, computed } from "vue";
const useRules = () => {
  const switchForm = ref({
    start: false,
    ring: false,
    connect: false,
    end: false,
    sms: false
  });
  const rules = computed(() => {
    const rulesObj = {
      groupName: [
        {
          required: true,
          message: "请输入企业名称",
          trigger: "blur"
        }
      ],
      recordMode: [
        {
          required: true,
          message: "请选择接入方式",
          trigger: "blur"
        }
      ],
      startCallUrl: [
        {
          required: switchForm.value.start,
          message: "请填写呼叫起始事件地址",
          trigger: "blur"
        }
      ],
      ringingUrl: [
        {
          required: switchForm.value.ring,
          message: "请填写呼叫振铃事件地址",
          trigger: "blur"
        }
      ],
      connectUrl: [
        {
          required: switchForm.value.connect,
          message: "请填写呼叫接听事件地址",
          trigger: "blur"
        }
      ],
      endCallUrl: [
        {
          required: switchForm.value.end,
          message: "请填写短信转发事件地址",
          trigger: "blur"
        }
      ],
      smsUrl: [
        {
          required: switchForm.value.sms,
          message: "请填写呼叫起始事件地址地址",
          trigger: "blur"
        }
      ]
    };
    return rulesObj;
  });
  return {
    switchForm,
    rules
  };
};
export default useRules;
