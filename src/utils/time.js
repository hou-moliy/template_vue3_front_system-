export const formatTime = (date = new Date().getTime()) => {
  const DATE = new Date(date);
  let year = DATE.getFullYear(); //年份
  let month = DATE.getMonth() + 1; //月份（0-11）
  let date = DATE.getDate(); //天数（1到31）
  let hour = DATE.getHours(); //小时数（0到23）
  let minute = DATE.getMinutes(); //分钟数（0到59）
  let second = DATE.getSeconds(); //秒数（0到59）
  return year + "-" + month + "-" + date;
};
