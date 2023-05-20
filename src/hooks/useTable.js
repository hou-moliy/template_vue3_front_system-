import { ref, reactive } from "vue";
const useTable = () => {
  const rowSpanNumObject = reactive({});
  const rowSpanArray = ref([]);
  // 合并行
  const spanMethod = ({ row, column, rowIndex, columnIndex }) => {
    if(rowSpanArray.value.includes(column["property"])) {
      const rowspan = rowSpanNumObject[column["property"]][rowIndex];
      if(rowspan > 0) {
        return { rowspan: rowspan, colspan: 1 };
      }
      return { rowspan: 0, colspan: 0 };
    }
    return { rowspan: 1, colspan: 1 };
  };
  // 合并相同数据，导出合并列所需的方法
  const getRowSpanMethod = (data, rowSpans) => {
    rowSpanArray.value = rowSpans;
    // 初始化 rowSpanNumObject
    rowSpanArray.value.forEach(item => {
      rowSpanNumObject[item] = new Array(data.length).fill(1);
      rowSpanNumObject[`${item}-index`] = 0;
    });
    // 计算相关的合并信息
    for(let i = 1; i < data.length; i++) {
      rowSpanArray.value.forEach(key => {
        const index = rowSpanNumObject[`${key}-index`];
        if(data[i][key] === data[i - 1][key]) {
          rowSpanNumObject[key][index]++;
          rowSpanNumObject[key][i] = 0;
        } else {
          rowSpanNumObject[`${key}-index`] = i;
          rowSpanNumObject[key][i] = 1;
        }
      });
    }
    return spanMethod;
  };

  return {
    getRowSpanMethod
  };
};
export default useTable;
