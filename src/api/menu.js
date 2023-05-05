import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "admin";
// 获取路由
export const routerList = () => {
  return service({
    url: "/common/getRouters",
    method: "get",
    baseURL
  });
};
