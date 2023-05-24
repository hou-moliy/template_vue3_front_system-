import { ref } from "vue";
import { getDict } from "@/api/common";
const useDictTypes = dictTypes => {
  const dictList = ref([]);
  const getTypeList = () => {
    getDict({ dictTypes }).then(res => {
      if (res.code === 200) {
        dictList.value = res.data;
      }
    });
  };
  return {
    dictList,
    getTypeList
  };
};
export default useDictTypes;
