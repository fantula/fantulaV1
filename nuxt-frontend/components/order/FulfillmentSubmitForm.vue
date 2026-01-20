<template>
  <div class="fulfillment-submit-form">
    <!-- 顶部提醒 -->
    <div class="tip-header">
      <span class="tip-icon">🔔</span>
      <span class="tip-text">图拉提醒：您要填写以下信息才可以哦</span>
    </div>

    <!-- 表单区域 -->
    <div class="form-area">
      <div v-for="field in fields" :key="field.key" class="form-row">
        <label class="form-label">{{ field.label }}：</label>
        <input
          v-model="formData[field.key]"
          class="form-input"
          :placeholder="'请输入充值内容'"
        />
      </div>
    </div>

    <!-- 状态提示 -->
    <div v-if="latestStatus === 'submitted'" class="status-hint pending">
      <span class="status-icon">⏳</span>
      <span>回执已提交，等待审核中...</span>
    </div>
    <div v-else-if="latestStatus === 'approved'" class="status-hint success">
      <span class="status-icon">✅</span>
      <span>回执已通过，发货完成</span>
    </div>
    <div v-else-if="latestStatus === 'rejected'" class="status-hint rejected">
      <span class="status-icon">❌</span>
      <span>回执被驳回：{{ latestRejectReason }}</span>
    </div>

    <!-- 按钮区域 -->
    <div class="action-buttons">
      <!-- 无记录：填写回执 (INSERT) -->
      <button
        v-if="!latestStatus"
        class="btn btn-primary"
        :disabled="isSubmitting"
        @click="handleInsert"
      >
        {{ isSubmitting ? '提交中...' : '填写回执' }}
      </button>

      <!-- submitted 状态：修改回执 (UPDATE) -->
      <button
        v-if="latestStatus === 'submitted'"
        class="btn btn-secondary"
        :disabled="isSubmitting"
        @click="handleUpdate"
      >
        {{ isSubmitting ? '保存中...' : '修改回执' }}
      </button>

      <!-- rejected 状态：重新提交 (INSERT) -->
      <button
        v-if="latestStatus === 'rejected'"
        class="btn btn-primary"
        :disabled="isSubmitting"
        @click="handleInsert"
      >
        {{ isSubmitting ? '提交中...' : '重新提交' }}
      </button>

      <!-- approved 状态：再次提交 (INSERT) -->
      <button
        v-if="latestStatus === 'approved'"
        class="btn btn-primary"
        :disabled="isSubmitting"
        @click="handleInsert"
      >
        {{ isSubmitting ? '提交中...' : '再次提交' }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { getSupabaseClient } from '@/utils/supabase'
import type { OrderFulfillment, FulfillmentField } from '@/types/order'

const props = defineProps<{
  orderId: string
  orderStatus: string
  cdkFields: FulfillmentField[]
}>()

const emit = defineEmits(['submit-success'])

// 状态
const latestFulfillment = ref<OrderFulfillment | null>(null)
const isSubmitting = ref(false)
const formData = reactive<Record<string, string>>({})

// 动态字段列表
const fields = computed(() => props.cdkFields || [])

// 最新回执状态
const latestStatus = computed(() => latestFulfillment.value?.status)
const latestRejectReason = computed(() => latestFulfillment.value?.reject_reason || '未填写原因')

// 初始化表单数据
const initFormData = () => {
  // 先清空所有字段
  fields.value.forEach(f => {
    formData[f.key] = ''
  })
  
  // submitted 或 rejected 状态：填充上次提交的内容
  // approved 或 无记录：保持空白
  if (latestFulfillment.value?.payload && 
      (latestStatus.value === 'submitted' || latestStatus.value === 'rejected')) {
    Object.entries(latestFulfillment.value.payload).forEach(([k, v]) => {
      if (k in formData) {
        formData[k] = v
      }
    })
  }
}

// 获取最新回执
const fetchLatestFulfillment = async () => {
  if (!props.orderId) return
  
  try {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('order_fulfillments')
      .select('*')
      .eq('order_id', props.orderId)
      .order('submitted_at', { ascending: false })
      .limit(1)
      .maybeSingle()
    
    if (!error && data) {
      latestFulfillment.value = data as OrderFulfillment
      initFormData()
    }
  } catch (err) {
    console.error('获取回执失败:', err)
  }
}

// 提交回执（新建记录 - INSERT）
const handleInsert = async () => {
  isSubmitting.value = true
  try {
    const client = getSupabaseClient()
    const payload: Record<string, string> = {}
    fields.value.forEach(f => {
      payload[f.key] = formData[f.key] || ''
    })
    
    const { data, error } = await client
      .from('order_fulfillments')
      .insert({
        order_id: props.orderId,
        status: 'submitted',
        payload,
        submitted_at: new Date().toISOString()
      })
      .select()
      .single()
    
    if (error) {
      ElMessage.error('提交失败: ' + error.message)
      return
    }
    
    latestFulfillment.value = data as OrderFulfillment
    ElMessage.success('回执提交成功，请等待审核')
    emit('submit-success')
  } catch (err: any) {
    ElMessage.error(err.message || '提交失败')
  } finally {
    isSubmitting.value = false
  }
}

// 修改回执（更新当前 submitted 记录 - UPDATE）
const handleUpdate = async () => {
  if (!latestFulfillment.value) return
  
  isSubmitting.value = true
  try {
    const client = getSupabaseClient()
    const payload: Record<string, string> = {}
    fields.value.forEach(f => {
      payload[f.key] = formData[f.key] || ''
    })
    
    const { error } = await client
      .from('order_fulfillments')
      .update({
        payload,
        submitted_at: new Date().toISOString()
      })
      .eq('id', latestFulfillment.value.id)
    
    if (error) {
      ElMessage.error('修改失败: ' + error.message)
      return
    }
    
    ElMessage.success('回执修改成功')
    await fetchLatestFulfillment()
    emit('submit-success')
  } catch (err: any) {
    ElMessage.error(err.message || '修改失败')
  } finally {
    isSubmitting.value = false
  }
}

// 监听字段变化
watch(() => props.cdkFields, () => {
  initFormData()
}, { immediate: true })

onMounted(() => {
  fetchLatestFulfillment()
})

// 暴露刷新方法
defineExpose({ refresh: fetchLatestFulfillment })
</script>

<style scoped>
.fulfillment-submit-form {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 16px;
}

/* 顶部提醒 */
.tip-header {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 24px;
  background: linear-gradient(90deg, rgba(251, 191, 36, 0.15), rgba(251, 191, 36, 0.05));
  border-bottom: 1px solid rgba(251, 191, 36, 0.2);
}
.tip-icon { font-size: 18px; }
.tip-text {
  font-size: 14px;
  font-weight: 500;
  color: #fbbf24;
}

/* 表单区域 */
.form-area {
  padding: 20px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.form-area.is-locked {
  opacity: 0.6;
  pointer-events: none;
}

.form-row {
  display: flex;
  align-items: center;
  gap: 12px;
}

.form-label {
  width: 80px;
  font-size: 14px;
  color: #94a3b8;
  text-align: right;
  flex-shrink: 0;
}

.form-input {
  flex: 1;
  padding: 10px 14px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  font-size: 14px;
  color: #f1f5f9;
  transition: all 0.2s;
}
.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  background: rgba(59, 130, 246, 0.1);
}
.form-input:disabled {
  background: rgba(100, 116, 139, 0.1);
  color: #64748b;
  cursor: not-allowed;
}
.form-input::placeholder {
  color: #475569;
}

/* 状态提示 */
.status-hint {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 24px;
  font-size: 14px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}
.status-hint.pending {
  background: rgba(251, 191, 36, 0.1);
  color: #fbbf24;
}
.status-hint.success {
  background: rgba(34, 197, 94, 0.1);
  color: #22c55e;
}
.status-hint.rejected {
  background: rgba(239, 68, 68, 0.1);
  color: #ef4444;
}
.status-icon { font-size: 16px; }

/* 按钮区域 */
.action-buttons {
  padding: 16px 24px;
  display: flex;
  gap: 12px;
  justify-content: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.btn {
  padding: 10px 32px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
}
.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn-primary {
  background: linear-gradient(135deg, #3b82f6, #2563eb);
  color: white;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}
.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.1);
  color: #e2e8f0;
  border: 1px solid rgba(255, 255, 255, 0.15);
}
.btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.15);
}
</style>
