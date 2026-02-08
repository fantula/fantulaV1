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
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const state = ref<'loading' | 'bind' | 'success' | 'error'>('loading')
const errorMsg = ref('')
const bindToken = ref('')
const loading = ref(false)

const bindForm = ref({
  email: '',
  code: '',
  password: '',
  agree: false,
  nickname: undefined as string | undefined,
  avatar: undefined as string | undefined,
})

const codeTimer = ref(0)
let codeInterval: any = null

onMounted(async () => {
  // 0. 特殊处理：如果是 Magic Link 回调（Hash 中包含 access_token）
  if (route.hash && route.hash.includes('access_token')) {
    console.log('[WechatCallback] Magic Link hash detected')
    state.value = 'loading'
    
    // 监听 Auth 状态变化 (Supabase 客户端会自动处理 Hash 并恢复 Session)
    const { data: { subscription } } = getSupabaseClient().auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        console.log('[WechatCallback] Session restored from hash')
        
        // 确保 userStore 同步
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

  // 场景: 已登录用户绑定微信
  if (userStore.isLoggedIn) {
     state.value = 'loading'
     try {
        const res = await wechatLoginApi.bindWechatToAccount({ wechatCode: code })
        if (res.success) {
            state.value = 'success'
            setTimeout(() => {
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
            state.value = 'error'
            errorMsg.value = res.msg || '绑定失败'
        }
     } catch (e: any) {
        state.value = 'error'
        errorMsg.value = e.message || '绑定失败'
     }
     return
  }

  try {
    // 获取 return_to 参数
    const returnTo = route.query.return_to as string
    
    // 用 code 换取 openid 并检查绑定状态
    const res = await wechatLoginApi.oauthLogin(code, { 
        redirectTo: returnTo ? decodeURIComponent(returnTo) : undefined 
    })

    if (!res.success || !res.data) {
      state.value = 'error'
      errorMsg.value = res.msg || '登录失败'
      return
    }

    if (res.data.status === 'logged_in') {
      // 已有绑定账号，直接登录
      state.value = 'success'
      // TODO: 完成登录流程（后端需返回 session）
      // oauthLogin actually returns session if logged_in?
      // Check wechat-login.ts oauthLogin return type?
      // It returns OAuthResult { status, ... }
      // To actually login, we might need to set token?
      // But let's assume oauthLogin logic on server sets cookie or returns token?
      // Wait, oauthLogin on server: returns `token`.
      // Client `oauthLogin` api wrapper: returns `response.data`.
      // Check server code?
      // If server returns token, we need to use it.
      // But here we are focusing on Binding.
      
      // For existing logic (not my task but worth noting): 
      // If status is logged_in, we probably need to fetch user info or token is already set?
      // Let's leave existing logic logic alone aside from what I see.
      
      // But looking at existing code:
      // setTimeout(() => { router.replace('/mobile') }, 1500)
      // It doesn't seem to set userStore?
      // Maybe oauthLogin endpoint sets HttpOnly cookie?
      
      state.value = 'success'
      
      // 如果后端返回了 Magic Link，使用它进行自动登录跳转
      if (res.data.actionLink) {
         // 处理 Magic Link 的重定向目标
         let link = res.data.actionLink
         const returnTo = route.query.return_to as string
         // 如果有 return_to，我们需要告诉 Magic Link 登录后跳转到哪里
         // 但 Supabase Magic Link 的重定向是在生成时决定的 (redirectTo)
         // 我们可以在客户端处理：先跳 Magic Link，Magic Link 验证后会跳回配置的页面
         // 这里的策略是：信任后端生成的 Link
         
         console.log('Redirecting to Magic Link...', link)
         window.location.href = link
      } else {
          // 降级：如果没有 Link
           setTimeout(() => {
            const returnTo = route.query.return_to as string
            if (returnTo) {
                window.location.href = decodeURIComponent(returnTo)
            } else {
                router.replace('/mobile')
            }
          }, 1500)
      }
    } else if (res.data.status === 'need_bind') {
      // 需要绑定邮箱
      bindToken.value = res.data.bindToken || ''
      bindForm.value.nickname = res.data.nickname
      bindForm.value.avatar = res.data.avatar
      state.value = 'bind'
    } else {
      state.value = 'error'
      errorMsg.value = '未知状态'
    }
  } catch (err: any) {
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

  loading.value = true
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
    const res = await authApi.getEmailCode(bindForm.value.email)
    if (res.success) {
      startTimer(60)
      ElMessage.success('验证码已发送')
      errorMsg.value = '' // Clear error if any
    } else {
      errorMsg.value = res.msg || '发送失败'
    }
  } catch (err: any) {
    console.error(err)
    errorMsg.value = '发送失败: ' + (err.message || '网络错误')
  } finally {
    loading.value = false
  }
}

const startTimer = (seconds: number) => {
  codeTimer.value = seconds
  codeInterval = setInterval(() => {
    codeTimer.value--
    if (codeTimer.value <= 0) {
      clearInterval(codeInterval)
    }
  }, 1000)
}

const onBind = async () => {
  if (!bindForm.value.agree) {
    errorMsg.value = '请同意协议'
    return
  }
  if (!bindToken.value) {
    errorMsg.value = '绑定凭证无效，请重新登录'
    return
  }

  loading.value = true
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
      userStore.setUser(res.data.user, res.data.session?.access_token)
      state.value = 'success'
      setTimeout(() => {
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
    loading.value = false
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
  background: linear-gradient(135deg, #F97316, #EA580C);
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
