import axios from "axios";
import { getToken } from "@/utils/auth";
import { AuthStore } from "@/stores/modules/auth";
import { ElMessageBox, ElNotification, ElMessage } from "element-plus";
import router from "../routers";
import { LOGIN_URL } from "@/config/config";
axios.defaults.headers["Content-Type"] = "application/json;charset=utf-8";
// 创建axios实例
const service = axios.create({
  // 超时
  timeout: 300000
});
// request拦截器
service.interceptors.request.use(
  config => {
    if (getToken()) {
      config.headers["Authorization"] = "Bearer " + getToken(); // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config;
  },
  error => {
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  res => {
    const code = res.data.code;
    if (code === 401) {
      ElMessageBox.confirm("登录状态已过期，您可以继续留在该页面，或者重新登录", "系统提示", {
        confirmButtonText: "重新登录",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        const authStore = AuthStore();
        authStore.logout().then(() => {
          location.reload(); // 为了重新实例化vue-router对象 避免bug
        });
      });
    } else if (code !== 200) {
      ElNotification.error({
        title: res.data.message || res.data.msg || "Error"
      });
      return Promise.reject("error");
    } else {
      return res.data;
    }
  },
  error => {
    ElMessage({
      message: error.message || "服务器异常",
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;
