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
    url: `​/billingFormula​/deleteBillingFormula​/${streamNumber}`,
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
