import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";
// 获取角色列表
export const roleList = params => {
  return service({
    url: "/system/role/listSysRole",
    method: "get",
    params,
    baseURL
  });
};
// 新增角色
export const addRole = data => {
  return service({
    url: "/system/role",
    method: "post",
    data,
    baseURL
  });
};
// 修改角色
export const updateRole = data => {
  return service({
    url: "/system/role",
    method: "put",
    data,
    baseURL
  });
};
// 删除角色
export const deleteRole = ({ roleId }) => {
  return service({
    url: `/system/role/${roleId}`,
    method: "delete",
    baseURL
  });
};
