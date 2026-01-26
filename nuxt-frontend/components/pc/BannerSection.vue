<template>
  <div class="banner-section">
    <div class="banner-container">
      <el-carousel 
        v-if="banners && banners.length > 0"
        :interval="5000" 
        arrow="always" 
        height="360px"
        class="custom-carousel"
      >
        <el-carousel-item v-for="item in banners" :key="item.id">
          <div class="banner-item" @click="handleBannerClick(item)">
            <el-image 
              :src="item.image" 
              fit="cover" 
              class="banner-image"
              loading="lazy"
            >
              <template #placeholder>
                <div class="image-placeholder">
                  <el-icon class="is-loading"><Loading /></el-icon>
                </div>
              </template>
            </el-image>
          </div>
        </el-carousel-item>
      </el-carousel>
      
      <!-- 骨架屏：当没有数据或正在加载时 -->
      <div v-else class="banner-skeleton">
        <el-skeleton style="width: 100%" animated>
          <template #template>
            <el-skeleton-item variant="rect" style="width: 100%; height: 360px; border-radius: 16px;" />
          </template>
        </el-skeleton>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Loading } from '@element-plus/icons-vue'
import type { Banner } from '@/types/api'

defineProps<{
  banners: Banner[]
}>()

const handleBannerClick = (item: Banner) => {
  if (item.link) {
    if (item.link.startsWith('http')) {
      window.open(item.link, '_blank')
    } else {
      navigateTo(item.link)
    }
  }
}
</script>

<style scoped>
.banner-section {
  padding: 10px 0;
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
}

.banner-container {
  width: 100%;
  border-radius: 58px;
  position: relative;
  padding: 4px; /* 边框宽度 */
  background: linear-gradient(135deg, rgba(23, 143, 198, 0.3), rgba(249, 115, 22, 0.3)); /* Theme Blue/Orange */
  box-shadow: 
    0 15px 35px rgba(0, 0, 0, 0.2),
    0 0 20px rgba(23, 143, 198, 0.2);
  transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: visible; /* 允许光效溢出 */
}

/* 炫彩流动边框背景 */
.banner-container::before {
  content: '';
  position: absolute;
  top: -2px;
  left: -2px;
  right: -2px;
  bottom: -2px;
  background: linear-gradient(
    45deg, 
    var(--primary-blue), 
    var(--active-orange), 
    #00f2fe, 
    var(--primary-blue)
  );
  background-size: 400% 400%;
  border-radius: 60px;
  z-index: -1;
  animation: gradientFlow 8s ease infinite;
  opacity: 0.6;
  filter: blur(8px);
}

@keyframes gradientFlow {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

.banner-container:hover {
  transform: translateY(-5px);
  box-shadow: 
    0 20px 45px rgba(0, 0, 0, 0.25),
    0 0 30px rgba(23, 143, 198, 0.4);
}

.banner-container:hover::before {
  opacity: 1;
  filter: blur(12px);
}

.custom-carousel {
  border-radius: 54px; /* 略小于容器圆角以适应 padding */
  overflow: hidden;
  background: #000; /* 背景黑一点显科技感 */
}

.banner-item {
  position: relative;
  width: 100%;
  height: 100%;
  cursor: pointer;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  transition: transform 1.2s cubic-bezier(0.2, 0, 0.2, 1);
  opacity: 0.9;
}

.banner-item:hover .banner-image {
  transform: scale(1.05);
  opacity: 1;
}

/* 渐变遮罩增强对比度 */
.banner-item::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(to bottom, transparent 60%, rgba(0, 0, 0, 0.4));
  pointer-events: none;
}

.image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background: #1a1a1a;
  color: var(--primary-blue);
  font-size: 30px;
}

.banner-skeleton {
  width: 100%;
  height: 360px;
}

:deep(.el-carousel__indicators--horizontal) {
  bottom: 25px;
}

:deep(.el-carousel__button) {
  width: 24px;
  height: 4px;
  border-radius: 2px;
  background-color: #fff;
  opacity: 0.4;
  transition: all 0.3s;
}

:deep(.is-active .el-carousel__button) {
  width: 40px;
  background: linear-gradient(90deg, var(--primary-blue), var(--active-orange));
  opacity: 1;
  box-shadow: 0 0 10px rgba(23, 143, 198, 0.8);
}
</style>
