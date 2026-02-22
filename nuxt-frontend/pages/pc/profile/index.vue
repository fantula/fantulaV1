<template>
  <ProfilePersonalInfo :user="userInfo" @update:user="handleUserUpdate" />
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'pc'
})

import { ref, computed, onMounted, watch } from 'vue'
import ProfilePersonalInfo from '@/components/pc/ProfilePersonalInfo.vue'
import { useUserStore } from '@/stores/client/user'

const userStore = useUserStore()

// 从 UserStore 获取真实用户数据
const userInfo = computed(() => {
  const storeUser = userStore.user
  if (storeUser) {
    const su = storeUser as any
    return {
      id: su.id,
      uid: su.uid || su.id?.slice(0, 8) || '未分配',
      nickname: su.nickName || su.nickname || su.email?.split('@')[0] || '用户',
      avatar: su.avatar || '',
      email: su.email || '未绑定',
      isGoogleBound: false,
      googleEmail: ''
    }
  }
  // 未登录/加载中时的默认值 (Instant Default)
  return {
    id: '',
    uid: '---', // 占位符比"加载中"更干净
    nickname: '用户', // 默认称呼
    avatar: '',
    email: '未绑定',
    isGoogleBound: false,
    googleEmail: ''
  }
})

const handleUserUpdate = (newUser: any) => {
  // 触发 UserStore 重新获取用户信息
  userStore.fetchUserInfo()
}

onMounted(() => {
  // 如果用户已登录但数据尚未加载，尝试获取
  if (userStore.isLoggedIn && !userStore.user) {
    userStore.fetchUserInfo()
  }
})
</script>

 