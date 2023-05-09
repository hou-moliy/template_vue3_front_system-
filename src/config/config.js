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

// 是否展示锁屏功能
export const LOCK_PAGE = false;
// 是否展示全屏功能
export const FULL_PAGE = false;
// 是否展示中英文切换功能
export const I18N = false;
// 是否展示主题切换功能
export const THEME = false;
// 是否展示菜单搜索功能
export const MENU_SEARCH = false;
