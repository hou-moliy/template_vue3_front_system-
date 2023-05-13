<template>
  <el-form :model="interForm" ref="interFormRef" label-position="left" :disabled="disabled">
    <!-- 基本信息 -->
    <el-card class="box-card">
      <template #header> 基本信息 </template>
      <div class="form-item-wrap">
        <el-form-item label="项目名称" prop="proName">
          <el-input v-model="interForm.proName" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="归属省份地市" prop="province">
          <regionSelect v-model="address" :level="2" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="是否集成商" prop="integration">
          <el-switch v-model="interForm.integration" />
          <el-input v-model="interForm.start" placeholder="请输入集成商名称" />
        </el-form-item>
        <el-form-item label="业务模式" prop="businessType">
          <el-select v-model="interForm.businessType" placeholder="请选择业务模式">
            <el-option label="AXB模式" value="AXB" />
            <el-option label="AXYB模式" value="AXYB" />
            <el-option label="AX模式" value="AX" />
            <el-option label="GXB模式" value="GXB" />
          </el-select>
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="是否固话主叫" prop="calling">
          <el-switch v-model="interForm.calling" />
        </el-form-item>
        <el-form-item label="应用行业" prop="industry">
          <el-input v-model="interForm.appeal" placeholder="请输入应用行业" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="应用平台" prop="platform">
          <el-input v-model="interForm.platform" placeholder="请输入应用平台" />
        </el-form-item>
        <el-form-item label="业务场景描述" prop="remark">
          <el-input v-model="interForm.remark" placeholder="请输入业务场景描述" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="集成中间号的诉求" prop="appeal">
          <el-input v-model="interForm.appeal" placeholder="请输入集成中间号的诉求" />
        </el-form-item>
        <el-form-item label="话务量评估" prop="phoneTraffic">
          <el-input v-model="interForm.phoneTraffic" placeholder="请输入话务量评估" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="号码需求量" prop="phoneDemand">
          <el-input v-model="interForm.phoneDemand" placeholder="请输入号码需求量" />
        </el-form-item>
        <el-form-item label="是否录音" prop="record">
          <el-switch v-model="interForm.record" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="省市侧评审意见" prop="opinion">
          <el-switch v-model="interForm.opinionOpen" />
          <el-input v-model="interForm.opinion" placeholder="请输入不通过原因" />
        </el-form-item>
        <el-form-item label="业务类型" prop="reason">
          <el-switch v-model="interForm.serviceType" />
          <el-input v-model="interForm.reason" placeholder="请输入变更原因" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="支付模式" prop="payType">
          <el-select v-model="interForm.payType" placeholder="请选择支付模式">
            <el-option label="预支付" value="AXB" />
            <el-option label="后支付" value="AXYB" />
          </el-select>
        </el-form-item>
        <el-form-item label="公司名称" prop="cmpName" placeholder="请输入公司名称">
          <el-input v-model="interForm.cmpName" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="联系电话" prop="phone" placeholder="请输入联系电话">
          <el-input v-model="interForm.phone" />
        </el-form-item>
        <el-form-item label="公司地址" prop="adress" placeholder="请输入公司地址">
          <el-input v-model="interForm.adress" />
        </el-form-item>
      </div>
    </el-card>
    <!-- 联系方式 -->
    <el-card class="box-card">
      <template #header> 联系方式 </template>
      <div class="form-item-wrap">
        <el-form-item label="联系人姓名" prop="cmpName" placeholder="请输入联系人姓名">
          <el-input v-model="interForm.cmpName" />
        </el-form-item>
        <el-form-item label="联系人电话" prop="cmpName" placeholder="请输入联系人电话">
          <el-input v-model="interForm.cmpName" />
        </el-form-item>
        <el-form-item label="客户经理姓名" prop="cmpName" placeholder="请输入客户经理姓名">
          <el-input v-model="interForm.cmpName" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="客户经理电话" prop="cmpName" placeholder="请输入客户经理电话">
          <el-input v-model="interForm.cmpName" />
        </el-form-item>
        <el-form-item label="产品支撑姓名" prop="cmpName" placeholder="请输入产品支撑姓名">
          <el-input v-model="interForm.cmpName" />
        </el-form-item>
        <el-form-item label="产品支撑电话" prop="cmpName" placeholder="请输入产品支撑电话">
          <el-input v-model="interForm.cmpName" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="提单人姓名" prop="cmpName" placeholder="请输入提单人姓名">
          <el-input v-model="interForm.cmpName" />
        </el-form-item>
        <el-form-item label="提单人电话" prop="cmpName" placeholder="请输入提单人电话">
          <el-input v-model="interForm.cmpName" />
        </el-form-item>
      </div>
    </el-card>
    <!-- 地市号码数量和呼叫量 -->
    <el-card class="box-card">
      <template #header> 地市号码数量和呼叫量 </template>
      <el-table :data="tableData" max-height="250" border>
        <el-table-column fixed prop="city" label="地区" width="150" />
        <el-table-column prop="number" label="数量" width="120" />
        <el-table-column prop="dayNumber" label="日通话量" width="120" />
        <el-table-column prop="remark" label="备注" width="120" />
      </el-table>
      <div class="btn-wrap">
        <el-button type="primary" size="small" @click="onAddItem">新增</el-button>
        <el-button type="danger" size="small" @click="onDelete">删除</el-button>
      </div>
    </el-card>
    <!-- 业务生效规则 -->
    <el-card class="box-card">
      <template #header> 业务生效规则 </template>
      <div class="form-item-wrap">
        <el-form-item label="业务生效时间">
          <el-date-picker v-model="interForm.createTime" type="datetime" placeholder="请选择业务生效时间" />
        </el-form-item>
        <el-form-item label="收费开始时间">
          <el-date-picker v-model="interForm.createTime" type="datetime" placeholder="请选择收费开始时间" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="业务起始时间">
          <el-date-picker v-model="interForm.createTime" type="datetime" placeholder="请选择业务起始时间" />
        </el-form-item>
        <el-form-item label="业务终止时间">
          <el-date-picker v-model="interForm.createTime" type="datetime" placeholder="请选择业务终止时间" />
        </el-form-item>
      </div>
    </el-card>
  </el-form>
