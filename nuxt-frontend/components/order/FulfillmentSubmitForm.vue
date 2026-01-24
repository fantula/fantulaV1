<template>
  <div class="fulfillment-submit-form glass-panel">
    <!-- 顶部提醒 (无图表，纯文字，Glass风格) -->
    <div class="tip-header-glass">
      <span class="tip-text">图拉提醒：您要填写以下信息才可以哦</span>
    </div>

    <!-- 表单区域 -->
    <div class="form-area">
      <div v-for="field in fields" :key="field.key" class="form-group">
        <label class="form-label">{{ field.label }}</label>
        <div class="input-wrapper">
           <input
            v-model="formData[field.key]"
            class="glass-input"
            :placeholder="'请输入' + field.label"
          />
        </div>
      </div>
    </div>

    <!-- 状态提示 (Status Cards) -->
    <div v-if="latestStatus" class="status-card-wrapper">
        <div v-if="latestStatus === 'submitted'" class="status-card pending">
            <div class="card-icon"><el-icon class="spin"><Loading /></el-icon></div>
            <div class="card-content">
                <div class="card-title">审核中</div>
                <div class="card-desc">您的回执已提交，管理员正在拼命审核中...</div>
            </div>
        </div>
        <div v-else-if="latestStatus === 'approved'" class="status-card success">
            <div class="card-icon"><el-icon><CircleCheck /></el-icon></div>
             <div class="card-content">
                <div class="card-title">已通过</div>
                <div class="card-desc">充值已完成，请检查您的账户到账情况。</div>
            </div>
        </div>
        <div v-else-if="latestStatus === 'rejected'" class="status-card error">
            <div class="card-icon"><el-icon><CircleClose /></el-icon></div>
             <div class="card-content">
                <div class="card-title">已驳回</div>
                <div class="card-desc">原因：{{ latestRejectReason }}</div>
            </div>
        </div>
    </div>

    <!-- 按钮区域 -->
    <div class="action-footer">
      <!-- 无记录：填写回执 -->
      <button v-if="!latestStatus" class="glass-btn primary" :disabled="isSubmitting" @click="handleInsert">
        <el-icon class="btn-icon"><EditPen /></el-icon> 填写回执
      </button>

      <!-- submitted 状态：修改回执 -->
      <button v-if="latestStatus === 'submitted'" class="glass-btn secondary" :disabled="isSubmitting" @click="handleUpdate">
        <el-icon class="btn-icon"><Edit /></el-icon> 修改回执信息
      </button>

      <!-- rejected 状态：重新提交 -->
      <button v-if="latestStatus === 'rejected'" class="glass-btn primary" :disabled="isSubmitting" @click="handleInsert">
        <el-icon class="btn-icon"><RefreshRight /></el-icon> 重新提交
      </button>

      <!-- approved 状态：再次提交 -->
      <button v-if="latestStatus === 'approved'" class="glass-btn secondary" :disabled="isSubmitting" @click="handleInsert">
        <el-icon class="btn-icon"><DocumentAdd /></el-icon> 再次提交
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Loading, CircleCheck, CircleClose, EditPen, Edit, RefreshRight, DocumentAdd } from '@element-plus/icons-vue' // Import icons
import { getSupabaseClient } from '@/utils/supabase'
import type { OrderFulfillment, FulfillmentField } from '@/types/order'

