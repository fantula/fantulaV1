<template>
  <div class="wechat-callback-page">
    <!-- Loading State -->
    <div v-if="state === 'loading'" class="callback-loading">
      <div class="spinner"></div>
      <p>正在处理登录...</p>
    </div>

    <!-- Need Bind Email -->
    <div v-else-if="state === 'bind'" class="callback-bind">
      <div class="bind-header">
        <div class="success-icon">🎉</div>
        <h2>微信授权成功</h2>
        <p>请绑定邮箱以完成登录</p>
      </div>

      <form @submit.prevent="onBind" class="bind-form">
        <div class="input-group">
          <!-- Shared Email Input -->
          <EmailInput 
            v-model="bindForm.email" 
            :required="true" 
            placeholder="请输入邮箱"
          />
        </div>
        
        <div class="input-group code-row">
          <input 
            v-model="bindForm.code" 
            type="text" 
            placeholder="验证码" 
            required 
            class="custom-input"
          />
          <!-- Shared Send Code Button -->
          <SendCodeButton 
            :loading="loading" 
            :countdown="codeTimer" 
            @click="sendCode" 
          />
        </div>

        <div class="input-group">
          <input 
            v-model="bindForm.password" 
            type="password" 
            placeholder="设置密码（可选）" 
            class="custom-input"
          />
        </div>

        <div class="form-agreement">
          <label>
            <input type="checkbox" v-model="bindForm.agree" />
            <span>同意 <NuxtLink :to="mobileRoutes.policy()" target="_blank" class="link">用户协议</NuxtLink> 和 <NuxtLink :to="mobileRoutes.privacy()" target="_blank" class="link">隐私政策</NuxtLink></span>
          </label>
        </div>

        <button class="submit-btn aurora-btn-primary" type="submit" :disabled="loading || !bindForm.agree">
          {{ loading ? '绑定中...' : '绑定并登录' }}
        </button>
      </form>
    </div>

    <!-- Success -->
    <div v-else-if="state === 'success'" class="callback-success">
      <div class="success-icon">✅</div>
      <p>登录成功，正在跳转...</p>
    </div>

    <!-- Error -->
    <div v-else-if="state === 'error'" class="callback-error">
      <div class="error-icon">❌</div>
      <p>{{ errorMsg }}</p>
      <button class="retry-btn" @click="goHome">返回首页</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { wechatLoginApi } from '@/api/client/wechat-login'
import { authApi } from '@/api/client/auth'
import { useUserStore } from '@/stores/client/user'
import { getSupabaseClient } from '@/utils/supabase'
import { ElMessageBox } from 'element-plus'
import { useGlobalLoading } from '@/composables/useGlobalLoading'
import { useNotify } from '@/composables/useNotify'
import { mobileRoutes } from '@/config/client-routes'

// Components
import EmailInput from '@/components/shared/EmailInput.vue'
import SendCodeButton from '@/components/shared/SendCodeButton.vue'
import { useSendCode } from '@/composables/client/useSendCode'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const { success, error, warning } = useNotify()

const state = ref<'loading' | 'bind' | 'success' | 'error'>('loading')
const errorMsg = ref('')
const bindToken = ref('')

const bindForm = ref({
  email: '',
  code: '',
  password: '',
  agree: false,
  nickname: undefined as string | undefined,
  avatar: undefined as string | undefined,
})

const { 
  loading: codeLoading, 
  countdown: codeTimer, 
  sendCode: sendBindCode 
} = useSendCode({ timerKey: 'wechat_bind_timer' })

const baseLoading = ref(false)
const uniqueLoading = ref(false)
const loading = computed(() => baseLoading.value || codeLoading.value || uniqueLoading.value)

const globalLoading = useGlobalLoading()

