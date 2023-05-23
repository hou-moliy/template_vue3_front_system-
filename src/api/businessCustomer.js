// 企业客户账户信息管理相关接口
import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "admin";

// 获取企业客户账户列表
export const handleList = params => {
  return service({
    url: "/businessCustomer/list",
    method: "get",
    params,
    baseURL
  });
};

// 删除企业客户账户信息
export const deleteInfo = params => {
  return service({
    url: "/businessCustomer/delete",
    method: "get",
    params,
    baseURL
  });
};

// 获取企业客户账户详情
export const getInfo = params => {
  return service({
    url: "/businessCustomer/detail",
    method: "get",
    params,
    baseURL
  });
};

// 修改企业客户账户信息
export const updateInfo = data => {
  return service({
    url: "/businessCustomer/update",
    method: "post",
    data,
    baseURL
  });
};
