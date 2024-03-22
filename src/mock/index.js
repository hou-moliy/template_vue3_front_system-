import Mock from "mockjs";
import DynamicRouter from "@/assets/json/routerList.json";
import UserInfo from "@/assets/json/userInfo.json";
import TreeSelect from "@/assets/json/treeSelect.json";
import RoleTreeSelect from "@/assets/json/roleTreeSelect.json";
import BusinessCustomer from "@/assets/json/customerList.json";
import ProvinceAndCity from "@/assets/json/provinceAndCity.json";
import CaptchaImage from "@/assets/json/captchaImage.json";
import UserList from "@/assets/json/userList.json";
import RoleList from "@/assets/json/roleList.json";
const baseURL = import.meta.env.VITE_BASE_API || "admin";

// Mock重写，避免responseType设置无效的问题
Mock.XHR.prototype.send = (() => {
  const _send = Mock.XHR.prototype.send;
  return function () {
    if (!this.match) {
      this.custom.xhr.responseType = this.responseType || "";
      this.custom.xhr.timeout = this.timeout || 0;
      this.custom.xhr.withCredentials = this.withCredentials || false;
      this.custom.xhr.onabort = this.onabort || null;
      this.custom.xhr.onerror = this.onerror || null;
      this.custom.xhr.onload = this.onload || null;
      this.custom.xhr.onloadend = this.onloadend || null;
      this.custom.xhr.onloadstart = this.onloadstart || null;
      this.custom.xhr.onprogress = this.onprogress || null;
      this.custom.xhr.onreadystatechange = this.onreadystatechange || null;
      this.custom.xhr.ontimeout = this.ontimeout || null;
    }
    return _send.apply(this, arguments);
  };
})();
Mock.mock(`/mock${baseURL}/common/getRouters`, () => {
  return Mock.mock(DynamicRouter);
});

Mock.mock(`/mock${baseURL}/common/login`, () => {
  return Mock.mock({
    code: "200",
    token:
      "eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODQ4MjUxNDgsImxvZ2luX3VzZXJfa2V5IjoiMDQ2ZDIzYTUtNWVlNC00MTMyLWJjMTYtMjhlNDQ2MjU4MmFhIn0.GatpTz_TTHJoP1DHj0j_h21CZekZMDbCmREwe6AdVeWPCM5TobwZD6odS8-bZ1LmK3RDmdsei-5yxnraKZaW3g"
  });
});

Mock.mock(`/mock${baseURL}/common/getInfo`, () => {
  return Mock.mock(UserInfo);
});

Mock.mock(`/mock${baseURL}/common/captchaImage`, () => {
  return Mock.mock(CaptchaImage);
});
Mock.mock(`/mock${baseURL}/system/user/listSysUsers`, params => {
  return Mock.mock(UserList);
});
Mock.mock(`/mock${baseURL}/system/role/listSysRole`, params => {
  return Mock.mock(RoleList);
});
Mock.mock(`/mock${baseURL}/system/menu/treeselect`, () => {
  return Mock.mock(TreeSelect);
});

Mock.mock(`/mock${baseURL}/system/menu/roleMenuTreeselect?roleId=117`, () => {
  return Mock.mock(RoleTreeSelect);
});
Mock.mock(`/mock${baseURL}/businessCustomer/list`, () => {
  return Mock.mock(BusinessCustomer);
});

Mock.mock(`/mock${baseURL}/system/dict/provinceAndCity`, () => {
  return Mock.mock(ProvinceAndCity);
});
