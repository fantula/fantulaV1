<template>
  <div v-if="visible" class="sheet-mask" @click="handleClose">
    <div class="sheet-panel" @click.stop>
       <div class="sheet-header">
          <div class="title">提交工单</div>
          <div class="close-btn" @click="handleClose"><el-icon><Close /></el-icon></div>
       </div>

       <div class="sheet-body">
          <!-- Rich Order Info Card -->
           <div class="order-card-glass" v-if="orderInfo">
              <div class="card-image">
                 <img :src="orderInfo.productImage" alt="Product" />
              </div>
              <div class="card-info">
                 <div class="info-top">
                    <span class="order-no">订单号 {{ orderInfo.order_no }}</span>
                 </div>
                 <div class="product-name">{{ orderInfo.productName }}</div>
                 <div class="specs">
                    <span>{{ orderInfo.skuSpec }}</span>
                 </div>
                 <div class="price-row">
                    <span class="price">¥{{ orderInfo.totalAmount }}</span>
                    <span class="quantity">x{{ orderInfo.quantity }}</span>
                 </div>
              </div>
           </div>

          <div class="form-group">
             <label>标题 <span class="req">*</span></label>
             <input v-model="form.title" class="m-input" placeholder="简要描述问题" />
          </div>

          <div class="form-group">
             <label>优先级</label>
             <div class="priority-row">
                <div 
                   v-for="p in priorities" :key="p.val" 
                   class="p-chip"
                   :class="{ active: form.priority === p.val, [p.val]: true }"
                   @click="form.priority = p.val"
                >
                   {{ p.label }}
                </div>
             </div>
          </div>

          <div class="form-group">
             <label>详细描述 <span class="req">*</span></label>
             <textarea v-model="form.content" class="m-input area" rows="4" placeholder="请详细描述..."></textarea>
          </div>

          <div class="form-group">
             <label>截图 ({{ form.attachments.length }}/3)</label>
             <div class="upload-row">
                <div v-for="(url, idx) in form.attachments" :key="idx" class="img-preview">
                   <img :src="url" />
                   <div class="del-btn" @click="form.attachments.splice(idx, 1)">×</div>
                </div>
                <div v-if="form.attachments.length < 3" class="add-btn" @click="triggerUpload">
                   <span v-if="uploading">...</span>
                   <span v-else>+</span>
                </div>
             </div>
             <input type="file" ref="fileRaw" hidden accept="image/*" @change="handleFile" />
          </div>
       </div>

       <div class="sheet-footer">
          <button class="submit-btn" :disabled="!isValid || submitting" @click="submit">
             {{ submitting ? '提交中...' : '提交工单' }}
          </button>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { ticketApi } from '@/api/client/ticket'
import { getSupabaseClient } from '@/utils/supabase'
import { ElMessage } from 'element-plus'

