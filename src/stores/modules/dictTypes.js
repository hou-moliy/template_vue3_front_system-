import { defineStore } from "pinia";
import { createEnumObject } from "@/utils/util";
// dictTypesStore
const DictTypesStore = defineStore({
  id: "dictTypesStore",
  state: () => ({
    auditStatus: [
      { label: "待审核", value: "0" },
      { label: "审核不通过", value: "1" },
      { label: "审核通过", value: "2" }
    ], // 审核状态
    roleType: [
      {
        label: "运营",
        value: "0"
      },
      {
        label: "开发",
        value: "1"
      },
      {
        label: "测试",
        value: "2"
      }
    ], // 用户类型
    statusType: [
      {
        label: "正常",
        value: "0",
        type: "success"
      },
      {
        label: "冷冻",
        value: "1",
        type: "warning"
      },
      {
        label: "删除",
        value: "2",
        type: "danger"
      }
    ] // 账号状态
  }),
  getters: {},
  actions: {
    // 存储枚举对象
    setDictTypes(dictType, dictList) {
      this[dictType] = dictList;
    },
    // 获取枚举对象
    getDictTypes(dictType) {
      if (!this[dictType]) {
        return [];
      }
      return this[dictType];
    },
    // 获取枚举对象中的某个枚举值(根据value获取label)
    getDictTypeLabel(dictType, dictKey) {
      // 枚举值对象，用于数值转换
      const statusEnumObj = createEnumObject(this.getDictTypes(dictType));
      return statusEnumObj.getLabel(dictKey);
    },
    // 获取枚举对象中的某个枚举值(根据label获取value)
    getDictTypeValue(dictType, dictValue) {
      // 枚举值对象，用于数值转换
      const statusEnumObj = createEnumObject(this.getDictTypes(dictType));
      return statusEnumObj.getValue(dictValue);
    },
    // 获取枚举对象中的某个枚举值(根据value或label获取对象)
    getDictTypeItem(dictType, dictValueOrLabel) {
      // 枚举值对象，用于数值转换
      const statusEnumObj = createEnumObject(this.getDictTypes(dictType));
      return statusEnumObj.getItem(dictValueOrLabel);
    },
    // 获取枚举对象的所有label
    getDictTypeList(dictType) {
      // 枚举值对象，用于数值转换
      const statusEnumObj = createEnumObject(this.getDictTypes(dictType));
      return statusEnumObj.getLabels();
    },
    // 获取枚举对象的所有value
    getDictTypeValues(dictType) {
      // 枚举值对象，用于数值转换
      const statusEnumObj = createEnumObject(this.getDictTypes(dictType));
      return statusEnumObj.getValues();
    }
  }
});
export default DictTypesStore;
