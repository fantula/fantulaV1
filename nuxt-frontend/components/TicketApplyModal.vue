<template>
  <BaseFormModal
    :visible="true"
    title="申请工单"
    subtitle="我们将尽快处理您的问题，您可以在工单列表查看进度"
    submit-text="提交工单"
    :loading="submitting"
    :submit-disabled="!isValid"
    show-mascot
    @close="$emit('close')"
    @cancel="$emit('close')"
    @submit="submit"
  >
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
  </BaseFormModal>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue'
import { ticketApi } from '@/api/client/ticket'
import { getSupabaseClient } from '@/utils/supabase'
import BaseFormModal from '@/components/modal/base/BaseFormModal.vue'

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
.modal-body { display: flex; flex-direction: column; gap: 20px; }

.order-context {
  background: rgba(255,255,255,0.03); 
  padding: 12px 16px; border-radius: 8px; border: 1px solid rgba(255,255,255,0.05);
  display: flex; gap: 10px; align-items: center;
}
.context-label { font-size: 13px; color: #94A3B8; }
.context-value { font-weight: 600; color: #3B82F6; display: flex; gap: 10px; }
.order-no { font-family: monospace; color: #E2E8F0; }
.product-name { color: #E2E8F0; }

.form-group label { display: block; font-size: 14px; font-weight: 500; margin-bottom: 8px; color: #F1F5F9; }
.required { color: #EF4444; }

.form-input, .form-textarea {
  width: 100%; 
  background: rgba(0,0,0,0.3);
  border: 1px solid rgba(255,255,255,0.1); 
  border-radius: 8px; padding: 12px;
  font-size: 14px; outline: none; transition: all 0.2s;
  color: #F1F5F9;
}
.form-input:focus, .form-textarea:focus { 
  border-color: #3B82F6; 
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.2);
  background: rgba(0,0,0,0.4);
}
.form-input::placeholder, .form-textarea::placeholder {
  color: #64748B;
}

.priority-options { display: flex; gap: 10px; }
.p-opt {
  padding: 10px 24px; border-radius: 12px; 
  border: 1px solid rgba(255,255,255,0.1); 
  background: rgba(255,255,255,0.03);
  cursor: pointer; font-size: 13px; color: #94A3B8; font-weight: 500;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative; overflow: hidden;
}
.p-opt:hover { background: rgba(255,255,255,0.08); border-color: rgba(255,255,255,0.2); }

.p-opt.active { 
  font-weight: 600; 
  color: #fff; 
  transform: translateY(-1px); 
  border-color: transparent;
}

/* Glass Gradients for Active States */
.p-opt.low.active { 
  background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(6, 95, 70, 0.4));
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.2), inset 0 0 0 1px rgba(16, 185, 129, 0.4);
}
.p-opt.medium.active { 
  background: linear-gradient(135deg, rgba(245, 158, 11, 0.2), rgba(180, 83, 9, 0.4));
  box-shadow: 0 4px 12px rgba(245, 158, 11, 0.2), inset 0 0 0 1px rgba(245, 158, 11, 0.4);
}
.p-opt.high.active { 
  background: linear-gradient(135deg, rgba(239, 68, 68, 0.2), rgba(153, 27, 27, 0.4)); 
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.2), inset 0 0 0 1px rgba(239, 68, 68, 0.4);
}

.upload-area { display: flex; gap: 10px; flex-wrap: wrap; }
.upload-btn {
  width: 80px; height: 80px; 
  border: 1px dashed rgba(255,255,255,0.2); 
  border-radius: 8px;
  display: flex; align-items: center; justify-content: center; 
  cursor: pointer; color: #94A3B8;
  transition: all 0.2s;
}
.upload-btn:hover { border-color: #3B82F6; color: #3B82F6; background: rgba(59, 130, 246, 0.05); }

.img-preview {
  width: 80px; height: 80px; border-radius: 8px; overflow: hidden; position: relative;
  border: 1px solid rgba(255,255,255,0.1);
}
.img-preview img { width: 100%; height: 100%; object-fit: cover; }
.remove-btn {
  position: absolute; top: 0; right: 0; background: rgba(0,0,0,0.6); color: #fff;
  width: 20px; height: 20px; display: flex; align-items: center; justify-content: center;
  cursor: pointer; font-size: 14px;
}
.remove-btn:hover { background: #EF4444; }
.tip { font-size: 12px; color: #64748B; margin-top: 6px; }
</style> 