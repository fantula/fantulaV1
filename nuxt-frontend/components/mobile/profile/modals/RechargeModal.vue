<template>
  <Teleport to="body">
    <div v-if="visible" class="modal-overlay" @click="close">
    <div class="modal-content" @click.stop>
      <div class="modal-header">
        <h3 class="modal-title">购置额度</h3>
        <button class="close-btn" @click="close">
            <Close class="w-5 h-5" />
        </button>
      </div>

      <div class="modal-body">
         <!-- 1. Quota Options -->
         <div class="section-title">选择额度</div>
         <div class="amount-grid">
             <div 
                v-for="(item, idx) in options" 
                :key="idx"
                :class="['amount-card', { active: selectedIdx === idx }]"
                @click="selectOption(idx)"
             >
                <div class="amount-val">{{ item.value }}<span class="unit">点</span></div>
                <div v-if="item.bonus > 0" class="bonus-tag">送 {{ item.bonus }}</div>
             </div>
             
             <!-- Custom Option -->
             <div 
                :class="['amount-card', 'custom-card', { active: selectedIdx === -1 }]"
                @click="selectOption(-1)"
             >
                <span class="custom-label">自定义</span>
             </div>
         </div>

         <!-- Custom Input -->
         <div class="custom-input-wrap" v-if="selectedIdx === -1">
             <input 
                v-model.number="customValue" 
                type="number" 
                placeholder="请输入充值金额" 
                class="premium-input"
             />
             <span class="suffix">点</span>
         </div>

         <!-- 2. Payment Method -->
         <div class="section-title mt-4">支付方式</div>
         <div class="pay-methods">
             <!-- 支付宝暂未开通 -->
             <div class="pay-item disabled">
                <div class="pay-left">
                    <img src="/images/client/pc/zhifu2.png" class="pay-icon" alt="Alipay" />
                    <span>支付宝</span>
                    <span class="coming-soon">即将开通</span>
                </div>
             </div>

             <div 
                :class="['pay-item', { active: payType === 'wechat' }]"
                @click="payType = 'wechat'"
             >
                <div class="pay-left">
                    <img src="/images/client/pc/weixin.png" class="pay-icon" alt="WeChat" />
                    <span>微信支付</span>
                </div>
                <div class="pay-radio" :class="{ checked: payType === 'wechat' }">
                    <div class="radio-dot" v-if="payType === 'wechat'"></div>
                </div>
             </div>
         </div>

         <!-- 非微信浏览器提示 -->
         <div v-if="!isWechatBrowser" class="wechat-tip">
           <div class="tip-icon">💡</div>
           <div class="tip-text">请在微信中打开本页面以使用微信支付</div>
         </div>
      </div>

      <div class="modal-footer">
          <div class="total-info" v-if="isValidAmount">
              <span>实际到账:</span>
              <span class="total-val">{{ totalPoints }} 点</span>
              <span class="bonus-hint" v-if="currentBonus > 0">(含赠送 {{ currentBonus }})</span>
          </div>

          <button 
            class="pay-btn" 
            @click="handleRecharge" 
            :disabled="loading || !isValidAmount || !isWechatBrowser"
          >
              <span v-if="loading" class="spinner"></span>
              <span v-else-if="!isWechatBrowser">请在微信内打开</span>
              <span v-else>立即支付 ¥{{ payAmount.toFixed(2) }}</span>
          </button>
      </div>
    </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { authApi } from '@/api/client/auth'
import { wechatPayApi } from '@/api/client/wechat-payment'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/client/user'

const props = defineProps<{
  visible: boolean
}>()

const emit = defineEmits(['close', 'success'])
const userStore = useUserStore()

interface RechargeOption {
  value: number
  bonus: number
}

// 检测是否在微信浏览器内
const isWechatBrowser = ref(false)
const userOpenId = ref<string | null>(null)

const options = ref<RechargeOption[]>([])
const loading = ref(false)
const selectedIdx = ref(0)
const customValue = ref<number | null>(null)
const payType = ref<'wechat'>('wechat')

// Computed
const payAmount = computed(() => {
    if (selectedIdx.value !== -1 && options.value[selectedIdx.value]) {
        return options.value[selectedIdx.value].value
    }
    return customValue.value || 0
})

const currentBonus = computed(() => {
    if (selectedIdx.value !== -1 && options.value[selectedIdx.value]) {
        return options.value[selectedIdx.value].bonus
    }
    return 0
})

const totalPoints = computed(() => payAmount.value + currentBonus.value)

const isValidAmount = computed(() => payAmount.value > 0)

