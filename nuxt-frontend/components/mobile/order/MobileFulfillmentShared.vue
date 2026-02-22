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
import { onMounted } from 'vue'
import { User, CopyDocument, Plus } from '@element-plus/icons-vue'
import { useToast } from '@/composables/mobile/useToast'
import { useCoSharing } from '@/composables/client/useCoSharing'
import type { CdkItem } from '@/composables/client/useCoSharing'

const props = defineProps<{
  cdkItem: CdkItem
  slotIndex: number
}>()

const { showToast } = useToast()

const {
  maxSlots,
  allSlots,
  occupiedCount,
  parseCdkCode,
  copyText,
  formatSlotIndex,
  fetchCoSharingUsers
} = useCoSharing({
  cdkItem: () => props.cdkItem,
  slotIndex: () => props.slotIndex,
  onCopySuccess: (msg) => showToast(msg, 'success')
})

onMounted(fetchCoSharingUsers)
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
