import { ref, watch, nextTick } from "vue";
import useTime from "@/hooks/useTime";
import { getPickerOptions } from "@/config/datePicker";

export default function useTimeRange(form) {
  const { getTodayDate, getThisMonth, getCurrentDate, getRecentDates, getDateRange, getMonthDates } = useTime();
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
        // 日统计，从今天开始可选，之前的不可选
        if (form.actType == 0) {
          form.statTime = getTodayDate();
        } else if (form.actType == 1) {
          // 月统计，当前月可选，之前的不可选
          form.statTime = getThisMonth();
        }
      }
    },
    {
      immediate: true
    }
  );
  // 监听form的actType变化，重置时间范围
  const pickerDisabledDate = ref({});
  watch(
    () => form.actType,
    () => {
      resetDateRange();
    },
    {
      immediate: true
    }
  );
  // 监听form的disabledType的变化
  const showDisabledDate = ref(false);
  watch(
    () => form.disabledType,
    newVal => {
      showDisabledDate.value = false;
      pickerDisabledDate.value = getPickerOptions(newVal);
      nextTick(() => {
        showDisabledDate.value = true;
      });
    },
    {
      immediate: true
    }
  );
  return {
    dateRange,
    resetDateRange,
    pickerDisabledDate,
    showDisabledDate,
    getTodayDate,
    getThisMonth,
    getCurrentDate,
    getRecentDates,
    getDateRange,
    getMonthDates
  };
}
