// 企业客户账户信息管理相关接口
import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";

// 获取企业客户账户列表
export const handleList = params => {
  return service({
    url: "/businessCustomer/list",
    method: "get",
    params,
    baseURL
  });
};

// 删除企业信息
export const deleteInfo = params => {
  return service({
    url: "/businessCustomer/delete",
    method: "get",
    params,
    baseURL
  });
};

// 获取企业详情
export const getInfo = params => {
  return service({
    url: "/businessCustomer/detail",
    method: "get",
    params,
    baseURL
  });
};

// 修改企业信息
export const updateInfo = data => {
  return service({
    url: "/businessCustomer/update",
    method: "post",
    data,
    baseURL
  });
};
// 获取企业号码列表
export const phoneList = params => {
  return service({
    url: "/businessCustomer/phoneList",
    method: "get",
    params,
    baseURL
  });
};
// 获取企业号码详情
export const phoneDetail = params => {
  return service({
    url: "/businessCustomer/phoneDetail",
    method: "get",
    params,
    baseURL
  });
};
// 获取企业客户详情
export const businessUserDetail = params => {
  return service({
    url: "/businessUser/detail",
    method: "get",
    params,
    baseURL
  });
};
