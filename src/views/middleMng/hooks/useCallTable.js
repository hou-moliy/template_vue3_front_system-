import { ref, computed, onMounted } from "vue";
import { callList } from "@/api/stats";
export default function (form) {
  const tableData = ref([]);
  const total = computed(() => tableData.value.length);
  const getList = () => {
    tableData.value = [];
    callList(form).then(res => {
      if (res.code === '0000') {
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
