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
    roleType: [], // 用户类型
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
    ], // 账号状态
    businessMidgroup: [], //企业
    businessUser: [], // 企业客户
    businessChannel: [], // 渠道商
    businessManager: [], // 客户经理类型，企业经理
    businessBranch: [], // 分公司类型
    billingType: [
      {
        label: "月租费+按分钟计费",
        value: "0"
      },
      {
        label: "月租费+按绑定次数计费",
        value: "1"
      },
      {
        label: "低消+按分钟计费",
        value: "2"
      },
      {
        label: "低消+按绑定次数计费",
        value: "3"
      }
    ], // 账单方式
    orderType: [
      {
        label: "指定号码量订购",
        value: "0"
      },
      {
        label: "指定号码订购",
        value: "1"
      }
    ], // 号码订购类型
    cancelType: [
      {
        label: "指定号码退订",
        value: "0"
      },
      {
        label: "指定地市号码退订",
        value: "1"
      },
      {
        label: "指定企业账户号码退订",
        value: "2"
      }
    ], // 号码退订类型
    bindingType: [
      {
        label: "AXB模式",
        value: "0"
      },
      {
        label: "AXYB模式",
        value: "1"
      },
      {
        label: "AX模式",
        value: "2"
      },
      {
        label: "GXB模式",
        value: "3"
      }
    ] //业务模式
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
    getDictTypeValue(dictType, dictKey) {
      // 枚举值对象，用于数值转换
      const statusEnumObj = createEnumObject(this.getDictTypes(dictType));
      return statusEnumObj.getLabel(dictKey);
    },
    // 获取枚举对象中的某个枚举值(根据label获取value)
    getDictTypeLabel(dictType, dictValue) {
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
