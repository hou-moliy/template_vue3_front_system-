import { ref } from "vue";
const useTime = () => {
  const monthDates = ref([]); // 日期数组(月)
  const recentDates = ref([]); // 日期数组(最近)
  const todayDate = ref(""); // 今日日期

  // 格式转换
  const formatDate = (dateString, format) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    const hour = String(dateObj.getHours()).padStart(2, "0");
    const miniute = String(dateObj.getMinutes()).padStart(2, "0");
    const second = String(dateObj.getSeconds()).padStart(2, "0");
    let formattedDate = format
      .replace("yyyy", year)
      .replace("mm", month)
      .replace("dd", day)
      .replace("HH", hour)
      .replace("MM", miniute)
      .replace("SS", second);
    return formattedDate;
  };

  // 获取某个月的所有日期
  const getMonthDates = (selectedMonth, format = "yyyy/mm/dd") => {
    if (!selectedMonth) selectedMonth = getCurrentDate();
    const [year, month] = selectedMonth.split("-");
    const numDays = new Date(year, month, 0).getDate();
    const dates = [];
    for (let i = 1; i <= numDays; i++) {
      const date = new Date(year, month - 1, i);
      const formattedDate = date.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
      dates.push(formatDate(formattedDate, format));
    }
    monthDates.value = dates;
    return dates;
  };
  // 获取最近n天的日期
  const getRecentDates = (days, format = "yyyy/mm/dd") => {
    const today = new Date();
    const dates = [];
    for (let i = -days; i <= 0; i++) {
      const currentDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() + i);
      const formattedDate = currentDate.toLocaleDateString("zh-CN", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      });
      dates.push(formatDate(formattedDate, format));
    }
    recentDates.value = dates;
    return dates;
  };
  // 获取当前时间
  const getCurrentDate = (format = "yyyy-mm-dd HH:MM:SS") => {
    const currentDate = new Date();
    const formattedDate = formatDate(currentDate, format);
    return formattedDate;
  };
  // 两个日期间的所有日期
  const getDateRange = (startDate, endDate, format = "yyyy/mm/dd") => {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const dates = [];
    const currentDate = new Date(startDate);
    while (currentDate <= endDate) {
      const formattedDate = formatDate(currentDate, format);
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };
  // 获取当前日期
  const getTodayDate = (format = "yyyymmdd") => {
    return getCurrentDate(format);
  };
  // 获取当前月份
  const getThisMonth = (format = "yyyymm") => {
    return getCurrentDate(format);
  };
  return {
    getMonthDates,
    monthDates,
    getRecentDates,
    recentDates,
    getCurrentDate,
    todayDate,
    getDateRange,
    formatDate,
    getTodayDate,
    getThisMonth
  };
};
export default useTime;
