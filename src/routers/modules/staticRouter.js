// import { RouteRecordRaw } from "vue-router";
import { HOME_URL, LOGIN_URL } from "@/config/config";

/**
 * staticRouter(静态路由)
 */
export const staticRouter = [
  {
    path: "/",
    redirect: HOME_URL,
    meta: {
      isHide: true
    }
  },
  {
    path: LOGIN_URL,
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      icon: "UserOutlined",
      isHide: true
    }
  },
  {
    path: "/layout",
    name: "layout",
    component: () => import("@/layouts/index.vue"),
    isHidden: true,
    meta: {
      isHide: true
    },
    redirect: HOME_URL,
    children: [
      {
        path: HOME_URL,
        name: "home",
        component: () => import("@/views/home/index.vue"),
        meta: {
          icon: "HomeFilled",
          title: "首页",
          isHide: false,
          isFull: false,
          isAffix: true,
          isKeepAlive: true
        }
      },
      {
        path: "/about",
        name: "about",
        component: () => import("@/views/about/index.vue"),
        meta: {
          icon: "UserOutlined",
          title: "about",
          isHide: false,
          isFull: false,
          isAffix: true,
          isKeepAlive: true
        }
      }
    ]
  }
];

/**
 * errorRouter(错误页面路由)
 */
export const errorRouter = [
  {
    path: "/403",
    name: "403",
    component: () => import("@/components/ErrorMessage/403.vue"),
    meta: {
      title: "403页面",
      isHide: true
    }
  },
  {
    path: "/404",
    name: "404",
    isHide: true,
    component: () => import("@/components/ErrorMessage/404.vue"),
    meta: {
      title: "404页面",
      isHide: true
    }
  },
  {
    path: "/500",
    name: "500",
    component: () => import("@/components/ErrorMessage/500.vue"),
    meta: {
      title: "500页面",
      isHide: true
    }
  }
];

/**
 * notFoundRouter(找不到路由)
 */
export const notFoundRouter = {
  path: "/:pathMatch(.*)*",
  name: "notFound",
  redirect: { name: "404" }
};
