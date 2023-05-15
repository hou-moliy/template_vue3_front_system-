import { treeselect } from "@/api/menu";
import { ref, onMounted } from "vue";
const useTree = () => {
  const treeData = ref([]);
  const treeRef = ref(null);
  onMounted(async () => {
    const res = await treeselect();
    if(res.code === 200) {
      treeData.value = res.data;
    }
  });

  return {
    treeData,
    treeRef
  };
};
export default useTree;
