<template>
  <Teleport to="body">
    <div class="login-sheet-wrapper">
    <!-- Overlay -->
    <transition name="fade">
      <div v-if="visible" class="sheet-overlay" @click="close"></div>
    </transition>

    <!-- Bottom Sheet -->
    <transition name="slide-up">
      <div v-if="visible" class="sheet-panel" @click.stop>
         <!-- Handle Bar -->
         <div class="sheet-handle-bar">
            <div class="sheet-handle"></div>
         </div>

         <!-- Header -->
         <div class="sheet-header">
            <div class="h-title">Welcome Back (v2)</div>
            <div class="h-sub">登录您的凡图拉账户</div>
            
            <!-- Tabs -->
            <div class="auth-tabs">
               <div class="tab-item" :class="{ active: mode === 'login' }" @click="mode = 'login'">登录</div>
               <div class="tab-item" :class="{ active: mode === 'register' }" @click="mode = 'register'">注册</div>
            </div>
         </div>

         <!-- Body -->
         <div class="sheet-body">
            <!-- Login Form -->
            <div v-if="mode === 'login'" class="auth-form">
               <!-- Login Type Switch -->
               <div class="login-type-switch">
                  <span :class="{ active: loginType === 'code' }" @click="loginType = 'code'">验证码</span>
                  <span :class="{ active: loginType === 'password' }" @click="loginType = 'password'">密码</span>
               </div>

               <form v-if="loginType === 'password'" @submit.prevent="onLogin">
                  <div class="input-group">
                     <EmailInput v-model="loginForm.email" :required="true" placeholder="请输入邮箱" />
                  </div>
                  <div class="input-group">
                     <input type="password" v-model="loginForm.password" placeholder="请输入密码" required />
                  </div>
                  <div class="form-options">
                     <label class="checkbox-label">
                        <input type="checkbox" v-model="loginForm.remember" /> 记住我
                     </label>
                     <span class="forgot-btn" @click="ElMessage.info('请联系客服重置')">忘记密码?</span>
                  </div>
                  <div class="form-agreement">
                      <label>
                         <input type="checkbox" v-model="loginForm.agree" />
                         <span>同意 <span class="link">用户协议</span> 和 <span class="link">隐私政策</span></span>
                      </label>
                  </div>
                  <button class="submit-btn" type="submit" :disabled="loading || !loginForm.agree">
                     {{ loading ? '登录中...' : '立即登录' }}
                  </button>
               </form>

               <form v-else @submit.prevent="onLoginCode">
                  <div class="input-group">
                     <EmailInput v-model="loginCodeForm.email" :required="true" placeholder="请输入邮箱" />
                  </div>
                  <div class="input-group code-row">
                     <input type="text" v-model="loginCodeForm.code" placeholder="验证码" required />
                     <SendCodeButton 
                        :loading="loading" 
                        :countdown="codeTimer" 
                        @click="sendCode('login')" 
                     />
                  </div>
                  <div class="form-agreement">
                      <label>
                         <input type="checkbox" v-model="loginCodeForm.agree" />
                         <span>同意 <span class="link">用户协议</span> 和 <span class="link">隐私政策</span></span>
                      </label>
                  </div>
                  <button class="submit-btn" type="submit" :disabled="loading || !loginCodeForm.agree">
                     {{ loading ? '登录中...' : '立即登录' }}
                  </button>
               </form>
            </div>

            <!-- Register Form -->
            <div v-else class="auth-form">
               <form @submit.prevent="onRegister">
                  <div class="input-group">
                     <EmailInput v-model="registerForm.email" :required="true" placeholder="请输入邮箱" />
                  </div>
                  <div class="input-group code-row">
                     <input type="text" v-model="registerForm.code" placeholder="验证码" required />
                     <SendCodeButton 
                        :loading="loading" 
                        :countdown="codeTimer" 
                        @click="sendCode('register')" 
                     />
                  </div>
                  <div class="input-group">
                     <input type="password" v-model="registerForm.password" placeholder="设置密码 (至少6位)" required />
                  </div>
                  <div class="input-group">
                     <input type="text" v-model="registerForm.inviteId" placeholder="邀请码 (选填)" />
                  </div>
                  <div class="form-agreement">
                      <label>
                         <input type="checkbox" v-model="registerForm.agree" />
                         <span>同意 <span class="link">用户协议</span> 和 <span class="link">隐私政策</span></span>
                      </label>
                  </div>
                  <button class="submit-btn" type="submit" :disabled="loading || !registerForm.agree">
                     {{ loading ? '注册中...' : '立即注册' }}
                  </button>
               </form>
            </div>

            <!-- Social Login -->
            <div class="social-divider">
               <span>或者</span>
            </div>
            <div class="social-login">
               <button class="google-btn" @click="oauth('google')">
                  <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" />
                  <span>Google</span>
               </button>
               <button class="wechat-btn" @click="onWechatLogin">
                  <svg class="wechat-icon" viewBox="0 0 24 24" width="22" height="22">
                     <path fill="#07C160" d="M8.691 2.188C3.891 2.188 0 5.476 0 9.53c0 2.212 1.17 4.203 3.002 5.55a.59.59 0 0 1 .213.665l-.39 1.48c-.019.07-.048.141-.048.213 0 .163.13.295.29.295a.326.326 0 0 0 .167-.054l1.903-1.114a.864.864 0 0 1 .717-.098 10.16 10.16 0 0 0 2.837.403c.276 0 .543-.027.811-.05-.857-2.578.157-4.972 1.932-6.446 1.703-1.415 3.882-1.98 5.853-1.838-.576-3.583-4.196-6.348-8.596-6.348zM5.785 5.991c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178A1.17 1.17 0 0 1 4.623 7.17c0-.651.52-1.18 1.162-1.18zm5.813 0c.642 0 1.162.529 1.162 1.18a1.17 1.17 0 0 1-1.162 1.178 1.17 1.17 0 0 1-1.162-1.178c0-.651.52-1.18 1.162-1.18zm5.34 2.867c-1.797-.052-3.746.512-5.28 1.786-1.72 1.428-2.687 3.72-1.78 6.22.942 2.453 3.666 4.229 6.884 4.229.826 0 1.622-.12 2.361-.336a.722.722 0 0 1 .598.082l1.584.926a.272.272 0 0 0 .14.045c.134 0 .24-.11.24-.245 0-.06-.023-.118-.04-.177l-.325-1.233a.49.49 0 0 1 .177-.554c1.525-1.122 2.502-2.779 2.502-4.608-.001-3.248-2.913-5.935-7.061-6.135zm-2.344 3.363c.534 0 .967.44.967.982a.975.975 0 0 1-.967.981.976.976 0 0 1-.967-.981c0-.542.433-.982.967-.982zm4.726 0c.534 0 .967.44.967.982a.975.975 0 0 1-.967.981.976.976 0 0 1-.967-.981c0-.542.433-.982.967-.982z"/>
                  </svg>
                  <span>微信</span>
               </button>
            </div>
         </div>
      </div>
    </transition>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { authApi } from '@/api/client/auth'
