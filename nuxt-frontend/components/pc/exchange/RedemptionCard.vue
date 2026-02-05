<template>
  <div class="redemption-card">
    <div class="redemption-header">
      <el-icon class="redemption-icon"><Ticket /></el-icon>
      <div class="redemption-title">兑换优惠券</div>
    </div>
    <div class="redemption-body">
      <div class="input-group">
        <input 
          type="text" 
          class="redemption-input" 
          placeholder="请输入兑换码" 
          v-model="redeemCode" 
          @keyup.enter="handleRedeem"
        />
        <BaseButton 
          class="redemption-btn-wrapper"
          :loading="redeeming" 
          :disabled="!redeemCode"
          @click="handleRedeem"
          theme-id="primary"
        >
          立即兑换
        </BaseButton>
      </div>
      <p class="redemption-tips">兑换码通常由16位字母和数字组成，区分大小写</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Ticket } from '@element-plus/icons-vue'
import { couponApi } from '@/api/client/coupon'
import { ElMessage } from 'element-plus'

const emit = defineEmits(['redeemed'])

const redeemCode = ref('')
const redeeming = ref(false)

const handleRedeem = async () => {
  if (!redeemCode.value || redeeming.value) return
  
  redeeming.value = true
  try {
    const res = await couponApi.redeemCoupon(redeemCode.value)
    if (res.success) {
        emit('redeemed', res.data)
        redeemCode.value = ''
    } else {
        ElMessage.error(res.msg || '兑换失败')
    }
  } finally {
    redeeming.value = false
  }
}
</script>

<style scoped>
/* Redemption Card */
.redemption-card {
  flex-shrink: 0;
  margin: 24px 32px;
  background: linear-gradient(135deg, rgba(249, 115, 22, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%);
  border: 1px solid rgba(249, 115, 22, 0.2);
  border-radius: 20px;
  overflow: hidden;
}

.redemption-header {
  padding: 20px 24px; display: flex; align-items: center; gap: 12px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.redemption-icon { font-size: 24px; color: #F97316; }
.redemption-title { font-size: 16px; font-weight: 600; color: #fff; }

.redemption-body { padding: 24px; }
.input-group { display: flex; gap: 12px; margin-bottom: 12px; }

.redemption-input {
  flex: 1; height: 48px; background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 0 20px;
  font-size: 15px; color: #fff; outline: none; transition: all 0.3s;
}
.redemption-input:focus { border-color: #F97316; box-shadow: 0 0 0 3px rgba(249, 115, 22, 0.1); }
.redemption-input::placeholder { color: #64748B; }

.redemption-btn-wrapper {
  height: 48px;
}

.redemption-tips { font-size: 12px; color: #64748B; margin: 0; }
</style>
