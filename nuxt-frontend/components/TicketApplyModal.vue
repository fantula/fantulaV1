<template>
  <div class="modal-mask">
    <div class="ticket-apply-modal">
      <div class="modal-header">
        <div class="modal-title">申请工单</div>
        <div class="modal-subtitle">工单创建后我们将尽快回复，您可以随时在"我的工单"中查看进度</div>
        <button class="modal-close" @click="$emit('close')">×</button>
      </div>
      <div class="modal-body">
         <!-- Order Info Preview -->
         <div class="order-context" v-if="orderInfo">
            <div class="context-label">关联订单</div>
            <div class="context-value">
              <span class="order-no">#{{ orderInfo.order_no }}</span>
              <span class="product-name">{{ orderInfo.product_name }}</span>
            </div>
         </div>

         <!-- Type/Title -->
         <div class="form-group">
            <label>问题标题 <span class="required">*</span></label>
            <input v-model="form.title" class="form-input" placeholder="请简要描述您遇到的问题" />
         </div>

         <!-- Priority -->
         <div class="form-group">
            <label>优先级</label>
            <div class="priority-options">
               <div 
                 v-for="p in priorities" :key="p.value" 
                 class="p-opt" 
                 :class="{ active: form.priority === p.value, [p.value]: true }"
                 @click="form.priority = p.value"
               >
                 {{ p.label }}
               </div>
            </div>
         </div>

         <!-- Description -->
         <div class="form-group">
            <label>详细描述 <span class="required">*</span></label>
            <textarea v-model="form.content" class="form-textarea" rows="5" placeholder="请详细描述问题细节..."></textarea>
         </div>

         <!-- Image Upload -->
         <div class="form-group">
            <label>截图凭证 (可选)</label>
            <div class="upload-area">
               <!-- Image List -->
               <div class="img-preview" v-for="(url, idx) in form.attachments" :key="idx">
                  <img :src="url" />
                  <div class="remove-btn" @click="removeImage(idx)">×</div>
               </div>

               <!-- Upload Button -->
               <div class="upload-btn" v-if="form.attachments.length < 3" @click="triggerUpload">
                  <span v-if="uploading">...</span>
                  <span v-else>+</span>
               </div>
               <input type="file" ref="fileInput" hidden accept="image/*" @change="handleFileChange" />
            </div>
            <div class="tip">最多上传 3 张图片</div>
         </div>
      </div>
      
      <div class="modal-footer">
        <button class="btn-cancel" @click="$emit('close')">取消</button>
        <button class="btn-confirm" @click="submit" :disabled="submitting || !isValid">
           {{ submitting ? '提交中...' : '提交工单' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { ticketApi } from '@/api/client/ticket'
import { getSupabaseClient } from '@/utils/supabase'

const props = defineProps({
  orderId: { type: String, required: true },
  orderInfo: { type: Object, default: () => ({}) } // { order_no: '', product_name: '' }
})

const emit = defineEmits(['close', 'success'])

const form = reactive({
  title: '',
  priority: 'medium',
  content: '',
  attachments: [] as string[]
})

const priorities = [
  { label: '一般', value: 'low' },
  { label: '重要', value: 'medium' },
  { label: '紧急', value: 'high' }
]

const submitting = ref(false)
const uploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

const isValid = computed(() => {
  return form.title.trim() && form.content.trim()
})

const triggerUpload = () => {
   fileInput.value?.click()
}

const handleFileChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files || files.length === 0) return

  const file = files[0]
  if (file.size > 5 * 1024 * 1024) {
    alert('图片大小不能超过 5MB')
    return
  }

  try {
    uploading.value = true
    const client = getSupabaseClient()
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(7)}.${file.name.split('.').pop()}`
    const { data, error } = await client.storage
       .from('tickets')
       .upload(`${props.orderId}/${fileName}`, file)

    if (error) throw error
    
    // Get Public URL
    const { data: { publicUrl } } = client.storage.from('tickets').getPublicUrl(data.path)
    form.attachments.push(publicUrl)

  } catch (err: any) {
    console.error(err)
    alert('上传失败: ' + err.message)
  } finally {
    uploading.value = false
    // Reset input
    if (fileInput.value) fileInput.value.value = ''
  }
}

const removeImage = (idx: number) => {
  form.attachments.splice(idx, 1)
}

const submit = async () => {
  if (!isValid.value) return
  submitting.value = true
  try {
     const res = await ticketApi.create(
        props.orderId,
        form.title,
        form.content,
        form.priority,
        form.attachments
     )
     if (res.success) {
        emit('success')
        emit('close')
     } else {
        alert(res.error || '提交失败')
     }
  } catch (e) {
     alert('系统错误')
  } finally {
     submitting.value = false
  }
}
</script>

<style scoped>
.modal-mask {
  position: fixed; z-index: 2000; left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.4);
  display: flex; align-items: center; justify-content: center;
}
.ticket-apply-modal {
  width: 600px; background: #fff; border-radius: 12px;
  display: flex; flex-direction: column; overflow: hidden;
  box-shadow: 0 10px 40px rgba(0,0,0,0.2);
}
.modal-header {
  padding: 20px 24px; border-bottom: 1px solid #eee; position: relative;
  background: #fafafa;
}
.modal-title { font-size: 18px; font-weight: 700; color: #333; }
.modal-subtitle { font-size: 13px; color: #888; margin-top: 4px; }
.modal-close {
  position: absolute; right: 20px; top: 20px; border: none; background: none;
  font-size: 24px; color: #999; cursor: pointer;
}
.modal-body { padding: 24px; display: flex; flex-direction: column; gap: 16px; }

.order-context {
  background: #f0f7ff; padding: 12px; border-radius: 8px; border: 1px solid #bae0ff;
  display: flex; gap: 10px; align-items: center;
}
.context-label { font-size: 13px; color: #666; }
.context-value { font-weight: 600; color: #1890ff; display: flex; gap: 10px; }
.order-no { font-family: monospace; }
.product-name { color: #333; }

.form-group label { display: block; font-size: 14px; font-weight: 500; margin-bottom: 8px; color: #444; }
.required { color: red; }
.form-input, .form-textarea {
  width: 100%; border: 1px solid #ddd; border-radius: 6px; padding: 10px;
  font-size: 14px; outline: none; transition: border 0.2s;
}
.form-input:focus, .form-textarea:focus { border-color: #1890ff; }

.priority-options { display: flex; gap: 10px; }
.p-opt {
  padding: 6px 16px; border-radius: 20px; border: 1px solid #eee; cursor: pointer; font-size: 13px;
  transition: all 0.2s;
}
.p-opt.active { font-weight: 600; border-color: transparent; color: #fff; }
.p-opt.low.active { background: #52c41a; }
.p-opt.medium.active { background: #faad14; }
.p-opt.high.active { background: #f5222d; }

.upload-area { display: flex; gap: 10px; flex-wrap: wrap; }
.upload-btn {
  width: 80px; height: 80px; border: 1px dashed #ddd; border-radius: 8px;
  display: flex; align-items: center; justify-content: center; cursor: pointer; color: #999;
}
.upload-btn:hover { border-color: #1890ff; color: #1890ff; }
.img-preview {
  width: 80px; height: 80px; border-radius: 8px; overflow: hidden; position: relative;
  border: 1px solid #eee;
}
.img-preview img { width: 100%; height: 100%; object-fit: cover; }
.remove-btn {
  position: absolute; top: 0; right: 0; background: rgba(0,0,0,0.5); color: #fff;
  width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 14px;
}
.tip { font-size: 12px; color: #999; margin-top: 6px; }

.modal-footer {
  padding: 16px 24px; border-top: 1px solid #eee; display: flex; justify-content: flex-end; gap: 12px;
}
.btn-cancel {
  padding: 8px 24px; border: 1px solid #ddd; background: #fff; border-radius: 6px; cursor: pointer;
}
.btn-confirm {
  padding: 8px 24px; border: none; background: #1890ff; color: #fff; border-radius: 6px; cursor: pointer;
  font-weight: 500;
}
.btn-confirm:disabled { background: #a0cfff; cursor: not-allowed; }
</style> 