import { useUserStore } from '@/stores/client/user'
import { getSupabaseClient } from '@/utils/supabase'
import EmailInput from '@/components/shared/EmailInput.vue'
import SendCodeButton from '@/components/shared/SendCodeButton.vue'
import { ElMessage } from 'element-plus'
import { wechatLoginApi } from '@/api/client/wechat-login'

const props = defineProps<{ visible: boolean }>()
const emit = defineEmits(['close'])

const mode = ref<'login' | 'register'>('login')
const loginType = ref<'password' | 'code'>('code')
const loading = ref(false)

// Forms
const loginForm = ref({ email: '', password: '', remember: false, agree: false })
const loginCodeForm = ref({ email: '', code: '', remember: false, agree: false })
const registerForm = ref({ email: '', code: '', password: '', inviteId: '', agree: false })

// Timer Logic
const codeTimer = ref(0)
let codeInterval: any = null
const COOLDOWN = 60
const TIMER_KEY = 'mobile_auth_timer'

const close = () => emit('close')

const restoreTimer = () => {
    const end = localStorage.getItem(TIMER_KEY)
    if (end) {
        const left = Math.ceil((parseInt(end) - Date.now()) / 1000)
        if (left > 0) startTimer(left, false)
        else localStorage.removeItem(TIMER_KEY)
    }
}

