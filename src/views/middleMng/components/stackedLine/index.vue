<template>
  <div id="main" ref="mainRef"></div>
</template>
<script setup>
import * as echarts from "echarts/core";
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { watch, reactive, nextTick } from "vue";
import useEcharts from "@/hooks/useEcharts";
echarts.use([
  TitleComponent,
  ToolboxComponent,
  TooltipComponent,
  GridComponent,
  LegendComponent,
  LineChart,
  CanvasRenderer,
  UniversalTransition
]);
const props = defineProps({
  title: {
    type: String,
    default: ""
  },
  legendData: {
    type: Array,
    default: () => ["订单量", "呼入平台次数", "成功通话次数", "接通率"]
  },
  xData: {
    // 横坐标
    type: Array,
    default: () => []
  },
  seriesData: {
    // 展示的数据值数组
    type: Array,
    default: () => [[]]
  }
});
let option = reactive({
  title: {
    // 标题
    text: props.title
  },
  tooltip: {
    // 提示框组件
    trigger: "axis"
  },
  legend: {
    //图例组件
    data: props.legendData
  },
  grid: {
    // 组件距离容器左右侧的距离
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true
  },
  toolbox: {
    // 工具栏
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    // x轴
    type: "category",
    boundaryGap: false,
    data: props.xData
  },
  yAxis: {
    // y轴
    type: "value",
    min: "0",
    max: "50000000",
    splitNumber: "10"
  },
  series: [
    // 数据
    {
      name: "订单量",
      type: "line",
      stack: "Total",
      data: []
    },
    {
      name: "呼入平台次数",
      type: "line",
      stack: "Total",
      data: []
    },
    {
      name: "成功通话次数",
      type: "line",
      stack: "Total",
      data: []
    },
    {
      name: "接通率",
      type: "line",
      stack: "Total",
      data: []
    }
  ]
});
watch(
  () => props,
  newVal => {
    nextTick(() => {
      option.xAxis.data = newVal.xData;
      option.title.text = newVal.title;
      let chartDom = document.getElementById("main");
      let myChart = echarts.init(chartDom);
      useEcharts(myChart, option);
    });
  },
  {
    immediate: true,
    deep: true
  }
);
</script>
<style>
#main {
  width: 100%;
  height: 300px;
}
</style>
