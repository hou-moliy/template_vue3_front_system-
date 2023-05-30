<template>
  <el-dialog v-model="dialogVisible" width="35%" :show-close="false" :close-on-click-modal="false">
    <template #header>
      <h5>账户申请</h5>
    </template>
    <div class="register-wrap">
      <el-form ref="formRef" :model="form" :rules="rules" label-position="left" label-width="150px">
        <el-form-item prop="userType" label="账户类型">
          <model-select v-model="form.userType" dictType="roleType" placeholder="请选择账户类型" />
        </el-form-item>
        <el-form-item prop="loginName" label="用户名">
          <el-input v-model="form.loginName" placeholder="请输入用户名"> </el-input>
        </el-form-item>
        <!-- 企业客户 6  渠道商 5-->
        <div class="content-wrap" v-if="form.userType === '6' || form.userType === '5'">
          <el-form-item prop="groupName" label="企业名称">
            <el-input v-model="form.groupName" placeholder="请输入企业名称"> </el-input>
          </el-form-item>
          <el-form-item prop="legalName" label="法人代表人姓名">
            <el-input v-model="form.legalName" placeholder="请输入法人代表人姓名"> </el-input>
          </el-form-item>
          <el-form-item prop="username" label="企业联系人名称">
            <el-input v-model="form.username" placeholder="请输入企业联系人名称"> </el-input>
          </el-form-item>
          <el-form-item prop="cardId" label="法人身份证号码">
            <el-input v-model="form.cardId" placeholder="请输入法人身份证号码"> </el-input>
          </el-form-item>
          <el-form-item prop="contactPhone" label="账户联系人电话号码">
            <el-input v-model="form.contactPhone" placeholder="请输入账户联系人电话号码"> </el-input>
          </el-form-item>
          <el-form-item prop="email" label="账户联系人邮箱">
            <div class="email-wrap">
              <el-input v-model="form.email" placeholder="请输入账户联系人邮箱"> </el-input>
              <el-button size="large" type="primary" :loading="sendLoading" class="code-btn" v-throttle="getCode">
                下发验证码
              </el-button>
            </div>
          </el-form-item>
        </div>
        <!-- 项目经理 2 分公司 3-->
        <div class="content-wrap" v-if="form.userType == '2' || form.userType == '3'">
          <el-form-item prop="realName" label="姓名" v-if="form.userType == '2'">
            <el-input v-model="form.realName" placeholder="请输入姓名"> </el-input>
          </el-form-item>
          <el-form-item prop="contactPhone" label="手机号" v-if="form.userType == '2'">
            <el-input v-model="form.contactPhone" placeholder="请输入手机号"> </el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱">
            <div class="email-wrap">
              <el-input v-model="form.email" placeholder="请输入邮箱"> </el-input>
              <el-button size="large" type="primary" class="code-btn" :loading="sendLoading" v-throttle="getCode">
                下发验证码
              </el-button>
            </div>
          </el-form-item>
          <el-form-item prop="deptId" label="二级部门(分公司)">
            <el-select v-model="form.deptId" placeholder="下拉选择" size="large"> </el-select>
          </el-form-item>
          <el-form-item prop="tdName" label="三级部门" v-if="form.userType === '3'">
            <el-input v-model="form.tdName" placeholder="请输入三级部门"> </el-input>
          </el-form-item>
          <el-form-item prop="id" label="工号">
            <el-input v-model="form.id" placeholder="请输入工号"> </el-input>
          </el-form-item>
          <el-form-item prop="cardId" label="身份证号">
            <el-input v-model="form.cardId" placeholder="请输入身份证号"> </el-input>
          </el-form-item>
        </div>
        <el-form-item prop="file" label="上传附件">
          <UploadFile :fileList="fileList" @fileSuccess="fileSuccess" @fileRemove="fileRemove" />
        </el-form-item>
        <el-form-item prop="verCode" label="验证码">
          <el-input v-model="form.verCode" auto-complete="off" placeholder="请输入验证码"> </el-input>
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="login-btn">
        <el-button @click="goBack"> 返回 </el-button>
        <el-button @click="onSubmit" type="primary" v-loading="loading">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage, ElNotification } from "element-plus";
