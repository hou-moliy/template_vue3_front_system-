// 投诉管理相关接口
import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";
// 投诉台账邮件通知
export const emailNotifyComplaints = data => {
  return service({
    url: "/complaintManager/emailNotifyComplaints",
    method: "post",
    data,
    baseURL
  });
};
// 投诉台账导出
export const exportComplaints = params => {
  return service({
    url: "/complaintManager/exportComplaints",
    method: "get",
    params,
    baseURL
  });
};
// 导入投诉号码
export const importComplaintFile = data => {
  return service({
    url: "/complaintManager/importComplaintFile",
    method: "post",
    data,
    baseURL
  });
};
// 投诉台账列表
export const listComplaintLedgers = params => {
  return service({
    url: "/complaintManager/listComplaintLedgers",
    method: "get",
    params,
    baseURL
  });
};
// 投诉台账详情
export const listComplaints = params => {
  return service({
    url: "/complaintManager/listComplaints",
    method: "get",
    params,
    baseURL
  });
};
// 直接发送企业删除
export const deleteEnterpriseCsMail = ({ userId }) => {
  return service({
    url: `​​/mailManager​/deleteEnterpriseCsMail/${userId}`,
    method: "delete",
    baseURL
  });
};
// 邮箱删除
export const deleteMail = ({ streamNumber }) => {
  return service({
    url: `/mailManager/deleteMail/${streamNumber}`,
    method: "delete",
    baseURL
  });
};
// 直接发送企业新增
export const insertEnterpriseCsMail = ({ userId }) => {
  return service({
    url: `/mailManager/insertEnterpriseCsMail/${userId}`,
    method: "post",
    baseURL
  });
};
// 邮箱新增
export const insertMail = data => {
  return service({
    url: "/mailManager/insertMail",
    method: "post",
    data,
    baseURL
  });
};
// 直接发送企业查询
export const listEnterpriseCsMails = ({ userId }) => {
  return service({
    url: `/mailManager/listEnterpriseCsMails/${userId}`,
    method: "get",
    baseURL
  });
};
//邮箱查询
export const listMails = params => {
  return service({
    url: "/mailManager/listMails",
    method: "get",
    params,
    baseURL
  });
};
// 邮箱修改
export const updateMail = data => {
  return service({
    url: "/mailManager/updateMail",
    method: "put",
    data,
    baseURL
  });
};
