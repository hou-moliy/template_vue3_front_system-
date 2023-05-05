<template>
  <div class="tabs-box">
    <div class="tabs-menu">
      <el-tabs v-model="tabsMenuValue" type="card" editable class="demo-tabs" @tab-click="tabClick"
        @tab-remove="tabRemove">
        <el-tab-pane v-for="item in tabsMenuList" :key="item.path" :label="item.title" :name="item.path"
          :closable="item.close">
          <template #label>
            <el-icon class="tabs-icon" v-if="item.icon && themeConfig.tabsIcon">
              <component :is="item.icon"></component>
            </el-icon>
            {{ item.title }}
          </template>
        </el-tab-pane>
      </el-tabs>
      <MoreButton />
    </div>
  </div>
</template>

<script setup>
import Sortable from "sortablejs";
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GlobalStore } from "@/stores";
import { TabsStore } from "@/stores/modules/tabs";
import { AuthStore } from "@/stores/modules/auth";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
// import { TabsPaneContext } from "element-plus";
import MoreButton from "./components/MoreButton.vue";

const route = useRoute();
const router = useRouter();
const tabStore = TabsStore();
const globalStore = GlobalStore();
const authStore = AuthStore();
const keepAliveStore = KeepAliveStore();

const tabsMenuValue = ref(route.fullPath);
const tabsMenuList = computed(() => tabStore.tabsMenuList);
const themeConfig = computed(() => globalStore.themeConfig);

onMounted(() => {
  tabsDrop();
  initTabs();
});

// 标签拖拽排序
const tabsDrop = () => {
  Sortable.create(document.querySelector(".el-tabs__nav"), {
    draggable: ".el-tabs__item",
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const tabsList = [...tabStore.tabsMenuList];
      const currRow = tabsList.splice(oldIndex, 1)[0];
      tabsList.splice(newIndex, 0, currRow);
      tabStore.setTabs(tabsList);
    }
  });
};

// 初始化需要固定的标签
const initTabs = () => {
  authStore.flatMenuListGet.forEach(item => {
    if(item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
      const tabsParams = {
        icon: item.meta.icon,
        title: item.meta.title,
        path: item.path,
        name: item.name,
        close: !item.meta.isAffix
      };
      tabStore.addTabs(tabsParams);
    }
  });
};

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.fullPath,
  () => {
    if(route.meta.isFull) return;
    tabsMenuValue.value = route.fullPath;
    const tabsParams = {
      icon: route.meta.icon,
      title: route.meta.title,
      path: route.fullPath,
      name: route.name,
      close: !route.meta.isAffix
    };
    tabStore.addTabs(tabsParams);
    route.meta.isKeepAlive && keepAliveStore.addKeepLiveName(route.name);
  },
  {
    immediate: true
  }
);

// Tab Click
const tabClick = tabItem => {
  const fullPath = tabItem.props.name;
  router.push(fullPath);
};

// Remove Tab
const tabRemove = fullPath => {
  const name = tabStore.tabsMenuList.filter(item => item.path == fullPath)[0].name || "";
  keepAliveStore.removeKeepLiveName(name);
  tabStore.removeTabs(fullPath, fullPath == route.fullPath);
};
</script>

<style scoped lang="scss">
// @import "./index.scss";
.tags-view-container {
  height: 34px;
  width: 100%;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);

  .tags-view-wrapper {
    .tags-view-item {
      display: inline-block;
      position: relative;
      cursor: pointer;
      height: 26px;
      line-height: 26px;
      border: 1px solid #d8dce5;
      color: #495060;
      background: #fff;
      padding: 0 8px;
      font-size: 12px;
      margin-left: 5px;
      margin-top: 4px;

      &:first-of-type {
        margin-left: 15px;
      }

      &:last-of-type {
        margin-right: 15px;
      }

      &.active {
        background-color: #1890ff;
        color: #fff;
        border-color: #1890ff;

        &::before {
          content: "";
          background: #fff;
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          position: relative;
          margin-right: 2px;
        }
      }
    }
  }

  .contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: absolute;
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);

    li {
      margin: 0;
      padding: 7px 16px;
      cursor: pointer;

      &:hover {
        background: #eee;
      }
    }
  }
}</style>
