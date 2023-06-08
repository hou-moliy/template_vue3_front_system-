import { createRouter, createWebHistory } from "vue-router";
import { AuthStore } from "@/stores/modules/auth";
import { staticRouter, errorRouter } from "@/routers/modules/staticRouter";
import NProgress from "@/config/nprogress";

/**
 * @description 动态路由参数配置简介
 * @param path ==> 菜单路径
 * @param name ==> 菜单别名
 * @param redirect ==> 重定向地址
 * @param component ==> 视图文件路径
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isLink ==> 是否外链
 * @param meta.isHide ==> 是否隐藏  默认不隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面) 默认不全屏
 * @param meta.isAffix ==> 是否固定在 tabs nav 默认不固定
 * @param meta.isKeepAlive ==> 是否缓存
 * */

const router = createRouter({
  history: createWebHistory(),
  routes: staticRouter.concat(errorRouter),
  // routes: [],
  strict: false,
  scrollBehavior: () => ({ left: 0, top: 0 })
});

/**
 * @description 重置路由
 * */
export const resetRouter = () => {
  const authStore = AuthStore();
  authStore.flatMenuListGet.forEach(route => {
    const { name } = route;
    router.removeRoute(name);
  });
};

/**
 * @description 路由跳转错误
 * */
router.onError(error => {
  NProgress.done();
  console.warn("路由错误", error.message);
});

export default router;
