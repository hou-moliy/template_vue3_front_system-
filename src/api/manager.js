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
export const managerUpdate = data => {
  return service({
    url: `/manager/update`,
    method: "post",
    data,
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
// 获取客户经理详情
export const managerDetail = params => {
  return service({
    url: `/manager/detail`,
    method: "get",
    params,
    baseURL
  });
};
// 获取客户经理下的所有企业客户信息
export const managerUserList = params => {
  return service({
    url: `/manager/userList`,
    method: "get",
    params,
    baseURL
  });
};
