import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "admin";

// 登录
export const login = data => {
  return service({
    url: "/system/user/login",
    method: "post",
    data,
    baseURL
  });
};
// 校验用户是否存在
export const checkUserName = data => {
  return service({
    url: "/system/user/checkUserName",
    method: "get",
    data,
    baseURL
  });
};

// 注册
export const register = () => {
  return service({
    url: "/system/user/register",
    method: "post",
    baseURL
  });
};

// 下发验证码
export const getVerCode = () => {
  return service({
    url: "/system/user/getVerCode",
    method: "get",
    baseURL
  });
};

// 账号审批
export const auditUser = data => {
  return service({
    url: "/system/user/auditUser",
    method: "post",
    data,
    baseURL
  });
};
// 获取用户列表
export const userList = params => {
  return service({
    url: "/system/user/list",
    method: "get",
    params,
    baseURL
  });
};
// 重置密码
export const resetPassword = data => {
  return service({
    url: "/system/user/resetPassword",
    method: "post",
    data,
    baseURL
  });
};
// 修改用户信息
export const updateUserInfo = data => {
  return service({
    url: "/system/user/updateUserInfo",
    method: "post",
    data,
    baseURL
  });
};
// 修改用户状态
export const updateUserStatus = params => {
  return service({
    url: "​/system​/user​/updateUserStatus",
    method: "get",
    params,
    baseURL
  });
};
