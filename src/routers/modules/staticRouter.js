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
      isKeepAlive: true,
      icon: "UserFilled"
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
      isKeepAlive: true,
      icon: "Briefcase"
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
      isKeepAlive: true,
      icon: "GoodsFilled"
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
      },
      {
        path: "/businessMng/branchCmpyList",
        name: "branchCmpyList",
        component: () => import("@/views/businessMng/branchCmpyList.vue"),
        meta: {
          title: "分公司账户信息列表",
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: "/phoneMng",
    name: "phoneMng",
    meta: {
      title: "号码管理",
      isKeepAlive: true,
      icon: "PhoneFilled"
    },
    component: LayOut,
    children: [
      {
        path: "/phoneMng/unUsePhone",
        name: "unUsePhone",
        component: () => import("@/views/phoneMng/unUsePhone.vue"),
        meta: {
          title: "导入未使用号码资源",
          isKeepAlive: true
        }
      },
      {
        path: "/phoneMng/phoneOrder",
        name: "phoneOrder",
        component: () => import("@/views/phoneMng/phoneOrder.vue"),
        meta: {
          title: "号码订购",
          isKeepAlive: true
        }
      },
      {
        path: "/phoneMng/phoneUnOrder",
        name: "phoneUnOrder",
        component: () => import("@/views/phoneMng/phoneUnOrder.vue"),
        meta: {
          title: "号码退订",
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: "/systemMng",
    name: "systemMng",
    meta: {
      title: "系统管理",
      isKeepAlive: true,
      icon: "Briefcase"
    },
    component: LayOut,
    children: [
      {
        path: "/systemMng/roleList",
        name: "roleList",
        component: () => import("@/views/systemMng/role/index.vue"),
        meta: {
          title: "角色管理",
          isKeepAlive: true
        }
      },
      {
        path: "/systemMng/userList",
        name: "userList",
        component: () => import("@/views/systemMng/user/index.vue"),
        meta: {
          title: "账号管理",
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: "/complaintMng",
    name: "complaintMng",
    meta: {
      title: "投诉管理",
      isKeepAlive: true,
      icon: "Briefcase"
    },
    component: LayOut,
    children: [
      {
        path: "/complaintMng/complaintList",
        name: "complaintList",
        component: () => import("@/views/complaintMng/complaintList.vue"),
        meta: {
          title: "投诉台账",
          isKeepAlive: true
        }
      },
      {
        path: "/complaintMng/phoneImport",
        name: "phoneImport",
        component: () => import("@/views/complaintMng/phoneImport.vue"),
        meta: {
          title: "号码导入",
          isKeepAlive: true
        }
      },
      {
        path: "/complaintMng/emailList",
        name: "emailList",
        component: () => import("@/views/complaintMng/emailList.vue"),
        meta: {
          title: "邮件管理",
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: "/middleMng",
    name: "middleMng",
    meta: {
      title: "中间号统计",
      isKeepAlive: true,
      icon: "TrendCharts"
    },
    component: LayOut,
    children: [
      {
        path: "/middleMng/orderList",
        name: "orderList",
        component: () => import("@/views/middleMng/orderList.vue"),
        meta: {
          title: "订单统计",
          isKeepAlive: true
        }
      },
      {
        path: "/middleMng/callList",
        name: "callList",
        component: () => import("@/views/middleMng/callList.vue"),
        meta: {
          title: "通话统计",
          isKeepAlive: true
        }
      },
      {
        path: "/middleMng/msgList",
        name: "msgList",
        component: () => import("@/views/middleMng/msgList.vue"),
        meta: {
          title: "短信统计",
          isKeepAlive: true
        }
      },
      {
        path: "/middleMng/phoneList",
        name: "phoneList",
        component: () => import("@/views/middleMng/phoneList.vue"),
        meta: {
          title: "号码统计",
          isKeepAlive: true
        }
      },
      {
        path: "/middleMng/usePhoneList",
        name: "usePhoneList",
        component: () => import("@/views/middleMng/usePhoneList.vue"),
        meta: {
          title: "号码使用统计",
          isKeepAlive: true
        }
      },
      {
        path: "/middleMng/dayList",
        name: "dayList",
        component: () => import("@/views/middleMng/dayList.vue"),
        meta: {
          title: "中间号行为日统计",
          isKeepAlive: true
        }
      },
      {
        path: "/middleMng/monthList",
        name: "monthList",
        component: () => import("@/views/middleMng/monthList.vue"),
        meta: {
          title: "中间号行为月统计",
          isKeepAlive: true
        }
      },
      {
        path: "/middleMng/monthBill",
        name: "monthBill",
        component: () => import("@/views/middleMng/monthBill.vue"),
        meta: {
          title: "中间号月账单",
          isKeepAlive: true
        }
      }
    ]
  },
  {
    path: "/billMng",
    name: "billMng",
    component: LayOut,
    meta: {
      icon: "Briefcase",
      title: "账单统计",
      isLink: "",
      isHide: false,
      isFull: false,
      isAffix: false,
      isKeepAlive: true
    },
    children: [
      {
        path: "/billMng/monthBillList",
        name: "monthBillList",
        component: () => import("@/views/billMng/monthBillList.vue"),
        meta: {
          title: "月账单列表",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
          isKeepAlive: true
        }
      },
      {
        path: "/billMng/billFormula",
        name: "billFormula",
        component: () => import("@/views/billMng/billFormula.vue"),
        meta: {
          title: "账单公式",
          isLink: "",
          isHide: false,
          isFull: false,
          isAffix: false,
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
