import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";
// 获取菜单列表
export const routerList = () => {
  return service({
    url: "/common/getRouters",
    method: "get",
    // baseURL
    baseURL: `/mock${baseURL}`
  });
};
// 查询菜单列表树状结构
export const treeselect = () => {
  return service({
    url: "/system/menu/treeselect",
    method: "get",
    baseURL
  });
};
// 根据角色ID查询菜单下拉树结构
export const roleMenuTreeselect = ({ roleId }) => {
  return service({
    url: `/system/menu/roleMenuTreeselect/${roleId}`,
    method: "get",
    baseURL
  });
};
