import { LOGIN_URL } from "@/config/config";
import { getToken } from "@/utils/auth";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import router from "./routers";
import NProgress from "@/config/nprogress";
import { AuthStore } from "@/stores/modules/auth";
/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach((to, from, next) => {
  const token = getToken();
  NProgress.start();

  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  if (to.path === LOGIN_URL) {
    if (!token) return next();
    else return next(from.fullPath);
  }
  // 未登录，跳转登录页面
  if (!token) return next(LOGIN_URL);

  // 已登录跳转
  const authStore = AuthStore();
  authStore.setRouteName(to.name);
  // 用户权限
  const rolesLen = authStore.roles.length;
  if (!rolesLen) {
    // 获取用户信息
    authStore.getUserInfo().then(() => {
      initDynamicRouter()
        .then(() => {
          next({ ...to, replace: true }); // hack方法 确保addRoutes已完成
        })
        .catch(err => {
          authStore.logout().then(() => {
            Message.error(err);
            next({ path: "/" });
          });
        });
    });
  } else {
    next();
  }
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});
