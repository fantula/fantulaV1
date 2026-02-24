<template>
  <div class="mobile-page">
    <!-- Main Header -->
    <header class="hub-header">
       <h1 class="hub-title">频道探索 <span class="dot">.</span></h1>
       <p class="hub-subtitle">Discovery Tools</p>
    </header>

    <div class="hub-body">
       <!-- Hero Search Area -->
       <div class="hero-search-container">
          <!-- Input Group -->
          <div class="cyber-input-group" :class="{ 'is-focused': isInputFocused, 'is-loading': loading, 'has-error': state === 'pending' }">
             <div class="prefix-badge">@</div>
             
             <div class="input-wrapper">
                 <input 
                    ref="inputRef"
                    v-model="channelInput"
                    type="text"
                    class="hero-input"
                    placeholder="输入专属频道标识"
                    @input="handleInput"
                    @keyup.enter="handleRecognize"
                    @focus="isInputFocused = true"
                    @blur="isInputFocused = false"
                    spellcheck="false"
                 />
                 <!-- Clear Button -->
                 <div v-show="channelInput.length > 0 && !loading" class="clear-btn-wrap" @click.stop="clearInput">
                    <el-icon class="icon-clear"><CircleCloseFilled /></el-icon>
                 </div>
             </div>

             <button 
                class="btn-hero-action" 
                @click="handleRecognize"
                :disabled="loading || !isValidInput"
             >
                <div v-if="loading" class="spinner-sm"></div>
                <el-icon v-else><Right /></el-icon>
             </button>
          </div>

          <!-- Onboarding / Empty State Chips (Only show when empty and not loading) -->
          <Transition name="fade-slide">
             <div v-if="state === 'input' && !loading" class="onboarding-chips">
                <span class="chip-label">推荐探索:</span>
                <button class="chip" @click="fillAndSearch('vip')">vip</button>
                <button class="chip" @click="fillAndSearch('fans')">fans</button>
                <button class="chip" @click="fillAndSearch('demo')">demo</button>
             </div>
          </Transition>

          <!-- Result Area -->
          <Transition name="drawer-slide">
             <div v-if="state !== 'input'" class="result-showcase">
                
                <!-- Success: Channel & Product View -->
                <div v-if="state === 'bound'" class="result-card success-card">
                   <!-- Compact Channel Badge -->
                   <div class="channel-identity-compact">
                      <div class="id-icon-mini"><el-icon><CircleCheckFilled /></el-icon></div>
                      <div class="id-info-mini">
                         <span class="badge-title">{{ channelDisplayName || '专属频道' }}</span>
                         <span class="badge-alias">@{{ resultKey }}</span>
                      </div>
                   </div>

                   <!-- Product Loading Skeleton -->
                   <div v-if="productLoading" class="product-skeleton-compact"></div>

                   <!-- Compact Product Preview Card (Left Image, Right Content) -->
                   <div v-else-if="product" class="compact-product-card" @click="openProductSheet">
                      <div class="cpc-image-wrap">
                         <img :src="product.image || product.coverImage" class="cpc-image" decoding="async" loading="lazy" />
                      </div>
                      <div class="cpc-content">
                         <div class="cpc-title">{{ product.name || product.title }}</div>
                         <div class="cpc-footer">
                            <div class="cpc-price">
                               {{ formatPrice(product.display_price || product.price) }}<span class="currency-unit">点</span>
                            </div>
                            <button class="btn-buy-mini">立即获取</button>
                         </div>
                      </div>
                   </div>
                </div>

                <!-- Pending / Error / Not Found -->
                <div v-else-if="state === 'pending'" class="result-card warning-card">
                   <div class="warning-hero">
                      <el-icon class="pulse-warning"><WarningFilled /></el-icon>
                      <h4>频道未激活</h4>
                      <p>{{ errorMessage || `标识 @${resultKey} 暂未绑定对应商品` }}</p>
                   </div>
                   <button class="btn-ghost-reset" @click="reset">重新输入探索</button>
                </div>

             </div>
          </Transition>
       </div>

    </div>

    <!-- Product Detail Sheet -->
    <ProductDetailSheet 
      v-model:visible="showDetailSheet" 
      :goods-id="boundProductId || ''" 
    />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, defineAsyncComponent } from 'vue'
