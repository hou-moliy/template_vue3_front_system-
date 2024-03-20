import { treeselect, roleMenuTreeselect } from "@/api/menu";
import { ref, onMounted, nextTick } from "vue";
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
    await treeselect().then(res => {
      treeData.value = res.data;
    });
  };
  const getRoleTreeSelect = async params => {
    await roleMenuTreeselect(params).then(res => {
      const list = res?.checkedKeys ?? [];
      defaultChecked.value = list;
      treeData.value = res.menus;
      nextTick(() => {
        list.forEach(element => {
          const node = treeRef.value?.getNode(element);
          if (node.isLeaf) {
            treeRef.value?.setChecked(node, true, true);
          }
        });
      });
    });
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
