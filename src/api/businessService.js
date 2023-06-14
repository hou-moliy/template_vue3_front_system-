// 业务办理相关接口
import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";

// 业务办理列表
export const handleList = params => {
  return service({
    url: "/businessRegister/handleList",
    method: "get",
    params,
    baseURL
  });
};

// 审核业务表单
export const audit = data => {
  return service({
    url: "/businessRegister/audit",
    method: "post",
    data,
    baseURL
  });
};

// 新增业务表单
export const add = data => {
  return service({
    url: "/businessRegister/add",
    method: "post",
    data,
    baseURL
  });
};

// 修改业务表单
export const update = data => {
  return service({
    url: "/businessRegister/update",
    method: "post",
    data,
    baseURL
  });
};

// 撤销业务表单
export const revoke = params => {
  return service({
    url: "/businessRegister/delete",
    method: "get",
    params,
    baseURL
  });
};
