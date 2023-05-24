// 号码管理相关接口
import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "admin";

// 导入未用号码资源
export const importPhone = params => {
  return service({
    url: "/number/import",
    method: "get",
    params,
    baseURL
  });
};
// 号码订购
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
