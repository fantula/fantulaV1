<template>
  <div class="base-infinite-list">
    <!-- List Content -->
    <div class="list-content">
      <slot></slot>
    </div>

    <!-- Status Area -->
    <div 
      class="list-status" 
      ref="triggerRef" 
      v-show="loading || finished || error || type === 'scroll'"
    >
      
      <!-- 1. Loading State -->
      <div v-if="loading" class="status-loading">
        <slot name="loading">
          <div class="glass-loader"></div>
          <span class="loading-text">正在加载更多...</span>
        </slot>
      </div>

      <!-- 2. Error State -->
      <div v-else-if="error" class="status-error" @click="emit('load')">
        <el-icon><Warning /></el-icon>
        <span>加载失败，点击重试</span>
      </div>

      <!-- 3. Finished State -->
      <div v-else-if="finished" class="status-finished">
        <div class="finished-line"></div>
        <slot name="finished">
          <span class="finished-text">{{ finishedText }}</span>
        </slot>
        <div class="finished-line"></div>
      </div>

      <!-- 4. Manual Load Button (if type=button) -->
      <div v-else-if="type === 'button'" class="status-action">
        <button class="load-more-btn" @click="emit('load')">
          加载更多
        </button>
      </div>
      
      <!-- 4. Scroll Trigger (Invisible Helper) -->
      <!-- The observer will watch the parent .list-status div -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import { Warning } from '@element-plus/icons-vue'

const props = defineProps({
  loading: { type: Boolean, default: false },
  finished: { type: Boolean, default: false },
  error: { type: Boolean, default: false },
  finishedText: { type: String, default: '没有更多了' },
  type: { type: String, default: 'scroll', validator: (v: string) => ['scroll', 'button'].includes(v) },
  offset: { type: Number, default: 100 } // Distance from bottom to trigger
})

const emit = defineEmits(['load'])

const triggerRef = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const startObserver = () => {
  if (props.type !== 'scroll' || !triggerRef.value) return
  
  // Cleanup old
  stopObserver()

  observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.isIntersecting && !props.loading && !props.finished && !props.error) {
      emit('load')
    }
  }, {
    root: null, // viewport
    rootMargin: `0px 0px ${props.offset}px 0px`,
    threshold: 0.1
  })

  observer.observe(triggerRef.value)
}

const stopObserver = () => {
  if (observer) {
    observer.disconnect()
    observer = null
  }
}

// Watchers to restart/stop based on state
watch(() => [props.loading, props.finished, props.error, props.type], () => {
    if (props.finished || props.type === 'button') {
        stopObserver()
    } else {
        // Re-check overlap immediately if state changed to idle
        startObserver()
    }
}, { immediate: true })

onMounted(() => {
  startObserver()
})

onBeforeUnmount(() => {
  stopObserver()
})
</script>

<style scoped>
.base-infinite-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.list-content {
  flex: 1;
}

.list-status {
  padding: 24px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 50px;
}

/* Loading */
.status-loading {
  display: flex;
  align-items: center;
  gap: 10px;
  color: #94A3B8;
  font-size: 13px;
}

.glass-loader {
  width: 20px;
  height: 20px;
  border: 2px solid rgba(255, 255, 255, 0.1);
  border-top-color: #3B82F6;
  border-radius: 50%;
  animation: list-spin 0.8s linear infinite;
}

@keyframes list-spin { to { transform: rotate(360deg); } }

/* Finished */
.status-finished {
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  max-width: 200px;
}

.finished-line {
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.05);
}

.finished-text {
  font-size: 12px;
  color: #64748B;
}

/* Error */
.status-error {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #EF4444;
  font-size: 13px;
  cursor: pointer;
  padding: 8px 16px;
  border-radius: 100px;
  transition: all 0.2s;
}
.status-error:hover { background: rgba(239, 68, 68, 0.1); }

/* Button */
.load-more-btn {
  padding: 8px 24px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #94A3B8;
  border-radius: 100px;
  cursor: pointer;
  font-size: 13px;
  transition: all 0.3s;
}
.load-more-btn:hover {
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
}
</style>
