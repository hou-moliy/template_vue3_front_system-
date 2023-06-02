// 分公司账户相关
import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";

// 获取分公司账户详情
export const branchDetail = params => {
  return service({
    url: "/branch/detail",
    method: "get",
    params,
    baseURL
  });
};
// 删除分公司信息
export const branchDel = params => {
  return service({
    url: "/branch/delete",
    method: "get",
    params,
    baseURL
  });
};
// 获取分公司账户列表
export const branchList = params => {
  return service({
    url: "/branch/list",
    method: "get",
    params,
    baseURL
  });
};
// 获取分公司客户经理列表
export const branchManaList = params => {
  return service({
    url: "/branch/managerList",
    method: "get",
    params,
    baseURL
  });
};
// 修改分公司信息
export const branchUpdate = data => {
  return service({
    url: "/branch/update",
    method: "post",
    data,
    baseURL
  });
};
