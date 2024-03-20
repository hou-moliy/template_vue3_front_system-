import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";
const fileURL = import.meta.env.VITE_FILE_BASE_API || "file";
// 上传文件
export const uploadIdsFile = ({ url, data }) => {
  return service({
    url: url,
    method: "post",
    data,
    baseURL
  });
};
// 上传
export const uploadImageFile = ({ url, data }) => {
  return service({
    url: url,
    method: "post",
    data,
    baseURL: fileURL
  });
};
// 上传视频
export const uploadVideoFile = ({ url, data }) => {
  return service({
    url: url,
    method: "post",
    data,
    baseURL: fileURL
  });
};
export const templateExport = data => {
  return service({
    url: "/vgroup/shortNumber/set/excel/templateExport",
    method: "post",
    responseType: "blob",
    data,
    baseURL
  });
};
// 批量导入
export const templateImport = data => {
  return service({
    url: "/vgroup/shortNumber/set/excel/import",
    method: "post",
    data,
    baseURL
  });
};
// 进度查询
export const importPercent = params => {
  return service({
    url: "/vgroup/shortNumber/set/excel/import/percent",
    method: "get",
    params,
    baseURL
  });
};
