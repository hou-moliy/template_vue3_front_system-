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
    if (res.code === 200) {
      treeData.value = res.data;
    }
  };
  const getRoleTreeSelect = async params => {
    const res = await roleMenuTreeselect(params);
    if (res.code === 200) {
      const list = res?.checkedKeys ?? [];
      // const list = [6143, 6144, 6145, 6146, 6155, 6163, 6164, 6165, 6166, 6167, 6168, 6169, 6157, 6158, 6159];
      defaultChecked.value = list;
      // treeRef.value?.setCheckedKeys(list);
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
