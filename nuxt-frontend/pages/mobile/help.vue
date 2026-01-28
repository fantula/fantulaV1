<template>
  <div class="mobile-help-page">
    <div class="help-header">
       <h1>帮助中心</h1>
       <p>常见问题与服务支持</p>
    </div>

    <!-- Search Box -->
    <div class="search-container">
        <div class="search-box">
            <el-icon><Search /></el-icon>
            <input type="text" placeholder="搜索问题关键词..." v-model="searchQuery" />
        </div>
    </div>

    <!-- Category Filter (Horizontal Scroll) -->
    <div class="category-scroll" v-if="categories.length > 0">
        <div 
            class="cat-pill" 
            :class="{ active: activeCategoryId === 'all' }"
            @click="activeCategoryId = 'all'"
        >
            全部
        </div>
        <div 
            v-for="cat in categories" 
            :key="cat.id" 
            class="cat-pill"
            :class="{ active: activeCategoryId === cat.id }"
            @click="activeCategoryId = cat.id"
        >
            {{ cat.name }}
        </div>
    </div>

    <!-- FAQ List -->
    <div class="faq-section">
       <div v-if="loading" class="loading-state">
          <div class="spinner"></div> 加载中...
       </div>
       <div v-else-if="filteredFaqs.length === 0" class="empty-state">
          <p>暂无相关问题</p>
       </div>
       <div 
          v-else 
          v-for="(faq, index) in filteredFaqs" 
          :key="faq.id" 
          :id="`faq-${faq.id}`"
          class="faq-card"
          :class="{ active: expandedId === faq.id }"
          @click="toggle(faq.id)"
       >
          <div class="faq-head">
             <div class="q-badge">Q</div>
             <span class="q-text">{{ faq.question }}</span>
             <div class="toggle-icon">
                <el-icon><Plus /></el-icon>
             </div>
          </div>
          <div class="faq-body-wrapper" :class="{ 'is-expanded': expandedId === faq.id }">
             <div class="faq-body-inner">
                <div class="a-content">{{ faq.answer }}</div>
             </div>
          </div>
       </div>
    </div>

    <!-- Contact Btn -->
    <div class="contact-area">
       <div class="contact-card">
           <h3>没找到答案？</h3>
           <p>我们的客服团队随时为您提供帮助</p>
           <button class="contact-btn" @click="handleContact">
              <el-icon><Service /></el-icon> 联系人工客服
           </button>
       </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { Search, Plus, Service } from '@element-plus/icons-vue'
import { supabaseFaqApi } from '@/api/client/supabase'
import { ElMessage } from 'element-plus'

definePageMeta({
  layout: 'mobile'
})

const route = useRoute()
const loading = ref(false)
const faqs = ref<any[]>([])
const categories = ref<any[]>([])
const activeCategoryId = ref('all')
const expandedId = ref<string | null>(null)
const searchQuery = ref('')

const filteredFaqs = computed(() => {
   let result = faqs.value
   
   // 1. Filter by Category
   if (activeCategoryId.value !== 'all') {
       result = result.filter(f => f.category_id === activeCategoryId.value)
   }

   // 2. Filter by Search
   if (searchQuery.value.trim()) {
       const q = searchQuery.value.toLowerCase()
       result = result.filter((f: any) => 
            f.question.toLowerCase().includes(q) || 
            (f.answer && f.answer.toLowerCase().includes(q))
       )
   }
   return result
})

const toggle = (id: string) => {
   expandedId.value = expandedId.value === id ? null : id
}

const handleContact = () => {
   ElMessage.success({ message: '正在连接人工客服...', offset: 100, customClass: 'mobile-message' })
}

const fetchData = async () => {
   loading.value = true
   try {
      const [catRes, faqRes] = await Promise.all([
          supabaseFaqApi.getCategories(),
          supabaseFaqApi.getFaqs()
      ])

      if (catRes.success) categories.value = catRes.categories || []
      if (faqRes.success) faqs.value = faqRes.faqs || []
      
      // Handle Auto Open from URL
      checkUrlQuery()

   } catch(e) {
      console.error(e)
      ElMessage.error('加载失败')
   } finally {
      loading.value = false
   }
}

const checkUrlQuery = () => {
    const qId = route.query.q as string
    if (qId && faqs.value.length > 0) {
        const target = faqs.value.find(f => f.id === qId)
        if (target) {
            if (target.category_id) activeCategoryId.value = target.category_id
            expandedId.value = qId
            setTimeout(() => {
                const el = document.getElementById(`faq-${qId}`)
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }, 300)
        }
    }
}

