<template>
  <div class="modal-mask">
    <div class="balance-modal">
      <div class="modal-header">
        <div class="modal-title">余额不足</div>
        <div class="modal-subtitle">您的账户余额不足以完成当前操作</div>
        <button class="modal-close" @click="$emit('close')">×</button>
      </div>
      <div class="modal-content">
        <div class="warn-icon-box">
          <svg class="warn-icon" viewBox="0 0 80 80" fill="none"><path d="M40 12L72 68H8L40 12Z" fill="#FF5B5B"/><rect x="37" y="36" width="6" height="18" rx="3" fill="#fff"/><rect x="37" y="58" width="6" height="6" rx="3" fill="#fff"/></svg>
        </div>
        <div class="main-tip">
          当前操作需要<span class="need-amount">￥{{ needAmount.toFixed(2) }}</span>，但您的账户余额不足，<br />请充值后再继续操作
        </div>
        <div class="amount-row-card2">
          <div class="amount-block-card2">
            <div class="amount-label">
              当前账户余额
              <button class="refresh-small-btn" @click="refreshBalance" :class="{ rotating: refreshing }">🔄</button>
            </div>
            <div class="amount-value">￥{{ currentBalance.toFixed(2) }}</div>
          </div>
          <div class="amount-block-card2">
            <div class="amount-label">需要金额</div>
            <div class="amount-value need">￥{{ needAmount.toFixed(2) }}</div>
            <div class="amount-diff">差额: <span>￥{{ Math.max(0, needAmount - currentBalance).toFixed(2) }}</span></div>
          </div>
        </div>
        <div class="recharge-section-card2">
          <div class="recharge-title">请选择充值金额</div>
          <div class="recharge-options-card2">
            <div v-for="(item, idx) in rechargeOptions" :key="item.value" :class="['recharge-option-card2', {active: selectedIdx===idx}]" @click="selectOption(idx)">
              <div class="recharge-main">￥{{ item.value }}</div>
              <div class="recharge-desc">{{ item.desc }}</div>
            </div>
          </div>
          <div class="recharge-input-row">
            <input v-model.number="inputValue" type="number" min="1" placeholder="输入其他金额" @focus="selectedIdx=-1" />
            <button class="input-confirm-card2" @click="confirmInput">确定</button>
          </div>
        </div>
      </div>
      <div class="modal-actions-card">
        <button class="btn-cancel-card" @click="$emit('close')">取消</button>
        <button class="btn-confirm-card" @click="goRecharge">
          <el-icon :size="20" style="margin-right: 6px;"><Wallet /></el-icon>
          前往钱包充值
        </button>
      </div>
      <div class="modal-tip-card">
        充值金额即时到账，可用于平台所有消费 <a href="#" class="recharge-link">查看充值说明</a>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { authApi } from '@/api/auth'
import { ElMessage } from 'element-plus'
import { CLIENT_MESSAGES } from '@/utils/clientMessages'
import { Wallet } from '@element-plus/icons-vue'

interface RechargeOption { value: number; desc: string }
const props = defineProps({
  balance: { type: Number, default: 0 },
  needAmount: { type: Number, default: 0 }
})

const userStore = useUserStore()
const router = useRouter()

const refreshing = ref(false)
const loadingTiers = ref(false)
const rechargeOptions = ref<RechargeOption[]>([])
const currentBalance = computed(() => userStore.user?.balance ?? props.balance)
const diffAmount = computed(() => Math.max(props.needAmount - currentBalance.value, 0))

const selectedIdx = ref(0)
const inputValue = ref<number | null>(null)

async function loadTiers() {
  loadingTiers.value = true
  try {
    const res = await authApi.getActiveTiers()
    if (res.success && res.data) {
      rechargeOptions.value = res.data
    }
  } catch (e) {
    console.error('加载充值档位失败', e)
  } finally {
    loadingTiers.value = false
  }
}

async function refreshBalance() {
  refreshing.value = true
  try {
    await userStore.fetchUserInfo()
    ElMessage.success(CLIENT_MESSAGES.WALLET.SYNC_SUCCESS)
  } catch (e) {
    ElMessage.error(CLIENT_MESSAGES.WALLET.SYNC_FAIL)
  } finally {
    setTimeout(() => { refreshing.value = false }, 500)
  }
}

function selectOption(idx:number) { selectedIdx.value = idx; inputValue.value = null }
function confirmInput() { selectedIdx.value = -1 }

function goRecharge() {
  let amount = 0
  if (selectedIdx.value !== -1 && rechargeOptions.value[selectedIdx.value]) {
    amount = rechargeOptions.value[selectedIdx.value].value
  } else if (inputValue.value) {
    amount = inputValue.value
  }
  
  router.push({
    path: '/profile/wallet',
    query: { amount: amount > 0 ? amount : undefined }
  })
}

onMounted(async () => {
  await loadTiers()
  
  // 自动选择刚好能覆盖差额的选项
  if (rechargeOptions.value.length > 0) {
    const idealIdx = rechargeOptions.value.findIndex(opt => opt.value >= diffAmount.value)
    if (idealIdx !== -1) {
      selectedIdx.value = idealIdx
    } else {
      selectedIdx.value = rechargeOptions.value.length - 1
    }
  }
})
</script>
<style scoped>
.modal-mask {
  position: fixed;
  z-index: 2000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}