import { TabsStore } from "@/stores/modules/tabs";
import { register, getVerCode, checkUserName } from "@/api/user";
import UploadFile from "@/components/UploadFile/index.vue";
import useValidator from "@/hooks/useValidator";
import useForm from "@/hooks/useForm";
import { getFormData } from "@/utils/util";
import useUpload from "@/hooks/useUpload";

const tabsStore = TabsStore();
const emit = defineEmits(["changeForm"]);
const initialValues = {
  loginName: "houyuanzhen",
  groupName: "东信北邮",
  cardId: "510823199711177069",
  contactPhone: "13006463385",
  email: "1337312569@qq.com",
  realName: "张三",
  legalName: "张三",
  deptId: "",
  id: "",
  userType: "",
  verCode: "",
  file: null,
  tdName: ""
};
const { form, formRef, submitForm } = useForm(initialValues);
const { validateCardId, validateLoginName, validateRealName, validateVerCode, validatePhone, validateEmail } = useValidator(
  formRef,
  form
);
const { fileList, fileSuccess, fileRemove } = useUpload(form);

// 定义 formRef（校验规则）
const rules = reactive({
  loginName: [
    { required: true, message: "请输入用户名", trigger: "blur" },
    {
      validator: validateLoginName,
      trigger: "blur"
    }
  ],
  groupName: [{ required: true, message: "请输入企业名称", trigger: "blur" }],
  legalName: [{ required: true, message: "请输入法人代表姓名", trigger: "blur" }],
  cardId: [
    { required: true, message: "请输入身份证号码", trigger: "blur" },
    {
      validator: validateCardId,
      trigger: "blur"
    }
  ],
  contactPhone: [
    { required: true, message: "请输入联系电话", trigger: "blur" },
    {
      validator: validatePhone,
      trigger: "blur"
    }
  ],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    {
      validator: validateEmail,
      trigger: "blur"
    }
  ],
  realName: [
    { required: true, message: "请输入姓名", trigger: "blur" },
    {
      validator: validateRealName,
      trigger: "blur"
    }
  ],
  deptId: [{ required: true, message: "请选择二级部门", trigger: "blur" }],
  id: [{ required: true, message: "请输入id", trigger: "blur" }],
  userType: [{ required: true, message: "请选择用户类型", trigger: "blur" }],
  verCode: [
    { required: true, message: "请输入验证码", trigger: "blur" },
    {
      validator: validateVerCode,
      trigger: "blur"
    }
  ]
});
// 注册
const loading = ref(false);
const onSubmit = () => {
  submitForm().then(async () => {
    const check = await checkName();
    if (check) {
      loading.value = true;
      const res = await register(getFormData(form));
      try {
        if (res.code == "0000") {
          tabsStore.closeMultipleTab();
          ElNotification({
            message: "注册成功",
            type: "success",
            duration: 1000
          });
          goBack();
        }
        loading.value = false;
      } finally {
        loading.value = false;
      }
    }
  });
};

// 检查用户名是否存在
const checkName = () => {
  return new Promise((resolve, reject) => {
    checkUserName({ userName: form.loginName }).then(res => {
      if (res.code === 200) {
        resolve(true); // 不存在
      } else {
        ElMessage.error("用户名已存在，请更换用户名!");
        reject(false); // 已存在
      }
    });
  });
};

// 下发验证码
const sendLoading = ref(false);
const getCode = () => {
  console.log("下发验证码");
  if (!form.email) {
    return ElMessage.error("请先输入邮箱!");
  }
  sendLoading.value = true;
  getVerCode({ emailUrl: form.email })
    .then(res => {
      if (res.code === 200) {
        ElMessage.success("下发成功，请注意查收!");
      }
      sendLoading.value = false;
    })
    .catch(() => (sendLoading.value = false));
};

// 返回登录表单
const goBack = () => emit("changeForm", "login");
const dialogVisible = ref(true);
</script>

<style lang="scss" scoped>
.login-code {
  height: 100%;
  display: flex;
  align-items: center;
  img {
    cursor: pointer;
    vertical-align: middle;
  }
}
h5 {
  margin: 0;
  padding: 0;
  text-align: left;
}
:deep(.el-form-item__content) {
  justify-content: space-between;
}
.register-wrap {
  height: 300px;
  overflow: scroll;
}
.email-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.code-btn {
  margin-left: 15px;
}
.content-wrap {
  width: 100%;
}
</style>
