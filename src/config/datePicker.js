// 日期选择器配置
export const pickerOptions = {
  disabledDate(time) {
    // return time.getTime() < Date.now() - 8.64e7; //只能选择今天及今天之后的日期, 今天的日期也能选
    // return time.getTime() < Date.now() - 8.64e6; //只能选择今天之后的日期，今天的日期也不能选
    // 只能选择今天之前的日期，今天的日期也不能选，最多选一年前的日期
    return time.getTime() > Date.now() - 8.64e7 || time.getTime() < Date.now() - 3.154e10;
  }
};

export const timePickerEnums = {
  // 今天之后
  todayAfter: "todayAfter",
  // 今天之后，今天的日期也不能选
  todayAfterNoToday: "todayAfterNoToday",
  // 只能选择今天之前的日期，今天的日期也不能选，最多选一年前的日期
  OnlyOneYearBeforeNoToday: "OnlyOneYearBeforeNoToday",
  // 只能选择今天之前的日期，今天的日期可以选，最多选一年前的日期
  OnlyOneYearBefore: "OnlyOneYearBefore"
};

// 日期选择器配置，根据传入的type值返回不同的配置
export function getPickerOptions(type) {
  return {
    disabledDate(time) {
      if (type === timePickerEnums.todayAfter) {
        return time.getTime() < Date.now() - 8.64e7; //只能选择今天之后的日期，今天的日期可以选
      } else if (type === timePickerEnums.todayAfterNoToday) {
        return time.getTime() < Date.now() - 8.64e6; //只能选择今天之后的日期，今天的日期也不能选
      } else if (type === timePickerEnums.OnlyOneYearBeforeNoToday) {
        // 只能选择今天之前的日期，今天的日期也不能选，最多选一年前的日期
        return time.getTime() > Date.now() - 8.64e7 || time.getTime() < Date.now() - 3.154e10;
      } else if (type === timePickerEnums.OnlyOneYearBefore) {
        // 只能选择今天之前的日期，今天的日期可以选，最多选一年前的日期
        return time.getTime() > Date.now() - 8.64e6 || time.getTime() < Date.now() - 3.154e10;
      }
      return false;
    }
  };
}
