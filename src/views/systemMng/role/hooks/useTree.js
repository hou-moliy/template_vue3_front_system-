import { treeselect, roleMenuTreeselect } from "@/api/menu";
import { ref, onMounted } from "vue";
const useTree = () => {
  const treeData = ref([]);
  const treeRef = ref(null);
  const defaultChecked = ref([]);
  const defaultProps = {
    children: "children",
    label: "label"
  };
  onMounted(async () => {
    getAllTreeSelect();
  });
  const resetChecked = () => {
    treeRef.value?.setCheckedKeys([], false);
  };
  const getAllTreeSelect = async () => {
    const res = await treeselect();
    if (res.code == "0000") {
      treeData.value = res.data;
    }
  };
  const getRoleTreeSelect = async params => {
    const res = await roleMenuTreeselect(params);
    if (res.code == "0000") {
      const list = res?.checkedKeys ?? [];
      defaultChecked.value = list;
      treeData.value = res.menus;
    }
  };

  return {
    treeData,
    treeRef,
    defaultChecked,
    resetChecked,
    getRoleTreeSelect,
    defaultProps
  };
};
export default useTree;
