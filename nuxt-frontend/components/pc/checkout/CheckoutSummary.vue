<template>
  <div class="summary-card glass-card sticky-card">
    <h3 class="card-title">支付详情</h3>
    
    <!-- 价格明细 -->
    <div class="price-rows">
      <div class="price-row">
        <span>商品总额</span>
        <span class="val">{{ amountDetails.total.toFixed(2) }} 点</span>
      </div>
      
      <!-- 优惠券选择 -->
      <div class="price-row coupon-row" @click="$emit('selectCoupon')">
        <div class="coupon-label">
          <span>优惠券</span>
          <el-tag v-if="coupon" size="small" type="danger" effect="dark" class="discount-tag">
            已抵扣 {{ amountDetails.discount.toFixed(2) }} 点
          </el-tag>
        </div>
        <div class="coupon-action">
          <span v-if="coupon" class="val discount">-{{ amountDetails.discount.toFixed(2) }} 点</span>
          <span v-else class="placeholder">选择优惠券</span>
          <el-icon><ArrowRight /></el-icon>
        </div>
      </div>

      <div class="divider"></div>

      <div class="price-row total">
        <span>应付金额</span>
        <span class="val final">{{ amountDetails.final.toFixed(2) }} 点</span>
      </div>
    </div>

    <!-- 支付方式 -->
    <div class="payment-method">
      <div class="method-title">支付方式</div>
      <div class="balance-card active">
        <div class="balance-icon">
          <el-icon><Wallet /></el-icon>
        </div>
        <div class="balance-info">
          <div class="method-name">额度支付</div>
          <div class="user-balance-row">
              <span class="user-balance">可用额度: {{ userBalance.toFixed(2) }} 点</span>
              <el-button link type="primary" size="small" @click.stop="$emit('refreshBalance')" :loading="loading" class="refresh-btn">
                  <el-icon><Refresh /></el-icon>
              </el-button>
          </div>
        </div>
        <div class="check-mark"><el-icon><Select /></el-icon></div>
      </div>
    </div>

    <!-- 支付按钮 area -->
    <div class="action-area">
      <BaseButton 
        class="pay-btn-full" 
        :class="{ 'insufficient': isBalanceInsufficient }"
        :disabled="paying || (countdownSeconds <= 0)"
        :loading="paying"
        :theme-id="isBalanceInsufficient ? 'secondary' : 'marketing-buy'"
        @click="handlePayClick"
      >
        <span v-if="isBalanceInsufficient">额度不足，去充值</span>
        <span v-else>立即支付 {{ amountDetails.final.toFixed(2) }} 点</span>
      </BaseButton>

      <div class="agreement-text">
        点击支付即表示同意 <a href="/docs/terms" target="_blank">服务协议</a> 和 <a href="/docs/privacy" target="_blank">隐私协议</a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight, Wallet, Select, Refresh } from '@element-plus/icons-vue'
import type { UserCoupon } from '@/api/client/coupon'
import BaseButton from '@/components/shared/BaseButton.vue'

const props = defineProps<{
  amountDetails: {
    total: number
    discount: number
    final: number
  }
  userBalance: number
  countdownSeconds: number
  loading: boolean
  paying: boolean
  coupon: UserCoupon | null
}>()

const emit = defineEmits(['pay', 'refreshBalance', 'selectCoupon'])

const isBalanceInsufficient = computed(() => {
    return props.userBalance < props.amountDetails.final
})

const handlePayClick = () => {
    emit('pay', isBalanceInsufficient.value)
}
</script>

<style scoped>
.sticky-card {
  height: 100%;       
  min-height: 480px;
  display: flex; 
  flex-direction: column;
}

.card-title {
  font-size: 18px;
  font-weight: 700;
  margin: 0 0 24px 0;
  color: #fff;
  border-left: 4px solid var(--primary-blue);
  padding-left: 12px;
}

.price-rows {
  margin-bottom: 24px;
}

.price-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
  font-size: 14px;
  color: var(--text-sub);
}

.val {
  color: var(--text-main);
  font-weight: 500;
}

/* Coupon Row */
.coupon-row {
  cursor: pointer;
  padding: 8px 0;
  transition: opacity 0.2s;
}
.coupon-row:hover { opacity: 0.8; }

.coupon-label {
  display: flex;
  align-items: center;
  gap: 8px;
}

.discount-tag {
  border: none;
  background: rgba(239, 68, 68, 0.2);
  color: #F87171;
}

.coupon-action {
  display: flex;
  align-items: center;
  gap: 4px;
}

.placeholder {
  color: var(--text-sub);
  font-size: 13px;
}

.val.discount { color: #EF4444; }

.divider {
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin: 20px 0;
}

.price-row.total .val.final {
  font-size: 28px;
  color: var(--active-orange);
  font-weight: 700;
  text-shadow: 0 0 15px rgba(249, 115, 22, 0.3);
}

/* Payment Method */
.payment-method {
    flex: 1; /* Push others */
}
.method-title {
  font-size: 15px;
  font-weight: 600;
  color: var(--text-sub);
  margin-bottom: 16px;
}

.balance-card {
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(23, 143, 198, 0.1);
  border: 1px solid rgba(23, 143, 198, 0.3);
  padding: 20px;
  border-radius: 16px;
  margin-bottom: 32px;
  position: relative;
  transition: all 0.2s;
}

.balance-card.active {
  background: rgba(23, 143, 198, 0.15);
  border-color: var(--primary-blue);
  box-shadow: 0 4px 20px rgba(23, 143, 198, 0.15);
}

.balance-icon {
  font-size: 28px;
  color: var(--primary-blue);
}

.balance-info { flex: 1; }

.method-name {
  font-size: 16px;
  font-weight: 600;
  color: #fff;
}

.user-balance-row {
    display: flex; align-items: center; gap: 8px; margin-top: 4px;
}

.user-balance {
  font-size: 13px;
  color: var(--text-sub);
}
.refresh-btn { padding: 0; height: auto; }
.refresh-btn :deep(.el-icon) { font-size: 14px; color: var(--text-sub); }
.refresh-btn:hover :deep(.el-icon) { color: var(--active-orange); }

.check-mark {
  margin-left: auto;
  color: var(--primary-blue);
  font-weight: bold;
  font-size: 18px;
}

/* Action Area */
.pay-btn-full {
  width: 100%;
}

.agreement-text {
  text-align: center;
  font-size: 12px;
  color: var(--text-sub);
  margin-top: 16px;
}

.agreement-text a {
  color: var(--primary-blue);
  text-decoration: none;
  transition: color 0.2s;
}

.agreement-text a:hover {
  color: var(--active-orange);
}
</style>
