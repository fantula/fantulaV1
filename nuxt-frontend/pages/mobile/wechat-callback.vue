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
          <input 
            v-model="bindForm.email" 
            type="email" 
            placeholder="请输入邮箱" 
            required 
          />
        </div>
        <div class="input-group code-row">
          <input 
            v-model="bindForm.code" 
            type="text" 
            placeholder="验证码" 
            required 
          />
          <button 
            type="button" 
            class="send-code-btn" 
            :disabled="codeTimer > 0" 
            @click="sendCode"
          >
            {{ codeTimer > 0 ? `${codeTimer}s` : '发送' }}
          </button>
        </div>
        <div class="input-group">
          <input 
            v-model="bindForm.password" 
            type="password" 
            placeholder="设置密码（可选）" 
          />
        </div>
        <div class="form-agreement">
          <label>
            <input type="checkbox" v-model="bindForm.agree" />
            <span>同意 <span class="link">用户协议</span> 和 <span class="link">隐私政策</span></span>
          </label>
        </div>
        <button class="submit-btn" type="submit" :disabled="loading || !bindForm.agree">
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
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { wechatLoginApi } from '@/api/client/wechat-login'
import { authApi } from '@/api/client/auth'
import { useUserStore } from '@/stores/client/user'
import { getSupabaseClient } from '~/utils/supabase'
import { ElMessageBox } from 'element-plus'
import { useGlobalLoading } from '@/composables/useGlobalLoading' // Import

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

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

import { useSendCode } from '@/composables/client/useSendCode'

const { 
  loading: codeLoading, 
  countdown: codeTimer, 
  sendCode: sendBindCode 
} = useSendCode({ timerKey: 'wechat_bind_timer' })

const baseLoading = ref(false)
const loading = computed(() => baseLoading.value || codeLoading.value)
// const codeTimer = ref(0) // Replaced
let codeInterval: any = null // clear on unmount if any? useSendCode handles it.

// Global Loading
const globalLoading = useGlobalLoading()

