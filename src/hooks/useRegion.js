import { reactive, watch, toRefs } from "vue";
import { GlobalStore } from "@/stores";
const useRegion = (formRef, formData) => {
  const { getAddress } = GlobalStore();
  const state = reactive({
    address: [String(formData?.provinceId), String(formData?.cityId)]
  });
  const setAddress = newVal => {
    state.address = newVal;
    if (newVal.length === 0) {
      formData.provinceId = "";
      formData.cityId = "";
    }
  };
  // 监听地址变化
  watch(
    () => state.address,
    newVal => {
      if (!newVal || newVal.length === 0) {
        formData.provinceId = "";
        formData.cityId = "";
      } else if (newVal && newVal.length === 2) {
        // 二级地址
        formData.provinceId = newVal[0];
        formData.cityId = newVal[1];
      } else if (newVal && newVal.length === 3) {
        // 三级地址
        formData.provinceId = newVal[0];
        formData.cityId = newVal[1];
        formData.areaId = newVal[2];
      }
    }
  );
  // 监听表单变化
  watch(
    () => formData,
    newVal => {
      if (newVal.provinceId && newVal.cityId) {
        state.address = [String(newVal.provinceId), String(newVal.cityId)];
      }
    },
    {
      deep: true
    }
  );
  return {
    ...toRefs(state),
    setAddress,
    getAddress
  };
};
export default useRegion;
