<template>
  <div class="member-card" @click="$emit('click')">
    <div class="card-content">
      <div class="avatar-wrap">
        <img :src="user?.avatar || '/images/client/pc/avatars/avatar-cat.png'" class="avatar-img" />
      </div>
      <div class="user-details">
        <h1 class="username">{{ user?.nickname || 'FANTULA User' }}</h1>
        <div class="tags-row">
          <div class="tag-pill blue-pill">FANTULA Member</div>
          <div class="tag-pill green-pill">
            <el-icon class="icon-small"><CircleCheckFilled /></el-icon> 安全等级: 高
          </div>
        </div>
      </div>
      <el-icon class="card-arrow"><ArrowRight /></el-icon>
    </div>
    <!-- Decorative background glow -->
    <div class="card-glow"></div>
  </div>
</template>

<script setup lang="ts">
import { CircleCheckFilled, ArrowRight } from '@element-plus/icons-vue'

defineProps<{
  user: any
}>()

defineEmits(['click'])
</script>

<style scoped>
/* Premium Member Card */
.member-card {
  background: var(--cyber-bg-glass, rgba(15, 23, 42, 0.9));
  border: 1px solid var(--cyber-border, rgba(6, 182, 212, 0.3));
  border-radius: 20px;
  padding: 20px;
  position: relative;
  overflow: hidden;
  box-shadow: 0 10px 30px -5px rgba(0,0,0,0.4), 0 0 20px rgba(6, 182, 212, 0.1);
  backdrop-filter: blur(12px);
}

/* Card Glow Effect */
.card-glow {
  position: absolute; top: -50px; right: -50px;
  width: 150px; height: 150px;
  background: radial-gradient(circle, rgba(0, 255, 255, 0.2) 0%, transparent 70%); /* Neon Cyan Glow */
  pointer-events: none;
  z-index: 1;
  filter: blur(20px);
}

.card-content {
  display: flex; align-items: center; gap: 16px;
  position: relative; z-index: 2;
}

.avatar-wrap {
  width: 60px; height: 60px; border-radius: 50%;
  border: 2px solid var(--cyber-primary, #06B6D4); /* Cyan Border */
  box-shadow: 0 0 15px rgba(6, 182, 212, 0.4);
  overflow: hidden; flex-shrink: 0;
  background: #000;
}
.avatar-img { width: 100%; height: 100%; object-fit: cover; }

.user-details { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 6px; }
.username { 
  font-size: 22px; font-weight: 800; color: #fff; margin: 0; 
  line-height: 1.2; letter-spacing: 0.5px;
  text-shadow: 0 0 10px rgba(255, 255, 255, 0.1);
}

.tags-row { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

.tag-pill {
  font-size: 10px; font-weight: 600; padding: 2px 8px; border-radius: 6px;
  display: inline-flex; align-items: center; gap: 4px;
  border: 1px solid transparent;
}
.blue-pill {
  background: rgba(6, 182, 212, 0.15); color: #00FFFF; border-color: rgba(6, 182, 212, 0.3);
  box-shadow: 0 0 8px rgba(6, 182, 212, 0.2);
}
.green-pill {
  background: rgba(34, 197, 94, 0.15); color: #4ADE80; border-color: rgba(34, 197, 94, 0.3);
}
.icon-small { font-size: 12px; }

.card-arrow {
  color: #94A3B8; font-size: 18px;
  transition: transform 0.2s;
}
.member-card:active .card-arrow { transform: translateX(3px); color: #00FFFF; }
</style>