// Methods
const close = () => {
    emit('close')
}

const selectOption = (idx: number) => {
    selectedIdx.value = idx
    if (idx !== -1) customValue.value = null
}

// 检查微信浏览器
function checkWechatBrowser() {
  const ua = navigator.userAgent.toLowerCase()
  isWechatBrowser.value = ua.includes('micromessenger')
}

// 获取用户 OpenID（从 URL 参数或缓存）
async function getOpenId(): Promise<string | null> {
  // 检查是否已有 OpenID
  if (userOpenId.value) return userOpenId.value
  
  // 从 localStorage 获取缓存的 OpenID
  const cached = localStorage.getItem('wechat_openid')
  if (cached) {
    userOpenId.value = cached
    return cached
  }
  
  // 检查 URL 中是否有授权回调的 code
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  
  if (code) {
    try {
      const res = await wechatPayApi.getOpenId(code)
      if (res.success && res.data?.openid) {
        userOpenId.value = res.data.openid
        localStorage.setItem('wechat_openid', res.data.openid)
        
        // 清除 URL 中的 code 参数
        const newUrl = window.location.origin + window.location.pathname
        window.history.replaceState({}, '', newUrl)
        
        return res.data.openid
      }
    } catch (e) {
      console.error('Get OpenID failed:', e)
    }
  }
  
  return null
}

