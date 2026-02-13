<template>
  <div class="faq-page force-light">
    <!-- 顶部导航 -->

    <div class="page-content">
      <div class="content-container">
        <div class="header-section">
          <h1 class="main-title">常见问题</h1>
        </div>
        
        <div class="search-section">
          <h3 class="search-title">有问题？快速搜索解答</h3>
          <div class="search-box">
            <input 
              v-model="searchQuery" 
              type="text" 
              placeholder="输入您的问题关键词..." 
              class="search-input"
              @keyup.enter="handleSearch"
            />
            <button @click="handleSearch" class="search-btn">搜索</button>
          </div>
        </div>

        <div class="category-section">
          <button 
            v-for="category in categoryList" 
            :key="category.id"
            :class="['category-btn', { active: activeCategoryId === category.id }]"
            @click="setActiveCategory(category.id)"
          >
            {{ category.name }}
          </button>
        </div>

        <!-- 问题列表板块 -->
        <div class="faq-list-section">
          <div v-if="loading" class="loading-state">加载中...</div>
          <div v-else-if="filteredFaqs.length === 0" class="empty-state">暂无相关问题</div>
          <div v-else class="faq-card-list">
            <!-- Extract: FaqAccordionItem -->
            <FaqAccordionItem 
              v-for="faq in filteredFaqs" 
              :key="faq.id"
              :id="`faq-${faq.id}`"
              :question="faq.question"
              :answer="faq.answer"
              :is-expanded="expandedId === faq.id"
              @toggle="toggleFaq(faq.id)"
            />
          </div>
        </div>

        <!-- Extract: SupportContactCard -->
        <SupportContactCard />
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'pc'
})

import { ref, computed, onMounted } from 'vue'
import { supabaseFaqApi } from '@/api/client/supabase'
import FaqAccordionItem from '@/components/pc/faq/FaqAccordionItem.vue'
import SupportContactCard from '@/components/pc/support/SupportContactCard.vue'

useHead({
  title: '常见问题 - 凡图拉',
  meta: [
    { name: 'description', content: '凡图拉常见问题解答，帮助您快速了解平台使用方法和相关政策。' },
    { name: 'keywords', content: '凡图拉,常见问题,FAQ,帮助,客服,使用指南' }
  ]
})

const searchQuery = ref('')
const activeCategoryId = ref('all')
const expandedId = ref<string | null>(null)
const loading = ref(true)

const categories = ref<{id: string, name: string}[]>([])
const faqs = ref<any[]>([])

const categoryList = computed(() => [
  { id: 'all', name: '全部问题' },
  ...categories.value
])

// 获取FAQ数据
const fetchFaqs = async () => {
  loading.value = true
  try {
    // 并行获取分类和所有FAQ
    const [catRes, faqRes] = await Promise.all([
      supabaseFaqApi.getCategories(),
      supabaseFaqApi.getFaqs()
    ])

    if (catRes.success) {
      categories.value = catRes.categories
    }
    
    if (faqRes.success) {
      faqs.value = faqRes.faqs
    }
  } catch (e) {
    console.error('Failed to fetch FAQs', e)
  } finally {
    loading.value = false
  }
}

const filteredFaqs = computed(() => {
  let result = faqs.value || []
  
  // Category Filter
  if (activeCategoryId.value !== 'all') {
    result = result.filter(faq => faq.category_id === activeCategoryId.value)
  }
  
  // Search Filter
  if (searchQuery.value.trim()) {
    const q = searchQuery.value.toLowerCase()
    result = result.filter(faq => 
      faq.question.toLowerCase().includes(q) ||
      (faq.answer && faq.answer.toLowerCase().includes(q))
    )
  }
  
  return result
})

const handleSearch = () => {
  // 搜索逻辑已通过 computed 实现，此处可扩张统计或埋点
}

const setActiveCategory = (id: string) => { 
  activeCategoryId.value = id
  // 重置展开状态
  expandedId.value = null
}

