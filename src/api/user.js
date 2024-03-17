import service from "./service.js";
import { Encrypt } from "@/utils/secret";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";

// 登录
export const login = data => {
  return service({
    url: "/common/login",
    method: "post",
    data: {
      ...data,
      username: data.loginName
    },
    // baseURL
    baseURL: `/mock${baseURL}`
  });
};

// 获取用户信息
export const getUserInfoApi = () => {
  return service({
    url: "/common/getInfo",
    method: "get",
    // baseURL
    baseURL: `/mock${baseURL}`
  });
};

// 注册
export const register = data => {
  return service({
    url: "/system/user/register",
    method: "post",
    data,
    baseURL
  });
};

// 获取用户列表
export const userList = params => {
  return service({
    url: "/system/user/listSysUsers",
    method: "get",
    // params,
    // baseURL,
    baseURL: `/mock${baseURL}`
  });
};
// 重置密码
export const resetPassword = data => {
  return service({
    url: "/system/user/resetPassword",
    method: "post",
    data: {
      ...data,
      password: Encrypt(data.password)
    },
    baseURL
  });
};
// 获取图形验证码
export const getImgCode = () => {
  return service({
    url: "/common/captchaImage",
    method: "get",
    // baseURL,
    baseURL: `/mock${baseURL}`
  });
};