// 发起微信授权获取 OpenID
function redirectToWechatAuth() {
  // 公众号 AppID
  const appId = 'wxc2042fae927b28b8'
  const redirectUri = encodeURIComponent(window.location.href)
  const scope = 'snsapi_base'  // 静默授权
  const state = 'recharge'
  
  const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${appId}&redirect_uri=${redirectUri}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`
  
  window.location.href = authUrl
}

// 调用微信 JSAPI 支付
function invokeWechatPay(params: {
  appId: string
  timeStamp: string
  nonceStr: string
  package: string
  signType: string
  paySign: string
}) {
  return new Promise<boolean>((resolve) => {
    // 检查 WeixinJSBridge 是否可用
    if (typeof WeixinJSBridge === 'undefined') {
      ElMessage.error('请在微信浏览器中使用')
      resolve(false)
      return
    }
    
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest',
      {
        appId: params.appId,
        timeStamp: params.timeStamp,
        nonceStr: params.nonceStr,
        package: params.package,
        signType: params.signType,
        paySign: params.paySign,
      },
      (res: { err_msg: string }) => {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          resolve(true)
        } else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
          ElMessage.warning('已取消支付')
          resolve(false)
        } else {
          ElMessage.error('支付失败')
          resolve(false)
        }
      }
    )
  })
}

const handleRecharge = async () => {
    if (!isValidAmount.value || loading.value) return 
    
    if (!isWechatBrowser.value) {
      ElMessage.warning('请在微信中打开本页面')
      return
    }
    
    loading.value = true
    
    try {
        // 获取用户 OpenID
        let openid = await getOpenId()
        
        if (!openid) {
          // 需要授权获取 OpenID
          ElMessage.info('正在跳转微信授权...')
          redirectToWechatAuth()
          return
        }
        
        // 调用 JSAPI 下单
        const res = await wechatPayApi.jsapiPayRecharge(
          payAmount.value,
          openid,
          `凡图拉-充值${payAmount.value}点`
        )
        
        if (!res.success || !res.data) {
          ElMessage.error(res.error || '支付发起失败')
          return
        }
        
        // 调起微信支付
        const paySuccess = await invokeWechatPay({
          appId: res.data.appId,
          timeStamp: res.data.timeStamp,
          nonceStr: res.data.nonceStr,
          package: res.data.package,
          signType: res.data.signType,
          paySign: res.data.paySign,
        })
        
        if (paySuccess) {
          ElMessage.success('充值成功！')
          
          // 刷新用户余额
          await userStore.fetchUserInfo()
          
          emit('success')
          close()
        }
        
    } catch (e: any) {
        ElMessage.error(e.message || '支付失败')
    } finally {
        loading.value = false
    }
}

// Fetch Logic
onMounted(async () => {
    // 检查微信浏览器
    checkWechatBrowser()
    
    // 尝试获取 OpenID
    if (isWechatBrowser.value) {
      await getOpenId()
    }
    
    // 加载充值档位
    try {
        const res = await authApi.getActiveTiers()
        if (res.success && res.data) {
            options.value = res.data.map(item => ({
                value: item.value,
                bonus: parseInt(item.desc.replace(/[^0-9]/g, '') || '0')
            }))
        }
    } catch (e) {
        console.error('Fetch tiers failed', e)
    }
})

// 声明 WeixinJSBridge 类型
declare const WeixinJSBridge: {
  invoke: (
    method: string,
    params: object,
    callback: (res: { err_msg: string }) => void
  ) => void
}
</script>

<style scoped>
.modal-overlay {
    position: fixed; inset: 0; background: rgba(0,0,0,0.7); backdrop-filter: blur(4px);
    z-index: 4000; display: flex; align-items: flex-end; /* Bottom sheet style */
}

.modal-content {
    width: 100%; background: #1E293B; 
    border-top-left-radius: 20px; border-top-right-radius: 20px;
    padding: 20px 24px 40px 24px;
    border-top: 1px solid rgba(255,255,255,0.1);
    box-shadow: 0 -10px 40px rgba(0,0,0,0.5);
    animation: slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    max-height: 85vh; overflow-y: auto;
}

@keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }

.modal-header {
    display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
}
.modal-title { font-size: 18px; font-weight: 700; color: #fff; margin: 0; }
.close-btn { background: none; border: none; color: #94A3B8; font-size: 20px; padding: 4px; }

.section-title { font-size: 14px; font-weight: 600; color: #E2E8F0; margin-bottom: 12px; }
.mt-4 { margin-top: 24px; }

/* Grid */
.amount-grid {
    display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px;
}
.amount-card {
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 12px; padding: 12px 0;
    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 4px;
    cursor: pointer; position: relative;
    transition: all 0.2s;
}
.amount-card.active {
    background: rgba(249, 115, 22, 0.15); border-color: #F97316;
}
.amount-val { font-size: 18px; font-weight: 700; color: #fff; font-family: 'Outfit', sans-serif; }
.unit { font-size: 12px; font-weight: normal; color: #94A3B8; margin-left: 2px; }

.bonus-tag {
    font-size: 10px; background: #F97316; color: #fff; padding: 2px 6px; border-radius: 100px;
}
.custom-card { border-style: dashed; }
.custom-label { font-size: 14px; color: #94A3B8; }

/* Custom Input */
.custom-input-wrap {
    margin-top: 12px; position: relative;
}
.premium-input {
    width: 100%; height: 48px; background: rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.1); border-radius: 12px;
    padding: 0 40px 0 16px; color: #fff; font-size: 16px; outline: none;
}
.premium-input:focus { border-color: #F97316; }
.suffix { position: absolute; right: 16px; top: 14px; color: #94A3B8; font-size: 14px; }

/* Pay Methods */
.pay-methods { display: flex; flex-direction: column; gap: 10px; }
.pay-item {
    display: flex; justify-content: space-between; align-items: center;
    padding: 14px 16px; background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05); border-radius: 12px;
}
.pay-item.active { border-color: #F97316; background: rgba(249, 115, 22, 0.05); }
.pay-item.disabled { opacity: 0.5; cursor: not-allowed; }

.pay-left { display: flex; align-items: center; gap: 12px; color: #fff; font-size: 15px; }
.pay-icon { width: 24px; height: 24px; object-fit: contain; }
.coming-soon { font-size: 11px; color: #94A3B8; margin-left: 8px; }

.pay-radio {
    width: 20px; height: 20px; border-radius: 50%; border: 2px solid #64748B;
    display: flex; align-items: center; justify-content: center;
}
.pay-radio.checked { border-color: #F97316; }
.radio-dot { width: 10px; height: 10px; background: #F97316; border-radius: 50%; }

/* WeChat Tip */
.wechat-tip {
    margin-top: 16px; padding: 12px 16px;
    background: rgba(249, 115, 22, 0.1); border: 1px solid rgba(249, 115, 22, 0.2);
    border-radius: 12px; display: flex; align-items: center; gap: 12px;
}
.tip-icon { font-size: 20px; }
.tip-text { font-size: 13px; color: #F97316; }

/* Footer */
.modal-footer { margin-top: 32px; }
.total-info {
    display: flex; justify-content: center; align-items: baseline; gap: 6px; margin-bottom: 12px;
    color: #94A3B8; font-size: 13px;
}
.total-val { font-size: 20px; color: #F97316; font-weight: 700; font-family: 'Outfit', sans-serif; }
.bonus-hint { color: #10B981; }

.pay-btn {
    width: 100%; height: 50px; 
    background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
    border: none; border-radius: 12px; color: #fff; font-size: 16px; font-weight: 700;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
}
.pay-btn:disabled { opacity: 0.5; box-shadow: none; cursor: not-allowed; }

.spinner {
    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff; border-radius: 50%;
    animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
