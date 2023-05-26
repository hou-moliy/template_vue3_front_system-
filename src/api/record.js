// 小号记录查询相关接口

import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";
// 获取呼叫记录
export const recordCallList = params => {
  return service({
    url: "/record/callList",
    method: "get",
    params,
    baseURL
  });
};
// 获取订单记录
export const recordOrderList = params => {
  return service({
    url: "/record/orderList",
    method: "get",
    params,
    baseURL
  });
};
// 获取短信记录
export const recordSmsList = params => {
  return service({
    url: "/record/smsList",
    method: "get",
    params,
    baseURL
  });
};
