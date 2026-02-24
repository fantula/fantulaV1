<template>
  <div class="mobile-infinite-list">
    <!-- List Content -->
    <div v-if="list.length > 0" class="list-content">
      <slot></slot>
    </div>

    <!-- Empty State -->
    <div v-else-if="!loading && list.length === 0" class="empty-state">
      <slot name="empty">
        <div class="default-empty">暂无数据</div>
      </slot>
    </div>

    <!-- Loading Sentinel / Status -->
    <div class="list-status" ref="sentinel">
      <div v-if="loading" class="loading-text">
        <slot name="loading">
             <div class="spinner-mini"></div> 加载中...
        </slot>
      </div>
      <div v-else-if="finished && list.length > 0" class="finished-text">
        <slot name="finished">没有更多了</slot>
      </div>
       <!-- Hidden trigger for intersection observer if not finished and not loading -->
       <div v-else-if="!finished && !loading" style="height: 1px; width: 100%;"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch } from 'vue'

const props = defineProps<{
  loading: boolean
  finished: boolean
  list: any[]
  distance?: number // Distance threshold to trigger load (px)
}>()

const emit = defineEmits(['load'])
const sentinel = ref<HTMLElement | null>(null)
let observer: IntersectionObserver | null = null

const setupObserver = () => {
  if (observer) observer.disconnect()
  
  observer = new IntersectionObserver((entries) => {
    const entry = entries[0]
    if (entry.isIntersecting && !props.loading && !props.finished) {
      emit('load')
    }
  }, {
    root: null,
    rootMargin: `0px 0px ${props.distance || 100}px 0px`,
    threshold: 0.1
  })

  if (sentinel.value) {
    observer.observe(sentinel.value)
  }
}

onMounted(() => {
  setupObserver()
})

onUnmounted(() => {
  if (observer) observer.disconnect()
})

// Re-observe if sentinel changes (though it shouldn't much)
watch(sentinel, () => {
  setupObserver()
})
</script>

<style scoped>
.mobile-infinite-list {
  width: 100%;
}

.empty-state {
  padding: 40px 0;
  text-align: center;
  color: #94A3B8;
  font-size: 14px;
}

.list-status {
  padding: 20px 0;
  text-align: center;
  color: #64748B;
  font-size: 12px;
  display: flex; justify-content: center;
}

.loading-text {
    display: flex; align-items: center; gap: 8px;
}
</style>
