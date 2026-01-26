<template>
  <div class="glass-card product-card">
    <!-- Left: Product Image -->
    <div class="product-thumb-wrapper" @click="previewImage">
      <img v-if="productImage" :src="productImage" class="product-img" />
      <div v-else class="placeholder">📦</div>
    </div>

    <!-- Right: Product Details -->
    <div class="product-details">
      <!-- Header: Name -->
      <div class="product-name">{{ productName }}</div>

      <!-- Tags Row -->
      <div class="tags-row" :class="statusTheme">
        <!-- Spec Badges (Loop) -->
        <span v-for="(spec, index) in specValues" :key="index" class="tag themed-tag">
          {{ spec }}
        </span>

        <!-- Quantity Badge -->
        <span class="tag qty-tag">x{{ quantity }}</span>
      </div>

      <!-- Footer: Price/Amount (Optional, nice to have) -->
       <div class="product-footer">
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  // Directly accepting snapshots as requested to avoid extra fetches
  productSnapshot?: {
    image?: string
    product_name?: string
  }
  skuSnapshot?: {
    spec_combination?: Record<string, string>
  }
  quantity?: number
  orderStatus?: string // New prop
}

const props = defineProps<Props>()

const productImage = computed(() => props.productSnapshot?.image || '')
const productName = computed(() => props.productSnapshot?.product_name || '未知商品')
const quantity = computed(() => props.quantity || 1)

// Parse spec combination to Array
const specValues = computed(() => {
  if (!props.skuSnapshot?.spec_combination) return []
  return Object.values(props.skuSnapshot.spec_combination)
})

const statusTheme = computed(() => {
    // Map status to visual theme class
    const s = props.orderStatus
    if (s === 'active' || s === 'completed') return 'theme-success'
    if (s === 'pending_delivery' || s === 'submitted') return 'theme-processing'
    if (s === 'refunding' || s === 'refunded' || s === 'rejected') return 'theme-error'
    return 'theme-default'
})

const previewImage = () => {
    if (productImage.value) {
        window.open(productImage.value, '_blank')
    }
}
</script>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  padding: 20px;
  display: flex;
  gap: 20px;
  align-items: center;
  transition: transform 0.2s, background 0.2s;
}

.glass-card:hover {
  background: rgba(30, 41, 59, 0.5);
  transform: translateY(-2px);
}

/* Image Wrapper */
.product-thumb-wrapper {
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 16px; /* Smooth corners */
  overflow: hidden;
  cursor: pointer;
  position: relative;
  
  /* The requested border stroke */
  border: 2px solid rgba(255, 255, 255, 0.1); 
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
}

.product-thumb-wrapper:hover {
    border-color: rgba(59, 130, 246, 0.5); /* Blue glow on hover */
    box-shadow: 0 8px 16px rgba(59, 130, 246, 0.2);
}

.product-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.5s;
}

.product-thumb-wrapper:hover .product-img {
    transform: scale(1.1);
}

.placeholder {
  width: 100%;
  height: 100%;
  background: rgba(255, 255, 255, 0.05);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
}

/* Details */
.product-details {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
}

.product-name {
  font-family: 'Outfit', sans-serif; /* Use premium font if available */
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  line-height: 1.3;
}

.tags-row {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag {
  display: inline-flex;
  align-items: center;
  padding: 4px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

/* Default Theme */
.themed-tag {
  background: rgba(255, 255, 255, 0.1);
  color: #E2E8F0;
  border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Success Theme (Active) */
.theme-success .themed-tag {
  background: rgba(34, 197, 94, 0.15);
  color: #4ADE80;
  border-color: rgba(34, 197, 94, 0.2);
}

/* Processing Theme (Pending) */
.theme-processing .themed-tag {
  background: rgba(250, 204, 21, 0.15);
  color: #FACC15;
  border-color: rgba(250, 204, 21, 0.2);
}

/* Error Theme (Refunding) */
.theme-error .themed-tag {
  background: rgba(248, 113, 113, 0.15);
  color: #F87171;
  border-color: rgba(248, 113, 113, 0.2);
}

.qty-tag {
  background: rgba(0, 0, 0, 0.2);
  color: #94A3B8;
  font-family: monospace;
}
</style>
