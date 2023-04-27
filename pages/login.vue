<template>
  <div class="p-login">
    <img src="/img/login-bg.png" alt="登录背景图" class="p-login-bg" />
    <div class="p-login-content">
      <div class="p-login-form">
        <h1>登录</h1>
        <p class="c-text f-16">加入雷士，看您感兴趣的产品，享更多产品服务等</p>
        <el-form
          ref="FormRef"
          label-position="top"
          :model="form"
          :rules="rules"
          hide-required-asterisk
        >
          <el-form-item ref="PhoneFormItem" label="手机号" prop="phone">
            <el-input v-model="form.phone" size="large" placeholder="请输入手机号" />
          </el-form-item>
          <el-form-item label="验证码" prop="code">
            <el-input
              v-model="form.code"
              size="large"
              placeholder="请输入验证码"
              type="password"
              autocomplete="off"
            >
              <template #suffix>
                <VerifyCode v-model:status="hasSend" @click="sendCode" />
              </template>
            </el-input>
          </el-form-item>
        </el-form>
        <el-button type="primary" size="large" @click="login">立即登录<IconHalfArrow /></el-button>
      </div>

      <footer class="f-12">Copyright @2023 NVC GROUP All rights reserved</footer>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { FormInstance, FormItemInstance } from 'element-plus'
import Cookies from 'js-cookie'

definePageMeta({
  layout: false,
})

const router = useRouter()

const form = reactive({
  phone: '',
  code: '',
})

// TODO 集合进utils
const phoneReg = /^1[3456789]\d{9}$/
const rules = {
  phone: [
    {
      required: true,
      trigger: 'blur',
      validator(rule: any, value: any, callback: any) {
        if (!value) {
          return callback(new Error('请输入手机号码'))
        } else if (!phoneReg.test(value)) {
          return callback(new Error('请输入正确格式的手机号'))
        } else {
          callback()
        }
      },
    },
  ],
  code: [
    {
      required: true,
      trigger: 'blur',
      message: '请输入验证码',
    },
  ],
}

const hasSend = ref(false)
const PhoneFormItem = ref({} as FormItemInstance)
function sendCode() {
  PhoneFormItem.value.validate('blur', (valid: boolean) => {
    if (valid) {
      $fetch('/api/auth/send-code', {
        method: 'post',
        body: {
          account: form.phone,
          code_type: 2,
        },
      }).then((res) => {
        if (res.code === 200) {
          ElMessage({
            showClose: true,
            message: '已发送，请注意查收',
            type: 'success',
          })
          hasSend.value = true
        }
      })
    }
  })
}

const FormRef = ref({} as FormInstance)
function login() {
  FormRef.value.validate((valid) => {
    if (valid) {
      $fetch('/api/auth/login-by-code', {
        method: 'post',
        body: {
          account: form.phone,
          code: form.code,
        },
      }).then((res) => {
        if (res.code === 200) {
          if (res.data.is_register === false) {
            ElMessage({
              showClose: true,
              message: res.data.msg,
              type: 'info',
            })
            localStorage.setItem('phone', form.phone)
            router.push({
              path: 'signup',
            })
          } else {
            ElMessage({
              showClose: true,
              message: '登录成功',
              type: 'success',
            })
            Cookies.set('access_token', 'Bearer ' + res.data.access_token)
            router.push('/')
          }
        } else {
          ElMessage({
            showClose: true,
            message: res.msg,
            type: 'info',
          })
        }
      })
    }
  })
}
</script>

<style lang="scss">
.p-login {
  height: 100vh;
  display: flex;
  .p-login-bg {
    width: 41.7vw;
    object-fit: cover;
  }
  .p-login-content {
    position: relative;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0 0 18vh 0;
  }
}
.p-login .p-login-content {
  .p-login-form {
    width: 34vw;
    h1 {
      font-size: 40px;
      font-weight: 700;
    }
    p {
      margin: 0 0 40px 0;
      color: var(--ys-text);
    }
    .el-form-item {
      margin-bottom: 30px;
    }
    .el-form-item.is-error .el-input__wrapper {
      box-shadow: none;
      border-bottom: 1px solid var(--el-color-danger);
      &:before {
        content: none;
      }
    }
    .el-button--large {
      font-weight: 700;
      width: 100%;
      margin-top: 20px;
      span {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }
  footer {
    position: absolute;
    bottom: 50px;
    color: var(--ys-text-light);
  }
}
@media screen and (max-width: 1480px) {
  .p-login .p-login-form .el-button--large {
    font-size: 16px;
    height: 44px;
  }
}
@media screen and (max-width: 1000px) {
  .p-login .p-login-form .el-button--large {
    font-size: 14px;
    height: 40px;
  }
}
@media screen and (min-width: 1480px) {
  .p-login .p-login-form .el-button--large {
    font-size: 17px;
    height: 46px;
  }
}
</style>
