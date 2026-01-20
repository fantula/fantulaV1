<template>
  <div class="community-page">
    <div class="page-content">
      <!-- 顶部：分类标签导航 -->
      <div class="category-tags">
        <button 
          v-for="tag in categoryTags" 
          :key="tag.key"
          :class="['tag-btn', { active: activeTag === tag.key }]"
          :style="activeTag === tag.key ? { '--active-color': tag.color } : {}"
          @click="setActiveTag(tag.key)"
        >
          <span class="tag-icon">{{ tag.icon }}</span>
          {{ tag.label }}
          <span v-if="activeTag === tag.key && activeTag !== 'all'" class="reset-hint">×</span>
        </button>
      </div>

      <!-- 文章网格区域 -->
      <div v-if="loading && articles.length === 0" class="loading-state">
        <el-icon class="is-loading"><Loading /></el-icon>
        <span>加载中...</span>
      </div>

      <div v-else-if="articles.length > 0" class="articles-grid">
        <div 
          v-for="article in articles" 
          :key="article.id"
          class="article-card"
          @click="viewArticle(article)"
        >
           <!-- 封面图容器 -->
          <div class="article-cover">
            <img :src="article.cover_image || '/images/default-cover.jpg'" :alt="article.title" loading="lazy" />
            
            <!-- 视频标识 -->
            <div v-if="article.video_url" class="video-badge">
              <el-icon><VideoPlay /></el-icon>
            </div>
            
            <!-- 分类标签 -->
            <div 
              class="card-category-tag"
              :style="{ borderColor: getCategoryColor(article.category), color: getCategoryColor(article.category), backgroundColor: 'rgba(0,0,0,0.6)' }"
            >
              {{ getCategoryLabel(article.category) }}
            </div>
          </div>

          <div class="article-content">
            <h3 class="article-title">{{ article.title }}</h3>
            <p class="article-desc">{{ article.description }}</p>
            
            <div class="article-footer">
              <div class="author-info">
                <img :src="article.author?.avatar || '/images/client/pc/service-avatar.png'" class="author-avatar" />
                <span class="author-name">{{ article.author?.name || '官方客服' }}</span>
              </div>
              <span class="article-date">{{ formatDate(article.created_at) }}</span>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="empty-state">
        <el-icon><Document /></el-icon>
        <p>暂时没有相关文章</p>
      </div>

      <!-- 加载更多 -->
      <div v-if="hasMore && !loading" class="load-more-section">
        <button class="load-more-btn" @click="loadMore">
          加载更多
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { Loading, VideoPlay, Document } from '@element-plus/icons-vue'
import { communityApi } from '@/api/community'
import type { Article, Category } from '@/api/community'

const router = useRouter()

// 状态
const loading = ref(false)
const articles = ref<Article[]>([])
const categories = ref<Category[]>([])
const activeTag = ref('all')
const page = ref(1)
const hasMore = ref(true)
const pageSize = 12

// 基础分类 tag (全部)
const baseTag = { key: 'all', label: '全部', icon: '💠', color: '#409EFF' }

// 动态计算分类标签列表
const categoryTags = computed(() => {
  const dynamicTags = categories.value.map(cat => ({
    key: cat.id,
    label: cat.name,
    icon: cat.icon || '📝',
    color: cat.color || '#409EFF'
  }))
  return [baseTag, ...dynamicTags]
})

const getCategoryLabel = (id: string) => {
  const cat = categories.value.find(c => c.id === id)
  return cat ? cat.name : '未分类'
}

const getCategoryColor = (id: string) => {
  const cat = categories.value.find(c => c.id === id)
  return cat ? cat.color : '#909399'
}

// 获取分类
const fetchCategories = async () => {
  try {
    const { success, data } = await communityApi.getCategories()
    if (success && data) {
      categories.value = data
    }
  } catch (e) {
    console.error('Failed to load categories', e)
  }
}

// 获取文章列表
const fetchArticles = async (isLoadMore = false) => {
  if (loading.value) return
  loading.value = true
  
  try {
    const res = await communityApi.getArticles(activeTag.value, page.value, pageSize)
    
    if (res.success && res.data) {
      if (isLoadMore) {
        articles.value = [...articles.value, ...res.data]
      } else {
        articles.value = res.data
      }
      // 判断是否有更多
      hasMore.value = articles.value.length < res.total
    }
  } catch (e) {
    console.error('Failed to load articles', e)
  } finally {
    loading.value = false
  }
}

