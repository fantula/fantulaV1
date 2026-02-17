<template>
  <div class="user-cell">
    <el-avatar 
      :size="avatarSize" 
      :src="avatarUrl" 
      class="user-avatar"
    >
      {{ avatarText }}
    </el-avatar>
    <div class="user-info">
      <div class="user-name-row">
        <span class="user-name" :title="displayName">{{ displayName }}</span>
        <el-tag v-if="tag" size="small" type="info" effect="plain" class="ml-1">{{ tag }}</el-tag>
      </div>
      <div v-if="showUid || showEmail" class="user-sub-row">
         <span v-if="showUid" class="uid-text" title="Click to copy" @click.stop="handleCopyUid">
            {{ displayUid }}
         </span>
         <span v-if="showUid && showEmail" class="divider">|</span>
         <span v-if="showEmail" class="email-text" :title="email">{{ email }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { ElMessage } from 'element-plus'
import { useClipboard } from '@vueuse/core'

// Define interface locally or import from types
interface AdminUser {
  id?: string
  user_id?: string
  uid?: string
  name?: string
  nickname?: string
  email?: string
  avatar?: string
  _profile?: {
    uid?: string
    avatar?: string
  }
  profiles?: {
    email?: string
  }
}

const props = withDefaults(defineProps<{
  user?: AdminUser | null
  uid?: string
  name?: string
  email?: string
  avatar?: string
  
  // Config
  showUid?: boolean
  showEmail?: boolean
  avatarSize?: number
  tag?: string // Optional extra tag (e.g. Role)
}>(), {
  showUid: true,
  showEmail: true,
  avatarSize: 32
})

// Normalize data from either 'user' object or individual props
const avatarUrl = computed(() => props.avatar || props.user?.avatar || props.user?._profile?.avatar || '')
const displayName = computed(() => props.name || props.user?.name || props.user?.nickname || 'Unknown')
const email = computed(() => props.email || props.user?.email || props.user?.profiles?.email || 'No Email')
const uid = computed(() => props.uid || props.user?.id || props.user?.user_id || props.user?._profile?.uid || '')

const avatarText = computed(() => {
    if (avatarUrl.value) return ''
    return displayName.value.substring(0, 2).toUpperCase()
})

const displayUid = computed(() => {
    if (!uid.value) return 'No UID'
    // If it's a long UUID, truncate. If it's a short ID, show full.
    return uid.value.length > 10 ? uid.value.substring(0, 8).toUpperCase() : uid.value
})

const { copy } = useClipboard()

const handleCopyUid = () => {
    if (!uid.value) return
    copy(uid.value)
    ElMessage.success('UID copied')
}
</script>

<style scoped>
.user-cell { display: flex; align-items: center; gap: 8px; }
.user-avatar { background: #f0f2f5; color: #909399; font-size: 12px; font-weight: 600; flex-shrink: 0; }
.user-info { display: flex; flex-direction: column; overflow: hidden; justify-content: center; min-width: 0; }

.user-name-row { display: flex; align-items: center; }
.user-name { font-weight: 500; font-size: 14px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 120px; }
.ml-1 { margin-left: 4px; }

.user-sub-row { display: flex; align-items: center; gap: 6px; font-size: 12px; color: #909399; line-height: 1.2; margin-top: 2px; }
.uid-text { font-family: 'Monaco', 'Consolas', monospace; cursor: pointer; }
.uid-text:hover { color: var(--el-color-primary); }
.email-text { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 140px; }
.divider { color: #dcdfe6; font-size: 10px; }
</style>
