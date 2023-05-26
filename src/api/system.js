import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";
// 获取用户信息
export const getUserInfoApi = () => {
  return service({
    url: "/system/getInfo",
    method: "get",
    baseURL
  });
};
