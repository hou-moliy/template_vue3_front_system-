<template>
  <div id="main" ref="mainRef"></div>
</template>
<script setup>
import * as echarts from "echarts/core";
import { TitleComponent, ToolboxComponent, TooltipComponent, GridComponent, LegendComponent } from "echarts/components";
import { LineChart } from "echarts/charts";
import { UniversalTransition } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { onMounted, defineProps } from "vue";
import { useEcharts } from "@/hooks/useEcharts";
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
    type: Array,
    default: () => ["1", "2", "3", "4", "5", "6", "7"]
  },
  seriesData: {
    type: Array,
    default: () => [[]]
  }
});
let option;
option = {
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
      data: [12000, 13200000, 101000, 13400, 900000, 13000000, 21000]
    },
    {
      name: "呼入平台次数",
      type: "line",
      stack: "Total",
      data: [1200, 1320000, 101000, 13400, 900000, 23000000, 21000]
    },
    {
      name: "成功通话次数",
      type: "line",
      stack: "Total",
      data: [15000, 232000, 200001, 15400, 1900000, 1300000, 4010]
    },
    {
      name: "接通率",
      type: "line",
      stack: "Total",
      data: [320000, 3320000, 3000001, 330004, 3000090, 200030, 320000]
    }
  ]
};
onMounted(() => {
  let chartDom = document.getElementById("main");
  let myChart = echarts.init(chartDom);
  useEcharts(myChart, option);
});
</script>
<style>
#main {
  width: 100%;
  height: 300px;
}
</style>
