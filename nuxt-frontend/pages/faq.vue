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

        <!-- 常见问题解答标题板块 (已删除) -->


        <!-- 问题列表板块 -->
        <div class="faq-list-section">
          <div v-if="loading" class="loading-state">加载中...</div>
          <div v-else-if="filteredFaqs.length === 0" class="empty-state">暂无相关问题</div>
          <div v-else class="faq-card-list">
            <div 
              v-for="(faq, index) in filteredFaqs" 
              :key="faq.id"
              :class="['faq-card', { active: expandedId === faq.id }]"
              @click="toggleFaq(faq.id)"
            >
              <div class="faq-card-header">
                <div class="q-badge">Q</div>
                <div class="faq-question-text">{{ faq.question }}</div>
                <div class="toggle-icon">
                  <el-icon><Plus /></el-icon>
                </div>
              </div>
              
              <div class="faq-card-body-grid" :class="{ 'is-expanded': expandedId === faq.id }">
                <div class="min-h-0-wrapper">
                  <div class="answer-wrapper">
                    <div class="a-badge">A</div>
                    <div class="faq-answer-text">{{ faq.answer }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="contact-section">
          <h3 class="contact-title">没有找到您的问题？</h3>
          <p class="contact-desc">我们的客服团队随时为您提供帮助，平均响应时间不超过3分钟，解决率高达99.8%!</p>
          <button class="contact-btn">
            <span class="contact-icon">
              <img src="/images/client/pc/kefu.png" alt="客服" />
            </span>
            联系在线客服
          </button>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { InfoFilled, Right, Plus } from '@element-plus/icons-vue'
import { supabaseFaqApi } from '@/api/supabase'

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
            const el = document.getElementById(`faq-${qId}`) // We need to add ID to the element
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
  background: linear-gradient(135deg, #60A5FA 0%, #F97316 100%);
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

/* FAQ Header Section */
.faq-header-section {
  background: rgba(59, 130, 246, 0.1) !important;
  padding: 20px 30px;
  border-radius: 16px 16px 0 0;
  margin-bottom: 0;
  display: flex;
  justify-content: flex-start;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-bottom: none;
}

.faq-header {
  display: flex;
  align-items: center;
  gap: 12px;
}

.faq-icon img {
  width: 24px;
  height: 24px;
  display: block;
  filter: drop-shadow(0 0 5px rgba(96, 165, 250, 0.5));
}

.faq-title {
  font-weight: 600;
  font-size: 18px;
  color: #60A5FA !important; /* Blue-400 */
  margin: 0;
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

.faq-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
}

.faq-card:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(96, 165, 250, 0.3); /* Blue hint */
  transform: translateY(-2px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
}

.faq-card.active {
  background: rgba(30, 41, 59, 0.8);
  border-color: rgba(96, 165, 250, 0.5);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.3);
}

/* Card Header */
.faq-card-header {
  padding: 24px;
  display: flex;
  align-items: center;
  gap: 16px;
}

.q-badge {
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border-radius: 8px;
  background: rgba(96, 165, 250, 0.1);
  color: #60A5FA;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-family: 'Outfit', sans-serif;
  font-size: 16px;
}

.faq-question-text {
  flex: 1; /* Keep flex: 1 but control width via max-width? No, remove flex: 1 if we want strict width, OR keep it and separate via margin-left auto on icon */
  /* Actually, to support "narrow text" but "icon on far right": 
     Text should take available space but STOP at 50%. 
     Icon should stay at end. 
     Solution: Text max-width 50%, Icon margin-left auto. */
  flex: 0 1 auto; /* Don't grow indefinitely, but allow shrink */
  font-size: 17px;
  font-weight: 600;
  color: #F1F5F9;
  letter-spacing: 0.2px;
  max-width: 50%; /* 继续收窄至 50% */
  line-height: 1.5;
}

.toggle-icon {
  margin-left: auto; /* Push to far right */
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94A3B8;
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s;
}

.faq-card.active .toggle-icon {
  transform: rotate(135deg); /* Rotate Plus to X */
  color: #F97316; /* Orange active */
}

/* Card Body (Answer) */
/* Card Body (Answer) - Grid Animation Trick */
.faq-card-body-grid {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.faq-card-body-grid.is-expanded {
  grid-template-rows: 1fr;
}

.min-h-0-wrapper {
  overflow: hidden;
  min-height: 0;
}

.answer-wrapper {
  padding: 0 24px 24px 72px; /* Indent to align with text */
  display: flex;
  gap: 16px;
  opacity: 0.9;
}

.a-badge {
  display: none; /* Hidden for cleaner look, or enable if wanted */
}

.faq-answer-text {
  font-size: 15px;
  line-height: 1.8;
  color: #94A3B8;
  /* Width constraint as requested (narrower) */
  max-width: 75%; 
}

/* Override previous styles */
/* Override previous styles */
.faq-question, .faq-answer { display: none; }

.contact-section {
  background: rgba(15, 23, 42, 0.6) !important; /* Darker Glass */
  padding: 40px;
  border-radius: 20px;
  box-shadow: none;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.08);
}

.contact-title {
  font-weight: 600;
  font-size: 24px;
  color: white !important;
  margin-bottom: 15px;
}

.contact-desc {
  font-size: 16px;
  color: #94A3B8 !important;
  margin-bottom: 30px;
  line-height: 1.6;
}

.contact-btn {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: linear-gradient(135deg, #F97316 0%, #FB923C 100%) !important; /* Orange Gradient for Support */
  color: white !important;
  border: none;
  border-radius: 30px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 4px 15px rgba(249, 115, 22, 0.3);
}

.contact-btn:hover {
  filter: brightness(1.1);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(249, 115, 22, 0.4);
}

.contact-icon img {
  width: 20px;
  height: 20px;
  display: block;
  filter: brightness(100); /* Make icon white */
}
</style>
