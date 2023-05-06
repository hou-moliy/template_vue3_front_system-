import router from "@/routers/index";
import { isType } from "@/utils/util";
import { LOGIN_URL } from "@/config/config";
import { AuthStore } from "@/stores/modules/auth";
import { notFoundRouter } from "@/routers/modules/staticRouter";
// 引入 views 文件夹下所有 vue 文件
// const modules = import.meta.glob("@/views/**/*.vue");

/**
 * 初始化动态路由
 */
export const initDynamicRouter = async () => {
  const authStore = AuthStore();
  try {
    await authStore.getAuthMenuList();
    // 添加动态路由
    authStore.flatMenuListGet.forEach(async route => {
      let item = { ...route };
      item.children && delete item.children;
      if (item.component && isType(item.component) == "string") {
        item.component = () => import(`@/views/${item.component}.vue`).catch(() => import("@/components/ErrorMessage/404.vue"));
      }
      if (item?.meta?.isFull) {
        // 是否全屏
        router.addRoute(item);
      } else {
        router.addRoute("layout", item);
      }
    });
    router.addRoute(notFoundRouter);
    return Promise.resolve();
  } catch (error) {
    // 💢 当按钮 || 菜单请求出错时，重定向到登陆页
    router.replace(LOGIN_URL);
    return Promise.reject(error);
  }
};
