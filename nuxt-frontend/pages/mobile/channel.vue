<template>
  <div class="mobile-page">
    <!-- Main Header -->
    <header class="hub-header">
       <h1 class="hub-title">探索功能 <span class="dot">.</span></h1>
       <p class="hub-subtitle">Discovery Tools</p>
    </header>

    <div class="hub-body">
       <!-- Tool: Channel Identifier -->
       <div class="tool-card expanded">
          <div class="tool-header">
             <div class="th-icon">
                <el-icon><Search /></el-icon>
             </div>
             <div class="th-info">
                <h3>频道识别</h3>
                <p>链接专属商品渠道</p>
             </div>
          </div>

          <!-- Input Area -->
          <div class="tool-content">
             <div class="input-row">
                <input 
                   ref="inputRef"
                   v-model="channelInput"
                   type="text"
                   class="glass-input"
                   placeholder="@channel_key"
                   @input="handleInput"
                   @keyup.enter="handleRecognize"
                   spellcheck="false"
                />
                <button 
                   class="btn-icon-action" 
                   @click="handleRecognize"
                   :disabled="loading || !isValidInput"
                >
                   <div v-if="loading" class="spinner-xs"></div>
                   <el-icon v-else><Right /></el-icon>
                </button>
             </div>

             <!-- Result Area (Inline) -->
             <div v-if="state !== 'input'" class="result-area">
                
                <!-- Success: Product Preview -->
                <div v-if="state === 'bound' && product" class="result-success animate-fade-in">
                   <div class="success-tag">
                      <el-icon><CircleCheckFilled /></el-icon> 识别成功
                   </div>
                   
                   <!-- Product Card Preview -->
                   <div class="preview-card" @click="openProductSheet">
                      <img :src="product.image || product.coverImage" class="pc-thumb" decoding="async" loading="lazy" />
                      <div class="pc-info">
                         <div class="pc-name">{{ product.name || product.title }}</div>
                         <div class="pc-price">
                            ¥<span class="val">{{ Number(product.display_price || product.price).toFixed(2) }}</span>
                         </div>
                      </div>
                      <button class="pc-btn">购买</button>
                   </div>
                </div>

                <!-- Pending / Error -->
                <div v-else-if="state === 'pending'" class="result-warning animate-fade-in">
                   <div class="warning-icon"><el-icon><WarningFilled /></el-icon></div>
                   <div class="warning-text">
                      <p>{{ errorMessage || `频道 ${resultKey} 暂未绑定商品` }}</p>
                      <button class="btn-text-reset" @click="reset">重试</button>
                   </div>
                </div>

             </div>
          </div>
       </div>

       <!-- Placeholder for Future Tools -->
       <div class="tools-grid">
          <div class="tool-card mini disabled">
             <el-icon><Compass /></el-icon>
             <span>更多功能</span>
             <div class="badge-soon">Coming Soon</div>
          </div>
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
import { Search, Right, CircleCheckFilled, WarningFilled, Compass } from '@element-plus/icons-vue'
import { getSupabaseClient } from '@/utils/supabase'
import { useToast } from '@/composables/mobile/useToast'
import { goodsApi } from '@/api/client/goods'

const ProductDetailSheet = defineAsyncComponent(() => import('@/components/mobile/goods/ProductDetailSheet.vue'))

definePageMeta({ layout: 'mobile' })

const client = getSupabaseClient()
const { showToast } = useToast()
const inputRef = ref<HTMLInputElement | null>(null)

// State
// State
type PageState = 'input' | 'bound' | 'pending'
const state = ref<PageState>('input')
const loading = ref(false)
const channelInput = ref('@')
const resultKey = ref('')
const boundProductId = ref<string | null>(null)
const product = ref<any>(null)
const showDetailSheet = ref(false)
const errorMessage = ref('')

const isValidInput = computed(() => /^@[a-z]+$/.test(channelInput.value))

const handleInput = (e: Event) => {
  let val = (e.target as HTMLInputElement).value
  // Strictly allow only lowercase a-z
  // Remove anything that is NOT a lowercase letter (and not @ at start)
  // But since we want to force lowercase, we lower it first
  
  let raw = val.toLowerCase()
  let clean = ''
  
  // Extract only a-z
  for (let char of raw) {
      if (/[a-z]/.test(char)) {
          clean += char
      }
  }
  
  // Always prefix with @
  const final = '@' + clean
  
  channelInput.value = final
  
  // Force update input value if it differs (e.g. user typed a number)
  if (inputRef.value && inputRef.value.value !== final) {
    inputRef.value.value = final
  }
}

