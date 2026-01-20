<template>
  <div class="admin-module-layout">
    <!-- Teleport Title and Tabs to Global Header -->
    <ClientOnly>
      <Teleport to="#header-portal">
        <div class="teleported-header" v-if="showTabs">
           <div class="module-title">{{ title }}</div>
           <el-divider direction="vertical" class="header-divider" />
           <el-tabs v-model="activeTab" class="header-tabs" @tab-click="handleTabClick">
              <el-tab-pane 
                v-for="tab in tabs" 
                :key="tab.name" 
                :label="tab.label" 
                :name="tab.name" 
              />
           </el-tabs>
        </div>
      </Teleport>
    </ClientOnly>

    <div class="module-content">
       <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

interface Tab {
  name: string
  label: string
  route: string
}

const props = withDefaults(defineProps<{
  title: string
  tabs: Tab[]
  defaultTab?: string
  hideTabsOn?: string[]
}>(), {
  hideTabsOn: () => ['/post', '/edit']
})

const route = useRoute()
const router = useRouter()

const activeTab = ref(props.defaultTab || props.tabs[0]?.name || '')

// Update active tab based on current route
const updateActiveTab = () => {
  const path = route.path
  // Find matching tab by checking if route starts with tab.route
  for (const tab of props.tabs) {
    if (path === tab.route || (tab.route !== props.tabs[0]?.route && path.startsWith(tab.route))) {
      activeTab.value = tab.name
      return
    }
  }
  // Default to first tab
  activeTab.value = props.defaultTab || props.tabs[0]?.name || ''
}

watch(() => route.path, updateActiveTab, { immediate: true })

// Hide tabs on specified paths
const showTabs = computed(() => {
  return !props.hideTabsOn.some(keyword => route.path.includes(keyword))
})

// Handle tab click navigation
const handleTabClick = (tab: any) => {
  const name = tab.props.name
  const targetTab = props.tabs.find(t => t.name === name)
  if (targetTab) {
    router.push(targetTab.route)
  }
}
</script>

<style scoped>
.admin-module-layout { height: 100%; display: flex; flex-direction: column; }
.module-content { flex: 1; }

/* Styles for Teleported Content */
.teleported-header {
    display: flex;
    align-items: center;
    height: 100%;
}

.module-title {
    font-size: 20px;
    font-weight: 700;
    color: var(--el-text-color-primary);
    white-space: nowrap;
    margin-right: 15px;
}

.header-divider {
    height: 24px;
    margin-right: 15px;
    border-color: var(--el-border-color);
}

/* Customizing Tabs for Header */
.header-tabs {
    --el-tabs-header-height: 100%;
}

.header-tabs :deep(.el-tabs__nav-wrap::after) {
    display: none;
}

.header-tabs :deep(.el-tabs__header) {
    margin: 0;
    border: none;
}

.header-tabs :deep(.el-tabs__item) {
    font-size: 16px;
    font-weight: 500;
    height: 72px;
    line-height: 72px;
    color: var(--el-text-color-regular);
}

.header-tabs :deep(.el-tabs__item.is-active) {
    color: var(--el-color-primary);
    font-weight: 600;
    font-size: 17px;
}

.header-tabs :deep(.el-tabs__active-bar) {
    height: 3px;
    border-radius: 2px;
}
</style>
