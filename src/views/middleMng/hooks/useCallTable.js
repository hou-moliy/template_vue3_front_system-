import { ref, computed, onMounted } from "vue";
import { callList } from "@/api/stats";
export default function (form) {
  const tableData = ref([]);
  const total = computed(() => tableData.value.length);
  const getList = () => {
    tableData.value = [
      {
        cmpy: "美团",
        manager: "美团经理",
        branchCmpy: "美团分公司",
        channel: "渠道商",
        phone: "123",
        times: "2",
        createTime: "2023/5/16"
      }
    ];
    callList(form).then(res => {
      if (res.code === 200) {
        tableData.value = res.data;
      }
    });
  };
  onMounted(() => {
    getList();
  });
  return {
    total,
    getList,
    tableData
  };
}
