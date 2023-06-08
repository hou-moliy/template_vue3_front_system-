import { ref, watch } from "vue";
import useTime from "@/hooks/useTime";
export default function useTimeRange(form) {
  const { getTodayDate, getThisMonth } = useTime();
  const dateRange = ref([]);
  const resetDateRange = () => {
    dateRange.value = [];
  };
  watch(
    () => dateRange.value,
    () => {
      if (dateRange.value.length) {
        form.statTime = dateRange.value[0];
        form.endTime = dateRange.value[1];
      } else {
        // 日统计
        if (form.actType == 0) {
          form.statTime = getTodayDate();
        } else if (form.actType == 1) {
          // 月统计
          form.statTime = getThisMonth();
        }
      }
    },
    {
      immediate: true
    }
  );
  return {
    dateRange,
    resetDateRange
  };
}
