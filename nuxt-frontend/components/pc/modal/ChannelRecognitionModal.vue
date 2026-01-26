<template>
  <Transition name="modal-fade">
    <div v-if="modelValue" class="modal-mask" @click.self="close">
      <div class="channel-modal">
        <!-- Close Button -->
        <button class="modal-close" @click="close">×</button>

        <!-- Header -->
        <div class="modal-header">
          <div class="header-icon">
            <el-icon :size="32" color="#fff"><Search /></el-icon>
          </div>
          <h2 class="modal-title">频道识别</h2>
          <p class="modal-subtitle">请输入频道标识以连接专属商品</p>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <!-- Input State -->
          <div v-if="state === 'input'" class="input-section">
            <div class="input-group">
              <input 
                ref="inputRef"
                v-model="channelInput"
                type="text"
                class="glass-input"
                placeholder="@channel_name"
                @input="handleInput"
                @keyup.enter="handleRecognize"
                spellcheck="false"
              />
              <!-- Loading Spinner overlay -->
              <div v-if="loading" class="input-loader">
                <el-icon class="is-loading"><Loading /></el-icon>
              </div>
            </div>
            
            <button 
              class="primary-btn" 
              @click="handleRecognize"
              :disabled="loading || !isValidInput"
            >
              {{ loading ? '识别中...' : '立即识别' }}
            </button>
          </div>

          <!-- Bound State -->
          <div v-else-if="state === 'bound'" class="result-section">
            <div class="status-icon success">
              <el-icon><CircleCheckFilled /></el-icon>
            </div>
            <h3 class="result-key">{{ resultKey }}</h3>
            <p class="result-msg">已成功识别频道</p>
            
            <div class="action-buttons">
              <button class="primary-btn success" @click="goToProduct">
                前往购买
                <el-icon class="el-icon--right"><Right /></el-icon>
              </button>
              <button class="text-btn" @click="reset">重新输入</button>
            </div>
          </div>

          <!-- Pending State -->
          <div v-else-if="state === 'pending'" class="result-section">
            <div class="status-icon warning">
              <el-icon><WarningFilled /></el-icon>
            </div>
            <h3 class="result-key">{{ resultKey }}</h3>
            <p class="result-msg">频道尚未绑定商品</p>
            <p class="result-sub-msg">已记录请求，请稍后重试或联系客服</p>
            
            <div class="action-buttons">
              <button class="text-btn" @click="reset">返回</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import { Search, Loading, CircleCheckFilled, WarningFilled, Right } from '@element-plus/icons-vue'
import { getSupabaseClient } from '@/utils/supabase'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue'])

const client = getSupabaseClient()
const router = useRouter()
const inputRef = ref<HTMLInputElement | null>(null)

// State
type ModalState = 'input' | 'bound' | 'pending'
const state = ref<ModalState>('input')
const loading = ref(false)
const channelInput = ref('@')
const resultKey = ref('')
const boundProductId = ref<string | null>(null)

// Auto-focus logic
watch(() => props.modelValue, (val) => {
  if (val) {
    nextTick(() => {
      reset()
      inputRef.value?.focus()
    })
  }
})

const isValidInput = computed(() => {
  // Regex: Starts with @, followed by 1+ lowercase alphanumeric or underscore
  // Strict validation: English letters, numbers, underscores only. No Chinese or special chars.
  return /^@[a-z0-9_]+$/.test(channelInput.value)
})

// Strict Input Handling
const handleInput = (e: Event) => {
  let val = (e.target as HTMLInputElement).value
  
  // 1. Force Lowercase
  val = val.toLowerCase()
  
  // 2. Remove all whitespace (Strict no-spaces)
  val = val.replace(/\s+/g, '')

  // 3. Force @ prefix and handle empty
  if (!val) {
    val = '@'
  } else if (!val.startsWith('@')) {
    val = '@' + val
  }
  
  // Update value and force DOM update if needed (e.g. removed space)
  channelInput.value = val
  if (inputRef.value && inputRef.value.value !== val) {
    inputRef.value.value = val
  }
}

