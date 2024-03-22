<template>
  <div class="layout-search-dialog">
    <el-popover placement="left" trigger="click" ref="popoverRef" :width="400">
      <template #reference>
        <img src="@/assets/svg/sosuo.svg" class="toolBar-icon" alt="菜单搜索" />
      </template>
      <el-autocomplete
        v-model="searchMenu"
        ref="menuInputRef"
        placeholder="菜单搜索 ：支持菜单名称、路径"
        :fetch-suggestions="searchMenuList"
        @select="handleClickMenu"
        @keyup.enter.native.prevent="KeyEnter"
        @click.stop
        clearable
        v-if="completeShow"
      >
        <template #prefix>
          <el-icon>
            <Search />
          </el-icon>
        </template>
        <template #default="{ item }">
          <!-- <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon> -->
          <SvgIcon :name="item.meta.icon" color="#333" />
          <span> {{ item.meta.title }} </span>
        </template>
      </el-autocomplete>
    </el-popover>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";
import { AuthStore } from "@/stores/modules/auth";
import { ElMessage } from "element-plus";
const router = useRouter();
const authStore = AuthStore();
const menuList = computed(() => authStore.flatMenuListGet.filter(item => !item.meta.isHide));

const searchMenuList = (queryString, cb) => {
  const results = queryString ? menuList.value.filter(filterNodeMethod(queryString)) : menuList.value;
  cb(results);
};

// 打开搜索菜单
const popoverRef = ref(null);
const completeShow = ref(true);
const menuInputRef = ref();
const searchMenu = ref("");

// 筛选菜单
const filterNodeMethod = queryString => {
  return restaurant => {
    return (
      restaurant.path.toLowerCase().indexOf(queryString.toLowerCase()) > -1 ||
      restaurant.meta.title.toLowerCase().indexOf(queryString.toLowerCase()) > -1
    );
  };
};

// 点击菜单跳转
const handleClickMenu = menuItem => {
  searchMenu.value = "";
  if (menuItem.meta.isLink) window.open(menuItem.meta.isLink, "_blank");
  else router.push(menuItem.path);
};
// 键盘enter事件
const KeyEnter = e => {
  if (e.target.value) {
    const menuItem = menuList.value.find(filterNodeMethod(e.target.value));
    if (menuItem) {
      searchMenu.value = "";
      if (menuItem.meta.isLink) window.open(menuItem.meta.isLink, "_blank");
      else router.push(menuItem.path);
      popoverRef.value.hide();
      completeShow.value = false;
    } else {
      ElMessage.warning("未找到相关菜单");
    }
  } else {
    ElMessage.warning("请输入搜索内容");
  }
};
</script>

<style scoped lang="scss">
.toolBar-icon {
  vertical-align: middle;
  width: 20px;
  height: 20px;
  cursor: pointer;
}
/* 菜单搜索样式 */
.layout-search-dialog {
  :deep(.el-dialog) {
    background: rgb(0 0 0 / 50%);
    border-radius: 0 !important;
    box-shadow: unset !important;
    .el-dialog__header {
      border-bottom: none !important;
    }
  }
  :deep(.el-autocomplete) {
    position: absolute;
    top: 100px;
    left: 50%;
    width: 550px;
    transform: translateX(-50%);
  }
}
.el-autocomplete__popper {
  .el-icon {
    position: relative;
    top: 2px;
    font-size: 16px;
  }
  span {
    margin: 0 0 0 10px;
    font-size: 14px;
  }
}
</style>
