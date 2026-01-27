<template>
  <div class="mobile-help-page">
    <div class="help-header">
       <h1>帮助中心</h1>
       <p>常见问题与服务支持</p>
    </div>

    <!-- Search (Visual Only for now) -->
    <div class="search-box">
       <el-icon><Search /></el-icon>
       <input type="text" placeholder="搜索问题..." v-model="searchQuery" />
    </div>

    <!-- FAQ List -->
    <div class="faq-list">
       <div v-if="loading" class="loading-state">
          <el-icon class="is-loading"><Loading /></el-icon> 加载中...
       </div>
       <div v-else-if="filteredFaqs.length === 0" class="empty-state">
          无相关问题
       </div>
       <div 
          v-else 
          v-for="(faq, index) in filteredFaqs" 
          :key="faq.id || index" 
          class="faq-item"
          :class="{ active: activeIndex === index }"
          @click="toggle(index)"
       >
          <div class="faq-head">
             <span class="q-icon">Q</span>
             <span class="q-text">{{ faq.question }}</span>
             <el-icon class="arrow" :class="{ rotate: activeIndex === index }"><ArrowDown /></el-icon>
          </div>
          <div class="faq-body" v-show="activeIndex === index">
             <div class="a-content">{{ faq.answer }}</div>
          </div>
       </div>
    </div>

    <!-- Contact Btn -->
    <div class="contact-area">
       <button class="contact-btn" @click="handleContact">
          <el-icon><Service /></el-icon> 联系人工客服
       </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, ArrowDown, Loading, Service } from '@element-plus/icons-vue'
import { supabaseFaqApi } from '@/api/client/supabase'

definePageMeta({
  layout: 'mobile'
})

const loading = ref(false)
const faqs = ref<any[]>([])
const activeIndex = ref<number | null>(null)
const searchQuery = ref('')

const filteredFaqs = computed(() => {
   if (!searchQuery.value) return faqs.value
   return faqs.value.filter((f: any) => f.question.includes(searchQuery.value) || f.answer.includes(searchQuery.value))
})

const toggle = (idx: number) => {
   activeIndex.value = activeIndex.value === idx ? null : idx
}

const handleContact = () => {
   ElMessage.success('正在连接人工客服...')
}

const fetchFaqs = async () => {
   loading.value = true
   try {
      const res = await supabaseFaqApi.getFaqs()
      if (res.success) {
         faqs.value = res.faqs || []
      }
   } catch(e) {
      console.error(e)
   } finally {
      loading.value = false
   }
}

onMounted(() => {
   fetchFaqs()
})
</script>

<style scoped>
.mobile-help-page {
  min-height: 100vh;
  padding: 20px 16px 100px;
  background: #0F172A;
  color: #fff;
}

.help-header h1 { font-size: 28px; font-weight: 700; margin-bottom: 4px; background: linear-gradient(90deg, #fff, #94A3B8); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.help-header p { color: #64748B; font-size: 14px; margin-bottom: 24px; }

.search-box {
  background: rgba(255,255,255,0.05);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 12px;
  padding: 12px;
  display: flex; align-items: center; gap: 10px;
  margin-bottom: 24px;
}
.search-box .el-icon { color: #64748B; font-size: 18px; }
.search-box input {
  background: transparent; border: none; outline: none; color: #fff; font-size: 14px; width: 100%;
}

.faq-list { display: flex; flex-direction: column; gap: 12px; }

.faq-item {
  background: rgba(30, 41, 59, 0.5);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s;
}
.faq-item.active {
  background: rgba(30, 41, 59, 1);
  border-color: rgba(59, 130, 246, 0.3);
}

.faq-head {
  padding: 16px;
  display: flex; align-items: flex-start; gap: 10px; cursor: pointer;
}
.q-icon {
  background: linear-gradient(135deg, #3B82F6, #2563EB);
  color: #fff; width: 20px; height: 20px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 700; flex-shrink: 0; margin-top: 2px;
}
.q-text { flex: 1; font-size: 14px; font-weight: 500; line-height: 1.5; }
.arrow { color: #64748B; transition: transform 0.3s; margin-top: 4px; }
.arrow.rotate { transform: rotate(180deg); color: #3B82F6; }

.faq-body {
  padding: 0 16px 16px 46px;
  color: #94A3B8; font-size: 13px; line-height: 1.6;
  border-top: 1px solid rgba(255,255,255,0.02);
  margin-top: -8px; padding-top: 12px;
}

.contact-area {
   margin-top: 40px; display: flex; justify-content: center;
}
.contact-btn {
   background: linear-gradient(90deg, #F97316, #EA580C);
   border: none; border-radius: 20px;
   padding: 12px 32px;
   color: #fff; font-weight: 600; font-size: 14px;
   display: flex; align-items: center; gap: 8px;
   box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}
</style>
