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
import "./mock/index";

const app = createApp(App);

app.config.errorHandler = errorHandler;

app.use(router).use(I18n).use(pinia).use(elementIcon).use(directives).component("svg-icon", svgIcon).mount("#app");
