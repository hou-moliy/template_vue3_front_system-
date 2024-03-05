/**
 * @description 获取localStorage
 * @param {String} key Storage名称
 */
export function localGet(key) {
  const value = window.localStorage.getItem(key);
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (error) {
    return value;
  }
}

/**
 * @description 存储localStorage
 * @param {String} key Storage名称
 * @param {Any} value Storage值
 */
export function localSet(key, value) {
  window.localStorage.setItem(key, JSON.stringify(value));
}

/**
 * @description 清除localStorage
 * @param {String} key Storage名称
 */
export function localRemove(key) {
  window.localStorage.removeItem(key);
}

/**
 * @description 清除所有localStorage
 */
export function localClear() {
  window.localStorage.clear();
}

/**
 * @description 判断数据类型
 * @param {Any} val 需要判断类型的数据
 */
export function isType(val) {
  if (val === null) return "null";
  if (typeof val !== "object") return typeof val;
  else return Object.prototype.toString.call(val).slice(8, -1).toLocaleLowerCase();
}

/**
 * @description 获取当前时间对应的提示语
 */
export function getTimeState() {
  // 获取当前时间
  let timeNow = new Date();
  // 获取当前小时
  let hours = timeNow.getHours();
  // 判断当前时间段
  if (hours >= 6 && hours <= 12) return `早上好 ⛅`;
  if (hours >= 12 && hours <= 13) return `中午好 🌞`;
  if (hours >= 13 && hours <= 18) return `下午好 🌞`;
  if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
  if (hours >= 0 && hours <= 6) return `凌晨好 🌛`;
}

/**
 * @description 获取当前时间
 */
export function getTime(type) {
  let myDate = new Date();
  let myYear = myDate.getFullYear();
  let myMonth = myDate.getMonth() + 1;
  let myToday = myDate.getDate();
  let myDay = myDate.getDay();
  let myHour = myDate.getHours();
  let myMinute = myDate.getMinutes();
  let mySecond = myDate.getSeconds();
  let week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
  let nowTime;
  if (type === 1) {
    nowTime = myYear + "年" + fillZero(myMonth) + "月" + fillZero(myToday) + "日";
  } else if (type === 2) {
    nowTime = fillZero(myHour) + ":" + fillZero(myMinute) + ":" + fillZero(mySecond);
  } else if (type === 3) {
    nowTime = week[myDay];
  } else {
    nowTime =
      myYear +
      "年" +
      fillZero(myMonth) +
      "月" +
      fillZero(myToday) +
      "日" +
      " " +
      week[myDay] +
      " " +
      fillZero(myHour) +
      ":" +
      fillZero(myMinute) +
      ":" +
      fillZero(mySecond) +
      " " +
      "";
  }
  function fillZero(str) {
    let realNum;
    if (str < 10) {
      realNum = "0" + str;
    } else {
      realNum = str;
    }
    return realNum;
  }
  return nowTime;
}

/**
 * @description 获取浏览器默认语言
 */
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage;
  let defaultBrowserLang = "";
  if (browserLang.toLowerCase() === "cn" || browserLang.toLowerCase() === "zh" || browserLang.toLowerCase() === "zh-cn") {
    defaultBrowserLang = "zh";
  } else {
    defaultBrowserLang = "en";
  }
  return defaultBrowserLang;
}

/**
 * @description 扁平化数组对象(主要用来处理路由菜单)
 * @param {Array} menuList 所有菜单列表
 */
export function getFlatArr(menuList) {
  let newMenuList = JSON.parse(JSON.stringify(menuList));
  return newMenuList.reduce((pre, current) => {
    let flatArr = [...pre, current];
    if (current.children) flatArr = [...flatArr, ...getFlatArr(current.children)];
    return flatArr;
  }, []);
}

/**
 * @description 使用递归，过滤出需要渲染在左侧菜单的列表（剔除 isHide == true 的菜单）
 * @param {Array} menuList 菜单列表
 * */
export function getShowMenuList(menuList) {
  let menus = JSON.parse(JSON.stringify(menuList));
  return menus.filter(item => {
    item.children?.length && (item.children = getShowMenuList(item.children));
    return !item?.meta?.isHide ?? true;
  });
}
// 递归处理菜单列表
export const handleMenuList = menuList => {
  let menus = JSON.parse(JSON.stringify(menuList));
  return menus.map(item => {
    item.meta = {
      title: item.meta.title,
      icon: item.meta.icon || "",
      isHide: item?.hidden ?? false,
      isAffix: false,
      isKeepAlive: item?.noCache === 1 ? true : false,
      isFull: item?.isFull ?? false
    };
    item.children?.length && (item.children = handleMenuList(item.children));
    return item;
  });
};
/**
 * @description 递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 所有菜单列表
 * @param {Object} result 输出的结果
 * @param {String} path 当前递归的路径
 */
export const getAllBreadcrumbList = (menuList, result = { key: "" }, path = []) => {
  for (const item of menuList) {
    result[item.path] = [...path, item];
    if (item.children) getAllBreadcrumbList(item.children, result, result[item.path]);
  }
  return result;
};

/**
 * @description 递把文件按照二进制方式读取
 * @param {File} file 文件源
 */
export const readFile = file => {
  return new Promise(resolve => {
    let reader = new FileReader();
    reader.readAsBinaryString(file);
    reader.onload = ev => {
      resolve(ev.target.result);
    };
  });
};

/**
 * 获取本地图片
 * @param fileUrl // 本地文件路径 如 /src/assets/images/profile.jpg,不支持@
 * @returns {*|string}
 */
export const getAssetsImages = fileUrl => {
  return new URL(fileUrl, import.meta.url).href;
};

// 创建枚举对象，用于界面显示转换
export const createEnumObject = enums => {
  let labels = null;
  let values = null;
  return {
    getLabels() {
      if (!labels) {
        labels = enums.map(item => item.label);
      }
      return labels;
    },

    getValues() {
      if (!values) {
        values = enums.map(item => item.value);
      }
      return values;
    },
    getLabel(value) {
      let index = this.getValues().indexOf(value);
      if (index > -1) {
        return this.getLabels()[index];
      }
    },
    getValue(label) {
      let index = this.getLabels().indexOf(label);
      if (index > -1) {
        return this.getValues()[index];
      }
    },
    getItem(valueOrLabel) {
      let index = this.getValues().indexOf(valueOrLabel);
      if (index < 0) {
        index = this.getLabels().indexOf(valueOrLabel);
      }
      if (index > -1) {
        return enums[index];
      }
    }
  };
};
// 将参数对象转换成formdata
export const getFormData = object => {
  const formData = new FormData();
  Object.keys(object).forEach(key => {
    const value = object[key];
    if (Array.isArray(value)) {
      value.forEach((subValue, i) => {
        formData.append(key + `[${i}]`, subValue);
      });
    } else {
      formData.append(key, object[key]);
    }
  });
  return formData;
};
