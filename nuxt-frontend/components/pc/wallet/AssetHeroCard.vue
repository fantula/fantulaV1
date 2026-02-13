<template>
  <div class="asset-hero-card">
    <div class="hero-aurora-bg"></div>
    
    <div class="hero-content">
      <!-- Top Row: Label & Info -->
      <div class="hero-header">
        <div class="header-main">
          <div class="card-icon-wrapper">
            <el-icon><Wallet /></el-icon>
          </div>
          <div class="header-text">
            <span class="card-label">我的额度</span>
            <div class="card-tag">My Quota</div>
          </div>
        </div>
        
        <el-tooltip
          content="凡图拉额度仅用于平台内 service 使用，不可提现或转让"
          placement="top"
          effect="dark"
        >
          <div class="info-btn">
            <el-icon><Warning /></el-icon>
          </div>
        </el-tooltip>
      </div>
      
      <!-- Middle: Balance Display -->
      <div class="balance-display">
        <div class="balance-number">
          <span class="amount-integer">{{ balanceInteger }}</span>
          <span class="amount-decimal">.{{ balanceDecimal }}</span>
        </div>
        <div class="balance-unit">点</div>
      </div>

      <!-- Bottom: Action (Neon Pill) -->
      <div class="hero-footer">
        <button class="neon-action-btn" @click="$emit('recharge')">
          <el-icon><Lightning /></el-icon>
          <span>立即充值</span>
          <div class="btn-glow"></div>
        </button>
      </div>
    </div>
    
    <!-- Decorative Background Icon -->
    <el-icon class="card-bg-icon"><Wallet /></el-icon>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Wallet, Warning, Lightning } from '@element-plus/icons-vue'
import { useBizFormat } from '@/composables/common/useBizFormat'

const props = defineProps<{
  balance: number
}>()

const { formatPrice } = useBizFormat()
defineEmits(['recharge'])

const balanceInteger = computed(() => {
  const formatted = formatPrice(props.balance)
  return formatted.split('.')[0]
})
const balanceDecimal = computed(() => {
   const formatted = formatPrice(props.balance)
   return formatted.split('.')[1] || '00'
})
</script>

<style scoped>
/* --- 1. Asset Hero Card (Aurora) --- */
.asset-hero-card {
  position: relative;
  width: 100%;
  height: 240px;
  border-radius: 24px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease;
  flex-shrink: 0;
}

.asset-hero-card:hover {
  transform: translateY(-2px);
  border-color: rgba(255, 255, 255, 0.15);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
}

/* Aurora Background */
.hero-aurora-bg {
  position: absolute;
  top: 0; left: 0; width: 100%; height: 100%;
  background: radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.25), transparent 40%),
              radial-gradient(circle at 90% 90%, rgba(249, 115, 22, 0.15), transparent 40%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%);
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px 40px;
}

/* Header */
.hero-header { display: flex; justify-content: space-between; align-items: flex-start; }
.header-main { display: flex; align-items: center; gap: 16px; }

.card-icon-wrapper {
  width: 48px; height: 48px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  display: flex; align-items: center; justify-content: center;
  font-size: 24px; color: #60A5FA;
  border: 1px solid rgba(255,255,255,0.05);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.header-text { display: flex; flex-direction: column; gap: 4px; }
.card-label { font-size: 18px; font-weight: 700; color: #fff; letter-spacing: -0.5px; }
.card-tag { 
  font-size: 12px; font-family: 'Outfit', sans-serif; 
  color: #94A3B8; letter-spacing: 0.5px; text-transform: uppercase; 
}

.info-btn {
  width: 32px; height: 32px;
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: rgba(255,255,255,0.4);
  cursor: help;
  transition: all 0.2s;
}
.info-btn:hover { background: rgba(255,255,255,0.1); color: #fff; }

/* Balance */
.balance-display { display: flex; align-items: baseline; gap: 8px; margin-top: auto; margin-bottom: 20px; }
.balance-number { font-family: 'Outfit', sans-serif; color: #fff; line-height: 1; }
.amount-integer { font-size: 64px; font-weight: 700; letter-spacing: -2px; }
.amount-decimal { font-size: 36px; font-weight: 500; color: #94A3B8; }
.balance-unit { font-size: 18px; font-weight: 600; color: #F59E0B; margin-left: 4px; }

/* Action Footer */
.hero-footer { display: flex; justify-content: flex-end; }

.neon-action-btn {
  position: relative;
  display: flex; align-items: center; gap: 10px;
  padding: 14px 32px;
  background: linear-gradient(90deg, #F59E0B, #EA580C);
  border: none; border-radius: 100px;
  color: #fff; font-size: 16px; font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 15px rgba(234, 88, 12, 0.3);
}

.neon-action-btn:hover {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 25px rgba(234, 88, 12, 0.5);
  background: linear-gradient(90deg, #FBBF24, var(--color-accent));
}

.card-bg-icon {
  position: absolute; right: -20px; bottom: -40px;
  font-size: 200px; opacity: 0.03;
  transform: rotate(-15deg);
  pointer-events: none;
  color: #fff;
}
</style>
