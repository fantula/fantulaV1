<template>
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
            <div class="h-title">Welcome Back</div>
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
            </div>
         </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { authApi } from '@/api/client/auth'
import { useUserStore } from '@/stores/client/user'
import { getSupabaseClient } from '@/utils/supabase'
import EmailInput from '@/components/shared/EmailInput.vue'
import SendCodeButton from '@/components/shared/SendCodeButton.vue'
import { ElMessage } from 'element-plus'

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
</script>

<style scoped>
.login-sheet-wrapper {
   position: relative; z-index: 3000;
}
.sheet-overlay {
   position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
   z-index: 3000;
}
.sheet-panel {
   position: fixed; bottom: 0; left: 0; right: 0;
   background: #0F172A;
   border-radius: 24px 24px 0 0;
   z-index: 3001;
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

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.slide-up-enter-active, .slide-up-leave-active { transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.slide-up-enter-from, .slide-up-leave-to { transform: translateY(100%); }
</style>