const handleRecognize = async () => {
  if (!isValidInput.value) {
    ElMessage.warning('请输入有效的频道标识（仅限英文、数字、下划线）')
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
    ElMessage.error('识别失败，请重试')
  } finally {
    loading.value = false
  }
}

const goToProduct = () => {
  if (boundProductId.value) {
    emit('update:modelValue', false)
    router.push(`/goods/${boundProductId.value}`)
  }
}

const reset = () => {
  state.value = 'input'
  channelInput.value = '@' // Reset to just prefix
  resultKey.value = ''
  boundProductId.value = null
  nextTick(() => inputRef.value?.focus())
}

const close = () => {
  emit('update:modelValue', false)
}
</script>

<style scoped>
/* Modal Transition */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

/* Mask */
.modal-mask {
  position: fixed;
  z-index: 9999;
  top: 0; left: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Modal Container - Premium Glass */
.channel-modal {
  width: 420px;
  background: rgba(15, 23, 42, 0.85); /* Dark Slate */
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  border-radius: 28px;
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* Header */
.modal-header {
  padding: 32px 24px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Aurora Gradient Background */
  background: radial-gradient(circle at top, rgba(59, 130, 246, 0.15), transparent 70%);
}

.header-icon {
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background: linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border: 1px solid rgba(255,255,255,0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.2);
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin: 0 0 8px;
  letter-spacing: 0.5px;
}

.modal-subtitle {
  font-size: 14px;
  color: #94A3B8;
  margin: 0;
}

.modal-close {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: rgba(255, 255, 255, 0.4);
  font-size: 28px;
  cursor: pointer;
  transition: color 0.2s;
  line-height: 1;
  z-index: 10;
}
.modal-close:hover {
  color: #fff;
}

/* Body */
.modal-body {
  padding: 0 32px 40px;
}

/* Input Section */
.input-group {
  position: relative;
  margin-bottom: 24px;
}

.glass-input {
  width: 100%;
  height: 56px;
  background: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 16px;
  padding: 0 20px;
  font-size: 18px;
  color: #fff;
  font-family: monospace; /* Monospace for handles looks cool */
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  text-align: center;
}

.glass-input:focus {
  border-color: var(--primary-blue);
  box-shadow: 0 0 0 4px rgba(59, 130, 246, 0.15);
  background: rgba(0, 0, 0, 0.5);
}

.input-loader {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: rgba(255,255,255,0.5);
}

/* Result Section */
.result-section {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.status-icon {
  margin-bottom: 16px;
  font-size: 56px;
}
.status-icon.success { color: #10B981; filter: drop-shadow(0 0 10px rgba(16, 185, 129, 0.3)); }
.status-icon.warning { color: #F59E0B; filter: drop-shadow(0 0 10px rgba(245, 158, 11, 0.3)); }

.result-key {
  font-size: 22px;
  color: #fff;
  margin: 0 0 8px;
  font-family: monospace;
}

.result-msg {
  font-size: 16px;
  color: #E2E8F0;
  margin: 0 0 4px;
  font-weight: 500;
}

.result-sub-msg {
  font-size: 14px;
  color: #94A3B8;
  margin: 0 0 24px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
}

/* Buttons */
.primary-btn {
  width: 100%;
  height: 50px;
  background: linear-gradient(90deg, #3B82F6, #06B6D4);
  border: none;
  border-radius: 100px; /* Pill shape standard */
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.primary-btn:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 16px rgba(59, 130, 246, 0.4);
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  filter: grayscale(0.8);
}

.primary-btn.success {
  background: linear-gradient(90deg, #10B981, #059669);
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
}
.primary-btn.success:hover {
  box-shadow: 0 8px 16px rgba(16, 185, 129, 0.4);
}

.text-btn {
  background: none;
  border: none;
  color: #94A3B8;
  font-size: 14px;
  cursor: pointer;
  transition: color 0.2s;
  padding: 8px;
}
.text-btn:hover {
  color: #fff;
  text-decoration: underline;
}
</style>