import { Right, CircleCheckFilled, WarningFilled, CircleCloseFilled } from '@element-plus/icons-vue'
import { getSupabaseClient } from '@/utils/supabase'
import { useToast } from '@/composables/mobile/useToast'
import { goodsApi } from '@/api/client/goods'
import { useBizFormat } from '@/composables/common/useBizFormat'

const ProductDetailSheet = defineAsyncComponent(() => import('@/components/mobile/goods/ProductDetailSheet.vue'))

definePageMeta({ layout: 'mobile' })

const client = getSupabaseClient()
const { showToast } = useToast()
const { formatPrice } = useBizFormat()
const inputRef = ref<HTMLInputElement | null>(null)

// State
type PageState = 'input' | 'bound' | 'pending'
const state = ref<PageState>('input')
const loading = ref(false)
const productLoading = ref(false)
const isInputFocused = ref(false)

// Pure alphabetic part
const channelInput = ref('')
const resultKey = ref('')
const boundProductId = ref<string | null>(null)
const product = ref<any>(null)
const channelDisplayName = ref('')
const showDetailSheet = ref(false)
const errorMessage = ref('')

const isValidInput = computed(() => /^[a-z_]+$/.test(channelInput.value))

const handleInput = (e: Event) => {
  let val = (e.target as HTMLInputElement).value
  let raw = val.toLowerCase()
  let clean = ''
  
  for (let char of raw) {
      if (/[a-z_]/.test(char)) {
          clean += char
      }
  }
  
  channelInput.value = clean
  
  if (inputRef.value && inputRef.value.value !== clean) {
    inputRef.value.value = clean
  }
}

const clearInput = () => {
    channelInput.value = ''
    state.value = 'input'
    nextTick(() => {
        inputRef.value?.focus()
    })
}

const fillAndSearch = (keyword: string) => {
    channelInput.value = keyword
    handleRecognize()
}

const fetchProductPreview = async (productId: string) => {
  productLoading.value = true
  try {
    const res = await goodsApi.getGoodsDetail(productId)
    if (res.success && res.data) {
      product.value = res.data
    } else {
      state.value = 'pending'
      errorMessage.value = '该频道的商品已下架或不存在'
    }
  } catch {
    state.value = 'pending'
    errorMessage.value = '无法获取频道关联的商品，请稍后重试'
  } finally {
    productLoading.value = false
  }
}

const handleRecognize = async () => {
  if (!channelInput.value) {
     inputRef.value?.focus()
     return
  }
  if (!isValidInput.value) return showToast('请输入有效的频道标识 (仅限英文字母)', 'warning')

  try {
    loading.value = true
    state.value = 'input'
    product.value = null
    errorMessage.value = ''
    channelDisplayName.value = ''
    isInputFocused.value = false
    inputRef.value?.blur()

    // Prefix with @ for backend call
    const fullKey = '@' + channelInput.value

    const { data: channelData, error } = await client.rpc('resolve_channel_key', {
      p_channel_key: fullKey
    })

    if (error) throw error

    if (channelData && channelData.bound && channelData.product_id) {
      resultKey.value = channelData.channel_key.replace('@', '')
      boundProductId.value = channelData.product_id
      channelDisplayName.value = channelData.channel_name || ''
      state.value = 'bound'
      fetchProductPreview(channelData.product_id)
    } else {
      state.value = 'pending'
      resultKey.value = channelInput.value
      errorMessage.value = '该频道尚未配置专属商品，请联系客服'
    }
  } catch (err) {
    if (import.meta.dev) console.error(err)
    state.value = 'pending'
    errorMessage.value = '网络请求异常，请稍后重试'
  } finally {
    loading.value = false
  }
}

const openProductSheet = () => {
    if (boundProductId.value) {
        showDetailSheet.value = true
    }
}

const reset = () => {
  state.value = 'input'
  channelInput.value = ''
  resultKey.value = ''
  nextTick(() => inputRef.value?.focus())
}
</script>

<style scoped>
.mobile-page {
  height: 100%;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  color: #fff;
  padding: 24px 20px 40px;
  display: flex; flex-direction: column;
}

