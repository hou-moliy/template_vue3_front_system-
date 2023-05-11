import { HOME_URL, LOGIN_URL } from "@/config/config";
import LayOut from "@/layouts/index.vue";
import Home from "@/views/home/index.vue";
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
    component: LayOut,
    meta: {
      isHide: false
    },
    redirect: HOME_URL,
    children: [
      {
        path: HOME_URL,
        name: "home",
        component: Home,
        meta: {
          icon: "HomeFilled",
          title: "首页",
          isHide: false,
          isFull: false,
          isAffix: true,
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: "/customerMng",
    name: "customerMng",
    meta: {
      title: "客户管理",
      isKeepAlive: true
    },
    component: LayOut,
    children: [
      {
        path: "/customerMng/accountList",
        name: "accountList",
        component: () => import("@/views/customerMng/accountAudit.vue"),
        meta: {
          title: "账户审批",
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: "/businessService",
    name: "businessService",
    meta: {
      title: "业务办理",
      isKeepAlive: true
    },
    component: LayOut,
    children: [
      {
        path: "/businessService/businessList",
        name: "businessList",
        component: () => import("@/views/businessService/index.vue"),
        meta: {
          title: "业务列表",
          isKeepAlive: true
        }
      },
      {
        path: "/businessService/businessDetail",
        name: "businessDetail",
        component: () => import("@/views/businessService/detail.vue"),
        meta: {
          title: "填写表单",
          isKeepAlive: true,
          isHide: true
        }
      }
    ]
  },
  {
    path: "/businessMng",
    name: "businessMng",
    meta: {
      title: "业务管理",
      isKeepAlive: true
    },
    component: LayOut,
    children: [
      {
        path: "/businessMng/cmpyInfoList",
        name: "cmpyInfoList",
        component: () => import("@/views/businessMng/cmpyInfoList.vue"),
        meta: {
          title: "企业客户账户信息列表",
          isKeepAlive: true
        }
      },
      {
        path: "/businessMng/channelInfoList",
        name: "channelInfoList",
        component: () => import("@/views/businessMng/channelInfoList.vue"),
        meta: {
          title: "渠道账户信息列表",
          isKeepAlive: true
        }
      },
      {
        path: "/businessMng/customManagerList",
        name: "customManagerList",
        component: () => import("@/views/businessMng/customManagerList.vue"),
        meta: {
          title: "客户经理账户信息列表",
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: "/assembly",
    name: "assembly",
    redirect: "/assembly/message",
    component: LayOut,
    meta: {
      icon: "Briefcase",
      title: "常用组件",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    },
    children: [
      {
        path: "/assembly/message",
        name: "message",
        component: () => import("@/views/assembly/message.vue"),
        meta: {
          title: "消息框",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      },
      {
        path: "/assembly/wangEditor",
        name: "wangEditor",
        component: () => import("@/views/assembly/wangEditor.vue"),
        meta: {
          title: "富文本",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
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
