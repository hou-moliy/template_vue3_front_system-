import Mock from 'mockjs'
import DynamicRouter from "@/assets/json/routerList.json";
import UserInfo from "@/assets/json/userInfo.json";
const baseURL = import.meta.env.VITE_BASE_API || "admin";


Mock.mock(`${baseURL}/common/getRouters`, () => {
  {
    return Mock.mock(DynamicRouter);
  }
});

Mock.mock(`${baseURL}/common/login`, () => {
  {
    return Mock.mock({
      code: 200,
      token: 'eyJhbGciOiJIUzUxMiJ9.eyJleHAiOjE2ODQ4MjUxNDgsImxvZ2luX3VzZXJfa2V5IjoiMDQ2ZDIzYTUtNWVlNC00MTMyLWJjMTYtMjhlNDQ2MjU4MmFhIn0.GatpTz_TTHJoP1DHj0j_h21CZekZMDbCmREwe6AdVeWPCM5TobwZD6odS8-bZ1LmK3RDmdsei-5yxnraKZaW3g'
    });
  }
});

Mock.mock(`${baseURL}/common/getInfo`, () => {
  console.log(UserInfo)
  {
    return Mock.mock(UserInfo);
  }
});
