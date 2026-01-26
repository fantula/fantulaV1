<template>
  <div class="article-detail-page">
    <div v-if="loading" class="loading-state">
      <el-icon class="is-loading"><Loading /></el-icon>
      <span>加载中...</span>
    </div>

    <div v-else-if="article" class="article-container">
      <!-- 顶部视频播放区 (如果有视频) -->
      <div v-if="videoEmbedUrl" class="video-section">
        <div class="video-wrapper">
          <iframe 
            :src="videoEmbedUrl" 
            scrolling="no" 
            border="0" 
            frameborder="no" 
            framespacing="0" 
            allowfullscreen="true">
          </iframe>
        </div>
      </div>

      <!-- 封面图 (如果没有视频) -->
      <div v-else-if="article.cover_image" class="cover-section">
        <img :src="article.cover_image" :alt="article.title" />
      </div>

      <!-- 文章内容区 -->
      <article class="content-wrapper">
        <header class="article-header">
          <div class="category-pill">{{ getCategoryLabel(article.category) }}</div>
          <h1 class="article-title">{{ article.title }}</h1>
          
          <div class="meta-info">
            <div class="author">
              <img :src="article.author?.avatar || '/images/client/pc/service-avatar.png'" class="avatar" />
              <span class="name">{{ article.author?.name || '官方客服' }}</span>
            </div>
            <span class="divider">|</span>
            <span class="date">{{ formatDate(article.created_at) }}</span>
            <!-- <span class="divider">|</span>
            <span class="views">{{ article.views || 0 }} 阅读</span> -->
          </div>
        </header>

        <div class="markdown-body" v-html="renderedContent"></div>
      </article>

      <!-- 底部操作 -->
      <div class="article-actions">
        <!-- <button class="action-btn like-btn">
          <el-icon><Star /></el-icon> 收藏
        </button> -->
        <button class="action-btn back-btn" @click="router.back()">
          <el-icon><ArrowLeft /></el-icon> 返回列表
        </button>
      </div>
    </div>

    <div v-else class="error-state">
      <el-icon><Warning /></el-icon>
      <p>文章不存在或已被删除</p>
      <button class="back-link" @click="router.push('/community')">返回社区</button>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'pc'
})

import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Loading, ArrowLeft, Warning } from '@element-plus/icons-vue' // Star removed temporarily
import { communityApi } from '@/api/client/community'
import type { Article } from '@/api/client/community'
import { marked } from 'marked' // We might need to handle markdown rendering

// 简单的 Markdown 渲染（如果没有 marked 库，可以用 v-html 直接渲染）
// 这里假设 content 存储的是 HTML 或 Markdown
// 如果项目中没有 marked，需要安装或手动简单处理
const renderMarkdown = (text: string) => {
  if (!text) return ''
  // 简单处理换行
  return text.replace(/\n/g, '<br/>') 
}

const route = useRoute()
const router = useRouter()
const loading = ref(true)
const article = ref<Article | null>(null)

// 视频链接解析
const videoEmbedUrl = computed(() => {
  const url = article.value?.video_url
  if (!url) return null

  // Bilibili BV号 / 链接处理
  // https://www.bilibili.com/video/BV1xx411c7mD
  const b_match = url.match(/(BV[a-zA-Z0-9]+)/)
  if (b_match) {
    return `//player.bilibili.com/player.html?bvid=${b_match[1]}&page=1&high_quality=1&danmaku=0`
  }

  // Youtube 处理
  // https://www.youtube.com/watch?v=dQw4w9WgXcQ
  // https://youtu.be/dQw4w9WgXcQ
  const y_match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  if (y_match) {
    return `https://www.youtube.com/embed/${y_match[1]}?rel=0&modestbranding=1`
  }

  return null
})

const renderedContent = computed(() => {
  // 如果引入了 marked: return marked.parse(article.value?.content || '')
  return renderMarkdown(article.value?.content || '')
})

