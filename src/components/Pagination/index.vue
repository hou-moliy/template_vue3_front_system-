<template>
  <div :class="{ hidden: props.hidden }" class="pagination-container mt-25 flx-end">
    <el-pagination :background="props.background" v-model:current-page="currentPage" v-model:page-size="pageSize"
      :layout="props.layout" :page-sizes="props.pageSizes" :total="props.total" v-bind="$attrs"
      @sizeChange="handleSizeChange" @currentChange="handleCurrentChange" />
  </div>
</template>
<script setup>
import { defineProps, computed, defineEmits } from "vue";

const props = defineProps({
  total: {
    required: true,
    type: Number
  },
  page: {
    type: Number,
    default: 1
  },
  limit: {
    type: Number,
    default: 20
  },
  pageSizes: {
    type: Array,
    default() {
      return [10, 20, 30, 50];
    }
  },
  layout: {
    type: String,
    default: "total, sizes, prev, pager, next, jumper"
  },
  background: {
    type: Boolean,
    default: true
  },
  autoScroll: {
    type: Boolean,
    default: true
  },
  hidden: {
    type: Boolean,
    default: false
  }
});
const emit = defineEmits(["pagination", "update:page", "update:limit"]);

const currentPage = computed({
  get() {
    return props.page;
  },
  set(val) {
    emit("update:page", val);
  }
});

const pageSize = computed({
  get() {
    return props.limit;
  },
  set(val) {
    emit("update:limit", val);
  }
});

const handleSizeChange = val => {
  emit("pagination", { page: currentPage, limt: val });
};
const handleCurrentChange = val => {
  emit("pagination", { page: val, limt: pageSize });
};
</script>
<style lang="scss" scoped></style>
