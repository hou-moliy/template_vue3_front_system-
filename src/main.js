import { createApp } from "vue";
import App from "./App.vue";
import "@/styles/reset.scss";
import "@/styles/common.scss";
import "@/assets/iconfont/iconfont.scss";
import "@/assets/fonts/font.scss";
import elementIcon from "@/plugins/element-icon";
import "element-plus/dist/index.css";
import "@/styles/element.scss";
import svgIcon from "@/components/SvgIcon/index.vue";
import dayjs from "dayjs";
import "dayjs/locale/zh-cn"; // 导入中文语言包（可选）
// 路由
import router from "@/routers/index";
// i18n
import I18n from "@/languages/index";
// pinia
import pinia from "@/stores/index";
// svg icons
import "virtual:svg-icons-register";
// 全局错误提示
import errorHandler from "@/utils/errorHandler";
//  自定义指令
import directives from "@/directives/index";
import "@/permission";
// import "./mock/index";
import { pickerOptions } from "@/config/datePicker.js";
import "default-passive-events"; // 解决element-plus的警告
// 全局配置
dayjs.locale("zh-cn"); // 设置语言为中文（可选）
const app = createApp(App);
// 将 dayjs 实例添加到 Vue 3 的全局属性中
app.config.globalProperties.$dayjs = dayjs;
app.config.errorHandler = errorHandler;
// 将日期选择器配置添加到 Vue 3 的全局属性中
app.config.globalProperties.$pickerOptions = pickerOptions;

app.use(router).use(I18n).use(pinia).use(elementIcon).use(directives).component("svg-icon", svgIcon).mount("#app");
