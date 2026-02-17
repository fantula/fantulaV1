<template>
  <div class="order-snapshot-card" :class="{ 'is-compact': compact }">
    <img :src="order?.product_snapshot?.image || defaultImage" class="product-img" />
    
    <div class="order-info">
      <div class="info-row">
        <span class="label">订单号</span>
        <span class="value mono copyable" @click="copy(order.order_no)">
           {{ order.order_no }}
        </span>
      </div>
      
      <div class="info-row">
        <span class="label">商品</span>
        <span class="value truncate" :title="order?.product_snapshot?.product_name">
           {{ order?.product_snapshot?.product_name || '未知商品' }}
        </span>
      </div>

      <div class="info-row" v-if="order?.sku_snapshot?.spec_combination">
         <span class="label">规格</span>
         <span class="value spec-tag">
             {{ formatSpecs(order.sku_snapshot.spec_combination) }}
         </span>
      </div>

      <div class="info-row">
         <span class="label">金额</span>
         <span class="value price">¥{{ formatPrice(order.total_amount || order.amount) }}</span>
      </div>
      
      <!-- Time Remaining -->
      <div class="time-left-box" v-if="timeLeft && timeLeft !== '已过期'">
          <span class="time-label">剩余时间</span>
          <span class="time-value">{{ timeLeft }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { useBizFormat } from '@/composables/common/useBizFormat'
import { ElMessage } from 'element-plus'

const props = withDefaults(defineProps<{
  order: any
  compact?: boolean
  defaultImage?: string
}>(), {
  compact: false,
  defaultImage: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
})

const { copy: copyText } = useClipboard()
const { formatPrice, formatRemainingTime } = useBizFormat()

const copy = (text: string) => {
    if (!text) return
    copyText(text)
    ElMessage.success('已复制')
}

const formatSpecs = (specs: any) => {
    if (!specs) return ''
    return Object.values(specs).join(' / ')
}

const timeLeft = computed(() => {
    const expiry = props.order?.expires_at || props.order?.end_time
    return formatRemainingTime(expiry)
})
</script>

<style scoped>
.order-snapshot-card {
    border: 1px solid #e5e7eb;
    border-radius: 8px;
    background: white;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 12px;
}

.product-img {
    width: 100%;
    height: 120px;
    border-radius: 6px;
    object-fit: cover;
    background: #f3f4f6;
    border: 1px solid #f3f4f6;
}

.order-info {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.info-row {
    display: flex;
    justify-content: space-between;
    font-size: 12px;
    align-items: flex-start;
}

.label {
    color: #6b7280;
    flex-shrink: 0;
    margin-right: 8px;
    min-width: 40px;
}

.value {
    color: #374151;
    font-weight: 500;
    text-align: right;
    word-break: break-all;
    flex: 1;
}

.mono { font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace; }
.truncate { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.copyable { cursor: pointer; color: #2563eb; }
.copyable:hover { text-decoration: underline; }

.spec-tag {
    background: #f3f4f6;
    color: #6b7280;
    padding: 1px 6px;
    border-radius: 4px;
    font-size: 11px;
    display: inline-block;
}

.price {
    font-weight: 600;
    color: #059669;
}

/* Time Left Box */
.time-left-box {
    background: #eff6ff;
    border: 1px solid #dbeafe;
    border-radius: 6px;
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 4px;
}

.time-label { font-size: 11px; color: #3b82f6; }
.time-value { font-size: 12px; font-weight: 700; color: #1d4ed8; }

/* Compact Mode (e.g. for Lists) */
.is-compact {
    flex-direction: row;
    align-items: center;
    padding: 8px;
}
.is-compact .product-img {
    width: 60px;
    height: 60px;
}
</style>
