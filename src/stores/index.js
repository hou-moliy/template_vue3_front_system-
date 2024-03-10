import { defineStore, createPinia } from "pinia";
import { DEFAULT_PRIMARY } from "@/config/config";
import piniaPersistConfig from "@/config/piniaPersist";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { provinceAndCity } from "@/api/common";

// defineStore 调用后返回一个函数，调用该函数获得 Store 实体
export const GlobalStore = defineStore({
  // id: 必须的，在所有 Store 中唯一
  id: "GlobalState",
  // state: 返回对象的函数
  state: () => ({
    // element组件大小
    assemblySize: "default",
    // language
    language: "",
    // themeConfig
    themeConfig: {
      // 布局切换 ==>  纵向：vertical | 经典：classic | 横向：transverse | 分栏：columns
      layout: "vertical",
      // 默认 primary 主题颜色
      primary: DEFAULT_PRIMARY,
      // 深色模式
      isDark: false,
      // 灰色模式
      isGrey: false,
      // 色弱模式
      isWeak: false,
      // 折叠菜单
      isCollapse: false,
      // 面包屑导航
      breadcrumb: true,
      // 面包屑导航图标
      breadcrumbIcon: false,
      // 标签页
      tabs: true,
      // 标签页图标
      tabsIcon: true,
      // 页脚
      footer: true,
      // 当前页面是否全屏
      maximize: false
    },
    // 省份-城市数据
    provinceCityData: []
  }),
  getters: {},
  actions: {
    // setAssemblySizeSize
    setAssemblySizeSize(assemblySize) {
      this.assemblySize = assemblySize;
    },
    // updateLanguage
    updateLanguage(language) {
      this.language = language;
    },
    // setThemeConfig
    setThemeConfig(themeConfig) {
      this.themeConfig = themeConfig;
    },
    // setProvinceCityData
    setProvinceCityData(provinceCityData) {
      this.provinceCityData = provinceCityData;
    },
    // getProvinceCityData
    getProvinceCityData() {
      provinceAndCity().then(res => {
        if (res.code == "0000") {
          this.setProvinceCityData(res.data);
        }
      });
    },
    // 根据value获取地址label
    getAddress(value) {
      let label = [];
      if (value.length === 2) {
        label = [
          this.provinceCityData?.find(item => item.value === value[0])?.label,
          this.provinceCityData?.find(item => item.value === value[0]).children.find(item => item.value === value[1])?.label
        ];
      } else if (value.length === 3) {
        label = [
          this.provinceCityData?.find(item => item.value === value[0]).label,
          this.provinceCityData?.find(item => item.value === value[0]).children.find(item => item.value === value[1]).label,
          this.provinceCityData
            ?.find(item => item.value === value[0])
            .children.find(item => item.value === value[1])
            .children.find(item => item.value === value[2]).label
        ];
      }
      return label;
    },
    // 根据label获取地址value
    getAddressValue(label) {
      let value = [];
      if (label.length === 1) {
        const provinceCity = this.provinceCityData.find(item => {
          const cityFound = item.children.find(city => city.label === label[0]);
          return !!cityFound;
        });
        if (provinceCity) {
          const province = provinceCity.value;
          const city = provinceCity.children?.find(i => i.label == label[0]).value;
          return [province, city];
        }
      } else if (label.length === 2) {
        value = [
          this.provinceCityData?.find(item => item.label === label[0])?.value,
          this.provinceCityData?.find(item => item.label === label[0]).children.find(item => item.label === label[1])?.value
        ];
      } else if (label.length === 3) {
        value = [
          this.provinceCityData?.find(item => item.label === label[0]).value,
          this.provinceCityData?.find(item => item.label === label[0]).children.find(item => item.label === label[1]).value,
          this.provinceCityData
            ?.find(item => item.label === label[0])
            .children.find(item => item.label === label[1])
            .children.find(item => item.label === label[2]).value
        ];
      }
      return value;
    },
    persist: piniaPersistConfig("GlobalState")
  }
});

// piniaPersist(持久化)
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

export default pinia;
