import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "admin";

export const pageLogin = data => {
  return service({
    url: "/common/login",
    method: "post",
    data,
    baseURL
  });
};

// 获取验证码
export const getCodeImg = () => {
  return service({
    url: "/common/captchaImage",
    method: "get",
    baseURL
  });
};
