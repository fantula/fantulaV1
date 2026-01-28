<template>
  <div class="mobile-submit-form">
    <!-- Header Tip -->
    <div class="form-tip">
       请填写以下信息以进行充值
    </div>

    <!-- Form Fields -->
    <div class="fields-container">
       <div v-for="field in fields" :key="field.key" class="field-item">
          <label>{{ field.label }}</label>
          <div class="input-box">
             <input v-model="formData[field.key]" :placeholder="'请输入' + field.label" />
          </div>
       </div>
    </div>

    <!-- Status Feedback -->
    <div v-if="latestStatus" class="status-banner" :class="latestStatus">
       <!-- Submitted -->
       <div v-if="latestStatus === 'submitted'" class="status-content">
          <div class="icon-spin"><el-icon><Loading /></el-icon></div>
          <div class="text">
             <div class="t-title">审核中</div>
             <div class="t-desc">您的回执已提交，请耐心等待...</div>
          </div>
       </div>
       <!-- Approved -->
       <div v-else-if="latestStatus === 'approved'" class="status-content">
          <div class="icon"><el-icon><CircleCheck /></el-icon></div>
          <div class="text">
             <div class="t-title">已通过</div>
             <div class="t-desc">充值已完成，请检查到账情况。</div>
          </div>
       </div>
       <!-- Rejected -->
       <div v-else-if="latestStatus === 'rejected'" class="status-content">
          <div class="icon"><el-icon><CircleClose /></el-icon></div>
          <div class="text">
             <div class="t-title">已驳回</div>
             <div class="t-desc">原因: {{ latestRejectReason }}</div>
          </div>
       </div>
    </div>

    <!-- Actions -->
    <div class="form-actions">
        <button 
           v-if="!latestStatus || latestStatus === 'rejected'" 
           class="action-btn primary" 
           :disabled="isSubmitting"
           @click="handleInsert"
        >
           {{ isSubmitting ? '提交中...' : (latestStatus === 'rejected' ? '重新提交' : '提交回执') }}
        </button>

        <button 
           v-if="latestStatus === 'submitted'" 
           class="action-btn secondary" 
           :disabled="isSubmitting"
           @click="handleUpdate"
        >
           {{ isSubmitting ? '保存中...' : '修改信息' }}
        </button>
        
        <button 
           v-if="latestStatus === 'approved'" 
           class="action-btn outline" 
           :disabled="isSubmitting"
           @click="handleInsert"
        >
           再次提交
        </button>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { Loading, CircleCheck, CircleClose } from '@element-plus/icons-vue'
import { getSupabaseClient } from '@/utils/supabase'

interface OrderFulfillment {
  id: string
  status: string
  payload: any
  reject_reason?: string
}
interface FulfillmentField {
  key: string
  label: string
}

const props = defineProps<{
  orderId: string
  orderStatus: string
  cdkFields: FulfillmentField[]
  cdkId?: string
}>()

const emit = defineEmits(['submit-success'])

const latestFulfillment = ref<OrderFulfillment | null>(null)
const isSubmitting = ref(false)
const formData = reactive<Record<string, string>>({})

const fields = computed(() => props.cdkFields || [])
const latestStatus = computed(() => latestFulfillment.value?.status)
const latestRejectReason = computed(() => latestFulfillment.value?.reject_reason || '-')

const initFormData = () => {
    fields.value.forEach(f => formData[f.key] = '')
    // Autofill if submitted/rejected
    if (latestFulfillment.value?.payload && ['submitted', 'rejected'].includes(latestStatus.value || '')) {
        Object.entries(latestFulfillment.value.payload).forEach(([k, v]) => {
            if (k !== '_cdk_id') formData[k] = v as string
        })
    }
}

const fetchLatestFulfillment = async () => {
    if (!props.orderId) return
    try {
        const client = getSupabaseClient()
        let query = client.from('order_fulfillments').select('*').eq('order_id', props.orderId).order('submitted_at', { ascending: false })
        if (props.cdkId) query = query.contains('payload', { _cdk_id: props.cdkId })
        const { data, error } = await query.limit(1).maybeSingle()
        if (!error) {
            latestFulfillment.value = data as OrderFulfillment
            initFormData()
        }
    } catch(e) { console.error(e) }
}