onMounted(async () => {
  // 0. 特殊处理：如果是 Magic Link 回调（Hash 中包含 access_token）
  if (route.hash && route.hash.includes('access_token')) {
    if (import.meta.dev) console.log('[WechatCallback] Magic Link hash detected')
    globalLoading.show('正在验证登录...') 
    
    // 防止 onAuthStateChange 和 getSession 双重触发
    let handled = false
    
    const handleSession = async (session: any) => {
      if (handled) return
      handled = true
      
      if (import.meta.dev) console.log('[WechatCallback] Session established, syncing user store...')
      await userStore.setUser(session.user, session.access_token)

      globalLoading.success('登录成功') 
      setTimeout(() => {
          const returnTo = route.query.return_to as string
          globalLoading.hide() 
          if (returnTo) {
              window.location.href = decodeURIComponent(returnTo)
          } else {
              router.replace(mobileRoutes.profileAccount())
          }
      }, 800)
    }
    
    // 监听 Auth 状态变化 (Supabase 客户端会自动处理 Hash 并恢复 Session)
    const { data: { subscription } } = getSupabaseClient().auth.onAuthStateChange(async (event: any, session: any) => {
      if (import.meta.dev) console.log('[WechatCallback] Auth State Change:', event)

      if (event === 'SIGNED_IN' && session) {
        subscription.unsubscribe()
        await handleSession(session)
      }
    })
    
    // Fallback: 如果 session 已经处理完，直接获取
    const { data: { session } } = await getSupabaseClient().auth.getSession()
    if (session) {
      subscription.unsubscribe() 
      await handleSession(session)
    }
    
    // 超时保护：15 秒后如果仍未建立 session，显示错误
    setTimeout(() => {
      if (!handled) {
        handled = true
        subscription.unsubscribe()
        globalLoading.hide()
        state.value = 'error'
        errorMsg.value = '登录验证超时，请返回重试'
        if (import.meta.dev) console.error('[WechatCallback] Session establishment timed out')
      }
    }, 15000)
    
    return // 等待 AuthStateChange 或 Timeout
  }

  // 从 URL 获取微信授权 code
  const code = route.query.code as string

  if (import.meta.dev) console.log('[WechatCallback] Processing OAuth code...')

  if (!code) {
    if (import.meta.dev) console.error('[WechatCallback] No code in URL')
    state.value = 'error'
    errorMsg.value = '未获取到授权信息'
    return
  }

  // 场景: 充值获取 OpenID（state=recharge），不是绑定微信
  const urlState = route.query.state as string
  if (urlState === 'recharge') {
    // state.value = 'loading'
    globalLoading.show('正在处理充值授权...')
    try {
      // 通过 code 换取 openid 用于支付
      const { wechatPayApi } = await import('@/api/client/wechat-payment')
      const res = await wechatPayApi.getOpenId(code)
      if (res.success && res.data?.openid) {
        localStorage.setItem('wechat_openid', res.data.openid)
        if (import.meta.dev) console.log('[WechatCallback] Got openid for recharge:', res.data.openid)
      }
      // 跳回充值页面
      const returnTo = route.query.return_to as string
      if (returnTo) {
        window.location.href = decodeURIComponent(returnTo)
      } else {
        router.replace(mobileRoutes.home())
      }
    } catch (e: any) {
      if (import.meta.dev) console.error('[WechatCallback] Get openid for recharge failed:', e)
      state.value = 'error'
      errorMsg.value = '获取支付信息失败: ' + (e.message || '')
    }
    return
  }

  // 场景: 已登录用户绑定微信
  if (userStore.isLoggedIn) {
     // state.value = 'loading'
     globalLoading.show('正在绑定微信...')
     try {
        const res = await wechatLoginApi.bindWechatToAccount({ wechatCode: code })
        if (res.success) {
            // state.value = 'success'
            globalLoading.success('绑定成功')
            // 绑定成功后刷新用户信息以获取最新的 openId
            await userStore.fetchUserInfo()
            setTimeout(() => {
                globalLoading.hide()
                const returnTo = route.query.return_to as string
                if (returnTo) {
                    // 解码 return_to 避免多次编码问题
                    const target = decodeURIComponent(returnTo)
                    window.location.href = target // 使用 href 确保全量加载
                } else {
                    router.replace(mobileRoutes.profileAccount())
                }
            }, 1000)
        } else {
            globalLoading.hide() // Hide loading to show error
            state.value = 'error'
            errorMsg.value = res.msg || '绑定失败'
        }
     } catch (e: any) {
        globalLoading.hide()
        state.value = 'error'
        errorMsg.value = e.message || '绑定失败'
     }
     return
  }

  try {
    globalLoading.show('正在处理微信登录...')
    // 获取 return_to 参数
    const returnTo = route.query.return_to as string
    
    // 用 code 换取 openid 并检查绑定状态
    const res = await wechatLoginApi.oauthLogin(code, { 
        redirectTo: returnTo ? decodeURIComponent(returnTo) : undefined 
    })
    if (import.meta.dev) console.log('[WechatCallback] OAuth response:', res.data?.status || 'error')

    if (!res.success || !res.data) {
      globalLoading.hide()
      state.value = 'error'
      errorMsg.value = res.msg || '登录失败'
      return
    }

    if (res.data.status === 'logged_in') {
      // 已有绑定账号，通过 Magic Link 完成自动登录
      
      if (res.data.actionLink) {
         // state.value = 'success'
         globalLoading.show('正在跳转...') 
         if (import.meta.dev) console.log('[WechatCallback] Redirecting to Magic Link for auto-login...')
         window.location.href = res.data.actionLink
      } else {
          // 降级：Magic Link 生成失败，提示用户
          globalLoading.hide()
          state.value = 'error'
          errorMsg.value = '自动登录失败，请使用邮箱验证码登录'
          if (import.meta.dev) console.error('[WechatCallback] No actionLink returned from server')
      }
    } else if (res.data.status === 'need_bind') {
      // 需要绑定邮箱
      globalLoading.hide() // Show form
      bindToken.value = res.data.bindToken || ''
      bindForm.value.nickname = res.data.nickname
      bindForm.value.avatar = res.data.avatar
      state.value = 'bind'
    } else {
      globalLoading.hide()
      state.value = 'error'
      errorMsg.value = '未知状态'
    }
  } catch (err: any) {
    globalLoading.hide()
    state.value = 'error'
    errorMsg.value = err.message || '登录失败'
  }
})