// Reset expanded when changing category manually (optional UX choice)
watch(activeCategoryId, () => {
    // expandedId.value = null 
})

onMounted(() => {
   fetchData()
})
</script>

<style scoped>
.mobile-help-page {
  min-height: 100vh;
  padding: 20px 16px 100px;
  background: #0F172A;
  color: #fff;
  display: flex; flex-direction: column;
}

.help-header { margin-bottom: 24px; padding-left: 4px; }
.help-header h1 { 
    font-size: 32px; font-weight: 800; margin-bottom: 6px; 
    background: linear-gradient(135deg, #60A5FA 0%, #F97316 100%); 
    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
    letter-spacing: -0.5px;
}
.help-header p { color: #94A3B8; font-size: 15px; }

/* Search */
.search-container { margin-bottom: 20px; }
.search-box {
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255,255,255,0.1);
  border-radius: 16px;
  padding: 14px 16px;
  display: flex; align-items: center; gap: 12px;
  transition: all 0.2s;
  backdrop-filter: blur(8px);
}
.search-box:focus-within {
    border-color: #38BDF8; background: rgba(30, 41, 59, 0.9);
}
.search-box .el-icon { color: #64748B; font-size: 20px; }
.search-box input {
  background: transparent; border: none; outline: none; color: #fff; font-size: 15px; width: 100%;
}
.search-box input::placeholder { color: #64748B; }

/* Category Scroll */
.category-scroll {
    display: flex; gap: 10px; overflow-x: auto; 
    padding-bottom: 4px; margin-bottom: 24px;
    scrollbar-width: none; /* Hide scrollbar */
}
.category-scroll::-webkit-scrollbar { display: none; }

.cat-pill {
    white-space: nowrap; padding: 8px 16px;
    background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px; color: #94A3B8; font-size: 13px; font-weight: 500;
    transition: all 0.2s;
}
.cat-pill.active {
    background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
    color: #fff; border-color: transparent;
    box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* FAQ List */
.faq-section { flex: 1; display: flex; flex-direction: column; gap: 12px; }

.loading-state, .empty-state { text-align: center; color: #64748B; padding: 40px 0; font-size: 14px; }
.spinner {
    width: 20px; height: 20px; border: 2px solid rgba(255,255,255,0.1); border-top-color: #fff; border-radius: 50%;
    display: inline-block; animation: spin 0.8s linear infinite; margin-right: 8px; vertical-align: middle;
}

.faq-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255,255,255,0.05);
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.2s;
}
.faq-card.active {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(59, 130, 246, 0.3);
}

.faq-head {
  padding: 16px; display: flex; align-items: flex-start; gap: 12px; cursor: pointer;
}
.q-badge {
    width: 24px; height: 24px; background: rgba(59, 130, 246, 0.15); 
    color: #60A5FA; border-radius: 6px; 
    display: flex; align-items: center; justify-content: center;
    font-size: 13px; font-weight: 800; flex-shrink: 0; margin-top: 1px;
}
.q-text { flex: 1; font-size: 15px; font-weight: 600; line-height: 1.5; color: #E2E8F0; }

.toggle-icon { 
    color: #64748B; transition: transform 0.3s; margin-top: 2px;
}
.faq-card.active .toggle-icon { transform: rotate(45deg); color: #F97316; }

/* Grid Animation for Height */
.faq-body-wrapper {
    display: grid; grid-template-rows: 0fr; transition: grid-template-rows 0.3s ease-out;
}
.faq-body-wrapper.is-expanded { grid-template-rows: 1fr; }
.faq-body-inner { overflow: hidden; }

.a-content {
  padding: 0 20px 20px 52px; /* Align with text */
  color: #94A3B8; font-size: 14px; line-height: 1.6;
}

/* Contact Area */
.contact-area { margin-top: 40px; }
.contact-card {
    background: rgba(15, 23, 42, 0.6); border: 1px solid rgba(255,255,255,0.05);
    border-radius: 20px; padding: 24px; text-align: center;
}
.contact-card h3 { font-size: 18px; color: #fff; margin-bottom: 6px; }
.contact-card p { font-size: 13px; color: #64748B; margin-bottom: 20px; }

.contact-btn {
   background: linear-gradient(135deg, #F97316 0%, #EA580C 100%);
   border: none; border-radius: 12px;
   width: 100%; height: 48px;
   color: #fff; font-weight: 700; font-size: 15px;
   display: flex; align-items: center; justify-content: center; gap: 8px;
   box-shadow: 0 8px 20px rgba(249, 115, 22, 0.3);
}
.contact-btn:active { transform: scale(0.98); }

@keyframes spin { to { transform: rotate(360deg); } }
</style>
