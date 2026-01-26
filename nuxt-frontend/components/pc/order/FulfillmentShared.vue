<template>
  <div class="glass-card delivery-card">
    
    <!-- 账号合租 (Shared) - Single Slot View -->
    <div class="delivery-content">
      
        <!-- 1. Credential Card (Account & Password) -->
        <div class="credential-card">
           <div class="credential-header">
              <!-- Promoted Slot Badge (Premium Look) -->
              <div class="slot-title-badge">
                 <div class="icon-box"><el-icon><User /></el-icon></div>
                 <span class="label">您的位置:</span>
                 <span class="value">{{ formatSlotIndex(slotIndex) }}号</span>
              </div>
           </div>

           <div class="credential-body">
              <div v-for="(val, key) in parseCdkCode(cdkItem)" :key="key" class="credential-row">
                 <div class="row-label">{{ key }}</div>
                 <div class="row-value-group">
                    <span class="row-value large-text">{{ val }}</span>
                    <button class="copy-btn-icon" @click="copyText(String(val))">
                       <el-icon><CopyDocument /></el-icon>
                    </button>
                 </div>
              </div>
           </div>
        </div>

      <!-- 2. Roommates (Full Slot List) -->
      <div class="roommates-section">
        <div class="roommates-header">
          <span class="header-title">和您共享的友友</span>
          <span class="header-count">{{ occupiedCount }}/{{ maxSlots }} 已入座</span>
        </div>
        
        <div class="profiles-scroll-container">
           <div 
              v-for="slot in allSlots" 
              :key="slot.index" 
              class="profile-item"
              :class="{ 'is-me': slot.isMe }"
           >
              <div class="avatar-ring" :class="{ 'empty': !slot.user, 'active': slot.user }">
                 <img v-if="slot.user && slot.user.avatar" :src="slot.user.avatar" class="profile-avatar" />
                 <div v-else-if="slot.user" class="profile-avatar placeholder">
                    {{ (slot.user.nickname || 'U')[0].toUpperCase() }}
                 </div>
                 <div v-else class="profile-avatar placeholder empty-icon">
                    <el-icon><Plus /></el-icon>
                 </div>
              </div>
              
              <span class="profile-name">
                 {{ slot.isMe ? '我' : (slot.user?.nickname || '待加入') }}
              </span>
              
              <span class="slot-number-tag">{{ slot.index }}号</span>
           </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { User, CopyDocument, Plus } from '@element-plus/icons-vue'
import { getSupabaseClient } from '@/utils/supabase'

interface CdkItem {
  id: string
  code: string
  parsed: any
  accountData: any
}

interface CoSharingUser {
  id: string
  avatar: string | null
  nickname: string | null
  slot_index: number
}

const props = defineProps<{
  cdkItem: CdkItem
  slotIndex: number
}>()

const coSharingUsers = ref<CoSharingUser[]>([])

// --- Logic for Slots ---
// 1. Get Max Slots from CDK
const maxSlots = computed(() => {
    if (!props.cdkItem) return 5 // Default fallback
    // Check accountData for max_slots
    if (props.cdkItem.accountData && props.cdkItem.accountData.max_slots) {
        return Number(props.cdkItem.accountData.max_slots)
    }
    return 5
})

// 2. Identify My Slot
// We use the prop slotIndex directly
const mySlotIndex = computed(() => props.slotIndex)

// 3. Build Full Slot List
const allSlots = computed(() => {
    const slots = []
    for (let i = 1; i <= maxSlots.value; i++) {
        const user = coSharingUsers.value.find(u => u.slot_index === i)
        // Check if this slot matches the "Me" slot index passed in
        const isMe = (i === Number(mySlotIndex.value))
        slots.push({
            index: i,
            user,
            isMe
        })
    }
    return slots
})

const occupiedCount = computed(() => coSharingUsers.value.length)