const startTimer = (seconds: number, fresh = true) => {
    codeTimer.value = seconds
    if (fresh) localStorage.setItem(TIMER_KEY, (Date.now() + seconds * 1000).toString())
    if (codeInterval) clearInterval(codeInterval)
    codeInterval = setInterval(() => {
        codeTimer.value--
        if (codeTimer.value <= 0) {
            clearInterval(codeInterval)
            localStorage.removeItem(TIMER_KEY)
        }
    }, 1000)
}

onMounted(() => restoreTimer())

// Actions
const sendCode = async (type: 'login' | 'register') => {
    if (codeTimer.value > 0) return
    const email = type === 'register' ? registerForm.value.email : loginCodeForm.value.email
    if (!email) return ElMessage.warning('请输入邮箱')
    
    loading.value = true
    try {
        const res = await authApi.getEmailCode(email)
        if (res.success) {
            ElMessage.success('发送成功')
            startTimer(COOLDOWN)
        } else ElMessage.error(res.msg || '发送失败')
    } catch(e) { ElMessage.error('网络错误') }
    finally { loading.value = false }
}

const handleSuccess = async (data: any) => {
    const store = useUserStore()
    store.setUser(data.user, data.session?.access_token)
    await Promise.all([store.loadFavorites(), store.loadOrders()])
    ElMessage.success('欢迎回来')
    close()
}

const onLogin = async () => {
    if (!loginForm.value.agree) return ElMessage.warning('请同意协议')
    loading.value = true
    try {
        const res = await authApi.login({
           username: loginForm.value.email,
           password: loginForm.value.password
        })
        if (res.success) await handleSuccess(res.data)
        else ElMessage.error(res.msg || '登录失败')
    } catch(e) { ElMessage.error('登录异常') }
    finally { loading.value = false }
}

const onLoginCode = async () => {
    if (!loginCodeForm.value.agree) return ElMessage.warning('请同意协议')
    loading.value = true
    try {
        const res = await authApi.loginWithCode(loginCodeForm.value)
        if (res.success) await handleSuccess(res.data)
        else ElMessage.error(res.msg || '登录失败')
    } catch(e) { ElMessage.error('登录异常') }
    finally { loading.value = false }
}

const onRegister = async () => {
    if (!registerForm.value.agree) return ElMessage.warning('请同意协议')
    loading.value = true
    try {
        const res = await authApi.registerWithCodeAndPassword(registerForm.value)
        if (res.success) await handleSuccess(res.data)
        else ElMessage.error(res.msg || '注册失败')
    } catch(e) { ElMessage.error('注册异常') }
    finally { loading.value = false }
}

const oauth = (provider: string) => {
    const client = getSupabaseClient()
    client.auth.signInWithOAuth({ provider: provider as any })
}

// 微信登录（移动端 OAuth 授权）
const onWechatLogin = () => {
    // 检测是否在微信浏览器内
    const isWechat = /MicroMessenger/i.test(navigator.userAgent)
    
    if (!isWechat) {
        ElMessage.warning('请在微信内打开此页面使用微信登录')
        return
    }
    
    // 构建 OAuth 授权 URL 并跳转
    const redirectUri = window.location.origin + '/mobile/wechat-callback'
    const authUrl = wechatLoginApi.getOAuthUrl(redirectUri, 'login')
    window.location.href = authUrl
}
</script>

