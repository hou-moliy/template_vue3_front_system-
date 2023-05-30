import copy from "./src/copy";
import waterMarker from "./src/waterMarker";
import debounce from "./src/debounce";
import throttle from "./src/throttle";
import hasPermi from "./src/hasPermi";
import load from "./src/load";
const directivesList = {
  copy,
  waterMarker,
  debounce,
  throttle,
  hasPermi,
  load
};

const directives = {
  install: function (app) {
    Object.keys(directivesList).forEach(key => {
      // 注册所有自定义指令
      app.directive(key, directivesList[key]);
    });
  }
};

export default directives;
