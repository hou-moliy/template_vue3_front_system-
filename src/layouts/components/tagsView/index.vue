<template>
  <div id="tags-view-container" class="tags-view-container">
    <scrollPane class="tags-view-wrapper">
      <router-link tag="span" class="tags-view-item" :class="isActive(item) ? 'active' : ''" v-for="item in tabsMenuList"
        :key="item.path" :to="{
          path: item.path,
          query: item.query,
          fullPath: item.fullPath
        }">
        {{ item.title }}

        <el-icon v-if="!isAffix(item)" @click.prevent.stop="closeSelectedTag(item)">
          <Close />
        </el-icon>
      </router-link>
    </scrollPane>
  </div>
</template>
<script setup>
import { RouterLink } from "vue-router";
import scrollPane from "./scrollPane.vue";
import Sortable from "sortablejs";
import { ref, computed, watch, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { GlobalStore } from "@/stores";
import { TabsStore } from "@/stores/modules/tabs";
import { AuthStore } from "@/stores/modules/auth";
import { KeepAliveStore } from "@/stores/modules/keepAlive";
import MoreButton from "./components/MoreButton.vue";

const route = useRoute();
const router = useRouter();
const tabStore = TabsStore();
const globalStore = GlobalStore();
const authStore = AuthStore();
const keepAliveStore = KeepAliveStore();

const tabsMenuValue = ref(route.path);
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
        fullPath: item.fullPath,
        name: item.name,
        close: !item.meta.isAffix
      };
      tabStore.addTabs(tabsParams);
    }
  });
};

// 监听路由的变化（防止浏览器后退/前进不变化 tabsMenuValue）
watch(
  () => route.path,
  () => {
    if(route.meta.isFull) return;
    tabsMenuValue.value = route.path;
    const tabsParams = {
      icon: route.meta.icon,
      title: route.meta.title,
      path: route.path,
      fullPath: route.fullPath,
      name: route.name,
      close: !route.meta.isAffix
    };
    tabStore.addTabs(tabsParams);
    route.meta.isKeepAlive && keepAliveStore.addKeepLiveName(route.name);
  },
  {
    immediate: true,
    deep: true
  }
);

// Tab Click
const tabClick = tabItem => {
  const fullPath = tabItem.props.name;
  console.log(tabItem);
  router.push(fullPath);
};

// Remove Tab
const tabRemove = path => {
  const name = tabStore.tabsMenuList.filter(item => item.path == path)[0].name || "";
  keepAliveStore.removeKeepLiveName(name);
  tabStore.removeTabs(path, path == route.path);
};

const isActive = item => {
  return item.path === route.path;
};
const isAffix = tag => {
  return tag.meta && tag.meta.affix;
};
const closeSelectedTag = ({ path }) => {
  tabRemove(path);
};
</script>
<style lang="scss" scoped>
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
}
</style>

<style lang="scss">
//reset element css of el-icon-close
.tags-view-wrapper {
  .tags-view-item {
    .el-icon-close {
      width: 16px;
      height: 16px;
      vertical-align: 2px;
      border-radius: 50%;
      text-align: center;
      transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
      transform-origin: 100% 50%;

      &:before {
        transform: scale(0.6);
        display: inline-block;
        vertical-align: -3px;
      }

      &:hover {
        background-color: #b4bccc;
        color: #fff;
      }
    }
  }
}
</style>