const sendCode = async () => {
  if (loading.value || codeTimer.value > 0) return // Debounce & timer check
  if (!bindForm.value.email) {
    warning('请输入邮箱') // Global notify
    return
  }

  // 1. Check if email exists (Pre-flight check)
  // We do not set global loading here to avoid full screen block, just button loading
  uniqueLoading.value = true 
  try {
    const checkRes = await authApi.checkEmailAvailable(bindForm.value.email)
    if (!checkRes.success) {
       error(checkRes.msg || '检查邮箱失败')
       return
    }

    const emailAvailable = checkRes.data
    
    // If email is taken (available = false), warn user about merging
    if (!emailAvailable) {
       try {
         await ElMessageBox.confirm(
           '该邮箱已被其他账号注册。继续绑定将把此微信号关联到该现有账号，并共享权益。',
           '账号合并提示',
           {
             confirmButtonText: '确认关联',
             cancelButtonText: '更换邮箱',
             type: 'warning',
             customClass: 'mobile-msg-box', // Custom Style
             showClose: false,
             center: true,
           }
         )
       } catch {
         // User cancelled
         return
       }
    }

    // 2. Send Code
    await sendBindCode(bindForm.value.email)
  } catch (err: any) {
    if (import.meta.dev) console.error(err)
    error('发送失败: ' + (err.message || '网络错误'))
  } finally {
    uniqueLoading.value = false
  }
}

const onBind = async () => {
  if (loading.value) return // Debounce
  if (!bindForm.value.agree) {
    warning('请同意协议') // Global notify
    return
  }
  if (!bindToken.value) {
    error('绑定凭证无效，请重新登录')
    return
  }

  baseLoading.value = true
  try {
    const res = await wechatLoginApi.bindWechatToEmail({
      bindToken: bindToken.value,
      email: bindForm.value.email,
      code: bindForm.value.code,
      password: bindForm.value.password || undefined,
      nickname: bindForm.value.nickname,
      avatar: bindForm.value.avatar,
    })

    if (res.success && res.data) {
      globalLoading.show('正在完成绑定...') 
      // 🔑 关键：在 Supabase JS Client 上建立 session
      const client = getSupabaseClient()
      if (res.data.session?.access_token && res.data.session?.refresh_token) {
        await client.auth.setSession({
          access_token: res.data.session.access_token,
          refresh_token: res.data.session.refresh_token,
        })
      }
      
      // 设置 userStore 并刷新完整用户信息（含 openId）
      userStore.setUser(res.data.user, res.data.session?.access_token)
      await userStore.fetchUserInfo()
      
      globalLoading.success('绑定成功')
      setTimeout(() => {
        globalLoading.hide()
        const returnTo = route.query.return_to as string
        if (returnTo) {
            window.location.href = decodeURIComponent(returnTo)
        } else {
            router.replace(mobileRoutes.home())
        }
      }, 1000)
    } else {
      errorMsg.value = res.msg || '绑定失败'
      error(res.msg || '绑定失败') // Global notify
    }
  } catch (err: any) {
    errorMsg.value = err.message || '绑定失败'
    error(err.message || '绑定失败') // Global notify
  } finally {
    baseLoading.value = false
  }
}

