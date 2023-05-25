import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "admin";
// 小号通话详情
export const callDetail = params => {
  return service({
    url: "/stats/callDetail",
    method: "get",
    params,
    baseURL
  });
};
// 获取呼叫数据统计列表
export const callList = params => {
  return service({
    url: "/stats/callList",
    method: "get",
    params,
    baseURL
  });
};
// 导出小号呼叫统计
export const exportCallList = data => {
  return service({
    url: "/stats/callList/export",
    method: "post",
    data,
    baseURL
  });
};
// CTD外呼通话详情
export const ctdCallDetail = params => {
  return service({
    url: "/stats/ctdCallDetail",
    method: "get",
    params,
    baseURL
  });
};

// 获取订单数据统计列表
export const orderList = params => {
  return service({
    url: "/stats/orderList",
    method: "get",
    params,
    baseURL
  });
};
// 导出订单数据统计
export const exportOrderList = data => {
  return service({
    url: "/stats/orderList/export",
    method: "post",
    data,
    baseURL
  });
};
// 获取短信数据统计列表
export const smsList = params => {
  return service({
    url: "/stats/smsList",
    method: "get",
    params,
    baseURL
  });
};
// 导出短信压力测试业务短信统计
export const exportSmsList = data => {
  return service({
    url: "/stats/smsList/export",
    method: "post",
    data,
    baseURL
  });
};
