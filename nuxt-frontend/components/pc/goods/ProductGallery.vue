<template>
  <div class="goods-left-panel">
    <div class="main-image-wrapper">
      <div class="main-image">
        <el-image 
          :src="currentImage || defaultImage" 
          fit="contain" 
          class="sku-big-img"
        >
          <template #placeholder>
            <div class="img-loading-placeholder">加载中...</div>
          </template>
        </el-image>
      </div>
      <!-- SKU 绑定的图片列表滚动展示 -->
      <div class="sku-thumb-scroll" v-if="images && images.length > 0">
        <div 
          v-for="(img, idx) in images" 
          :key="idx" 
          :class="['sku-thumb-item', { active: currentImage === img }]"
          @click="$emit('update:modelValue', img)"
        >
          <img :src="img" alt="SKU图片" />
        </div>
      </div>
    </div>

    <!-- 卖点保障区 -->
    <div class="premium-service-card">
      <div class="premium-service-title">服务保障</div>
      <div class="premium-service-grid">
        <div class="p-service-item" v-for="tag in serviceTags" :key="tag">
          <el-icon class="p-icon"><CircleCheck /></el-icon>
          <span>{{ tag }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { CircleCheck } from '@element-plus/icons-vue'

const props = defineProps<{
  modelValue: string // selectedSkuImage
  defaultImage: string // goodsInfo.image
  images: string[] // skuImages
}>()

const emit = defineEmits(['update:modelValue'])

const currentImage = computed(() => props.modelValue)

// Services Tags (Static for now, could be prop)
const serviceTags = [
  '官方采购・正品保障',
  '全程质保・无忧售后',
  '极速响应・人工服务',
  '安全加密・隐私保护'
]
</script>

<style scoped>
/* Copied from goods-detail.css but scoped */
.goods-left-panel {
  width: 480px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.main-image-wrapper {
  width: 100%;
  background: rgba(255, 255, 255, 0.02);
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-image {
  width: 100%;
  height: 360px; /* reduced slightly to fit thumbnails */
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-radius: 16px;
  background: rgba(0,0,0,0.2);
}

.sku-big-img {
  width: 100%;
  height: 100%;
  transition: transform 0.3s ease;
}
.sku-big-img:hover {
  transform: scale(1.05);
}

.img-loading-placeholder {
  color: #64748B;
  font-size: 13px;
}

.sku-thumb-scroll {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 4px;
  scrollbar-width: none;
}
.sku-thumb-scroll::-webkit-scrollbar { display: none; }

.sku-thumb-item {
  width: 64px;
  height: 64px;
  border-radius: 10px;
  border: 2px solid transparent;
  cursor: pointer;
  overflow: hidden;
  opacity: 0.6;
  transition: all 0.2s;
  flex-shrink: 0;
  background: rgba(0,0,0,0.3);
}
.sku-thumb-item img {
  width: 100%; height: 100%; object-fit: cover;
}
.sku-thumb-item:hover {
  opacity: 1;
  transform: translateY(-2px);
}
.sku-thumb-item.active {
  border-color: #3B82F6;
  opacity: 1;
  box-shadow: 0 0 10px rgba(59, 130, 246, 0.3);
}

/* Service Card */
.premium-service-card {
  background: linear-gradient(145deg, rgba(30, 41, 59, 0.4) 0%, rgba(15, 23, 42, 0.6) 100%);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 20px;
  padding: 20px;
}

.premium-service-title {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
  margin-bottom: 16px;
  padding-left: 10px;
  border-left: 3px solid #3B82F6;
}

.premium-service-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.p-service-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  color: #94A3B8;
  padding: 8px;
  background: rgba(255,255,255,0.02);
  border-radius: 8px;
}
.p-icon { color: #10B981; font-size: 15px; }

</style>
