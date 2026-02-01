<template>
  <Transition name="modal-zoom">
    <div v-if="visible" class="modal-mask" @click.self="close">
      <div class="login-modal">
        <!-- 上半部分 蓝色区域 -->
        <div class="modal-header">
          <div class="modal-header-inner">
            <div class="modal-title">凡图拉</div>
            <div class="modal-subtitle">欢迎回来，请登录您的账户</div>
            <div class="modal-tabs">
              <BaseButton themeId="tab" :class="['tab-btn', {active: mode==='login'}]" @click="mode='login'">登录</BaseButton>
              <BaseButton themeId="tab" :class="['tab-btn', {active: mode==='register'}]" @click="mode='register'">注册</BaseButton>
            </div>
            <button class="modal-close" @click="close">×</button>
          </div>
        </div>
        <!-- 下半部分 白色区域 -->
        <div class="modal-body">
          <div class="modal-form-area">
            <div v-if="mode==='login'" class="modal-form-tabs">
              <button :class="['form-tab', {active: loginType==='code'}]" @click="loginType='code'">验证码登录</button>
              <button :class="['form-tab', {active: loginType==='password'}]" @click="loginType='password'">密码登录</button>
              <button :class="['form-tab', {active: loginType==='wechat'}]" @click="startWechatLogin">微信登录</button>
            </div>
            <form v-if="mode==='login' && loginType==='password'" @submit.prevent="onLogin">
              <div class="form-group">
                <label>邮箱地址</label>
                <EmailInput v-model="loginForm.email" ref="loginEmailInput" :required="true" />
              </div>
              <div class="form-group">
                <label>密码</label>
                <input v-model="loginForm.password" type="password" placeholder="请输入密码" required />
              </div>
              <div class="form-row">
                <label><input type="checkbox" v-model="loginForm.remember" /> 记住我</label>
                <a class="forgot-link" @click.prevent="onForgot">忘记密码？</a>
              </div>
              <div class="form-row">
                <label><input type="checkbox" v-model="loginForm.agree" required /> 我已阅读并同意 <NuxtLink to="/privacy" target="_blank">《隐私协议》</NuxtLink> 和 <NuxtLink to="/policy" target="_blank">《用户政策》</NuxtLink></label>
              </div>
              <BaseButton themeId="primary" block class="submit-action" type="submit" :loading="loading" :disabled="loading || !loginForm.agree">{{ loading ? '登录中...' : '登录' }}</BaseButton>
              <div class="google-login-wrap">
                 <BaseButton themeId="social-google" block type="button" @click="oauth('google')">
                   <template #icon>
                     <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                   </template>
                   Google 登录
                 </BaseButton>
              </div>
            </form>
            <form v-else-if="mode==='login' && loginType==='code'" @submit.prevent="onLoginCode">
              <div class="form-group">
                <label>邮箱地址</label>
                <EmailInput v-model="loginCodeForm.email" ref="loginCodeEmailInput" :required="true" />
              </div>
              <div class="form-group code-group">
                <input v-model="loginCodeForm.code" type="text" placeholder="请输入验证码" required />
                <SendCodeButton 
                  :loading="loading" 
                  :countdown="codeTimer" 
                  @click="sendCode('login')"
                />
              </div>
              <div class="form-row">
                <label><input type="checkbox" v-model="loginCodeForm.remember" /> 记住我</label>
              </div>
              <div class="form-row">
                <label><input type="checkbox" v-model="loginCodeForm.agree" required /> 我已阅读并同意 <NuxtLink to="/privacy" target="_blank">《隐私协议》</NuxtLink> 和 <NuxtLink to="/policy" target="_blank">《用户政策》</NuxtLink></label>
              </div>
              <BaseButton themeId="primary" block class="submit-action" type="submit" :loading="loading" :disabled="loading || !loginCodeForm.agree">{{ loading ? '登录中...' : '登录' }}</BaseButton>
              <div class="google-login-wrap">
                 <BaseButton themeId="social-google" block type="button" @click="oauth('google')">
                   <template #icon>
                     <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                   </template>
                   Google 登录
                 </BaseButton>
              </div>
            </form>
            <!-- WeChat QR Code Login -->
            <div v-else-if="mode==='login' && loginType==='wechat'" class="wechat-login-area">
              <!-- 状态：加载中 -->
              <div v-if="wechatState==='loading'" class="wechat-loading">
                <div class="spinner"></div>
                <p>正在加载二维码...</p>
              </div>
              <!-- 状态：显示二维码 -->
              <div v-else-if="wechatState==='qrcode'" class="wechat-qrcode">
                <p class="qrcode-tip">请使用微信扫描二维码登录</p>
                <img :src="wechatQrcodeUrl" alt="WeChat QR Code" class="qrcode-img" />
                <p class="qrcode-hint">{{ wechatPollingHint }}</p>
                <button class="refresh-btn" @click="refreshWechatQr">刷新二维码</button>
              </div>
              <!-- 状态：需要绑定邮箱 -->
              <div v-else-if="wechatState==='bind'" class="wechat-bind-form">
                <p class="bind-tip">🎉 扫码成功！请绑定邮箱以完成登录</p>
                <form @submit.prevent="onWechatBind">
                  <div class="form-group">
                    <label>邮箱地址</label>
                    <EmailInput v-model="wechatBindForm.email" :required="true" />
                  </div>
                  <div class="form-group code-group">
                    <input v-model="wechatBindForm.code" type="text" placeholder="请输入验证码" required />
                    <SendCodeButton 
                      :loading="loading" 
                      :countdown="wechatBindCodeTimer" 
                      @click="sendWechatBindCode"
                    />
                  </div>
                  <div class="form-group">
                    <label>设置密码（可选）</label>
                    <input v-model="wechatBindForm.password" type="password" placeholder="设置密码后可用密码登录" />
                  </div>
                  <div class="form-row">
                    <label><input type="checkbox" v-model="wechatBindForm.agree" required /> 我已阅读并同意 <NuxtLink to="/privacy" target="_blank">《隐私协议》</NuxtLink> 和 <NuxtLink to="/policy" target="_blank">《用户政策》</NuxtLink></label>
                  </div>
                  <BaseButton themeId="primary" block class="submit-action" type="submit" :loading="loading" :disabled="loading || !wechatBindForm.agree">{{ loading ? '绑定中...' : '绑定并登录' }}</BaseButton>
                </form>
              </div>
              <!-- 状态：已登录（自动跳转） -->
              <div v-else-if="wechatState==='logged_in'" class="wechat-success">
                <p>✅ 登录成功，正在跳转...</p>
              </div>
              <!-- 状态：错误 -->
              <div v-else-if="wechatState==='error'" class="wechat-error">
                <p>{{ wechatErrorMsg }}</p>
                <button class="refresh-btn" @click="startWechatLogin">重试</button>
              </div>
            </div>
            <form v-else-if="mode==='register'" @submit.prevent="onRegister">
              <div class="form-group">
                <label>邮箱地址</label>
                <EmailInput v-model="registerForm.email" ref="registerEmailInput" :required="true" />
              </div>
              <div class="form-group code-group">
                <input v-model="registerForm.code" type="text" placeholder="请输入验证码" required />
                <SendCodeButton 
                  :loading="loading" 
                  :countdown="codeTimer" 
                  @click="sendCode('register')"
                />
              </div>
              <div class="form-group">
                <label>密码</label>
                <input v-model="registerForm.password" type="password" placeholder="请输入密码 (至少6位)" required />
              </div>
              <div class="form-group">
                <label>邀请码（选填）</label>
                <input v-model="registerForm.inviteId" type="text" placeholder="请输入邀请码" />
              </div>
              <div class="form-row">
                <label><input type="checkbox" v-model="registerForm.agree" required /> 我已阅读并同意 <NuxtLink to="/privacy" target="_blank">《隐私协议》</NuxtLink> 和 <NuxtLink to="/policy" target="_blank">《用户政策》</NuxtLink></label>
              </div>
              <BaseButton themeId="primary" block class="submit-action" type="submit" :loading="loading" :disabled="loading || !registerForm.agree">{{ loading ? '注册中...' : '注册' }}</BaseButton>
              <div class="google-login-wrap">
                 <BaseButton themeId="social-google" block type="button" @click="oauth('google')">
                   <template #icon>
                     <svg width="20" height="20" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                   </template>
                   Google 注册
                 </BaseButton>
              </div>
            </form>
          </div>
          <!-- Compact Mode: Removed Other Login Area -->
        </div>
      </div>
      <!-- 遮罩层 -->
    </div>
  </Transition>

  <Transition name="modal-zoom">
    <div v-if="showPrivacyDialog" class="dialog-mask" @click.self="closeDialog('privacy')">
      <div class="dialog-box">
        <div class="dialog-title">隐私协议</div>
        <div class="dialog-content">这里是隐私协议内容...</div>
        <button class="dialog-close" @click="closeDialog('privacy')">关闭</button>
      </div>
    </div>
  </Transition>

  <Transition name="modal-zoom">
    <div v-if="showPolicyDialog" class="dialog-mask" @click.self="closeDialog('policy')">
      <div class="dialog-box">
        <div class="dialog-title">用户政策</div>
        <div class="dialog-content">这里是用户政策内容...</div>
        <button class="dialog-close" @click="closeDialog('policy')">关闭</button>
      </div>
    </div>
  </Transition>

  <Transition name="modal-zoom">
    <div v-if="showForgotDialog" class="dialog-mask" @click.self="closeDialog('forgot')">
      <div class="dialog-box">
        <div class="dialog-title">找回密码</div>
        <form @submit.prevent="onForgotSubmit">
          <div class="form-group">
            <label>邮箱地址</label>
            <EmailInput v-model="forgotForm.email" :required="true" />
          </div>
          <div class="form-group code-group">
            <label>验证码</label>
            <input v-model="forgotForm.code" type="text" placeholder="请输入验证码" required />
            <SendCodeButton 
              :loading="loading" 
              :countdown="forgotCodeTimer" 
              @click="sendForgotCode"
            />
          </div>
          <div class="form-group">
            <label>新密码</label>
            <input v-model="forgotForm.password" type="password" placeholder="请输入新密码 (至少6位)" required />
          </div>
          <BaseButton themeId="primary" block class="submit-action" type="submit" :loading="loading">{{ loading ? '重置中...' : '重置密码' }}</BaseButton>
        </form>
        <button class="dialog-close" @click="closeDialog('forgot')">关闭</button>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, nextTick } from 'vue'
