import { LOGIN_URL, TABS_WHITE_LIST } from "@/config/config";
import { getToken } from "@/utils/auth";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import router from "./routers";
import NProgress from "@/config/nprogress";
import { AuthStore } from "@/stores/modules/auth";
import { ElMessage } from "element-plus";
import { GlobalStore } from "@/stores";

/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach((to, from, next) => {
  const token = getToken();
  NProgress.start();
  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;
  if (token) {
    if (to.path === LOGIN_URL) {
      NProgress.done();
      next(from.fullPath);
    } else {
      const authStore = AuthStore();
      const globalStore = GlobalStore();
      // 已登录跳转
      authStore.setRouteName(to.name);
      // 用户权限
      const rolesLen = authStore.roles.length;
      if (!rolesLen) {
        // 获取用户信息
        authStore.getUserInfo().then(() => {
          initDynamicRouter()
            .then(() => {
              next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
              // next({ path: to.path, query: to.query, replace: true });
            })
            .catch(err => {
              authStore.logout().then(() => {
                ElMessage.error(err);
                next({ path: "/" });
              });
            });
        });
        // 获取省份-城市数据
        globalStore.getProvinceCityData();
      } else {
        next();
      }
    }
  } else {
    TABS_WHITE_LIST.indexOf(to.path) !== -1 ? next() : next(`${LOGIN_URL}?redirect=${to.fullPath}`);
  }
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});
