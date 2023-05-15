import { reactive, watch, toRefs } from "vue";
export const useRegion = (formRef, formData) => {
  const state = reactive({
    address: [formData.province, formData.city]
  });
  const setAddress = newVal => {
    state.address = newVal;
  };
  // 监听地址变化
  watch(
    () => state.address,
    newVal => {
      if (newVal.length === 0) {
        formData.province = "";
        formData.city = "";
      } else if (newVal.length === 2) {
        // 二级地址
        formData.province = newVal[0];
        formData.city = newVal[1];
      } else {
        // 三级地址
        formData.province = newVal[0];
        formData.city = newVal[1];
        formData.area = newVal[2];
      }
    }
  );
  return {
    ...toRefs(state),
    setAddress
  };
};
