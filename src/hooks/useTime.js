import { ref } from "vue";
export const useTime = () => {
  const monthDates = ref([]); // 日期数组(月)
  const recentDates = ref([]); // 日期数组(最近)
  const todayDate = ref(""); // 今日日期

  // 格式转换
  const formatDate = (dateString, format) => {
    const dateObj = new Date(dateString);
    const year = dateObj.getFullYear();
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const day = String(dateObj.getDate()).padStart(2, "0");
    let formattedDate = format.replace("yyyy", year).replace("mm", month).replace("dd", day);
    return formattedDate;
  };

  // 获取某个月的所有日期
  const getMonthDates = (selectedMonth, format = "yyyy/mm/dd") => {
    if(!selectedMonth) selectedMonth = getCurrentDate();
    const [year, month] = selectedMonth.split("-");
    const numDays = new Date(year, month, 0).getDate();
    const dates = [];
    for(let i = 1; i <= numDays; i++) {
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
    for(let i = -days; i <= 0; i++) {
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
  const getCurrentDate = () => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    todayDate.value = formatDate;
    return formattedDate;
  };
  const getDateRange = (startDate, endDate, format = "yyyy/mm/dd") => {
    startDate = new Date(startDate);
    endDate = new Date(endDate);
    const dates = [];
    const currentDate = new Date(startDate);
    while(currentDate <= endDate) {
      const formattedDate = formatDate(currentDate, format);
      dates.push(formattedDate);
      currentDate.setDate(currentDate.getDate() + 1);
    }
    return dates;
  };
  return {
    getMonthDates,
    monthDates,
    getRecentDates,
    recentDates,
    getCurrentDate,
    todayDate,
    getDateRange
  };
};