const goHome = () => {
  router.replace(mobileRoutes.home())
}
</script>

<style scoped>
.wechat-callback-page {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background: #0F172A; /* Fallback */
  background: var(--bg-page);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.callback-loading,
.callback-success,
.callback-error {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  text-align: center;
}

.spinner {
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

.callback-loading p,
.callback-success p {
  color: #94A3B8;
  font-size: 14px;
}

.success-icon,
.error-icon {
  font-size: 48px;
}

.callback-error p {
  color: #EF4444;
  font-size: 14px;
}

.retry-btn {
  margin-top: 16px;
  padding: 12px 32px;
  background: #1E293B;
  color: #fff;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  cursor: pointer;
}

/* Bind Form - Authenticated by Aurora Design */
.callback-bind {
  width: 100%;
  max-width: 360px;
}

.bind-header {
  text-align: center;
  margin-bottom: 32px;
}

.bind-header h2 {
  color: #fff;
  font-size: 20px;
  margin: 16px 0 8px;
  font-weight: 700;
}

.bind-header p {
  color: #94A3B8;
  font-size: 14px;
}

.input-group {
  margin-bottom: 20px;
  position: relative;
}

/* Custom Input Style to match EmailInput */
.custom-input {
  width: 100%;
  height: 54px;
  background: rgba(0, 0, 0, 0.25);
  border: none;
  border-bottom: 2px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 0 16px;
  color: #fff;
  font-size: 16px;
  outline: none;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.custom-input:focus {
  background: rgba(0, 0, 0, 0.4);
  border-bottom-color: var(--color-brand-primary, #178fc6);
  box-shadow: 0 4px 15px -4px var(--color-brand-glow, rgba(23, 143, 198, 0.3));
}

.code-row .custom-input {
  padding-right: 120px; /* Space for button */
}

/* Submit Button */
.submit-btn {
  width: 100%;
  height: 50px;
  border: none;
  border-radius: 25px; /* Pill shape */
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  background: linear-gradient(135deg, var(--color-brand-primary, #178fc6), var(--color-accent, #F97316));
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
  transition: all 0.3s;
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  box-shadow: none;
  background: #334155;
}

.submit-btn:not(:disabled):hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
}

.form-agreement {
  margin-bottom: 24px;
  font-size: 12px;
  color: #64748B;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form-agreement input {
  margin-right: 8px;
  width: 16px;
  height: 16px;
  accent-color: var(--color-accent, #F97316);
}

.link {
  color: var(--color-brand-primary, #178fc6);
  cursor: pointer;
}
</style>

<style>
/* Global Styles for Mobile Msg Box (Unscoped) */
.mobile-msg-box {
  width: 90% !important;
  max-width: 320px !important;
  background: rgba(30, 41, 59, 0.95) !important;
  backdrop-filter: blur(12px) !important;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  border-radius: 20px !important;
  padding-bottom: 15px !important;
}

.mobile-msg-box .el-message-box__title {
  color: #fff !important;
  font-size: 18px !important;
}

.mobile-msg-box .el-message-box__message p {
  color: #CBD5E1 !important;
  font-size: 14px !important;
  line-height: 1.6 !important;
}

.mobile-msg-box .el-message-box__btns {
  flex-direction: column-reverse; /* Stack buttons */
  gap: 10px;
}

.mobile-msg-box .el-button {
  width: 100% !important;
  margin: 0 !important;
  height: 44px !important;
  border-radius: 12px !important;
  font-weight: 600 !important;
}

.mobile-msg-box .el-button--primary {
  background: linear-gradient(90deg, #F59E0B, #EA580C) !important;
  border: none !important;
  color: #fff !important;
}

.mobile-msg-box .el-button--default {
  background: transparent !important;
  border: 1px solid rgba(255, 255, 255, 0.2) !important;
  color: #94A3B8 !important;
}
</style>
