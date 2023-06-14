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
      const map = new Map();
      rows.forEach(item => {
        //  时间相同的数据中的callInNum,callOutNum,sucCallNum加起来，返回{statTime,callInNum,callOutNum,sucCallNum}
        const { statTime, callInNum, callOutNum, sucCallNum } = item;
        if (map.has(statTime)) {
          const existingData = map.get(statTime);
          existingData.callInNum += callInNum;
          existingData.callOutNum += callOutNum;
          existingData.sucCallNum += sucCallNum;
        } else {
          map.set(statTime, {
            statTime,
            callInNum,
            callOutNum,
            sucCallNum
          });
        }
      });
      map.forEach(data => {
        xData.push(data.statTime);
        callInNum.push(data.callInNum);
        callOutNum.push(data.callOutNum);
        sucCallNum.push(data.sucCallNum);
        // 100%，成功率的计算
        let sucRate = 0;
        if (data?.callInNum) {
          sucRate = (data?.sucCallNum / data?.callInNum) * 100 + "%";
        }
        callSucRate.push(sucRate);
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
    handleSearch();
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
