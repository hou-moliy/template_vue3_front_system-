import { LOGIN_URL } from "@/config/config";
import { GlobalStore } from "@/stores";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import router from "./routers";
import NProgress from "@/config/nprogress";
import { AuthStore } from "@/stores/modules/auth";
/**
 * @description 路由拦截 beforeEach
 * */
router.beforeEach(async (to, from, next) => {
  const globalStore = GlobalStore();
  NProgress.start();

  const title = import.meta.env.VITE_GLOB_APP_TITLE;
  document.title = to.meta.title ? `${to.meta.title} - ${title}` : title;

  if(to.path === LOGIN_URL) {
    if(!globalStore.token) return next();
    else return next(from.fullPath);
  }
  // 未登录，跳转登录页面
  if(!globalStore.token) return next(LOGIN_URL);

  // 已登录跳转
  const authStore = AuthStore();
  authStore.setRouteName(to.name);
  if(!authStore.authMenuListGet.length) {
    // 未获取到菜单列表
    await initDynamicRouter();
    return next({ ...to, replace: true });
  }
  next();
});

/**
 * @description 路由跳转结束
 * */
router.afterEach(() => {
  NProgress.done();
});