.balance-modal {
  width: 520px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(255,0,0,0.10);
  display: flex;
  flex-direction: column;
}
.modal-header {
  background: linear-gradient(90deg, var(--active-orange) 0%, #FB923C 100%);
  padding: 28px 32px 14px 32px;
  position: relative;
  text-align: center;
}
.modal-title {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}
.modal-subtitle {
  color: #fff0f0;
  font-size: 16px;
  margin-bottom: 0;
}
.modal-close {
  position: absolute;
  top: 18px;
  right: 24px;
  background: none;
  border: none;
  font-size: 28px;
  color: #fff;
  cursor: pointer;
  line-height: 1;
  padding: 0 4px;
  border-radius: 4px;
  transition: background 0.2s;
}
.modal-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 18px 32px 0 32px;
  gap: 12px;
}
.warn-icon-box {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 18px;
}
.warn-icon {
  width: 80px;
  height: 80px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}
.main-tip {
  font-size: 18px;
  color: #222;
  text-align: center;
  margin-bottom: 8px;
}
.need-amount {
  color: var(--active-orange);
  font-weight: 900;
  font-size: 22px;
}
.amount-row-card2 {
  display: flex;
  gap: 18px;
  margin: 18px 0 0 0;
  width: 100%;
  justify-content: center;
}
.amount-block-card2 {
  background: #F8F9FF;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(33,150,243,0.08);
  padding: 16px 18px 12px 18px;
  display: flex;
  flex-direction: column;
  align-items: center;
  min-width: 100px;
}
.amount-label {
  color: #888;
  font-size: 13px;
  margin-bottom: 6px;
}
.amount-value {
  font-size: 20px;
  font-weight: 900;
  color: #222;
  margin-top: 4px;
}
.refresh-small-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 2px;
  font-size: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-left: 4px;
  transition: transform 0.3s;
  color: var(--primary-blue);
}
.refresh-small-btn.rotating {
  animation: spin 1s linear infinite;
}
@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.amount-value.need {
  color: var(--active-orange);
}
.amount-diff {
  color: var(--active-orange);
  font-size: 12px;
  margin-top: 4px;
}
.amount-diff span {
  font-weight: 900;
  font-size: 14px;
}
.recharge-section-card2 {
  width: 100%;
  margin: 18px 0 0 0;
  background: #F8F9FF;
  border-radius: 14px;
  padding: 14px 0 10px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 2px 8px rgba(33,150,243,0.08);
}
.recharge-title {
  font-size: 15px;
  color: #222;
  font-weight: 700;
  margin-bottom: 12px;
}
.recharge-options-card2 {
  display: flex;
  gap: 12px;
  width: 100%;
  justify-content: center;
  margin-bottom: 12px;
}
.recharge-option-card2 {
  background: #fff;
  border: 2px solid #e3eaf2;
  border-radius: 10px;
  padding: 10px 18px;
  min-width: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: border 0.2s, box-shadow 0.2s;
  font-size: 15px;
  font-weight: 700;
  color: #222;
  box-shadow: 0 1px 4px rgba(33,150,243,0.04);
}
.recharge-option-card2.active {
  border-color: var(--primary-blue);
  color: var(--primary-blue);
  background: #f0f9ff;
}
.recharge-desc {
  font-size: 11px;
  color: var(--primary-blue);
  font-weight: 400;
  margin-top: 2px;
}
.recharge-input-row {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 6px;
  margin-top: 4px;
}
.recharge-input-row input {
  border: 2px solid #e3eaf2;
  border-radius: 10px;
  font-size: 16px;
  width: 180px;
  height: 40px;
  padding: 0 16px;
  background: #fff;
  color: #222;
  outline: none;
}
.recharge-input-row input::-webkit-outer-spin-button,
.recharge-input-row input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.recharge-input-row input[type='number'] {
  -moz-appearance: textfield;
}
.input-confirm-card2 {
  background: var(--primary-blue);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 0 28px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  height: 40px;
  transition: background 0.2s;
  margin-left: 8px;
}
.modal-actions-card {
  display: flex;
  justify-content: center;
  gap: 16px;
  padding: 14px 16px 0 16px;
  background: #fff;
}
.btn-cancel-card {
  background: #f5f5f5;
  color: #888;
  border: none;
  border-radius: 8px;
  padding: 8px 18px;
  font-size: 14px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-cancel-card:hover {
  background: #e0e0e0;
}
.btn-confirm-card {
  background: var(--primary-blue);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 8px 18px;
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background 0.2s;
  display: flex;
  align-items: center;
  gap: 6px;
  box-shadow: 0 2px 8px 0px rgba(14, 165, 233, 0.12);
}
.btn-icon {
  margin-right: 2px;
}
.modal-tip-card {
  background: #F8F9FF;
  color: #444;
  font-size: 13px;
  margin: 18px 0 0 0;
  text-align: center;
  border-radius: 0 0 18px 18px;
  padding: 18px 0 18px 0;
  font-weight: 500;
}
.recharge-link {
  color: var(--primary-blue);
  text-decoration: underline;
  font-weight: 700;
}
</style> 