import { useUserStore } from '@/stores/client/user'
import { authApi } from '@/api/client/auth'
import { getSupabaseClient } from '@/utils/supabase'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

import EmailInput from '@/components/shared/EmailInput.vue'
import SendCodeButton from '@/components/shared/SendCodeButton.vue'
import BaseButton from '@/components/shared/BaseButton.vue'
import { wechatLoginApi } from '@/api/client/wechat-login'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits(['close'])
const router = useRouter()
const route = useRoute()

const mode = ref<'login'|'register'>('login')
const loginType = ref<'password'|'code'|'wechat'>('code')
const codeTimer = ref(0)
let codeInterval: any = null

// WeChat Login States
const wechatState = ref<'loading'|'qrcode'|'bind'|'logged_in'|'error'>('loading')
const wechatQrcodeUrl = ref('')
const wechatSceneStr = ref('')
const wechatBindToken = ref('')
const wechatPollingHint = ref('等待扫码...')
const wechatErrorMsg = ref('')
let wechatPollTimer: any = null

const wechatBindForm = ref({ email: '', code: '', password: '', agree: false })
const wechatBindCodeTimer = ref(0)
let wechatBindCodeInterval: any = null

const loginForm = ref({ email: '', password: '', remember: false, agree: false })
const loginCodeForm = ref({ email: '', code: '', password: '', remember: false, agree: false })
const registerForm = ref({ email: '', code: '', password: '', inviteId: '', agree: false })

