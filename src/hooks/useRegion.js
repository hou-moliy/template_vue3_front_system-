import { reactive, watch, toRefs } from "vue";
import { codeToText } from "element-china-area-data";
const useRegion = (formRef, formData) => {
  const state = reactive({
    address: [String(formData.provinceId), String(formData.cityId)]
  });
  const setAddress = newVal => {
    state.address = newVal;
    if (newVal.length === 0) {
      formData.provinceId = "";
      formData.cityId = "";
    }
  };
  const getAddress = code => {
    return codeToText[code];
  };
  // 监听地址变化
  watch(
    () => state.address,
    newVal => {
      if (newVal.length === 0) {
        formData.provinceId = "";
        formData.cityId = "";
      } else if (newVal.length === 2) {
        // 二级地址
        formData.provinceId = newVal[0];
        formData.cityId = newVal[1];
      } else {
        // 三级地址
        formData.provinceId = newVal[0];
        formData.cityId = newVal[1];
        formData.areaId = newVal[2];
      }
    }
  );
  return {
    ...toRefs(state),
    setAddress,
    getAddress
  };
};
export default useRegion;
