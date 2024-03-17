<template>
  <div class="box">
    <!-- 展示项目中的svg -->
    <div class="svg-wrap" v-for="item in svgList" :key="item.name">
      <SvgIcon v-copy="item.name" :name="item?.name" color="#409EFF" size="2em" />
    </div>
  </div>
</template>
<script setup>
import { reactive } from "vue";
// 获取项目中的svg，assets/svg下的svg文件
const importSvgList = import.meta.glob("@/assets/svg/*", { eager: true });
console.log(importSvgList, "svg列表");
let svgList = reactive([]);
svgList = Object.keys(importSvgList).map(key => {
  // /src/assets/svg/tree-table.svg 取tree-table  作为name
  // 正则表达式取出svg文件名
  const name = key.match(/\/([a-zA-Z0-9-]+)\.svg$/)[1];
  console.log(name, "name");
  return {
    name,
    path: importSvgList[key].default
  };
});
</script>
<style lang="scss" scoped>
.box {
  display: flex;
  flex-wrap: wrap;
  cursor: pointer;
  .svg-wrap {
    margin: 10px;
  }
}
</style>