const loginEmailInput = ref<HTMLInputElement|null>(null)
const loginCodeEmailInput = ref<HTMLInputElement|null>(null)
const registerEmailInput = ref<HTMLInputElement|null>(null)

const showPrivacyDialog = ref(false)
const showPolicyDialog = ref(false)
const showForgotDialog = ref(false)
const forgotForm = ref({ email: '', code: '', password: '' })
const forgotCodeTimer = ref(0)
let forgotCodeInterval: any = null
const loading = ref(false)

// Auto-focus logic
const focusInput = () => {
  nextTick(() => {
    if (mode.value === 'login') {
      if (loginType.value === 'password') loginEmailInput.value?.focus()
      else loginCodeEmailInput.value?.focus()
    } else {
      registerEmailInput.value?.focus()
    }
  })
}

watch([mode, loginType, () => props.visible], () => {
  if (props.visible) focusInput()
})

// Timer Persistence Keys
const TIMER_KEY_CODE = 'otp_timer_end'
const TIMER_KEY_FORGOT = 'otp_forgot_timer_end'
const COOLDOWN_SECONDS = 300 // 5 minutes

// Restore timers on mount
onMounted(() => {
  restoreTimer(TIMER_KEY_CODE, codeTimer, codeInterval)
  restoreTimer(TIMER_KEY_FORGOT, forgotCodeTimer, forgotCodeInterval)
})

