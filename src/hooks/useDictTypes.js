import { ref } from "vue";
import { getDict } from "@/api/common";
import DictTypesStore from "@/stores/modules/dictTypes";
const useDictTypes = dictTypes => {
  const dictList = ref([]);
  const { setDictTypes, getDictTypes } = DictTypesStore();
  const getTypeList = () => {
    const list = getDictTypes(dictTypes);
    if (list.length > 0) {
      dictList.value = getDictTypes(dictTypes);
    } else {
      getDict({ dictTypes }).then(res => {
        if (res.code === "0000") {
          dictList.value = res.data[dictTypes] || [];
          console.log(dictList.value, dictTypes);
          setDictTypes(dictTypes, dictList.value);
          // dictList.value = getDictTypes(dictTypes);
        }
      });
    }
  };
  return {
    dictList,
    getTypeList
  };
};
export default useDictTypes;
