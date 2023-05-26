// 客户经理账户信息管理相关接口
import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";

// 获取客户经理列表
export const managerList = params => {
  return service({
    url: `/manager/list`,
    method: "get",
    params,
    baseURL
  });
};
// 修改客户经理信息
export const managerUpdate = params => {
  return service({
    url: `/manager/update`,
    method: "post",
    params,
    baseURL
  });
};
// 删除客户经理信息
export const managerDelete = params => {
  return service({
    url: `/manager/delete`,
    method: "get",
    params,
    baseURL
  });
};