<style scoped>
.login-sheet-wrapper {
   position: relative; z-index: 10000;
}
.sheet-overlay {
   position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
   z-index: 10000;
}
.sheet-panel {
   position: fixed; bottom: 0; left: 0; right: 0;
   background: #0F172A;
   border-radius: 24px 24px 0 0;
   z-index: 10001;
   padding-bottom: max(20px, env(safe-area-inset-bottom));
   max-height: 90vh; overflow-y: auto;
   box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
}

.sheet-handle-bar {
   height: 24px; display: flex; align-items: center; justify-content: center;
}
.sheet-handle {
   width: 40px; height: 4px; background: rgba(255,255,255,0.1); border-radius: 2px;
}

.sheet-header {
   padding: 0 24px; text-align: center;
}
.h-title { font-size: 24px; color: #fff; font-weight: 700; margin-bottom: 4px; }
.h-sub { font-size: 13px; color: #64748B; margin-bottom: 24px; }
.auth-tabs {
   display: flex; background: rgba(255,255,255,0.05); border-radius: 12px; padding: 4px;
   margin-bottom: 24px;
}
.tab-item {
   flex: 1; text-align: center; padding: 10px 0; font-size: 14px; font-weight: 600;
   color: #94A3B8; border-radius: 8px; transition: all 0.3s;
}
.tab-item.active {
   background: #1E293B; color: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.2);
}

.sheet-body { padding: 0 24px; }
.login-type-switch {
   display: flex; gap: 20px; margin-bottom: 16px; font-size: 14px; color: #64748B;
}
.login-type-switch span { cursor: pointer; padding-bottom: 4px; border-bottom: 2px solid transparent; transition: all 0.2s; }
.login-type-switch span.active { color: #fff; border-color: #F97316; }

.input-group { margin-bottom: 16px; position: relative; } /* Constraint for absolute button */
.input-group input,
:deep(.custom-email-input) {
   width: 100%; height: 50px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
   border-radius: 12px; padding: 0 16px; color: #fff; font-size: 15px; outline: none;
   transition: border 0.2s;
}
.input-group input:focus { border-color: #F97316; }

/* Code Row: Button sits INSIDE the input now */
.code-row input { padding-right: 120px; } /* Space for SendCodeButton */

.form-options {
   display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; font-size: 13px; color: #94A3B8;
}
.form-agreement { margin-bottom: 24px; font-size: 12px; color: #64748B; display: flex; align-items: center; }
.form-agreement input { margin-right: 8px; }
.link { color: #3B82F6; }

.submit-btn {
   width: 100%; height: 50px; background: linear-gradient(135deg, #F97316, #EA580C);
   border: none; border-radius: 25px; color: #fff; font-size: 16px; font-weight: 600;
   box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}
.submit-btn:disabled { opacity: 0.5; cursor: not-allowed; }

.social-divider {
   margin: 30px 0 20px; text-align: center; position: relative;
}
.social-divider span {
   background: #0F172A; padding: 0 10px; color: #475569; position: relative; z-index: 1; font-size: 12px;
}
.social-divider::before {
   content: ''; position: absolute; left: 0; right: 0; top: 50%; height: 1px; background: rgba(255,255,255,0.05);
}

.google-btn {
   width: 100%; height: 50px; background: #fff; border-radius: 25px; border: none;
   display: flex; align-items: center; justify-content: center; gap: 10px;
   font-size: 15px; font-weight: 600; color: #333;
}
.google-btn img { width: 22px; height: 22px; }

.social-login {
   display: flex;
   gap: 12px;
}
.google-btn, .wechat-btn {
   flex: 1;
}

.wechat-btn {
   height: 50px;
   background: #07C160;
   border-radius: 25px;
   border: none;
   display: flex;
   align-items: center;
   justify-content: center;
   gap: 10px;
   font-size: 15px;
   font-weight: 600;
   color: #fff;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); }
</style>
