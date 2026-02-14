<template>
  <div class="mobile-shared-card">
    
    <!-- 1. Credentials -->
    <div class="info-card-glass">
       <div class="card-header">
          <div class="slot-badge">
             <el-icon class="slot-icon"><User /></el-icon>
             <span>我的车位: {{ formatSlotIndex(slotIndex) }}号</span>
          </div>
       </div>

       <div class="card-body">
          <div v-for="(val, key) in parseCdkCode(cdkItem)" :key="key" class="cred-row">
             <div class="cred-label">{{ key }}</div>
             <div class="cred-value-box">
                <span class="cred-value">{{ val }}</span>
                <div class="copy-tag" @click="copyText(String(val))">
                   <el-icon><CopyDocument /></el-icon>
                </div>
             </div>
          </div>
       </div>
    </div>

    <!-- 2. Roommates -->
    <div class="info-card-glass">
       <div class="card-header">
          <span class="section-title">共享车友</span>
          <span class="count-badge">{{ occupiedCount }}/{{ maxSlots }}</span>
       </div>
       
       <div class="card-body">
           <div class="roommates-scroll">
              <div 
                 v-for="slot in allSlots" 
                 :key="slot.index" 
                 class="roommate-item"
                 :class="{ 'is-me': slot.isMe }"
              >
                 <div class="avatar-box" :class="{ 'active': slot.user }">
                    <img v-if="slot.user && slot.user.avatar" :src="slot.user.avatar" />
                    <div v-else-if="slot.user" class="avatar-placeholder">
                       {{ (slot.user.nickname || 'U')[0].toUpperCase() }}
                    </div>
                    <div v-else class="avatar-placeholder empty">
                       <el-icon><Plus /></el-icon>
                    </div>
                 </div>
                 <div class="roommate-name">{{ slot.isMe ? '我' : (slot.user?.nickname || '空') }}</div>
                 <div class="slot-num">{{ slot.index }}号</div>
              </div>
           </div>
       </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, computed } from 'vue'
import { User, CopyDocument, Plus } from '@element-plus/icons-vue'
import { getSupabaseClient } from '@/utils/supabase'
import { useToast } from '@/composables/mobile/useToast'

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

const { showToast } = useToast()
const coSharingUsers = ref<CoSharingUser[]>([])

// Logic reused from PC
const maxSlots = computed(() => {
    if (!props.cdkItem) return 5
    if (props.cdkItem.accountData && props.cdkItem.accountData.max_slots) {
        return Number(props.cdkItem.accountData.max_slots)
    }
    return 5
})

const mySlotIndex = computed(() => props.slotIndex)

const allSlots = computed(() => {
    const slots = []
    for (let i = 1; i <= maxSlots.value; i++) {
        const user = coSharingUsers.value.find(u => u.slot_index === i)
        const isMe = (i === Number(mySlotIndex.value))
        slots.push({ index: i, user, isMe })
    }
    return slots
})

const occupiedCount = computed(() => coSharingUsers.value.length)

const parseCdkCode = (item: CdkItem) => {
  if (!item) return {}
  if (item.parsed && typeof item.parsed === 'object') return item.parsed
  try { return JSON.parse(item.code) } catch { return { '激活码': item.code } }
}

const copyText = (t: string) => {
  navigator.clipboard.writeText(t).then(() => showToast('已复制', 'success'))
}

const formatSlotIndex = (idx?: number) => String(idx || 0).padStart(2, '0')

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
        profiles:user_id (id, avatar, nickname)
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
  } catch (err) { console.error(err) }
}

onMounted(fetchCoSharingUsers)
watch(() => props.cdkItem, fetchCoSharingUsers, { deep: true })
</script>

<style scoped>
.mobile-shared-card {
  display: flex; flex-direction: column; gap: 16px; width: 100%;
}

/* Glass Card */
.info-card-glass {
    background: #1E293B; /* Slate 800 base */
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 16px; 
    overflow: hidden;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
}

.card-header {
  padding: 10px 16px; border-bottom: 1px solid rgba(255,255,255,0.05);
  display: flex; justify-content: space-between; align-items: center;
}
.card-body { padding: 16px; display: flex; flex-direction: column; gap: 12px; }

/* Slot Badge */
.slot-badge {
  display: flex; align-items: center; gap: 6px;
  font-size: 13px; font-weight: 600; color: #34D399;
}
.slot-icon { font-size: 14px; }

/* Credentials */
.cred-row { display: flex; flex-direction: column; gap: 4px; }
.cred-label { font-size: 11px; color: #64748B; }
.cred-value-box {
  display: flex; align-items: center; gap: 8px;
  background: rgba(0,0,0,0.2); border-radius: 8px; padding: 8px 12px;
}
.cred-value {
  flex: 1; font-family: 'Monaco', monospace; font-size: 13px; color: #fff;
  word-break: break-all;
}

/* Copy Tag */
.copy-tag {
  display: flex; align-items: center; justify-content: center;
  width: 28px; height: 28px;
  background: rgba(255,255,255,0.1);
  border-radius: 8px;
  color: #CBD5E1; cursor: pointer;
  transition: all 0.2s;
  flex-shrink: 0;
}
.copy-tag:active { background: rgba(255,255,255,0.2); color: #fff; }
.copy-tag .el-icon { font-size: 14px; }

/* Roommates Header */
.section-title { font-size: 13px; font-weight: 600; color: #CBD5E1; }
.count-badge { 
    font-size: 11px; color: #94A3B8; 
    background: rgba(255,255,255,0.05); padding: 2px 8px; border-radius: 12px; 
}

/* Roommates Grid */
.roommates-scroll {
  display: flex; gap: 12px; overflow-x: auto; padding-bottom: 4px;
}
.roommates-scroll::-webkit-scrollbar { display: none; }

.roommate-item {
  display: flex; flex-direction: column; align-items: center; gap: 6px;
  width: 52px; flex-shrink: 0;
}
.avatar-box {
  width: 44px; height: 44px; border-radius: 12px; overflow: hidden;
  background: #0F172A; border: 1px solid rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  position: relative;
}
.avatar-box.active { border-color: #475569; }
.avatar-box img { width: 100%; height: 100%; object-fit: cover; }
.avatar-placeholder {
  font-size: 14px; font-weight: 700; color: #64748B;
  background: linear-gradient(135deg, #1E293B, #0F172A);
  width: 100%; height: 100%; display: flex; align-items: center; justify-content: center;
}
.avatar-placeholder.empty { opacity: 0.5; }

.roommate-item.is-me .avatar-box { 
    border-color: #10B981; 
    box-shadow: 0 0 10px rgba(16,185,129,0.2); 
}
.roommate-name { font-size: 10px; color: #64748B; white-space: nowrap; overflow: hidden; width: 100%; text-align: center; text-overflow: ellipsis;}
.roommate-item.is-me .roommate-name { color: #10B981; font-weight: 600; }
.slot-num { font-size: 9px; color: #475569; background: rgba(255,255,255,0.05); padding: 1px 6px; border-radius: 4px; }
</style>
