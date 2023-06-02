// 账单相关
import service from "./service.js";
const baseURL = import.meta.env.VITE_BASE_API || "bjxh";

// 账单公式查询
export const listBillingFormulas = params => {
  return service({
    url: "/billingFormula/listBillingFormulas",
    method: "get",
    params,
    baseURL
  });
};
// 账单公式删除
export const deleteBillingFormula = ({ streamNumber }) => {
  return service({
    url: `/billingFormula/deleteBillingFormula/${streamNumber}`,
    method: "delete",
    baseURL
  });
};
// 账单公式详情
export const getBillingFormula = ({ streamNumber }) => {
  return service({
    url: `/billingFormula/getBillingFormula/${streamNumber}`,
    method: "get",
    baseURL
  });
};
// 账单公式新增
export const insertBillingFormula = data => {
  return service({
    url: "/billingFormula/insertBillingFormula",
    method: "post",
    data,
    baseURL
  });
};
// 账单公式修改
export const updateBillingFormula = data => {
  return service({
    url: "/billingFormula/updateBillingFormula",
    method: "put",
    data,
    baseURL
  });
};
// 月账单列表
export const listMonthlyBillings = params => {
  return service({
    url: "/monthlyBilling/listMonthlyBillings",
    method: "get",
    params,
    baseURL
  });
};
// 上传成本账单
export const importMonthlyBilling = data => {
  return service({
    url: "/monthlyBilling/importMonthlyBilling",
    method: "post",
    data,
    baseURL
  });
};
// 收入账单详情
export const getMonthlyBillingIncome = params => {
  return service({
    url: "/monthlyBilling/getMonthlyBillingIncome",
    method: "get",
    params,
    baseURL
  });
};
// 成本账单详情
export const getMonthlyBillingCost = params => {
  return service({
    url: "/monthlyBilling/getMonthlyBillingCost",
    method: "get",
    params,
    baseURL
  });
};
// 收入账单下载-表格每一行用这个
export const exportMonthlyBillingIncome = params => {
  return service({
    url: "/monthlyBilling/exportMonthlyBillingIncome",
    method: "get",
    responseType: "blob",
    params,
    baseURL
  });
};
// 成本账单下载-表格每一行用这个
export const exportMonthlyBillingCost = params => {
  return service({
    url: "/monthlyBilling/exportMonthlyBillingCost",
    method: "get",
    responseType: "blob",
    params,
    baseURL
  });
};
// 下载成本账单- form按钮用这个
export const downloadMonthlyBilling = params => {
  return service({
    url: "/monthlyBilling/downloadMonthlyBilling",
    method: "get",
    responseType: "blob",
    params,
    baseURL
  });
};

// 调账
export const adjustMonthlyBillingIncome = data => {
  return service({
    url: "/monthlyBilling/adjustMonthlyBillingIncome",
    method: "post",
    data,
    baseURL
  });
};
