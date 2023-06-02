// 号码管理相关接口
import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";

// 导入未用号码资源
export const importPhone = data => {
  return service({
    url: "/number/import",
    method: "post",
    data,
    baseURL
  });
};
// 新增号码订购任务
export const order = data => {
  return service({
    url: "/number/order",
    method: "post",
    data,
    baseURL
  });
};

// 获取省份地市未用表剩余量
export const remainingNum = data => {
  return service({
    url: "/number/remainingNum",
    method: "post",
    data,
    baseURL
  });
};
// 获取未用号码列表
export const unusedList = params => {
  return service({
    url: "/number/unusedList",
    method: "get",
    params,
    baseURL
  });
};
// 新增号码退订任务
export const numberCancel = data => {
  return service({
    url: "/number/cancel",
    method: "post",
    data,
    baseURL
  });
};
// 查看号码成功失败详情
export const importDetail = data => {
  return service({
    url: "/number/importDetail",
    method: "post",
    data,
    baseURL
  });
};
// 获取号码任务列表
export const numberList = params => {
  return service({
    url: "/number/list",
    method: "get",
    params,
    baseURL
  });
};
// 导出未用号码列表
export const exportUnusedNumberList = params => {
  return service({
    url: "/number/exportUnusedNumberList",
    method: "get",
    params,
    baseURL
  });
};
