<template>
  <div class="faq-ticker-bar" v-if="faqs.length > 0" @click="handleClick">
    <div class="faq-ticker-container">
      <div class="faq-ticker-track" :style="tickerStyle">
        <!-- 显示列表 + 原样克隆的第一项用于无缝衔接 -->
        <div 
          class="faq-ticker-item" 
          v-for="(faq, idx) in displayFaqs" 
          :key="idx"
        >
          {{ faq.question }}
        </div>
      </div>
    </div>
    <div class="faq-arrow-wrap">
      <el-icon><Right /></el-icon>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Right } from '@element-plus/icons-vue'

const props = defineProps<{
  faqs: Array<{ id: string; question: string }>
}>()

const emit = defineEmits(['click'])

const activeFaqIndex = ref(0)
const isTransitioning = ref(true)
let tickerTimer: any = null

const displayFaqs = computed(() => {
  if (props.faqs.length === 0) return []
  return [...props.faqs, props.faqs[0]] 
})

const tickerStyle = computed(() => ({
  transform: `translateY(-${activeFaqIndex.value * 40}px)`,
  transition: isTransitioning.value ? 'transform 0.5s ease-in-out' : 'none'
}))

const startFaqTicker = () => {
  if (tickerTimer) clearInterval(tickerTimer)
  tickerTimer = setInterval(() => {
    isTransitioning.value = true
    activeFaqIndex.value++
    if (activeFaqIndex.value === props.faqs.length) {
      setTimeout(() => {
        isTransitioning.value = false 
        activeFaqIndex.value = 0 
      }, 500) 
    }
  }, 3000) 
}

const handleClick = () => {
    emit('click')
}

onMounted(() => {
  startFaqTicker()
})

onUnmounted(() => {
  if (tickerTimer) clearInterval(tickerTimer)
})
</script>

<style scoped>
/* FAQ Ticker */
.faq-ticker-bar {
  margin: 16px 0;
  height: 40px;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 10px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  cursor: pointer;
  overflow: hidden;
  transition: all 0.2s;
}
.faq-ticker-bar:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
}

.faq-ticker-container {
  flex: 1;
  height: 40px;
  overflow: hidden;
  position: relative;
}

.faq-ticker-track {
  display: flex;
  flex-direction: column;
}

.faq-ticker-item {
  height: 40px;
  display: flex;
  align-items: center;
  font-size: 13px;
  color: #93C5FD;
}

.faq-arrow-wrap {
  color: #60A5FA;
  font-size: 14px;
}
</style>
