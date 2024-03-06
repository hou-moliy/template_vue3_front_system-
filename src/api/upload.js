import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";
// 上传文件
export const uploadIdsFile = ({ url, data }) => {
  return service({
    url: url,
    method: "post",
    data,
    baseURL
  });
};
// 上传图片
export const uploadImage = ({ url, data }) => {
  return service({
    url: url,
    method: "post",
    data,
    baseURL
  });
};
