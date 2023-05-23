import Mock from 'mockjs'
import DynamicRouter from "@/assets/json/routerList.json";
import UserInfo from "@/assets/json/userInfo.json";
import TreeSelect from "@/assets/json/treeSelect.json"
import RoleTreeSelect from "@/assets/json/roleTreeSelect.json"
import BusinessCustomer from "@/assets/json/customerList.json"
import DictData from "@/assets/json/dict.json"
const baseURL = import.meta.env.VITE_BASE_API || "admin";


Mock.mock(`${baseURL}/common/getRouters`, () => {
  {
    return Mock.mock(DynamicRouter);
  }
});

Mock.mock(`${baseURL}/system/user/login`, () => {
  {
    return Mock.mock({
      code: 200,
      token: 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODQ4MjUxNDgsImxvZ2luX3VzZXJfa2V5IjoiMDQ2ZDIzYTUtNWVlNC00MTMyLWJjMTYtMjhlNDQ2MjU4MmFhIn0.GatpTz_TTHJoP1DHj0j_h21CZekZMDbCmREwe6AdVeWPCM5TobwZD6odS8-bZ1LmK3RDmdsei-5yxnraKZaW3g'
    });
  }
});

Mock.mock(`${baseURL}/common/getInfo`, () => {
  {
    return Mock.mock(UserInfo);
  }
});

Mock.mock(`${baseURL}/system/menu/treeselect`, () => {
  {
    return Mock.mock(TreeSelect);
  }
});
Mock.mock(`${baseURL}/system/menu/roleMenuTreeselect?roleId=117`, () => {
  {
    return Mock.mock(RoleTreeSelect);
  }
});
Mock.mock(`${baseURL}/businessCustomer/list`, () => {
  {
    return Mock.mock(BusinessCustomer);
  }
});
Mock.mock(`${baseURL}/system/dict/data/dictTypes/1`, () => {
  {
    return Mock.mock(DictData);
  }
});
