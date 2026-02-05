<template>
  <div 
    class="faq-card" 
    :class="{ active: isExpanded }"
    @click="$emit('toggle')"
  >
    <div class="faq-card-header">
      <div class="q-badge">Q</div>
      <div class="faq-question-text">{{ question }}</div>
      <div class="toggle-icon">
        <el-icon><Plus /></el-icon>
      </div>
    </div>
    
    <div class="faq-card-body-grid" :class="{ 'is-expanded': isExpanded }">
      <div class="min-h-0-wrapper">
        <div class="answer-wrapper">
          <div class="a-badge">A</div>
          <div class="faq-answer-text">{{ answer }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'

defineProps<{
  question: string
  answer: string
  isExpanded: boolean
}>()

defineEmits(['toggle'])
</script>

<style scoped>
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
  flex: 0 1 auto; /* Don't grow indefinitely, but allow shrink */
  font-size: 17px;
  font-weight: 600;
  color: #F1F5F9;
  letter-spacing: 0.2px;
  max-width: 50%; 
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
  display: none; 
}

.faq-answer-text {
  font-size: 15px;
  line-height: 1.8;
  color: #94A3B8;
  max-width: 75%; 
}
</style>