const restoreTimer = (key: string, timerRef: any, intervalRef: any) => {
  const endTimeStr = localStorage.getItem(key)
  if (endTimeStr) {
    const endTime = parseInt(endTimeStr, 10)
    const now = Date.now()
    if (endTime > now) {
      const remaining = Math.ceil((endTime - now) / 1000)
      startTimer(timerRef, intervalRef, remaining, key, false) // false means don't set new end time, just resume
    } else {
      localStorage.removeItem(key)
    }
  }
}

const startTimer = (timerRef: any, intervalRef: any, seconds: number, storageKey: string, isNew = true) => {
  timerRef.value = seconds
  if (isNew) {
    const endTime = Date.now() + seconds * 1000
    localStorage.setItem(storageKey, endTime.toString())
  }
  
  if (intervalRef) clearInterval(intervalRef)
  return setInterval(() => {
    timerRef.value--
    if (timerRef.value <= 0) {
      clearInterval(intervalRef)
      localStorage.removeItem(storageKey)
    }
  }, 1000)
}

// Helpers
const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const isValidPassword = (pwd: string) => pwd.length >= 6

function close() {
  emit('close')
}
function showPrivacy() {
  showPrivacyDialog.value = true
}
function showPolicy() {
  showPolicyDialog.value = true
}
function onForgot() {
  showForgotDialog.value = true
}

function sendCode(type: 'login'|'register') {
  if (codeTimer.value > 0) return
  
  const email = type==='register' ? registerForm.value.email : loginCodeForm.value.email
  if (!email) { ElMessage.warning('请输入邮箱'); return }
  if (!isValidEmail(email)) { ElMessage.warning('邮箱格式不正确'); return }
  
  // 统一使用 getEmailCode，允许验证码登录时自动注册新用户
  loading.value = true
  const apiCall = authApi.getEmailCode(email)
  
  apiCall
    .then((res) => {
      if (res.success) {
        ElMessage.success('验证码已发送，请注意查收')
        codeInterval = startTimer(codeTimer, codeInterval, COOLDOWN_SECONDS, TIMER_KEY_CODE)
      } else {
        ElMessage.error(res.msg || '验证码发送失败')
      }
    })
    .catch(err => { ElMessage.error(err.message || '验证码发送失败') })
    .finally(() => { loading.value = false })
}

function sendForgotCode() {
  if (forgotCodeTimer.value > 0) return
  if (!forgotForm.value.email) { ElMessage.warning('请输入邮箱'); return }
  if (!isValidEmail(forgotForm.value.email)) { ElMessage.warning('邮箱格式不正确'); return }
  
  loading.value = true
  authApi.sendOtp(forgotForm.value.email)
    .then((res) => {
      if (res.success) {
         ElMessage.success('验证码已发送')
         forgotCodeInterval = startTimer(forgotCodeTimer, forgotCodeInterval, COOLDOWN_SECONDS, TIMER_KEY_FORGOT)
      } else {
        ElMessage.error(res.msg || '发送失败')
      }
    })
    .catch(err => { ElMessage.error(err.message || '验证码发送失败') })
    .finally(() => { loading.value = false })
}

