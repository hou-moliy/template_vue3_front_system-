import { ref, onMounted, reactive } from "vue";
import { callList } from "@/api/stats";
import { useLoading } from "@/hooks/useLoading";
export default function (form) {
  const { isLoading, loadingWrapper } = useLoading();
  const tableData = ref([]);
  const total = ref(0);
  const getList = () => {
    return new Promise(resolve => {
      loadingWrapper(
        callList(form).then(res => {
          if (res.code === "0000") {
            tableData.value = res.rows;
            total.value = res.total;
            resolve(res);
          }
        })
      );
    });
  };
  // 处理搜索之后的统计渲染
  const LineCharts = reactive({
    title: "",
    xData: [],
    seriesData: [[]]
  });
  const handleSearch = () => {
    getList().then(res => {
      const { rows } = res;
      const xData = [];
      const seriesData = [];
      const callInNum = [];
      const callOutNum = [];
      const sucCallNum = [];
      const callSucRate = [];
      rows.forEach(item => {
        xData.push(item.statTime);
        callInNum.push(item.callInNum);
        callOutNum.push(item.callOutNum);
        sucCallNum.push(item.sucCallNum);
        callSucRate.push(item.callSucRate);
      });
      seriesData.push(callInNum);
      seriesData.push(callOutNum);
      seriesData.push(sucCallNum);
      seriesData.push(callSucRate);
      LineCharts.title = "通话统计";
      LineCharts.xData = xData;
      LineCharts.seriesData = seriesData;
    });
  };
  onMounted(() => {
    getList();
  });
  return {
    total,
    getList,
    tableData,
    handleSearch,
    LineCharts,
    isLoading
  };
}
