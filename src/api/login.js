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

// 获取用户信息
export const getUserInfoApi = () => {
  return service({
    url: "/common/getInfo",
    method: "get",
    baseURL
  });
};
