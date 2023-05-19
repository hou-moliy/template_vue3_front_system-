import { ref } from "vue";

/**
 * @description 获取本地时间
 */
export const useTime = () => {
  const monthDates = ref([]); // 日期数组(月)
  const recentDates = ref([]); // 日期数组(最近)

  // 获取某个月的所有日期
  const getMonthDates = selectedMonth => {
    const [year, month] = selectedMonth.split("-");
    const numDays = new Date(year, month, 0).getDate();
    const dates = [];
    for (let i = 1; i <= numDays; i++) {
      const date = new Date(year, month - 1, i);
      const formattedDate = date
        .toLocaleDateString("zh-CN", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit"
        })
        .replace(/\//g, "-");
      dates.push(formattedDate);
    }
    monthDates.value = dates;
  };
  // 获取最近n天的日期
  const getRecentDates = endDay => {
    const today = new Date();
    const dates = [];
    for (let i = endDay; i > 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, "0");
      const day = date.getDate().toString().padStart(2, "0");
      const formattedDate = `${year}-${month}-${day}`;
      dates.push(formattedDate);
    }
    recentDates.value = dates;
  };
  // 获取当前时间
  return {
    getMonthDates,
    monthDates,
    getRecentDates,
    recentDates
  };
};