/* Header */
.hub-header { margin-bottom: 32px; padding-left: 4px; }
.hub-title { 
    font-size: 32px; font-weight: 800; margin: 0; line-height: 1.2;
    background: linear-gradient(135deg, #fff 0%, #94A3B8 100%);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
    letter-spacing: 0.5px;
}
.hub-title .dot { color: var(--cyber-primary); -webkit-text-fill-color: var(--cyber-primary); }
.hub-subtitle { font-size: 14px; color: #64748B; margin: 6px 0 0; letter-spacing: 1px; text-transform: uppercase; font-weight: 600; }

.hub-body { display: flex; flex-direction: column; flex: 1; }

/* Hero Search Container */
.hero-search-container {
    display: flex; flex-direction: column; gap: 16px;
    margin-top: 10px;
}

/* Cyber Input Group */
.cyber-input-group {
    display: flex; align-items: stretch; gap: 0;
    height: 64px;
    background: rgba(15, 23, 42, 0.65);
    backdrop-filter: blur(24px); -webkit-backdrop-filter: blur(24px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 20px;
    padding: 6px;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
}

.cyber-input-group.is-focused {
    border-color: rgba(56, 189, 248, 0.6);
    background: rgba(15, 23, 42, 0.85);
    box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.15), 0 10px 40px rgba(56, 189, 248, 0.1);
    transform: translateY(-2px);
}

.cyber-input-group.has-error {
    border-color: rgba(245, 158, 11, 0.5);
}

/* 1. Prefix Badge + Wrapper logic */
.prefix-badge {
    display: flex; align-items: center; justify-content: center;
    width: 44px;
    color: var(--cyber-primary);
    font-size: 26px; font-weight: 800; font-family: 'DIN Alternates', monospace;
    opacity: 0.8;
    user-select: none;
}
.is-focused .prefix-badge {
    opacity: 1; text-shadow: 0 0 12px rgba(56, 189, 248, 0.6);
}

.input-wrapper {
    flex: 1; position: relative; display: flex; align-items: center;
    background: transparent;
}

.hero-input {
    width: 100%; height: 100%;
    background: transparent; border: none;
    color: #fff;
    font-size: 20px; font-weight: 600; font-family: monospace;
    padding: 0 38px 0 0; /* right padding to leave space for clear button */
    outline: none;
}
.hero-input::placeholder {
    color: rgba(148, 163, 184, 0.4);
    font-weight: 500; font-family: -apple-system, sans-serif;
    font-size: 16px;
}

/* Clear Button */
.clear-btn-wrap {
    position: absolute; right: 10px; top: 0; bottom: 0;
    display: flex; align-items: center; justify-content: center;
    width: 30px;
    cursor: pointer;
    color: rgba(148, 163, 184, 0.6);
}
.icon-clear { font-size: 18px; transition: color 0.1s; }
.clear-btn-wrap:active .icon-clear { color: #fff; transform: scale(0.9); }


.btn-hero-action {
    width: 52px; height: 100%;
    border-radius: 14px; border: none;
    background: linear-gradient(135deg, var(--cyber-primary), #0284C7);
    color: #fff; font-size: 24px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.2);
    margin-left: 4px;
}
.btn-hero-action:active:not(:disabled) { transform: scale(0.92); }
.btn-hero-action:disabled { background: rgba(56, 189, 248, 0.3); color: rgba(255,255,255,0.5); box-shadow: none; cursor: not-allowed; }

/* Onboarding Chips */
.onboarding-chips {
    display: flex; align-items: center; flex-wrap: wrap; gap: 8px;
    padding: 0 4px;
}
.chip-label { font-size: 13px; color: #64748B; margin-right: 2px; }
.chip {
    background: rgba(255,255,255,0.06); border: 1px solid rgba(255,255,255,0.08);
    color: #94A3B8; border-radius: 100px; padding: 5px 12px;
    font-size: 13px; font-family: monospace; transition: all 0.2s;
}
.chip:active { background: rgba(56, 189, 248, 0.2); color: #fff; border-color: rgba(56, 189, 248, 0.4); }

/* Result Area */
.result-showcase { margin-top: 8px; }

.result-card {
    background: rgba(15, 23, 42, 0.5);
    backdrop-filter: blur(16px); -webkit-backdrop-filter: blur(16px);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 20px;
    padding: 16px;
}

.success-card { border-top: 2px solid #10B981; box-shadow: 0 8px 30px rgba(16, 185, 129, 0.05); }
.warning-card { border-top: 2px solid #F59E0B; text-align: center; }

/* Compact Channel Identity Badge */
.channel-identity-compact {
    display: flex; align-items: center; justify-content: space-between;
    background: rgba(255,255,255,0.03); border-radius: 14px;
    padding: 10px 14px; margin-bottom: 16px; border: 1px solid rgba(255,255,255,0.05);
}
.id-icon-mini { display: flex; align-items: center; color: #10B981; font-size: 20px; margin-right: 10px; }
.id-info-mini { flex: 1; display: flex; align-items: center; justify-content: space-between; }
.badge-title {
    font-size: 15px; font-weight: 700; color: #fff;
    background: linear-gradient(90deg, #10B981, #34D399);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.badge-alias { font-size: 13px; color: #64748B; font-family: monospace; }

/* Compact Product Layout */
.compact-product-card {
    display: flex; align-items: center; gap: 14px;
    padding: 10px; border-radius: 16px;
    background: rgba(255,255,255,0.02);
    border: 1px solid rgba(255,255,255,0.05);
    transition: all 0.2s; cursor: pointer;
}
.compact-product-card:active { transform: scale(0.98); background: rgba(255,255,255,0.05); }

.cpc-image-wrap { width: 90px; height: 90px; border-radius: 12px; overflow: hidden; background: #0F172A; flex-shrink: 0; border: 1px solid var(--primary); }
.cpc-image { width: 100%; height: 100%; object-fit: cover; opacity: 0.9; }

.cpc-content { flex: 1; display: flex; flex-direction: column; justify-content: space-between; height: 90px; padding: 2px 0; }
.cpc-title { font-size: 15px; font-weight: 600; color: #E2E8F0; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

.cpc-footer { display: flex; align-items: center; justify-content: space-between; }
.cpc-price { color: #F97316; font-size: 18px; font-weight: 800; font-family: 'DIN Alternates'; }
.cpc-price .currency-unit { font-size: 14px; font-family: -apple-system, sans-serif; font-weight: 600; margin-left: 2px; }

.btn-buy-mini {
    padding: 6px 16px;
    background: linear-gradient(90deg, #F97316 0%, #EA580C 100%);
    border: none; border-radius: 100px;
    color: #fff; font-size: 13px; font-weight: 600;
}

/* Skeleton Compact */
.product-skeleton-compact {
    width: 100%; height: 110px; border-radius: 16px;
    background: linear-gradient(90deg, rgba(255,255,255,0.02) 25%, rgba(255,255,255,0.06) 50%, rgba(255,255,255,0.02) 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}
@keyframes shimmer { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }

/* Warning State */
.warning-hero { padding: 20px 0; }
.pulse-warning { font-size: 54px; color: #F59E0B; filter: drop-shadow(0 0 20px rgba(245, 158, 11, 0.3)); margin-bottom: 12px; }
.warning-hero h4 { font-size: 18px; color: #fff; margin: 0 0 8px; font-weight: 700; }
.warning-hero p { font-size: 14px; color: #94A3B8; margin: 0 0 24px; line-height: 1.5; }

.btn-ghost-reset {
    width: 100%; height: 44px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 14px; color: #E2E8F0; font-size: 14px; font-weight: 600;
    transition: all 0.2s;
}
.btn-ghost-reset:active { background: rgba(255,255,255,0.1); }

/* Animations */


.fade-slide-enter-active, .fade-slide-leave-active { transition: all 0.3s ease; }
.fade-slide-enter-from, .fade-slide-leave-to { opacity: 0; transform: translateY(-10px); }

.drawer-slide-enter-active, .drawer-slide-leave-active { transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1); }
.drawer-slide-enter-from, .drawer-slide-leave-to { opacity: 0; transform: translateY(15px) scale(0.98); }
</style>

