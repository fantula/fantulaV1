<template>
  <div class="r2-settings-page">
    <AdminActionCard title="R2 存储配置 (环境变量)">
      <div class="config-status">
         <el-alert
            title="配置已托管"
            type="info"
            :closable="false"
            show-icon
            class="mb-6"
         >
           <template #default>
             <div class="status-content">
                <p>当前 R2 配置已迁移至 <strong>Supabase Edge Function 环境变量</strong>，不再从数据库读取。</p>
                <p>如需修改密钥或存储桶，请在 Supabase Dashboard > Edge Functions > Secrets 中设置。</p>
             </div>
           </template>
         </el-alert>

         <div class="env-list">
            <h3>当前环境状态</h3>
            <div class="env-item">
               <span class="label">Config Source:</span>
               <span class="value"><el-tag type="success" size="small">Environment Variables</el-tag></span>
            </div>
            <div class="env-item">
               <span class="label">R2 Connection:</span>
               <span class="value">
                  <el-tag v-if="testResult?.success" type="success" size="small">Connected</el-tag>
                  <el-tag v-else-if="testResult && !testResult.success" type="danger" size="small">Error</el-tag>
                  <el-tag v-else type="info" size="small">Checking...</el-tag>
               </span>
            </div>
         </div>

         <div class="action-area">
             <el-button type="primary" :loading="testing" @click="testConnection" :icon="Connection">
               测试连接
             </el-button>
             <span v-if="testResult && testResult.success" class="text-green-600 text-sm ml-4">
               <el-icon class="mr-1 top-0.5 relative"><Check /></el-icon> 连接成功 (Bucket: fantula2601)
             </span>
             <span v-if="testResult && !testResult.success" class="text-red-500 text-sm ml-4">
               {{ testResult.message }}
             </span>
         </div>
      </div>
    </AdminActionCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, onMounted } from 'vue'
import { Connection, Check } from '@element-plus/icons-vue'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'

const testing = ref(false)
const testResult = ref<{ success: boolean; message: string } | null>(null)

const testConnection = async () => {
  testing.value = true
  testResult.value = null
  
  try {
    const { callEdgeFunction } = await import('@/utils/supabase')
    const { getAuthToken } = await import('@/utils/supabase')
    const token = await getAuthToken()
    
    if (!token) {
       ElMessage.error('请登录')
       testing.value = false
       return
    }

    // No body needed; function uses env vars
    const { data, error } = await callEdgeFunction('test-r2-connection', {
      method: 'POST',
      body: {}, 
      requireAuth: true,
      token: token
    })

    if (error) {
       testResult.value = {
         success: false,
         message: error
       }
    } else {
       testResult.value = {
         success: data.success,
         message: data.message || (data.success ? '连接成功' : '未知错误')
       }
    }

  } catch (e: any) {
    // console.error('Test connection exception:', e)
    testResult.value = {
      success: false,
      message: '前端异常: ' + (e.message || '未知错误')
    }
  } finally {
    testing.value = false
  }
}

onMounted(() => {
  testConnection()
})
</script>

<style scoped>
.config-status {
   max-width: 800px;
}
.status-content p {
   margin: 4px 0;
   font-size: 14px;
   line-height: 1.5;
}
.env-list {
   background: var(--el-fill-color-light);
   padding: 20px;
   border-radius: 8px;
   margin-bottom: 24px;
}
.env-list h3 {
   margin-top: 0;
   margin-bottom: 15px;
   font-size: 14px;
   color: var(--el-text-color-primary);
}
.env-item {
   display: flex;
   align-items: center;
   margin-bottom: 10px;
   font-size: 14px;
}
.env-item .label {
   color: var(--el-text-color-secondary);
   width: 120px;
}
.action-area {
   display: flex;
   align-items: center;
}
.mb-6 {
    margin-bottom: 24px;
}
.ml-4 { margin-left: 16px; }
.mr-1 { margin-right: 4px; }
</style>