onMounted(async () => {
  // 0. 特殊处理：如果是 Magic Link 回调（Hash 中包含 access_token）
  if (route.hash && route.hash.includes('access_token')) {
    console.log('[WechatCallback] Magic Link hash detected')
    // state.value = 'loading' 
    globalLoading.show('正在验证登录...') // Global Show
    
    // 监听 Auth 状态变化 (Supabase 客户端会自动处理 Hash 并恢复 Session)
    const { data: { subscription } } = getSupabaseClient().auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        console.log('[WechatCallback] Session restored from hash')
        
        // 确保 userStore 同步
        await userStore.setUser(session.user, session.access_token)
        
        // state.value = 'success'
        globalLoading.success('登录成功') // Global Success
        setTimeout(() => {
            const returnTo = route.query.return_to as string
            globalLoading.hide() // Ensure hide before nav
            if (returnTo) {
                window.location.href = decodeURIComponent(returnTo)
            } else {
                router.replace('/mobile/profile/account')
            }
        }, 800)
        subscription.unsubscribe()
      }
    })
    
    // 同时也尝试直接获取 session (如果已经处理完)
    const { data: { session } } = await getSupabaseClient().auth.getSession()
    if (session) {
         await userStore.setUser(session.user, session.access_token)
         state.value = 'success'
         setTimeout(() => {
            const returnTo = route.query.return_to as string
            if (returnTo) {
                window.location.href = decodeURIComponent(returnTo)
            } else {
                router.replace('/mobile/profile/account')
            }
         }, 800)
         subscription.unsubscribe() // clean up
         return
    }
    
    return // 等待 AuthStateChange
  }

  // 从 URL 获取微信授权 code
  const code = route.query.code as string

  if (!code) {
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
        console.log('[WechatCallback] Got openid for recharge:', res.data.openid)
      }
      // 跳回充值页面
      const returnTo = route.query.return_to as string
      if (returnTo) {
        window.location.href = decodeURIComponent(returnTo)
      } else {
        router.replace('/mobile')
      }
    } catch (e: any) {
      console.error('[WechatCallback] Get openid for recharge failed:', e)
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
                    router.replace('/mobile/profile/account')
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

    if (!res.success || !res.data) {
      globalLoading.hide()
      state.value = 'error'
      errorMsg.value = res.msg || '登录失败'
      return
    }

    if (res.data.status === 'logged_in') {
      // 已有绑定账号，通过 Magic Link 完成自动登录
      // 流程: 跳转 Magic Link → GoTrue 验证 → 重定向回 wechat-callback#access_token=xxx
      //       → onMounted 的 hash 分支处理 → 建立 session → 登录成功
      
      if (res.data.actionLink) {
         // state.value = 'success'
         globalLoading.show('正在跳转...') // Keep showing or update text
         console.log('[WechatCallback] Redirecting to Magic Link for auto-login...')
         window.location.href = res.data.actionLink
      } else {
          // 降级：Magic Link 生成失败，提示用户
          globalLoading.hide()
          state.value = 'error'
          errorMsg.value = '自动登录失败，请使用邮箱验证码登录'
          console.error('[WechatCallback] No actionLink returned from server')
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
  if (codeTimer.value > 0) return
  if (!bindForm.value.email) {
    errorMsg.value = '请输入邮箱'
    return
  }

  baseLoading.value = true
  try {
    // 1. Check if email exists (Pre-flight check)
    const checkRes = await authApi.checkEmailAvailable(bindForm.value.email)
    if (!checkRes.success) {
       errorMsg.value = checkRes.msg || '检查邮箱失败'
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
             customClass: 'mobile-msg-box' // Optional class for mobile styling
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
    console.error(err)
    errorMsg.value = '发送失败: ' + (err.message || '网络错误')
  } finally {
    baseLoading.value = false
  }
}

// const startTimer = (seconds: number) => { ... } // Removed

const onBind = async () => {
  if (!bindForm.value.agree) {
    errorMsg.value = '请同意协议'
    return
  }
  if (!bindToken.value) {
    errorMsg.value = '绑定凭证无效，请重新登录'
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
      globalLoading.show('正在完成绑定...') // Show loading again
      // 🔑 关键：在 Supabase JS Client 上建立 session
      // 否则后续的 auth.getUser() 会返回 null（未登录）
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
      // state.value = 'success' // Use Global
      globalLoading.success('绑定成功')
      setTimeout(() => {
        globalLoading.hide()
        const returnTo = route.query.return_to as string
        if (returnTo) {
            window.location.href = decodeURIComponent(returnTo)
        } else {
            router.replace('/mobile')
        }
      }, 1000)
    } else {
      errorMsg.value = res.msg || '绑定失败'
    }
  } catch (err: any) {
    errorMsg.value = err.message || '绑定失败'
  } finally {
    baseLoading.value = false
  }
}

const goHome = () => {
  router.replace('/mobile')
}
</script>

<style scoped>
.wechat-callback-page {
  min-height: 100vh;
  background: #0F172A;
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

/* Bind Form */
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
}

.bind-header p {
  color: #94A3B8;
  font-size: 14px;
}

.bind-form .input-group {
  margin-bottom: 16px;
  position: relative;
}

.bind-form input[type="email"],
.bind-form input[type="text"],
.bind-form input[type="password"] {
  width: 100%;
  height: 50px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  padding: 0 16px;
  color: #fff;
  font-size: 15px;
  outline: none;
}

.code-row {
  display: flex;
  gap: 12px;
}

.code-row input {
  flex: 1;
}

.send-code-btn {
  width: 80px;
  height: 50px;
  background: #1E293B;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}

.send-code-btn:disabled {
  opacity: 0.5;
}

.form-agreement {
  margin-bottom: 24px;
  font-size: 12px;
  color: #64748B;
  display: flex;
  align-items: center;
}

.form-agreement input {
  margin-right: 8px;
}

.link {
  color: #3B82F6;
}

.submit-btn {
  width: 100%;
  height: 50px;
  background: linear-gradient(135deg, var(--color-accent), var(--color-accent-hover));
  border: none;
  border-radius: 25px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

.submit-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
