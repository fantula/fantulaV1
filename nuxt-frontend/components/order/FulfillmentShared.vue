<template>
  <div class="glass-card delivery-card">
    <div class="section-title">📦 交付内容</div>

    <!-- 账号合租 (Shared) -->
    <div v-if="cdkList.length > 0" class="delivery-list">
      <div v-for="(item, idx) in cdkList" :key="idx" class="delivery-item shared-item">
        <!-- 车位位置 -->
        <div class="slot-header">
          <span class="slot-icon">🚗</span>
          <span class="slot-badge">位置: {{ formatSlotIndex(item.slotIndex) }}</span>
        </div>

        <!-- 账号信息字段 -->
        <div class="fields-grid">
          <div v-for="(val, key) in parseCdkCode(item)" :key="key" class="field-row">
            <span class="f-label">{{ key }}:</span>
            <span class="f-value">{{ val }}</span>
            <span class="copy-btn" @click="copyText(String(val))">复制</span>
          </div>
        </div>
      </div>

      <!-- 共享用户列表 -->
      <div v-if="coSharingUsers.length > 0" class="co-sharing-section">
        <div class="co-sharing-header">
          <span class="header-icon">👥</span>
          <span class="header-text">一起共享的友友</span>
          <span class="user-count">{{ coSharingUsers.length }}人</span>
        </div>
        <div class="users-grid">
          <div v-for="user in coSharingUsers" :key="user.id" class="user-item">
            <img v-if="user.avatar" :src="user.avatar" class="user-avatar" />
            <div v-else class="user-avatar placeholder">👤</div>
            <span class="user-name">{{ user.nickname || '用户' }}</span>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="empty-state">
      暂无详细交付信息
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { getSupabaseClient } from '@/utils/supabase'

interface CdkItem {
  id: string
  code: string
  parsed: any
  accountData: any
  slotIndex?: number
}

interface CoSharingUser {
  id: string
  avatar: string | null
  nickname: string | null
}

const props = defineProps<{
  cdkList: CdkItem[]
}>()

const coSharingUsers = ref<CoSharingUser[]>([])

// 解析 CDK code 为字段对象
const parseCdkCode = (item: CdkItem) => {
  // 优先使用已解析的 parsed
  if (item.parsed && typeof item.parsed === 'object') {
    return item.parsed
  }
  // 尝试解析 code
  try {
    return JSON.parse(item.code)
  } catch {
    return { '激活码': item.code }
  }
}

const copyText = (t: string) => {
  navigator.clipboard.writeText(t).then(() => ElMessage.success('已复制'))
}

const formatSlotIndex = (idx?: number) => {
  if (idx === undefined) return '--'
  return String(idx).padStart(2, '0')
}

// 获取共享用户列表
const fetchCoSharingUsers = async () => {
  if (!props.cdkList.length) return
  
  // 获取第一个 CDK 的 ID
  const cdkId = props.cdkList[0].id
  if (!cdkId) return

  try {
    const client = getSupabaseClient()
    
    // 查询同一 CDK 下所有 using 状态的槽位用户
    const { data, error } = await client
      .from('slot_occupancies')
      .select(`
        user_id,
        profiles:user_id (
          id,
          avatar,
          nickname
        )
      `)
      .eq('cdk_id', cdkId)
      .eq('status', 'using')
      .not('user_id', 'is', null)

    if (!error && data) {
      coSharingUsers.value = data
        .filter((item: any) => item.profiles)
        .map((item: any) => ({
          id: item.profiles.id,
          avatar: item.profiles.avatar,
          nickname: item.profiles.nickname
        }))
    }
  } catch (err) {
    console.error('获取共享用户失败:', err)
  }
}

onMounted(() => {
  fetchCoSharingUsers()
})

watch(() => props.cdkList, () => {
  fetchCoSharingUsers()
}, { deep: true })
</script>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
}

.section-title { 
  padding: 16px 24px; 
  border-bottom: 1px solid rgba(255,255,255,0.05); 
  font-weight: 600; 
  font-size: 15px; 
  background: rgba(0,0,0,0.2); 
}

.delivery-list { 
  padding: 20px 24px; 
  display: flex; 
  flex-direction: column; 
  gap: 16px; 
}

.delivery-item { 
  padding: 16px; 
  background: rgba(255,255,255,0.03); 
  border-radius: 12px; 
  border: 1px solid rgba(255,255,255,0.05); 
}

/* Slot Header */
.slot-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid rgba(255,255,255,0.05);
}

.slot-icon { font-size: 20px; }

.slot-badge { 
  font-size: 14px; 
  color: #facc15; 
  font-weight: 600; 
  background: rgba(250, 204, 21, 0.1);
  padding: 4px 12px;
  border-radius: 6px;
}

/* Fields Grid */
.fields-grid { 
  display: flex; 
  flex-direction: column; 
  gap: 10px; 
}

.field-row { 
  display: flex; 
  align-items: center; 
  gap: 12px; 
  padding: 8px 12px;
  background: rgba(0,0,0,0.2);
  border-radius: 6px;
}

.f-label { 
  color: #94a3b8; 
  font-size: 13px;
  min-width: 60px;
}

.f-value { 
  color: #e2e8f0; 
  font-family: 'Roboto Mono', monospace; 
  font-size: 14px;
  flex: 1; 
}

.copy-btn { 
  cursor: pointer; 
  font-size: 12px; 
  color: #3b82f6;
  padding: 2px 8px;
  background: rgba(59, 130, 246, 0.1);
  border-radius: 4px;
  transition: all 0.2s;
}
.copy-btn:hover { 
  background: rgba(59, 130, 246, 0.2); 
}

/* Co-Sharing Section */
.co-sharing-section {
  margin-top: 16px;
  padding: 16px;
  background: rgba(255,255,255,0.02);
  border-radius: 12px;
  border: 1px solid rgba(255,255,255,0.05);
}

.co-sharing-header {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}

.header-icon { font-size: 18px; }
.header-text { font-size: 14px; font-weight: 600; color: #e2e8f0; }
.user-count { 
  font-size: 12px; 
  color: #64748b;
  margin-left: auto;
}

.users-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.user-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 8px;
  background: rgba(255,255,255,0.03);
  border-radius: 8px;
  min-width: 60px;
}

.user-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255,255,255,0.1);
}

.user-avatar.placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255,255,255,0.05);
  font-size: 18px;
}

.user-name {
  font-size: 11px;
  color: #94a3b8;
  max-width: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: center;
}

.empty-state { 
  text-align: center; 
  padding: 20px; 
  color: #64748b; 
}
</style>
