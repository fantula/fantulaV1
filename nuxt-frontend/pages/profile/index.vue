<template>
  <ProfilePersonalInfo :user="userInfo" @update:user="handleUserUpdate" />
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from 'vue'
import ProfilePersonalInfo from '@/components/ProfilePersonalInfo.vue'
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

// 从 UserStore 获取真实用户数据
const userInfo = computed(() => {
  const storeUser = userStore.user
  if (storeUser) {
    return {
      id: storeUser.id,
      uid: storeUser.uid || storeUser.id?.slice(0, 8) || '未分配',
      nickname: storeUser.nickName || storeUser.nickname || storeUser.email?.split('@')[0] || '用户',
      avatar: storeUser.avatar || '',
      email: storeUser.email || '未绑定',
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

 