import { defineStore } from "pinia";
import { TABS_WHITE_LIST } from "@/config/config";
import piniaPersistConfig from "@/config/piniaPersist";
import router from "@/routers/index";

// TabsStore
export const TabsStore = defineStore({
  id: "TabsState",
  state: () => ({
    tabsMenuList: []
  }),
  getters: {},
  actions: {
    // Add Tabs
    async addTabs(tabItem) {
      if (TABS_WHITE_LIST.includes(tabItem.path)) return;
      if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
        this.tabsMenuList.push(tabItem);
      }
    },
    // Remove Tabs
    async removeTabs(tabPath, isCurrent = true) {
      const tabsMenuList = this.tabsMenuList;
      if (isCurrent) {
        tabsMenuList.forEach((item, index) => {
          if (item.fullPath !== tabPath) return;
          const nextTab = tabsMenuList[index + 1] || tabsMenuList[index - 1];
          if (!nextTab) return;
          router.push(nextTab.path);
        });
      }
      this.tabsMenuList = tabsMenuList.filter(item => item.fullPath !== tabPath);
    },
    // Close MultipleTab
    async closeMultipleTab(tabsMenuValue) {
      this.tabsMenuList = this.tabsMenuList.filter(item => {
        return item.fullPath === tabsMenuValue || !item.close;
      });
    },
    // Set Tabs
    async setTabs(tabsMenuList) {
      this.tabsMenuList = tabsMenuList;
    },
    // Set Tabs Title
    async setTabsTitle(title) {
      const nowFullPath = location.hash.substring(1);
      this.tabsMenuList.forEach(item => {
        if (item.path == nowFullPath) item.title = title;
      });
    },
    updateTabs(tabItem) {
      const tabsMenuList = this.tabsMenuList;
      tabsMenuList.forEach(item => {
        if (item.path === tabItem.path) {
          Object.assign(item, tabItem);
        }
      });
    }
  },
  persist: piniaPersistConfig("TabsState")
});
