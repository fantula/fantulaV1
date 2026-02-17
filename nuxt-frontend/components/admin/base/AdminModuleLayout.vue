<template>
  <div class="admin-module-layout">
    <!-- Content only, Header is managed by Store -->
    <div class="module-content">
       <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted, onActivated } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAdminHeaderStore } from '@/stores/admin/header'

interface Tab {
  name: string
  label: string
  route?: string
}

const props = withDefaults(defineProps<{
  title: string
  tabs: Tab[]
  defaultTab?: string
  hideTabsOn?: string[]
}>(), {
  hideTabsOn: () => ['/post', '/edit']
})

const emit = defineEmits(['tab-change'])

const route = useRoute()
const router = useRouter()
const headerStore = useAdminHeaderStore()

const activeTab = ref(props.defaultTab || props.tabs[0]?.name || '')
let mySessionId: string | null = null

// Update active tab based on current route
const updateActiveTab = () => {
  const path = route.path
  
  // Strategy: Find the best match (Longest Prefix Match)
  let bestMatch: string | null = null
  let bestMatchLength = 0

  for (const tab of props.tabs) {
    if (!tab.route) continue

    // Exact Match
    if (path === tab.route) {
      bestMatch = tab.name
      break // Found exact match, stop
    }

    // Prefix Match
    const tabRouteDir = tab.route.endsWith('/') ? tab.route : `${tab.route}/`
    const currentPathDir = path.endsWith('/') ? path : `${path}/`

    if (currentPathDir.startsWith(tabRouteDir)) {
      if (tab.route.length > bestMatchLength) {
        bestMatch = tab.name
        bestMatchLength = tab.route.length
      }
    }
  }
  
  // Set Active Tab
  if (bestMatch) {
    activeTab.value = bestMatch
    headerStore.setActiveTab(bestMatch)
  } else {
    // Fallback strategy:
    // 1. Check if defaultTab exists in tabs
    // 2. Or fallback to first tab
    const fallbackName = props.defaultTab || props.tabs[0]?.name || ''
    const fallbackTab = props.tabs.find(t => t.name === fallbackName)
    
    if (fallbackTab) {
       activeTab.value = fallbackTab.name
       headerStore.setActiveTab(fallbackTab.name)
    }
  }
}

// Sync header state
const syncHeader = () => {
  const shouldShowTabs = !props.hideTabsOn.some(keyword => route.path.includes(keyword))
  
  // Only pass tabs if we should show them
  const tabsToShow = shouldShowTabs ? props.tabs : []
  
  // Lock the header layout
  mySessionId = headerStore.setLayout(props.title, tabsToShow, activeTab.value)
}

// Watchers
watch(() => route.path, () => {
  updateActiveTab()
  // Re-sync header in case hideTabsOn condition changed
  syncHeader()
})

watch(() => props.defaultTab, (val) => { 
  if(val) {
    activeTab.value = val
    headerStore.setActiveTab(val)
  } 
})

onMounted(() => {
  updateActiveTab()
  syncHeader()
})

onActivated(() => {
  updateActiveTab()
  syncHeader()
})

onUnmounted(() => {
  if (mySessionId) {
    headerStore.clearLayout(mySessionId)
  }
})
</script>

<style scoped>
.admin-module-layout { height: 100%; display: flex; flex-direction: column; }
.module-content { flex: 1; }
</style>