const props = defineProps<{
  modelValue: boolean
  orderId: string
  orderInfo: any // Expecting full order object simplified for display
}>()
const emit = defineEmits(['update:modelValue', 'success'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const submitting = ref(false)
const uploading = ref(false)
const fileRaw = ref<HTMLInputElement | null>(null)

const priorities = [
   { label: '一般', val: 'low' },
   { label: '重要', val: 'medium' },
   { label: '紧急', val: 'high' }
]

const form = reactive({
   title: '',
   content: '',
   priority: 'medium',
   attachments: [] as string[]
})

const isValid = computed(() => form.title && form.content)

const handleClose = () => visible.value = false

const triggerUpload = () => fileRaw.value?.click()

const handleFile = async (e: Event) => {
   const files = (e.target as HTMLInputElement).files
   if (!files?.length) return
   uploading.value = true
   try {
      const file = files[0]
      const client = getSupabaseClient()
      const path = `${props.orderId}/${Date.now()}_${file.name}`
      const { data, error } = await client.storage.from('tickets').upload(path, file)
      if (error) throw error
      const { data: { publicUrl } } = client.storage.from('tickets').getPublicUrl(data.path)
      form.attachments.push(publicUrl)
   } catch(e) { ElMessage.error('上传失败') }
   finally { uploading.value = false; if(fileRaw.value) fileRaw.value.value = '' }
}

const submit = async () => {
   submitting.value = true
   try {
      const res = await ticketApi.create(props.orderId, form.title, form.content, form.priority, form.attachments)
      if (res.success) {
         ElMessage.success('工单已提交')
         emit('success')
         handleClose()
      } else ElMessage.error(res.error || 'Fail')
   } catch(e) { ElMessage.error('系统错误') }
   finally { submitting.value = false }
}
</script>

<style scoped>
.sheet-mask {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(2px);
    display: flex; flex-direction: column; justify-content: flex-end;
}
.sheet-panel {
    background: #1E293B; border-top-left-radius: 20px; border-top-right-radius: 20px;
    padding-bottom: env(safe-area-inset-bottom);
    max-height: 90vh; display: flex; flex-direction: column;
}
.sheet-header {
    padding: 16px; border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex; justify-content: space-between; align-items: center;
}
.title { color: #fff; font-weight: 700; }
.close-btn { font-size: 20px; color: #94A3B8; }

.sheet-body { padding: 16px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 20px; }

/* Rich Order Glass Card */
.order-card-glass {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 12px;
  padding: 12px;
  display: flex; gap: 12px;
}
.card-image {
  width: 60px; height: 60px; border-radius: 8px; overflow: hidden; flex-shrink: 0;
  border: 1px solid rgba(255,255,255,0.05); background: #0F172A;
}
.card-image img { width: 100%; height: 100%; object-fit: cover; }
.card-info { flex: 1; display: flex; flex-direction: column; justify-content: space-between; }
.info-top { display: flex; justify-content: space-between; align-items: center; }
.order-no { font-size: 11px; color: #64748B; font-family: monospace; }
.product-name { font-size: 13px; font-weight: 600; color: #F1F5F9; line-height: 1.3; margin-top: 2px; }
.specs { font-size: 11px; color: #94A3B8; margin-top: 2px; }
.price-row { display: flex; justify-content: space-between; align-items: flex-end; margin-top: 4px; }
.price { font-size: 14px; font-weight: 700; color: #F97316; font-family: 'DIN Alternate'; }
.quantity { font-size: 11px; color: #64748B; }

.form-group label { display: block; font-size: 13px; color: #CBD5E1; margin-bottom: 6px; }
.req { color: #EF4444; }

.m-input {
    width: 100%; box-sizing: border-box; background: rgba(0,0,0,0.2);
    border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;
    padding: 10px; color: #fff; font-size: 14px;
}
.area { resize: none; }

.priority-row { display: flex; gap: 8px; }
.p-chip {
    flex: 1; text-align: center; padding: 8px; border-radius: 8px; font-size: 13px;
    background: rgba(255,255,255,0.05); color: #94A3B8;
}
.p-chip.active.low { background: #10B981; color: #fff; }
.p-chip.active.medium { background: #F59E0B; color: #fff; }
.p-chip.active.high { background: #EF4444; color: #fff; }

.upload-row { display: flex; gap: 10px; }
.add-btn {
    width: 60px; height: 60px; border: 1px dashed rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center; color: #64748B; border-radius: 8px;
}
.img-preview { width: 60px; height: 60px; position: relative; border-radius: 8px; overflow: hidden; }
.img-preview img { width: 100%; height: 100%; object-fit: cover; }
.del-btn { position: absolute; top:0; right:0; background: rgba(0,0,0,0.6); color: #fff; width: 16px; height: 16px; text-align: center; font-size: 12px; }

.sheet-footer { padding: 16px; border-top: 1px solid rgba(255,255,255,0.05); }
.submit-btn {
    width: 100%; padding: 12px; background: #3B82F6; color: #fff; font-weight: 600; border-radius: 10px; border: none;
}
.submit-btn:disabled { opacity: 0.5; }
</style>
