<template>
  <div class="mobile-channel-page">
    <!-- Header -->
    <div class="channel-header">
       <div class="header-icon">
          <el-icon :size="32" color="#fff"><Search /></el-icon>
       </div>
       <h1>频道识别</h1>
       <p>请输入频道标识以连接专属商品</p>
    </div>

    <!-- Content Body -->
    <div class="channel-body">
       
       <!-- Input State -->
       <div v-if="state === 'input'" class="input-section">
          <div class="input-wrapper">
             <input 
                ref="inputRef"
                v-model="channelInput"
                type="text"
                class="channel-input"
                placeholder="@channel_name"
                @input="handleInput"
                @keyup.enter="handleRecognize"
                spellcheck="false"
             />
             <div v-if="loading" class="input-loader">
                <el-icon class="is-loading"><Loading /></el-icon>
             </div>
          </div>
          
          <button 
             class="action-btn" 
             @click="handleRecognize"
             :disabled="loading || !isValidInput"
          >
             {{ loading ? '识别中...' : '立即识别' }}
          </button>
       </div>

       <!-- Bound State (Success) -->
       <div v-else-if="state === 'bound'" class="result-section">
          <div class="status-icon success">
             <el-icon><CircleCheckFilled /></el-icon>
          </div>
          <h3 class="result-key">{{ resultKey }}</h3>
          <p class="result-msg">已成功识别频道</p>
          
          <button class="action-btn success-btn" @click="goToProduct">
             前往购买 <el-icon class="ml-1"><Right /></el-icon>
          </button>
          <button class="text-btn" @click="reset">重新输入</button>
       </div>

       <!-- Pending State (Warning) -->
       <div v-else-if="state === 'pending'" class="result-section">
          <div class="status-icon warning">
             <el-icon><WarningFilled /></el-icon>
          </div>
          <h3 class="result-key">{{ resultKey }}</h3>
          <p class="result-msg">频道尚未绑定商品</p>
          <p class="result-sub-msg">已记录请求，请稍后重试或联系客服</p>
          
          <button class="text-btn" @click="reset">返回</button>
       </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import { Search, Loading, CircleCheckFilled, WarningFilled, Right } from '@element-plus/icons-vue'
import { getSupabaseClient } from '@/utils/supabase'
import { ElMessage } from 'element-plus'

definePageMeta({
  layout: 'mobile'
})

const client = getSupabaseClient()
const router = useRouter()
const inputRef = ref<HTMLInputElement | null>(null)

// State
type PageState = 'input' | 'bound' | 'pending'
const state = ref<PageState>('input')
const loading = ref(false)
const channelInput = ref('@')
const resultKey = ref('')
const boundProductId = ref<string | null>(null)

const isValidInput = computed(() => {
  return /^@[a-z0-9_]+$/.test(channelInput.value)
})

const handleInput = (e: Event) => {
  let val = (e.target as HTMLInputElement).value
  val = val.toLowerCase().replace(/\s+/g, '')
  
  if (!val) {
    val = '@'
  } else if (!val.startsWith('@')) {
    val = '@' + val
  }
  
  channelInput.value = val
  if (inputRef.value && inputRef.value.value !== val) {
    inputRef.value.value = val
  }
}

const handleRecognize = async () => {
  if (!isValidInput.value) {
    ElMessage.warning({ message: '请输入有效的频道标识', offset: 100, customClass: 'mobile-message' })
    return
  }

  try {
    loading.value = true
    const { data, error } = await client.rpc('resolve_channel_key', {
      p_channel_key: channelInput.value
    })

    if (error) throw error

    resultKey.value = data.channel_key
    boundProductId.value = data.product_id

    if (data.bound && data.product_id) {
      state.value = 'bound'
    } else {
      state.value = 'pending'
    }
  } catch (err: any) {
    console.error('Channel recognition error:', err)
    ElMessage.error({ message: '识别失败，请重试', offset: 100, customClass: 'mobile-message' })
  } finally {
    loading.value = false
  }
}

const goToProduct = () => {
  if (boundProductId.value) {
    router.push(`/goods/${boundProductId.value}`)
  }
}

const reset = () => {
  state.value = 'input'
  channelInput.value = '@'
  resultKey.value = ''
  boundProductId.value = null
  nextTick(() => inputRef.value?.focus())
}

onMounted(() => {
  nextTick(() => inputRef.value?.focus())
})
</script>

<style scoped>
.mobile-channel-page {
  min-height: 100vh;
  background: #0F172A;
  color: #fff;
  display: flex; flex-direction: column;
  padding: 40px 24px;
}

.channel-header {
  display: flex; flex-direction: column; align-items: center; margin-bottom: 60px;
}
.header-icon {
  width: 72px; height: 72px; border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
  margin-bottom: 24px;
}
.channel-header h1 { font-size: 28px; font-weight: 700; margin-bottom: 8px; letter-spacing: 0.5px; }
.channel-header p { color: #94A3B8; font-size: 15px; text-align: center; }

.channel-body { width: 100%; max-width: 400px; margin: 0 auto; }

/* Input Section */
.input-wrapper { position: relative; margin-bottom: 24px; }
.channel-input {
  width: 100%; height: 64px; background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255,255,255,0.1); border-radius: 20px;
  padding: 0 24px; color: #fff; font-size: 20px; font-family: monospace;
  text-align: center; outline: none; transition: all 0.3s;
}
.channel-input:focus {
  border-color: #38BDF8; background: rgba(30, 41, 59, 0.8);
  box-shadow: 0 0 0 4px rgba(56, 189, 248, 0.15);
}
.input-loader { position: absolute; right: 20px; top: 22px; color: #94A3B8; }

.action-btn {
  width: 100%; height: 56px; border-radius: 28px; border: none;
  background: linear-gradient(90deg, #3B82F6, #06B6D4);
  color: #fff; font-size: 18px; font-weight: 600;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
  transition: transform 0.2s;
}
.action-btn:active { transform: scale(0.96); }
.action-btn:disabled { opacity: 0.6; filter: grayscale(0.5); }

/* Result Section */
.result-section { display: flex; flex-direction: column; align-items: center; text-align: center; }
.status-icon { font-size: 64px; margin-bottom: 24px; }
.status-icon.success { color: #10B981; filter: drop-shadow(0 0 15px rgba(16, 185, 129, 0.3)); }
.status-icon.warning { color: #F59E0B; filter: drop-shadow(0 0 15px rgba(245, 158, 11, 0.3)); }

.result-key { font-size: 24px; font-family: monospace; margin-bottom: 8px; word-break: break-all; }
.result-msg { font-size: 18px; font-weight: 600; color: #E2E8F0; margin-bottom: 8px; }
.result-sub-msg { font-size: 14px; color: #94A3B8; margin-bottom: 32px; }

.success-btn {
  background: linear-gradient(90deg, #10B981, #059669);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.3);
  margin-bottom: 16px;
}
.ml-1 { margin-left: 4px; }

.text-btn {
  background: none; border: none; color: #94A3B8; font-size: 15px; padding: 12px;
}
</style>