// 解析 CDK code 为字段对象
const parseCdkCode = (item: CdkItem) => {
  if (!item) return {}
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
  if (!props.cdkItem || !props.cdkItem.id) return
  const cdkId = props.cdkItem.id

  try {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('slot_occupancies')
      .select(`
        user_id,
        slot_index,
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
          nickname: item.profiles.nickname,
          slot_index: item.slot_index
        }))
    }
  } catch (err) {
    console.error('获取共享用户失败:', err)
  }
}

onMounted(() => {
  fetchCoSharingUsers()
})

watch(() => props.cdkItem, () => {
  fetchCoSharingUsers()
}, { deep: true })
</script>

<style scoped>
.glass-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  overflow: hidden;
  margin-top: 16px;
}

.delivery-content { 
  display: flex; flex-direction: column; 
}

/* 1. Credential Card */
.credential-card {
    background: linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.03) 100%);
    /* border-radius: 16px; removed inside card */
    /* border: 1px solid rgba(255,255,255,0.08); */
    overflow: hidden;
}

.credential-header {
    padding: 16px 24px;
    background: rgba(0,0,0,0.1);
    display: flex; align-items: center; 
    border-bottom: 1px solid rgba(255,255,255,0.05);
}

/* Premium Slot Badge Title */
.slot-title-badge {
    display: flex; align-items: center; gap: 10px;
}

.icon-box {
    width: 32px; height: 32px;
    background: linear-gradient(135deg, rgba(16, 185, 129, 0.2), rgba(5, 150, 105, 0.2));
    border: 1px solid rgba(16, 185, 129, 0.3);
    border-radius: 8px;
    display: flex; align-items: center; justify-content: center;
    color: #34D399; font-size: 16px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}

.slot-title-badge .label {
    font-size: 14px; font-weight: 500; color: #94A3B8;
}

.slot-title-badge .value {
    font-size: 16px; font-weight: 700; color: #fff;
    font-family: 'Outfit', sans-serif; 
    letter-spacing: 0.5px;
    text-shadow: 0 0 10px rgba(16, 185, 129, 0.3); 
}

.credential-body {
    padding: 16px 20px;
    display: flex; flex-direction: column; gap: 12px;
}

.credential-row {
    display: flex; flex-direction: column; gap: 4px;
}

.row-label { font-size: 12px; color: #64748B; }

.row-value-group {
    display: flex; align-items: center; gap: 10px;
}

.row-value {
    font-family: 'Monaco', monospace; font-size: 16px; color: #fff; letter-spacing: 0.5px;
    background: rgba(0,0,0,0.2); padding: 4px 8px; border-radius: 4px;
}

.copy-btn-icon {
    background: rgba(255,255,255,0.1); border: none; color: #94A3B8;
    width: 28px; height: 28px; border-radius: 6px;
    display: flex; align-items: center; justify-content: center;
    cursor: pointer; transition: all 0.2s;
}
.copy-btn-icon:hover { background: rgba(255,255,255,0.2); color: #fff; transform: translateY(-1px); }


/* 2. Roommates Section (Netflix Style) */
.roommates-section {
    border-top: 1px solid rgba(255,255,255,0.05);
    padding: 20px 24px 24px;
    background: linear-gradient(to bottom, rgba(15,23,42,0.4), rgba(15,23,42,0.6));
}

.roommates-header {
    display: flex; justify-content: space-between; align-items: center;
    margin-bottom: 16px;
}
.header-title { font-size: 13px; font-weight: 600; color: #CBD5E1; }
.header-count { font-size: 12px; color: #64748B; }

.profiles-scroll-container {
    display: flex; align-items: flex-start; gap: 20px;
    overflow-x: auto;
    padding-bottom: 8px; 
    scrollbar-width: none; 
}
.profiles-scroll-container::-webkit-scrollbar { display: none; }

.profile-item {
    display: flex; flex-direction: column; align-items: center; gap: 8px;
    width: 64px; flex-shrink: 0;
    transition: transform 0.2s;
    cursor: pointer;
}
.profile-item:hover { transform: translateY(-2px); }

.avatar-ring {
    width: 56px; height: 56px;
    border-radius: 12px;
    border: 2px solid rgba(255,255,255,0.1);
    padding: 2px; 
    display: flex; align-items: center; justify-content: center;
    transition: border-color 0.3s;
}

.profile-item:hover .avatar-ring { border-color: #E2E8F0; }

/* Placeholder Avatar with Gradient */
.profile-avatar.placeholder {
    background: linear-gradient(135deg, #475569, #334155);
    color: #CBD5E1; font-weight: 700; font-size: 20px;
    border: none;
}
.profile-avatar {
    width: 100%; height: 100%;
    border-radius: 8px; 
    object-fit: cover;
    background: #1E293B;
}

.profile-name {
    font-size: 11px; color: #94A3B8; text-align: center;
    white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
    width: 100%;
    transition: color 0.2s;
}
.profile-item:hover .profile-name { color: #fff; }

/* Empty Slot Styling */
.empty-slot { opacity: 0.5; cursor: default; }
.empty-slot:hover { transform: none; }
.avatar-ring.empty { border-style: dashed; border-color: rgba(255,255,255,0.1); color: #64748B; }

/* Me Highlight - Subtle gold ring or text */
.profile-item.is-me .avatar-ring {
    border-color: #10B981; /* Green for me */
    box-shadow: 0 0 10px rgba(16, 185, 129, 0.3);
}
.profile-item.is-me .profile-name {
    color: #10B981; font-weight: 700;
}
</style>

