import { defineStore } from "pinia";
import { getFlatArr } from "@/utils/util";
import { getShowMenuList, getAllBreadcrumbList, getAssetsImages } from "@/utils/util";
import { routerList } from "@/api/menu.js";
import { getUserInfoApi } from "@/api/login.js";
import router from "@/routers/index.js";
import { removeToken } from "@/utils/auth";
// AuthStore
export const AuthStore = defineStore({
  id: "AuthState",
  state: () => ({
    routeName: "", // 当前页面的 router name，用来做按钮权限筛选
    authMenuList: [], // 菜单权限列表
    allMenuList: [], // 所有菜单列表
    roles: [], // 用户角色
    avatar: "", // 用户头像
    permissions: [], // 用户按钮权限列表
    name: "" // 用户名
  }),
  getters: {
    // 后端返回的菜单列表 ==> 这里没有经过任何处理
    authMenuListGet: state => state.authMenuList,
    // 后端返回的菜单列表 ==> 左侧菜单栏渲染，需要去除 isHide == true
    showMenuListGet: state => getShowMenuList(state.allMenuList),
    // 扁平化之后的一维数组路由，主要用来添加动态路由
    flatMenuListGet: state => getFlatArr(state.authMenuList),
    // 所有面包屑导航列表
    breadcrumbListGet: state => getAllBreadcrumbList(state.authMenuList)
  },
  actions: {
    // getAuthMenuList
    async getAuthMenuList () {
      const res = await routerList();
      const routes = router.getRoutes();
      this.authMenuList = res.data;
      this.allMenuList = [...routes, ...this.authMenuList];
    },
    // setRouteName
    async setRouteName (name) {
      this.routeName = name;
    },
    // 获取用户信息
    getUserInfo () {
      return new Promise((resolve, reject) => {
        getUserInfoApi()
          .then(res => {
            const user = res.user;
            const avatar = !user.avatar ? getAssetsImages("/src/assets/images/profile.jpg") : user.avatar;
            if (res.roles && res.roles.length > 0) {
              this.roles = res.roles;
              this.permissions = res.permissions;
            } else {
              this.roles = ["ROLE_DEFAULT"];
            }
            this.name = user.userName;
            this.avatar = avatar;
            resolve(res);
          })
          .catch(error => {
            reject(error);
          });
      });
    },
    // 退出登录
    logout () {
      return new Promise(resolve => {
        removeToken();
        this.roles = [];
        this.permissions = [];
        this.name = "";
        this.avatar = "";
        resolve();
      });
    }
  }
});
