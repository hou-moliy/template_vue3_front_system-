// 字典信息
import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";

// 根据字典类型获取字典数据
export const getDict = ({ dictTypes }) => {
  return service({
    url: `/system/dict/data/dictTypes/${dictTypes}`,
    method: "get",
    baseURL
  });
};

// 省份地市枚举
export const provinceAndCity = () => {
  return service({
    url: "/system/dict/provinceAndCity",
    method: "get",
    // baseURL,
    baseURL: `/mock${baseURL}`
  });
};