const props = defineProps<{
  orderId: string
  orderStatus: string
  cdkFields: FulfillmentField[]
  cdkId?: string
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
  if (latestFulfillment.value?.payload && 
      (latestStatus.value === 'submitted' || latestStatus.value === 'rejected')) {
    Object.entries(latestFulfillment.value.payload).forEach(([k, v]) => {
      // 排除内部字段
      if (k === '_cdk_id') return
      
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
    let query = client
      .from('order_fulfillments')
      .select('*')
      .eq('order_id', props.orderId)
      .order('submitted_at', { ascending: false })
      
    // 如果指定了 cdkId，则过滤 payload
    if (props.cdkId) {
       query = query.contains('payload', { _cdk_id: props.cdkId })
    }

    const { data, error } = await query.limit(1).maybeSingle()
    
    if (!error && data) {
      latestFulfillment.value = data as OrderFulfillment
      initFormData()
    } else {
      latestFulfillment.value = null
      initFormData() // Reset if no data found
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
    
    // 注入 CDK 标识 (使用 ID 确保唯一)
    if (props.cdkId) {
        payload['_cdk_id'] = props.cdkId
    }
    
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
    
    if (props.cdkId) {
        payload['_cdk_id'] = props.cdkId
    }
    
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
.glass-panel {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 16px;
  display: flex;
  flex-direction: column;
}

/* 顶部提醒 (无Icon, 纯净版) */
.tip-header-glass {
  padding: 14px 24px;
  background: rgba(255, 255, 255, 0.03);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  text-align: left;
}
.tip-text {
  font-size: 13px;
  font-weight: 500;
  color: #94A3B8; /* Subtle text color */
  letter-spacing: 0.5px;
}

/* 表单区域 */
.form-area {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.form-label {
  font-size: 13px;
  color: #E2E8F0;
  font-weight: 500;
  margin-left: 2px;
}

.input-wrapper {
  position: relative;
}

.glass-input {
  width: 100%;
  padding: 12px 16px;
  background: rgba(15, 23, 42, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  font-size: 14px;
  color: #fff;
  transition: all 0.2s ease;
  outline: none;
}

.glass-input:focus {
  background: rgba(15, 23, 42, 0.8);
  border-color: #3B82F6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.15);
}

.glass-input::placeholder {
  color: #64748B;
}

/* 状态卡片 */
.status-card-wrapper {
    padding: 0 24px 20px;
}

.status-card {
    display: flex;
    align-items: flex-start;
    gap: 16px;
    padding: 16px;
    border-radius: 12px;
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.05);
}

.status-card.pending {
    background: rgba(234, 179, 8, 0.05);
    border-color: rgba(234, 179, 8, 0.2);
}
.status-card.pending .card-icon { color: #FACC15; }
.status-card.pending .card-title { color: #FACC15; }

.status-card.success {
    background: rgba(34, 197, 94, 0.05);
    border-color: rgba(34, 197, 94, 0.2);
}
.status-card.success .card-icon { color: #4ADE80; }
.status-card.success .card-title { color: #4ADE80; }

.status-card.error {
    background: rgba(248, 113, 113, 0.05);
    border-color: rgba(248, 113, 113, 0.2);
}
.status-card.error .card-icon { color: #F87171; }
.status-card.error .card-title { color: #F87171; }

.card-icon {
    font-size: 20px;
    padding-top: 2px;
}
.spin { animation: spin 2s linear infinite; }
@keyframes spin { 100% { transform: rotate(360deg); } }

.card-content { flex: 1; }
.card-title { font-size: 14px; font-weight: 700; margin-bottom: 4px; }
.card-desc { font-size: 13px; color: #94A3B8; line-height: 1.5; }

/* 底部按钮 */
.action-footer {
  padding: 20px 24px;
  background: rgba(0, 0, 0, 0.2);
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  display: flex;
  justify-content: center; /* Centered */
  padding-bottom: 24px;
}

.glass-btn {
  padding: 10px 40px; /* Wider padding for better look info */
  min-width: 140px;
  height: 44px; /* Fixed height for clean look */
  border-radius: 22px; /* Pill shape for premium feel */
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 8px; /* Icon gap */
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
.btn-icon { font-size: 16px; }

.glass-btn:disabled { opacity: 0.6; cursor: not-allowed; }

.glass-btn.primary {
  background: linear-gradient(135deg, #3B82F6, #2563EB);
  color: white;
  box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
}
.glass-btn.primary:hover:not(:disabled) {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(59, 130, 246, 0.5);
}

.glass-btn.secondary {
  background: rgba(255, 255, 255, 0.05);
  color: #E2E8F0;
  border: 1px solid rgba(255, 255, 255, 0.1);
}
.glass-btn.secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}
</style>