// 切换标签
const setActiveTag = (key: string) => {
  if (activeTag.value === key && key !== 'all') {
    activeTag.value = 'all'
  } else {
    activeTag.value = key
  }
  page.value = 1
  articles.value = []
  fetchArticles()
}

// 加载更多
const loadMore = () => {
  page.value++
  fetchArticles(true)
}

// 跳转详情
const viewArticle = (article: Article) => {
  router.push(`/article/${article.id}`)
}

// 工具函数
const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-CN')
}

// 初始化
onMounted(async () => {
  await fetchCategories()
  await fetchArticles()
})

// SEO
useHead({
  title: '帮助中心 - 凡图拉',
  meta: [
    { name: 'description', content: '凡图拉社区帮助中心，提供奈飞、迪士尼+等流媒体使用教程与设备指南。' }
  ]
})
</script>

<style scoped>
.community-page {
  min-height: 100vh;
  background: transparent; /* 透出全局例子背景 */
  color: #e2e8f0;
  display: flex;
  flex-direction: column;
}

.page-content {
  flex: 1;
  width: 100%;
  max-width: 1300px;
  margin: 0 auto;
  padding: 40px 20px;
}

/* 标签导航 */
.category-tags {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-bottom: 50px;
  flex-wrap: wrap;
}

.tag-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 24px;
  background: rgba(30, 41, 59, 0.6);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 50px;
  color: #94a3b8;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
}

.tag-btn:hover {
  background: rgba(59, 130, 246, 0.2);
  color: #fff;
  border-color: rgba(59, 130, 246, 0.4);
  transform: translateY(-2px);
}

/* 动态 Active 颜色支持 */
.tag-btn.active {
  background: var(--active-color, #409EFF); /* Fallback blue */
  background-image: linear-gradient(135deg, var(--active-color), rgba(255,255,255,0.2));
  color: #fff;
  border-color: transparent;
  box-shadow: 0 4px 15px rgba(0,0,0,0.3);
}

.tag-icon { font-size: 16px; }
.reset-hint { margin-left: 6px; font-weight: bold; opacity: 0.8; }

/* 文章列表 */
.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
  margin-bottom: 60px;
}

.article-card {
  background: rgba(30, 41, 59, 0.7);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  flex-direction: column;
  backdrop-filter: blur(20px);
}

.article-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  border-color: rgba(59, 130, 246, 0.3);
}

.article-cover {
  height: 200px;
  position: relative;
  overflow: hidden;
}

.article-cover img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.6s ease;
}

.article-card:hover .article-cover img {
  transform: scale(1.05);
}

.video-badge {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 48px;
  height: 48px;
  background: rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
  font-size: 24px;
  backdrop-filter: blur(4px);
  border: 2px solid rgba(255, 255, 255, 0.2);
}

.card-category-tag {
  position: absolute;
  top: 12px;
  right: 12px;
  padding: 4px 12px;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  border-radius: 10px;
  font-size: 12px;
  color: #fff;
  font-weight: 500;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 2px 4px rgba(0,0,0,0.2);
}

.article-content {
  padding: 24px;
  flex: 1;
  display: flex;
  flex-direction: column;
}

.article-title {
  font-size: 18px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 10px;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.article-desc {
  font-size: 14px;
  color: #94a3b8;
  line-height: 1.6;
  margin-bottom: 20px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.article-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.author-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.author-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  border: 1px solid rgba(255,255,255,0.2);
}

.author-name {
  font-size: 12px;
  color: #cbd5e1;
}

.article-date {
  font-size: 12px;
  color: #64748b;
}

/* 状态展示 */
.loading-state, .empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  color: #64748b;
  gap: 16px;
}
.empty-state .el-icon { font-size: 48px; opacity: 0.5; }
.loading-state .el-icon { font-size: 32px; animation: rotate 1s linear infinite; }

.load-more-section {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

.load-more-btn {
  padding: 12px 36px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #cbd5e1;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s;
}
.load-more-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}

@keyframes rotate { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

/* 响应式 */
@media (max-width: 1024px) {
  .articles-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 640px) {
  .articles-grid { grid-template-columns: 1fr; }
  .article-cover { height: 180px; }
}
</style>