async function onLogin() {
  if (!loginForm.value.email || !loginForm.value.password) { ElMessage.warning('请填写完整'); return }
  if (!isValidEmail(loginForm.value.email)) { ElMessage.warning('邮箱格式不正确'); return }
  if (!loginForm.value.agree) { ElMessage.warning('请勾选协议'); return }
  
  loading.value = true
  try {
    const res = await authApi.login(loginForm.value)
    if (res.success && res.data) {
      await handleLoginSuccess(res.data)
    } else {
      ElMessage.error(res.msg || '登录失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '登录失败')
  } finally {
    loading.value = false
  }
}

async function onLoginCode() {
  if (!loginCodeForm.value.email || !loginCodeForm.value.code) { ElMessage.warning('请填写完整'); return }
  if (!isValidEmail(loginCodeForm.value.email)) { ElMessage.warning('邮箱格式不正确'); return }
  if (!loginCodeForm.value.agree) { ElMessage.warning('请勾选协议'); return }
  
  loading.value = true
  try {
    const res = await authApi.loginWithCode({
      email: loginCodeForm.value.email,
      code: loginCodeForm.value.code
    })
    if (res.success && res.data) {
      await handleLoginSuccess(res.data)
    } else {
      ElMessage.error(res.msg || '验证码登录失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '验证码登录失败')
  } finally {
    loading.value = false
  }
}

async function onRegister() {
  if (!registerForm.value.email || !registerForm.value.code || !registerForm.value.password) { ElMessage.warning('请填写完整'); return }
  if (!isValidEmail(registerForm.value.email)) { ElMessage.warning('邮箱格式不正确'); return }
  if (!isValidPassword(registerForm.value.password)) { ElMessage.warning('密码至少需要6位'); return }
  if (!registerForm.value.agree) { ElMessage.warning('请勾选协议'); return }
  
  loading.value = true
  try {
    const res = await authApi.registerWithCodeAndPassword({
      email: registerForm.value.email,
      code: registerForm.value.code,
      password: registerForm.value.password,
      inviteId: registerForm.value.inviteId
    })
    
    if (res.success && res.data) {
      await handleLoginSuccess(res.data, '注册成功')
    } else {
      ElMessage.error(res.msg || '注册失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '注册失败')
  } finally {
    loading.value = false
  }
}

async function onForgotSubmit() {
  if (!forgotForm.value.email || !forgotForm.value.code || !forgotForm.value.password) { ElMessage.warning('请填写完整'); return }
  if (!isValidPassword(forgotForm.value.password)) { ElMessage.warning('新密码至少需要6位'); return }
  
  loading.value = true
  try {
    const res = await authApi.resetPasswordWithOtp({
      email: forgotForm.value.email,
      code: forgotForm.value.code,
      password: forgotForm.value.password
    })
    if (res.success) {
      ElMessage.success('密码重置成功，已自动登录')
      const userRes = await authApi.getUserInfo()
      if (userRes.success) {
         useUserStore().setUser(userRes.data, (await getSupabaseClient().auth.getSession()).data.session?.access_token || '')
         showForgotDialog.value = false
         close()
         setTimeout(() => location.reload(), 500)
      } else {
         showForgotDialog.value = false
         ElMessage.success('密码重置成功，请重新登录')
      }
    } else {
      ElMessage.error(res.msg || '重置失败')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '重置失败')
  } finally {
    loading.value = false
  }
}

// Ensure await is used and remove old implementation
async function handleLoginSuccess(data: any, msg = '登录成功') {
  const accessToken = data.session?.access_token
  if ((loginForm.value.remember || loginCodeForm.value.remember) && accessToken) {
    localStorage.setItem('token', accessToken)
  }
  
  const store = useUserStore()
  store.setUser(data.user, accessToken)
  
  try {
    await Promise.all([
        store.loadFavorites(),
        store.loadOrders()
    ])
  } catch(e) { console.warn(e) }

  ElMessage.success(msg)
  ElMessage.success(msg)
  close()
  
  // Removed forced redirect. User stays on the page where they opened the modal.
  // Exception: If on a dedicated login page (which we don't have, but just in case)
  if (route.path.includes('/login')) {
      router.push('/')
  }
}

// function handleLoginSuccess removed (replaced above)

function oauth(type: string) {
  const client = getSupabaseClient()
  client.auth.signInWithOAuth({ provider: type as any })
}

function closeDialog(type: string) {
  if (type==='privacy') showPrivacyDialog.value = false
  if (type==='policy') showPolicyDialog.value = false
  if (type==='forgot') showForgotDialog.value = false
}

// ========== WeChat Login Functions ==========

async function startWechatLogin() {
  loginType.value = 'wechat'
  wechatState.value = 'loading'
  stopWechatPolling()
  
  try {
    const res = await wechatLoginApi.getLoginQrCode()
    if (res.success && res.data) {
      wechatQrcodeUrl.value = res.data.qrcodeUrl
      wechatSceneStr.value = res.data.sceneStr
      wechatState.value = 'qrcode'
      wechatPollingHint.value = '等待扫码...'
      // Start polling
      startWechatPolling()
    } else {
      wechatState.value = 'error'
      wechatErrorMsg.value = res.msg || '获取二维码失败'
    }
  } catch (err: any) {
    wechatState.value = 'error'
    wechatErrorMsg.value = err.message || '获取二维码失败'
  }
}

function refreshWechatQr() {
  startWechatLogin()
}

function startWechatPolling() {
  stopWechatPolling()
  wechatPollTimer = setInterval(pollWechatStatus, 2000)
}

function stopWechatPolling() {
  if (wechatPollTimer) {
    clearInterval(wechatPollTimer)
    wechatPollTimer = null
  }
}

async function pollWechatStatus() {
  if (!wechatSceneStr.value) return
  
  try {
    const res = await wechatLoginApi.checkScanStatus(wechatSceneStr.value)
    if (!res.success || !res.data) return
    
    const status = res.data.status
    
    if (status === 'expired') {
      stopWechatPolling()
      wechatPollingHint.value = '二维码已过期，请刷新'
    } else if (status === 'waiting') {
      wechatPollingHint.value = '等待扫码...'
    } else if (status === 'need_bind') {
      // 需要绑定邮箱
      stopWechatPolling()
      wechatBindToken.value = res.data.bindToken || ''
      wechatState.value = 'bind'
    } else if (status === 'logged_in') {
      // 已登录
      stopWechatPolling()
      wechatState.value = 'logged_in'
      
      const actionLink = res.data.action_link
      if (actionLink) {
         // 使用后端返回的 Magic Link 自动登录
         window.location.href = actionLink
      } else {
         // 降级：如果未返回 Magic Link (旧逻辑)，则提示用户
         ElMessage.success('登录成功')
         setTimeout(() => location.reload(), 1000)
      }
    }
  } catch (err) {
    console.error('Poll error:', err)
  }
}

function sendWechatBindCode() {
  if (wechatBindCodeTimer.value > 0) return
  if (!wechatBindForm.value.email) { ElMessage.warning('请输入邮箱'); return }
  if (!isValidEmail(wechatBindForm.value.email)) { ElMessage.warning('邮箱格式不正确'); return }
  
  loading.value = true
  authApi.getEmailCode(wechatBindForm.value.email)
    .then((res) => {
      if (res.success) {
        ElMessage.success('验证码已发送')
        wechatBindCodeInterval = startTimer(wechatBindCodeTimer, wechatBindCodeInterval, COOLDOWN_SECONDS, 'wechat_bind_timer')
      } else {
        ElMessage.error(res.msg || '发送失败')
      }
    })
    .catch(err => { ElMessage.error(err.message || '发送失败') })
    .finally(() => { loading.value = false })
}

async function onWechatBind() {
  if (!wechatBindForm.value.email || !wechatBindForm.value.code) { ElMessage.warning('请填写完整'); return }
  if (!isValidEmail(wechatBindForm.value.email)) { ElMessage.warning('邮箱格式不正确'); return }
  if (!wechatBindForm.value.agree) { ElMessage.warning('请勾选协议'); return }
  if (!wechatBindToken.value) { ElMessage.error('绑定凭证无效，请重新扫码'); startWechatLogin(); return }
  
  loading.value = true
  try {
    const res = await wechatLoginApi.bindWechatToEmail({
      bindToken: wechatBindToken.value,
      email: wechatBindForm.value.email,
      code: wechatBindForm.value.code,
      password: wechatBindForm.value.password || undefined,
    })
    
    if (res.success && res.data) {
      await handleLoginSuccess(res.data, '绑定成功')
    } else {
      ElMessage.error(res.msg || '绑定失败')
    }
  } catch (err: any) {
    ElMessage.error(err.message || '绑定失败')
  } finally {
    loading.value = false
  }
}

// Cleanup on close
watch(() => props.visible, (val) => {
  if (!val) {
    stopWechatPolling()
    // Reset WeChat state when modal closes
    wechatState.value = 'loading'
    wechatQrcodeUrl.value = ''
    wechatSceneStr.value = ''
    wechatBindToken.value = ''
  }
})
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9999;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-modal {
  width: 420px;
  min-width: 420px;
  max-width: 420px;
  height: auto; /* Auto height for compactness */
  position: relative;
  /* Glassmorphism Dark Background */
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 40px 80px -12px rgba(0, 0, 0, 0.6);
  border-radius: 40px; /* Super rounded */
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding-bottom: 30px; /* Bottom padding since footer is gone */
}
.modal-header {
  width: 100%;
  height: 160px; /* Reduced specific height */
  /* Subtle gradient blend */
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(14, 165, 233, 0.05) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 40px 40px 0 0;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.modal-header-inner {
  width: 100%;
  padding: 24px 32px 0 32px;
  position: relative;
}
.modal-title {
  font-size: 32px; /* Smaller title */
  font-weight: 800;
  color: #fff;
  text-align: center;
  margin-bottom: 4px;
  letter-spacing: 1px;
}
.modal-subtitle {
  font-size: 16px;
  color: #94A3B8; /* Slate-400 */
  text-align: center;
  margin-bottom: 24px;
}
.modal-tabs {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
  margin-bottom: 8px;
  background: rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 30px;
  width: 200px; /* More compact */
  height: 44px; /* More compact */
  margin-left: auto;
  margin-right: auto;
  box-shadow: none;
  position: relative;
  padding: 3px;
}
.tab-btn {
  flex: 1; /* Equal width */
  height: 100%;
  border-radius: 24px;
  /* border/bg removed as handled by BaseButton */
  z-index: 1;
}
.tab-btn.active {
  background: rgba(255, 255, 255, 0.15);
  color: #fff;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.modal-close {
  position: absolute;
  right: 24px;
  top: 24px;
  font-size: 28px;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2;
}
.modal-body {
  width: 100%;
  height: auto; /* Auto height */
  background: transparent; /* Remove white background */
  border-radius: 0 0 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
}
.modal-form-area {
  margin-top: 24px;
  width: 360px; /* Slimmer form area */
  margin-left: auto;
  margin-right: auto;
}
.modal-form-tabs {
  display: flex;
  gap: 32px;
  margin-bottom: 24px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}
.form-tab {
  font-size: 18px;
  background: none;
  border: none;
  color: #94A3B8;
  font-weight: 500;
  padding: 8px 0;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}
.form-tab.active {
  color: #fff;
  border-bottom: 2px solid var(--primary-blue);
}
.form-group {
  margin-bottom: 18px;
  display: flex;
  flex-direction: column;
  width: 100%;
}
.form-group label {
  font-size: 15px;
  color: #cbd5e1; /* Light gray label */
  margin-bottom: 6px;
}
.form-group input {
  width: 360px;
  height: 46px; /* Compact input */
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08); /* Finer border */
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  padding: 0 14px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s;
  margin-left: auto;
  margin-right: auto;
}
.form-group input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}
.form-group input:focus {
  border: 2px solid var(--primary-blue);
}
.code-group {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
}
.code-group input {
  width: 360px;
  height: 46px; /* Compact input */
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  padding: 0 110px 0 14px;
  font-size: 15px;
  outline: none;
  transition: border 0.2s;
  margin-left: auto;
  margin-right: auto;
}
.code-group input::placeholder {
  color: rgba(255, 255, 255, 0.3);
}

.form-row {
  display: flex;
  align-items: center; /* Vertically align checkbox and text center */
  justify-content: space-between;
  margin-bottom: 12px;
  font-size: 14px;
  color: #94A3B8;
  width: 100%;
}
.form-row label {
  display: flex;
  align-items: center; /* Inner alignment for label content */
  gap: 6px; /* Space between checkbox and text */
  cursor: pointer;
}
.forgot-link {
  color: var(--primary-blue);
  cursor: pointer;
  text-decoration: underline;
  font-size: 14px;
  margin-left: auto;
  align-self: center;
}
.agree-area {
  width: 100%;
  height: 46px;
  background: #F8F9FF;
  border-radius: 11px;
  display: flex;
  align-items: center;
  padding-left: 12px;
  margin-bottom: 18px;
  font-size: 14px;
  color: #888;
  box-shadow: 0 2px 8px rgba(59,130,246,0.04);
}
.submit-action {
  margin-top: 10px; /* Reduced top margin */
  margin-bottom: 20px; /* Space for Google btn */
}
/* Removed .submit-btn and .google-btn-flat styles as they are replaced by BaseButton */
/* Removed google-btn-flat img style as we use SVG now */
.submit-btn:hover {
  background: var(--active-orange);
}
.submit-btn:disabled {
  background: rgba(148, 163, 184, 0.2); /* Transparent disabled state */
  color: rgba(255, 255, 255, 0.4);
  cursor: not-allowed;
  box-shadow: none;
}
/* Removed other-login-area CSS */
.dialog-mask {
  position: fixed;
  z-index: 9999;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}
.dialog-box {
  width: 450px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px 0 rgba(0,0,0,0.18);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.dialog-title {
  width: 100%;
  height: 207px;
  background: linear-gradient(135deg, var(--primary-blue) 0%, #0369a1 100%);
  border-radius: 18px 18px 0 0;
  position: relative;
  display: flex;
  align-items: flex-start;
  justify-content: center;
}
.dialog-title h1 {
  font-size: 38px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  margin-bottom: 8px;
}
.dialog-content {
  padding: 32px;
  flex-grow: 1;
}
.dialog-close {
  position: absolute;
  right: 24px;
  top: 24px;
  font-size: 28px;
  color: #fff;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2;
}

/* WeChat Login Styles */
.wechat-login-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 320px;
  padding: 20px;
}

.wechat-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.wechat-loading .spinner {
  width: 40px;
  height: 40px;
  border: 3px solid rgba(255, 255, 255, 0.1);
  border-top-color: #07C160;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.wechat-loading p {
  color: #94A3B8;
  font-size: 14px;
}

.wechat-qrcode {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.qrcode-tip {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}

.qrcode-img {
  width: 200px;
  height: 200px;
  border-radius: 12px;
  background: #fff;
  padding: 8px;
}

.qrcode-hint {
  color: #94A3B8;
  font-size: 14px;
}

.refresh-btn {
  margin-top: 8px;
  padding: 8px 24px;
  background: rgba(7, 193, 96, 0.15);
  color: #07C160;
  border: 1px solid #07C160;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s;
}

.refresh-btn:hover {
  background: rgba(7, 193, 96, 0.25);
}

.wechat-bind-form {
  width: 100%;
}

.bind-tip {
  text-align: center;
  color: #07C160;
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 20px;
}

.wechat-success {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.wechat-success p {
  color: #07C160;
  font-size: 18px;
  font-weight: 500;
}

.wechat-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}

.wechat-error p {
  color: #EF4444;
  font-size: 14px;
}
</style>