import { watch, ref } from "vue";
import useTime from "@/hooks/useTime";
const { formatDate } = useTime();
const regex1 = /^\d{4}-\d{2}-\d{2}$/;
const regex2 = /^\d{4}-\d{2}$/;
export default function (form) {
  const statisticalRef = ref(null);
  const statType = ref("");
  const resetStatType = () => {
    statisticalRef?.value?.resetPicker();
    statType.value = "";
  };
  watch(
    () => statType.value,
    newVal => {
      switch (newVal) {
        case "0": // 日统计
        case "1": // 月统计
        case "2": // 近7天
        case "3": // 近30天
          form.statType = statType.value;
          form.startTime = "";
          break;
        default:
          if (regex1.test(newVal)) {
            // 自定义日期
            form.statType = "4";
            form.startTime = formatDate(newVal, "yyyymmdd");
          } else if (regex2.test(newVal)) {
            // 自定义月份
            form.statType = "5";
            form.startTime = formatDate(newVal, "yyyymm");
          }
          break;
      }
    },
    {
      deep: true,
      immediate: true
    }
  );
  return {
    statisticalRef,
    statType,
    resetStatType
  };
}