const handleRecognize = async () => {
  if (!isValidInput.value) return showToast('请输入有效的频道标识 (仅限小写字母)', 'warning')

  try {
    loading.value = true
    state.value = 'input' // Reset view while loading
    product.value = null
    errorMessage.value = ''

    const { data: channelData, error } = await client.rpc('resolve_channel_key', {
      p_channel_key: channelInput.value
    })
    
    if (error) throw error

    // Check if we got a valid binding
    if (channelData && channelData.bound && channelData.product_id) {
       resultKey.value = channelData.channel_key
       boundProductId.value = channelData.product_id

       // Fetch Product Detail
       const res = await goodsApi.getGoodsDetail(channelData.product_id)
       if (res.success && res.data) {
          product.value = res.data
          state.value = 'bound'
          // Auto open sheet? Maybe just show preview first as requested.
       } else {
          // Product might be off-shelf or invalid
          state.value = 'pending' 
          errorMessage.value = '商品已下架或不存在'
       }
    } else {
      // Not found or not bound
      state.value = 'pending'
      resultKey.value = channelInput.value
      errorMessage.value = '没有入库，请联系客服入库'
    }
  } catch (err) {
    console.error(err)
    // RPC error or network error
    // Treat as found failure for now or show distinct error
    state.value = 'pending'
    errorMessage.value = '没有入库，请联系客服入库' // Default fallthrough for "not found" in RPC if it errors on missing key
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
  channelInput.value = '@'
  nextTick(() => inputRef.value?.focus())
}
</script>

<style scoped>
.mobile-page {
  min-height: 100vh;
  /* background: transparent; handled by layout */
  color: #fff;
  padding: 20px;
  display: flex; flex-direction: column;
}

/* Header */
.hub-header { margin-bottom: 24px; padding-left: 4px; }
.hub-title { 
    font-size: 28px; font-weight: 800; margin: 0; line-height: 1.2;
    background: linear-gradient(135deg, #fff 0%, #94A3B8 100%);
    -webkit-background-clip: text; background-clip: text; -webkit-text-fill-color: transparent;
}
.hub-title .dot { color: var(--cyber-primary); -webkit-text-fill-color: var(--cyber-primary); }
.hub-subtitle { font-size: 14px; color: #64748B; margin: 4px 0 0; letter-spacing: 1px; text-transform: uppercase; font-weight: 600; }

/* Grid */
.hub-body { display: flex; flex-direction: column; gap: 20px; }

/* Tool Card */
.tool-card {
   background: var(--glass-bg);
   border: 1px solid var(--glass-border);
   border-radius: 20px;
   padding: 20px;
   transition: all 0.3s;
   overflow: hidden;
}
.tool-card.expanded {
   border-color: rgba(56, 189, 248, 0.3);
   box-shadow: 0 0 30px rgba(56, 189, 248, 0.1);
}

.tool-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; }
.th-icon {
   width: 48px; height: 48px; border-radius: 14px;
   background: rgba(56, 189, 248, 0.1);
   color: var(--cyber-primary);
   display: flex; align-items: center; justify-content: center; font-size: 24px;
   border: 1px solid rgba(56, 189, 248, 0.2);
}
.th-info h3 { font-size: 16px; font-weight: 700; margin: 0 0 4px; color: #E2E8F0; }
.th-info p { font-size: 13px; color: #94A3B8; margin: 0; }

/* Input Row */
.input-row { display: flex; gap: 12px; height: 50px; }
.glass-input {
   flex: 1; height: 100%;
   background: rgba(15, 23, 42, 0.6);
   border: 1px solid rgba(255,255,255,0.1);
   border-radius: 12px;
   padding: 0 16px; color: #fff; font-size: 16px; font-family: monospace;
   outline: none; transition: all 0.2s;
}
.glass-input:focus { border-color: var(--cyber-primary); background: rgba(15, 23, 42, 0.8); }

.btn-icon-action {
   width: 50px; height: 50px; border-radius: 12px; border: none;
   background: var(--cyber-primary); color: #fff; font-size: 20px;
   display: flex; align-items: center; justify-content: center;
   cursor: pointer; transition: all 0.2s;
}
.btn-icon-action:active { transform: scale(0.95); }
.btn-icon-action:disabled { opacity: 0.5; filter: grayscale(1); }

/* Result Area */
.result-area { margin-top: 20px; border-top: 1px solid rgba(255,255,255,0.05); padding-top: 20px; }

.success-tag { 
    display: flex; align-items: center; gap: 6px; color: var(--cyber-primary); 
    font-size: 13px; font-weight: 600; margin-bottom: 12px; 
}

.preview-card {
    background: rgba(30, 41, 59, 0.6);
    border: 1px solid rgba(56, 189, 248, 0.3);
    border-radius: 16px;
    padding: 12px;
    display: flex; align-items: center; gap: 12px;
    cursor: pointer;
    transition: all 0.2s;
}
.preview-card:active { transform: scale(0.98); background: rgba(30, 41, 59, 0.8); }

.pc-thumb { 
    width: 60px; height: 60px; border-radius: 8px; background: #000; object-fit: cover; 
    border: 1px solid rgba(255,255,255,0.1);
}
.pc-info { flex: 1; overflow: hidden; }
.pc-name { font-size: 14px; color: #fff; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.pc-price { color: #F97316; font-size: 12px; font-weight: 700; font-family: 'DIN Alternates'; }
.pc-price .val { font-size: 16px; }

.pc-btn {
    padding: 6px 16px; background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
    border: none; border-radius: 100px; color: #fff; font-size: 12px; font-weight: 600;
}

/* Warning */
.result-warning {
    display: flex; flex-direction: column; align-items: center; text-align: center; gap: 12px; padding: 10px;
}
.warning-icon { font-size: 32px; color: #F59E0B; }
.warning-text p { font-size: 14px; color: #94A3B8; margin: 0 0 8px; }
.warning-text span { color: #E2E8F0; font-family: monospace; }
.btn-text-reset { background: none; border: none; color: var(--cyber-primary); font-size: 14px; text-decoration: underline; }

/* Mini Tools */
.tools-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; opacity: 0.5; }
.tool-card.mini {
   display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 8px;
   height: 100px; padding: 0;
   position: relative;
}
.tool-card.mini .el-icon { font-size: 24px; color: #94A3B8; }
.tool-card.mini span { font-size: 12px; color: #64748B; }
.badge-soon { 
    position: absolute; top: 8px; right: 8px; 
    font-size: 9px; background: rgba(255,255,255,0.05); 
    padding: 2px 6px; border-radius: 4px; color: #64748B; 
}

/* Animation */
.animate-fade-in { animation: fadeIn 0.3s ease-out; }
@keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

.spinner-xs {
  width: 16px; height: 16px;
  border: 2px solid rgba(255,255,255,0.3); border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}
@keyframes spin { to { transform: rotate(360deg); } }
</style>
