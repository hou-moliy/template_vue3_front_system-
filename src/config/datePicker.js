// 日期选择器配置
export const pickerOptions = {
  disabledDate(time) {
    // return time.getTime() < Date.now() - 8.64e7; //只能选择今天及今天之后的日期, 今天的日期也能选
    // return time.getTime() < Date.now() - 8.64e6; //只能选择今天之后的日期，今天的日期也不能选
    // 只能选择今天之前的日期，今天的日期也不能选，最多选一年前的日期
    return time.getTime() > Date.now() - 8.64e7 || time.getTime() < Date.now() - 3.154e10;
  }
};