</template>
<script setup>
import { reactive, ref } from "vue";
const interFormRef = ref(null);
defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});
const interForm = reactive({
  proName: "",
  province: "",
  city: "",
  integration: "",
  businessType: "",
  calling: "",
  industry: "",
  platform: "",
  remark: "",
  appeal: "",
  phoneTraffic: "",
  phoneDemand: "",
  record: "",
  opinionOpen: "",
  opinion: "",
  serviceType: "",
  reason: "",
  payType: "",
  cmpName: "",
  phone: "",
  adress: ""
});
// 地址
const address = reactive([interForm.province, interForm.city]);
const onSubmit = () => {
  if(!interFormRef.value) return;
  interFormRef.value.validate(async valid => {
    if(!valid) return;
  });
};
// 城市号码数量和呼叫量
const tableData = reactive([
  {
    city: "成都",
    number: "100",
    dayNumber: "200",
    remark: "备注信息"
  },
  {
    city: "北京",
    number: "100",
    dayNumber: "200",
    remark: "备注信息"
  }
]);
const onAddItem = () => {
  tableData.push({
    city: "上海",
    number: "100",
    dayNumber: "200",
    remark: "备注信息"
  });
};
const onDelete = () => {
  tableData.pop();
};
defineExpose({ interForm, onSubmit });
</script>
<style scoped lang="scss">
.form-item-wrap {
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
}

:deep(.el-form-item + .el-form-item) {
  margin-left: 25px;
}

:deep(.el-form-item) {
  width: 50%;
}

:deep(.el-card) {
  box-shadow: none;
}

:deep(.el-card + .el-card) {
  margin-top: 25px;
}

.btn-wrap {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 15px;
}

.el-card:last-child {
  margin-bottom: 25px;
}
</style>