const toggleFaq = (id: string) => {
  if (expandedId.value === id) {
    expandedId.value = null
  } else {
    expandedId.value = id
  }
}

onMounted(async () => {
  await fetchFaqs()
    
  // Check URL query for specific question to expanded
  const route = useRoute()
  const qId = route.query.q as string
  if (qId && faqs.value.length > 0) {
      const targetFaq = faqs.value.find(f => f.id === qId)
      if (targetFaq) {
        // If the faq has a category, switch to it (optional, 'all' works too but this is nicer)
        if (targetFaq.category_id) {
            activeCategoryId.value = targetFaq.category_id
        }
        // Expand the item
        expandedId.value = qId
        
        // Scroll to item after a short delay for DOM update
        setTimeout(() => {
            const el = document.getElementById(`faq-${qId}`)
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' })
            }
        }, 100)
      }
  }
})
</script>

<style scoped>
/* Dark Aurora Theme Styles */
.faq-page {
  min-height: 100vh;
  /* Transparent background to reveal global particle sky */
  background-color: transparent; 
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: flex-start;
  align-items: flex-start;
  padding: 20px 20px; /* Reduced top padding */
}

/* Glassmorphism Container */
.content-container {
  width: 100%;
  max-width: 900px;
  background: rgba(30, 41, 59, 0.7); /* Dark Slate Glass */
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  padding: 60px 40px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  margin: 0 auto;
}

.header-section {
  text-align: center;
  margin-bottom: 50px;
}

.main-title {
  font-family: 'Outfit', sans-serif;
  font-weight: 700;
  font-size: 42px;
  /* Blue-Orange Gradient Text */
  background: linear-gradient(135deg, var(--color-brand-highlight) 0%, var(--color-accent) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 10px;
  letter-spacing: 1px;
  text-shadow: 0 4px 12px rgba(96, 165, 250, 0.3);
}

/* Search Section - Dark Glass */
.search-section {
  background: rgba(15, 23, 42, 0.6);
  padding: 30px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  margin-bottom: 30px;
  text-align: center;
}

.search-title {
  font-weight: 600;
  font-size: 20px;
  color: #E2E8F0; /* Slate-200 */
  margin-bottom: 20px;
}

.search-box {
  display: flex;
  max-width: 600px;
  margin: 0 auto;
  gap: 0;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
  border-radius: 50px;
}

.search-input {
  flex: 1;
  padding: 14px 24px;
  border: 1px solid rgba(255, 255, 255, 0.1) !important;
  background-color: rgba(30, 41, 59, 0.8) !important;
  color: white !important;
  border-right: none !important;
  border-radius: 25px 0 0 25px;
  font-size: 16px;
  outline: none;
  transition: all 0.3s ease;
}

.search-input::placeholder {
  color: #64748B; /* Slate-500 */
}

.search-input:focus {
  border-color: #60A5FA !important;
  background-color: rgba(30, 41, 59, 1) !important;
}

.search-btn {
  padding: 12px 30px;
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%) !important; /* Global Blue */
  color: white !important;
  border: none;
  border-radius: 0 25px 25px 0;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
}

.search-btn:hover {
  filter: brightness(1.1);
  box-shadow: 0 0 15px rgba(96, 165, 250, 0.4);
}

/* Categories - Dark Glass Pills */
.category-section {
  display: flex;
  justify-content: center;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.category-btn {
  padding: 8px 20px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(30, 41, 59, 0.6) !important;
  color: #94A3B8 !important; /* Slate-400 */
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(5px);
}

.category-btn:hover {
  border-color: #60A5FA;
  color: white !important;
  background: rgba(59, 130, 246, 0.2) !important;
}

.category-btn.active {
  background: linear-gradient(135deg, #60A5FA 0%, #3B82F6 100%) !important;
  border-color: transparent !important;
  color: white !important;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

/* FAQ List - Card Style Redesign */
.faq-list-section {
  background: transparent !important; /* Remove container bg */
  padding: 0;
  border: none;
  margin-bottom: 60px;
}

.faq-card-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