const getCategoryLabel = (key: string) => {
  const map: Record<string, string> = {
    'guide': '使用攻略',
    'equipment': '设备推荐',
    'troubleshoot': '故障排查',
    'news': '官方公告'
  }
  return map[key] || '其他'
}

const formatDate = (dateStr: string) => {
  if (!dateStr) return ''
  return new Date(dateStr).toLocaleDateString('zh-CN', { 
    year: 'numeric', month: 'long', day: 'numeric' 
  })
}

onMounted(async () => {
  const id = route.params.id as string
  if (!id) {
    loading.value = false
    return
  }

  // 从 API 获取
  const res = await communityApi.getArticleDetail(id)
  if (res.success && res.data) {
    article.value = res.data
  }
  loading.value = false
})

// SEO
useHead({
  title: computed(() => article.value ? `${article.value.title} - 帮助中心` : '加载中...'),
  meta: [
    { name: 'description', content: computed(() => article.value?.description || '') }
  ]
})
</script>

<style scoped>
.article-detail-page {
  min-height: 100vh;
  background: transparent;
  color: #e2e8f0;
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.article-container {
  width: 100%;
  max-width: 900px;
  background: rgba(30, 41, 59, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 24px;
  overflow: hidden;
  box-shadow: 0 20px 50px rgba(0,0,0,0.3);
  animation: fadeIn 0.6s ease-out;
}

/* 视频区域 */
.video-section {
  width: 100%;
  background: #000;
  border-bottom: 1px solid rgba(255,255,255,0.1);
}

.video-wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
}

.video-wrapper iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

/* 封面区域 */
.cover-section {
  width: 100%;
  height: 360px;
  overflow: hidden;
}

.cover-section img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* 内容区域 */
.content-wrapper {
  padding: 40px;
}

.article-header {
  margin-bottom: 30px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  padding-bottom: 20px;
}

.category-pill {
  display: inline-block;
  padding: 4px 12px;
  background: rgba(59, 130, 246, 0.2);
  color: #60a5fa;
  border-radius: 20px;
  font-size: 13px;
  font-weight: 600;
  margin-bottom: 16px;
}

.article-title {
  font-size: 32px;
  font-weight: 800;
  color: #fff;
  margin-bottom: 16px;
  line-height: 1.3;
}

.meta-info {
  display: flex;
  align-items: center;
  color: #94a3b8;
  font-size: 14px;
}

.author {
  display: flex;
  align-items: center;
  gap: 8px;
}

.avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
}

.divider { margin: 0 12px; opacity: 0.3; }

/* Markdown 内容样式重置 */
.markdown-body {
  color: #cbd5e1;
  line-height: 1.8;
  font-size: 16px;
}

:deep(.markdown-body h2) {
  font-size: 24px;
  color: #fff;
  margin: 30px 0 16px;
  font-weight: 700;
}

:deep(.markdown-body p) {
  margin-bottom: 16px;
}

:deep(.markdown-body img) {
  max-width: 100%;
  border-radius: 12px;
  margin: 20px 0;
  border: 1px solid rgba(255,255,255,0.1);
}

/* 底部操作 */
.article-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
}

.action-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.3s;
  font-size: 15px;
  font-weight: 500;
  background: transparent;
  border: 1px solid transparent;
}

.back-btn {
  color: #94a3b8;
}
.back-btn:hover {
  background: rgba(255, 255, 255, 0.05);
  color: #fff;
}

.like-btn {
  color: #F59E0B;
  background: rgba(245, 158, 11, 0.1);
}
.like-btn:hover {
  background: rgba(245, 158, 11, 0.2);
}

/* 错误与加载态 */
.loading-state, .error-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 100px 0;
  color: #cbd5e1;
  gap: 16px;
}
.loading-state .el-icon { font-size: 40px; }
.error-state .el-icon { font-size: 48px; color: #EF4444; opacity: 0.8; }
.back-link {
  margin-top: 16px;
  padding: 8px 24px;
  background: rgba(59, 130, 246, 0.2);
  color: #fff;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

/* 动画 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
