<template>
  <el-card class="box-card">
    <template #header> 基本信息 </template>
    <el-form :model="form" ref="formRef" :rules="rules" :disabled="disabled">
      <div class="form-item-wrap">
        <el-form-item label="项目名称" prop="projectName">
          <el-input v-model="form.projectName" placeholder="请输入项目名称" />
        </el-form-item>
        <el-form-item label="归属省份地市" prop="provinceId">
          <regionSelect v-model="address" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="是否集成商" prop="channelName">
          <el-switch v-model="channel" />
          <el-input v-show="channel" v-model="form.channelName" placeholder="请输入集成商名称" />
        </el-form-item>
        <el-form-item label="业务模式" prop="bindingType">
          <modelSelect v-model="form.bindingType" dictType="bindingType" placeholder="请选择业务模式" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="是否固话主叫" prop="isFixed">
          <el-switch v-model="form.isFixed" />
        </el-form-item>
        <el-form-item label="应用行业" prop="application">
          <el-input v-model="form.application" placeholder="请输入应用行业" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="应用平台" prop="platform">
          <el-input v-model="form.platform" placeholder="请输入应用平台" />
        </el-form-item>
        <el-form-item label="业务场景描述" prop="scene">
          <el-input v-model="form.scene" placeholder="请输入业务场景描述" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="集成中间号的诉求" prop="appeal">
          <el-input v-model="form.appeal" placeholder="请输入集成中间号的诉求" />
        </el-form-item>
        <el-form-item label="话务量评估" prop="traffic">
          <el-input v-model="form.traffic" placeholder="请输入话务量评估" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="号码需求量" prop="numberCount">
          <el-input-number v-model="form.numberCount" placeholder="请输入号码需求量" />
        </el-form-item>
        <el-form-item label="是否录音" prop="recordMode">
          <el-switch v-model="form.recordMode" active-value="0" inactive-value="1" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="省市侧评审意见" prop="opinion">
          <el-switch v-model="form.provinceViews" />
          <el-input v-model="form.desc" v-show="!form.provinceViews" placeholder="请输入不通过原因" />
        </el-form-item>
        <el-form-item label="业务类型" prop="changeReason">
          <el-cascader :options="opTypes">
            <template #default="{ node, data }">
              <span>{{ data.label }}</span>
              <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
            </template>
          </el-cascader>
          <el-input v-model="form.changeReason" placeholder="请输入变更原因" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="支付模式" prop="payMode">
          <el-select v-model="form.payMode" placeholder="请选择支付模式">
            <el-option label="预支付" value="AXB" />
            <el-option label="后支付" value="AXYB" />
          </el-select>
        </el-form-item>
        <el-form-item label="公司名称" prop="groupName" placeholder="请输入公司名称">
          <el-input v-model="form.groupName" />
        </el-form-item>
      </div>
      <div class="form-item-wrap">
        <el-form-item label="联系电话" prop="phone" placeholder="请输入联系电话">
          <el-input v-model="form.groupMobile" />
        </el-form-item>
        <el-form-item label="公司地址" prop="adress" placeholder="请输入公司地址">
          <el-input v-model="form.groupAddr" />
        </el-form-item>
      </div>
    </el-form>
  </el-card>
</template>
<script setup>
import { ref, reactive, onMounted } from "vue";
import useForm from "@/hooks/useForm";
import useRegion from "@/hooks/useRegion.js";
import mittBus from "@/utils/mittBus";
// 业务类型枚举
const opTypes = [
  {
    label: "开卡",
    value: "1"
  },
  {
    label: "注销",
    value: "2"
  },
  {
    label: "变更",
    value: "3",
    children: [
      {
        label: "新增号码",
        value: "4"
      },
      {
        label: "变更付费计划",
        value: "5"
      },
      {
        label: "删除号码",
        value: "6"
      }
    ]
  }
];

defineProps({
  disabled: {
    type: Boolean,
    default: false
  }
});
const initialValues = {
  application: "",
  changeReason: "",
  channelName: "",
  desc: "",
  groupAddr: "",
  groupMobile: "",
  isFixed: "",
  numberCount: 0,
  opType: "",
  payMode: "",
  platform: "",
  projectName: "",
  provinceViews: "",
  scene: "",
  traffic: "",
  bindingType: "",
  provinceId: "",
  cityId: "",
  recordMode: "0"
};
const { form, formRef, resetForm, submitForm } = useForm(initialValues);
const channel = ref(false);
const rules = reactive({
  projectName: [
    {
      required: true,
      message: "请输入项目名称",
      trigger: "blur"
    }
  ],
  provinceId: [
    {
      required: true,
      message: "请选择省份",
      trigger: "blur"
    }
  ],
  bindingType: [
    {
      required: true,
      message: "请选择业务模式",
      trigger: "blur"
    }
  ],
  groupName: [
    {
      required: true,
      message: "请输入公司名称",
      trigger: "blur"
    }
  ],
  recordMode: [
    {
      required: true,
      message: "请选择是否录音",
      trigger: "blur"
    }
  ]
});
// 地址
const { address, setAddress } = useRegion(formRef, form);
// 重置
const onReset = () => {
  resetForm();
  setAddress([]);
};
onMounted(() => {
  mittBus.on("setForm", data => {
    if (data?.baseInfo) {
      Object.assign(form, data.baseInfo);
    }
  });
});
defineExpose({ form, onReset, submitForm });
</script>
<style lang="scss" scoped>
@import url("../scss/common.scss");
</style>
