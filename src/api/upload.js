import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "admin";
// 上传文件
export const uploadIdsFile = ({ url, data }) => {
  return service({
    url: url,
    method: "post",
    data,
    baseURL
  });
};
