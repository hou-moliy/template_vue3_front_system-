//  项目名称
export const APP_NAME = import.meta.env.VITE_GLOB_APP_TITLE || "管理平台";
// 首页地址（默认）
export const HOME_URL = "/layout/home/index";

// 登录页地址（默认）
export const LOGIN_URL = "/login";

// 默认主题颜色
export const DEFAULT_PRIMARY = "#304156";

// Tabs（白名单地址，不需要添加到 tabs 的路由地址）
export const TABS_WHITE_LIST = ["/403", "/404", "/500", LOGIN_URL];
