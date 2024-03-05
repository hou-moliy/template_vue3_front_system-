<template>
  <svg aria-hidden="true" class="svg-icon" :width="props.size" :height="props.size">
    <use :xlink:href="symbolId" :fill="props.color" />
  </svg>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  prefix: {
    type: String,
    default: "icon"
  },
  name: {
    type: String,
    required: true
  },
  color: {
    type: String,
    default: "#fff"
  },
  size: {
    type: String,
    default: "1em"
  }
});

const symbolId = computed(() => `#${props.prefix}-${props.name}`);
</script>
<style lang="scss" scoped>
svg {
  vertical-align: middle;
  fill: currentColor;
  margin-right: 10px;
  use {
    width: 100%;
    height: 100%;
  }
}
</style>
