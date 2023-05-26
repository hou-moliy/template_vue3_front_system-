// 渠道商账户信息管理相关接口
import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";

// 获取渠道商列表
export const channelList = params => {
  return service({
    url: "/channel/list",
    method: "get",
    params,
    baseURL
  });
};
// 获取渠道企业列表
export const groupList = params => {
  return service({
    url: "/channel/groupList",
    method: "get",
    params,
    baseURL
  });
};
// 获取无用户关联企业账户列表
export const noRelatedGroupList = params => {
  return service({
    url: "/channel/noRelatedGroupList",
    method: "get",
    params,
    baseURL
  });
};

// 删除渠道商信息
export const deleteInfo = params => {
  return service({
    url: "/channel/delete",
    method: "get",
    params,
    baseURL
  });
};

// 删除渠道商企业账户
export const deleteGroup = params => {
  return service({
    url: "/channel/deleteGroup",
    method: "get",
    params,
    baseURL
  });
};

// 渠道商添加企业账户
export const addGroup = data => {
  return service({
    url: "/channel/addGroup",
    method: "post",
    data,
    baseURL
  });
};
// 修改渠道商信息
export const updateGroup = data => {
  return service({
    url: "/bjxh/channel/update",
    method: "post",
    data,
    baseURL
  });
};