const getPayload = () => {
    const p: Record<string, string> = {}
    fields.value.forEach(f => p[f.key] = formData[f.key] || '')
    if (props.cdkId) p['_cdk_id'] = props.cdkId
    return p
}

const handleInsert = async () => {
    isSubmitting.value = true
    try {
        const client = getSupabaseClient()
        const { data, error } = await client.from('order_fulfillments').insert({
            order_id: props.orderId,
            status: 'submitted',
            payload: getPayload(),
            submitted_at: new Date().toISOString()
        }).select().single()
        
        if (error) throw error
        latestFulfillment.value = data as OrderFulfillment
        ElMessage.success('提交成功')
        emit('submit-success')
    } catch(e: any) { ElMessage.error(e.message) }
    finally { isSubmitting.value = false }
}

const handleUpdate = async () => {
    if (!latestFulfillment.value) return
    isSubmitting.value = true
    try {
        const client = getSupabaseClient()
        const { error } = await client.from('order_fulfillments').update({
            payload: getPayload(),
            submitted_at: new Date().toISOString()
        }).eq('id', latestFulfillment.value.id)

        if (error) throw error
        ElMessage.success('更新成功')
        fetchLatestFulfillment()
        emit('submit-success')
    } catch(e: any) { ElMessage.error(e.message) }
    finally { isSubmitting.value = false }
}

watch(() => props.cdkFields, initFormData, { immediate: true })
onMounted(fetchLatestFulfillment)
defineExpose({ refresh: fetchLatestFulfillment })
</script>

<style scoped>
.mobile-submit-form {
    background: rgba(30, 41, 59, 0.4);
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px; overflow: hidden;
    margin-top: 12px;
}

.form-tip {
    padding: 12px 16px; font-size: 12px; color: #94A3B8;
    background: rgba(255,255,255,0.02); border-bottom: 1px solid rgba(255,255,255,0.05);
}

.fields-container {
    padding: 16px; display: flex; flex-direction: column; gap: 16px;
}

.field-item label {
    display: block; font-size: 12px; color: #E2E8F0; margin-bottom: 6px;
}
.input-box input {
    width: 100%; box-sizing: border-box;
    background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.1);
    border-radius: 8px; padding: 10px 12px;
    color: #fff; font-size: 14px; outline: none;
}
.input-box input:focus { border-color: #3B82F6; box-shadow: 0 0 0 2px rgba(59,130,246,0.1); }

.status-banner {
    margin: 0 16px 16px; padding: 12px; border-radius: 8px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05);
}
.status-content { display: flex; gap: 10px; align-items: flex-start; }

.status-banner.submitted { background: rgba(234, 179, 8, 0.1); border-color: rgba(234, 179, 8, 0.2); color: #FACC15; }
.status-banner.approved { background: rgba(34, 197, 94, 0.1); border-color: rgba(34, 197, 94, 0.2); color: #4ADE80; }
.status-banner.rejected { background: rgba(248, 113, 113, 0.1); border-color: rgba(248, 113, 113, 0.2); color: #F87171; }

.icon-spin { animation: spin 2s linear infinite; }
@keyframes spin { to { transform: rotate(360deg); } }

.t-title { font-weight: 700; font-size: 13px; margin-bottom: 2px; }
.t-desc { font-size: 11px; opacity: 0.8; }

.form-actions {
    padding: 16px; border-top: 1px solid rgba(255,255,255,0.05);
    display: flex; justify-content: center; gap: 12px;
}
.action-btn {
    flex: 1; max-width: 160px; padding: 10px; border-radius: 20px;
    font-size: 13px; font-weight: 600; border: none;
    display: flex; align-items: center; justify-content: center;
}
.action-btn:disabled { opacity: 0.6; }

.action-btn.primary { background: #3B82F6; color: #fff; box-shadow: 0 4px 10px rgba(59,130,246,0.3); }
.action-btn.secondary { background: rgba(255,255,255,0.1); color: #fff; }
.action-btn.outline { background: transparent; border: 1px solid rgba(255,255,255,0.2); color: #E2E8F0; }
</style>
