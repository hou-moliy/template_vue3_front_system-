<template>
  <el-form :model="form" label-width="120px">
    <el-form-item label="企业名称">
      <el-input v-model="form.cmpName" placeholder="请输入企业名称" />
    </el-form-item>
    <el-form-item label="归属省份地市">
      <el-select v-model="form.province" placeholder="请选择归属省份地市">
        <el-option label="北京" value="bj" />
        <el-option label="上海" value="sh" />
        <el-option label="四川" value="sc" />
      </el-select>
    </el-form-item>
    <el-form-item label="录音模式">
      <el-select v-model="form.recordType" placeholder="请选择归属省份地市">
        <el-option label="全录音" value="bj" />
        <el-option label="由中间号订单指定是否录音" value="sh" />
      </el-select>
    </el-form-item>
    <el-form-item label="是否开通短信">
      <el-switch v-model="form.note" />
    </el-form-item>
    <el-form-item label="是否接收呼叫起始事件">
      <el-switch v-model="form.startOpen" />
      <el-input v-model="form.start" />
    </el-form-item>
    <el-form-item label="是否接收呼叫振铃事件">
      <el-switch v-model="form.ringOpen" />
      <el-input v-model="form.ring" />
    </el-form-item>
    <el-form-item label="是否接收呼叫接听事件">
      <el-switch v-model="form.acceptOpen" />
      <el-input v-model="form.accept" />
    </el-form-item>
    <el-form-item label="是否接收呼叫结束事件">
      <el-switch v-model="form.endOpen" />
      <el-input v-model="form.end" />
    </el-form-item>
    <el-form-item label="是否接收短信转发事件">
      <el-switch v-model="form.forwardOpen" />
      <el-input v-model="form.forward" />
    </el-form-item>
    <el-form-item label="企业ip白名单列表">
      <el-input v-model="form.whiteList" />
    </el-form-item>
  </el-form>
</template>
<script setup>
import { reactive } from "vue";

const form = reactive({
  cmpName: "",
  province: "",
  recordType: "",
  note: false,
  startOpen: false,
  start: "",
  ringOpen: false,
  ring: "",
  acceptOpen: false,
  accept: "",
  endOpen: false,
  end: "",
  forwardOpen: false,
  forward: "",
  whiteList: ""
});

const onSubmit = () => {};
</script>
<style></style>
