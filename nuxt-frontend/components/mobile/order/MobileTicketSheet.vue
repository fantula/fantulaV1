<template>
  <Teleport to="body">
  <Transition name="fade">
  <div v-if="visible" class="sheet-mask" @click="handleClose">
    <div class="sheet-panel-glass aurora-sheet-panel" @click.stop>
       <div class="sheet-header">
          <div class="title">提交工单</div>
          <div class="close-btn" @click="handleClose"><el-icon><Close /></el-icon></div>
       </div>

       <div class="sheet-body">
          <!-- Rich Order Info Card -->
           <MobileOrderProductInfo v-if="orderInfo" :order="orderInfo" :compact="true" />

          <div class="form-group">
             <label>标题 <span class="req">*</span></label>
             <input v-model="form.title" class="aurora-input" placeholder="简要描述问题" />
          </div>

          <div class="form-group">
             <label>优先级</label>
             <div class="priority-row">
                <div 
                   v-for="p in priorities" :key="p.val" 
                   class="p-chip-glass"
                   :class="{ active: form.priority === p.val, [p.val]: true }"
                   @click="form.priority = p.val"
                >
                   {{ p.label }}
                </div>
             </div>
          </div>

          <div class="form-group">
             <label>详细描述 <span class="req">*</span></label>
             <textarea v-model="form.content" class="aurora-textarea" rows="4" placeholder="请详细描述..."></textarea>
          </div>

          <div class="form-group">
             <label>截图 ({{ form.attachments.length }}/3)</label>
             <div class="upload-row">
                <div v-for="(url, idx) in form.attachments" :key="idx" class="img-preview">
                   <img :src="url" />
                   <div class="del-btn" @click="form.attachments.splice(idx, 1)">×</div>
                </div>
                <div v-if="form.attachments.length < 3" class="add-btn-glass" @click="triggerUpload">
                   <span v-if="uploading" class="loading-spin">C</span>
                   <span v-else>+</span>
                </div>
             </div>
             <input type="file" ref="fileRaw" hidden accept="image/*" @change="handleFile" />
          </div>
       </div>

       <div class="sheet-footer">
          <button class="aurora-btn-primary" :disabled="!isValid || submitting" @click="submit">
             {{ submitting ? '提交中...' : '提交工单' }}
          </button>
       </div>
    </div>
  </div>
  </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { ticketApi } from '@/api/client/ticket'
import { uploadImageToStorage } from '@/utils/uploadImage'
import { useNotify } from '@/composables/useNotify'
import MobileOrderProductInfo from './MobileOrderProductInfo.vue'

const props = defineProps<{
  modelValue: boolean
  orderId: string
  orderInfo: any // Expecting full order object simplified for display
}>()
const emit = defineEmits(['update:modelValue', 'success'])
const { success, error } = useNotify()

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
      // 上传到 R2 云储存 (tickets 文件夹)
      const result = await uploadImageToStorage(file, `tickets/${props.orderId}`)
      if (result.success && result.url) {
         form.attachments.push(result.url)
      } else {
         error(result.error || '上传失败')
      }
   } catch(e) { error('上传失败') }
   finally { uploading.value = false; if(fileRaw.value) fileRaw.value.value = '' }
}

const submit = async () => {
   submitting.value = true
   try {
      const res = await ticketApi.create(props.orderId, form.title, form.content, form.priority, form.attachments)
      if (res.success) {
         success('工单已提交')
         emit('success')
         handleClose()
      } else error(res.error || 'Fail')
   } catch(e) { error('系统错误') }
   finally { submitting.value = false }
}
</script>

<style scoped>
.sheet-mask {
    position: fixed; inset: 0; z-index: 2000;
    background: rgba(0,0,0,0.6); backdrop-filter: blur(4px);
    display: flex; flex-direction: column; justify-content: flex-end;
}
.sheet-panel-glass {
    /* Aurora styles handled globally by .aurora-sheet-panel */
    /* Positioning override if needed, but flex-end works with mask */
    width: 100%;
    /* Override padding for footer */
    padding-bottom: 0; 
    max-height: 90vh; display: flex; flex-direction: column;
}
.sheet-header {
    padding: 12px 16px; border-bottom: 1px solid rgba(255,255,255,0.05);
    display: flex; justify-content: space-between; align-items: center;
}
.title { color: #fff; font-weight: 700; font-size: 15px; }
.close-btn { font-size: 20px; color: #94A3B8; padding: 4px; }

.sheet-body { padding: 16px; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 16px; }



.form-group label { display: block; font-size: 12px; color: #CBD5E1; margin-bottom: 6px; font-weight: 500; }
.req { color: #EF4444; }

/* .input-glass handled by global .aurora-input */
.input-glass:focus { /* */ }
.area { resize: none; height: 120px; }

.priority-row { display: flex; gap: 8px; }
.p-chip-glass {
    flex: 1; text-align: center; padding: 12px; border-radius: 12px; font-size: 14px; font-weight: 500;
    background: rgba(255,255,255,0.03); color: #94A3B8; border: 1px solid transparent;
    transition: all 0.2s;
    /* Similar to aurora-option-card but smaller */
}
.p-chip-glass.active.low { background: rgba(16, 185, 129, 0.15); color: #34D399; border-color: rgba(16, 185, 129, 0.3); box-shadow: 0 0 10px rgba(16,185,129,0.1); }
.p-chip-glass.active.medium { background: rgba(245, 158, 11, 0.15); color: #FBBF24; border-color: rgba(245, 158, 11, 0.3); box-shadow: 0 0 10px rgba(245,158,11,0.1); }
.p-chip-glass.active.high { background: rgba(239, 68, 68, 0.15); color: #F87171; border-color: rgba(239, 68, 68, 0.3); box-shadow: 0 0 10px rgba(239,68,68,0.1); }

.upload-row { display: flex; gap: 10px; }
.add-btn-glass {
    width: 64px; height: 64px; border: 1px dashed rgba(255,255,255,0.2);
    display: flex; align-items: center; justify-content: center; color: #64748B; border-radius: 12px;
    background: rgba(255,255,255,0.02);
}
.add-btn-glass:active { background: rgba(255,255,255,0.05); }
.img-preview { width: 64px; height: 64px; position: relative; border-radius: 12px; overflow: hidden; border: 1px solid rgba(255,255,255,0.1); }
.img-preview img { width: 100%; height: 100%; object-fit: cover; }
.del-btn { position: absolute; top:0; right:0; background: rgba(0,0,0,0.6); color: #fff; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; font-size: 14px; }

.sheet-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.05); }
.submit-btn-glow {
   /* Legacy */
}
.submit-btn-glow:disabled { opacity: 0.5; box-shadow: none; filter: grayscale(1); }

.loading-spin { animation: spin 1s linear infinite; display: inline-block; }
@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
</style>
