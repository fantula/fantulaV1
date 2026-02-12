<template>
  <div class="page-container">
    <PageTipHeader 
      title="系统信息" 
      description="查看当前系统服务运行状态及环境配置。" 
    />
    
    <div class="settings-dashboard">
      <el-card shadow="never" class="mb-4">
        <template #header>
          <div class="card-header">
            <span>系统信息</span>
            <el-tag type="success" size="small">正常运行</el-tag>
          </div>
        </template>
        <el-descriptions :column="2" border>
          <el-descriptions-item label="应用名称">凡图拉 Admin</el-descriptions-item>
          <el-descriptions-item label="当前环境">{{ isDev ? 'Development' : 'Production' }}</el-descriptions-item>
          <el-descriptions-item label="Supabase Url">{{ supabaseUrl }}</el-descriptions-item>
          <el-descriptions-item label="Edge Functions">{{ edgeUrl }}</el-descriptions-item>
        </el-descriptions>
      </el-card>

      <el-card shadow="never">
        <template #header>
          <div class="card-header">
            <span>服务连通性检测</span>
            <el-button type="primary" size="small" @click="checkAll" :loading="checking">重新检测</el-button>
          </div>
        </template>
        
        <div class="status-list">
          <div class="status-item">
            <div class="status-label">
              <el-icon><DataLine /></el-icon> Database Connection
            </div>
            <div class="status-value">
              <el-tag :type="dbStatus.type">{{ dbStatus.text }}</el-tag>
            </div>
          </div>
          
          <el-divider direction="horizontal" style="margin: 12px 0;" />
          
          <div class="status-item">
            <div class="status-label">
              <el-icon><Files /></el-icon> R2 Storage Connection
            </div>
            <div class="status-value">
              <el-tag :type="r2Status.type">{{ r2Status.text }}</el-tag>
            </div>
          </div>

          <el-divider direction="horizontal" style="margin: 12px 0;" />

          <div class="status-item">
             <div class="status-label">
                <el-icon><Service /></el-icon> Edge Function (Hello)
             </div>
             <div class="status-value">
                 <el-tag :type="edgeStatus.type">{{ edgeStatus.text }}</el-tag>
             </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { DataLine, Files, Service } from '@element-plus/icons-vue'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import { useAdminSystemStatus } from '@/composables/admin/useAdminSystemStatus'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

const { 
  isDev, 
  supabaseUrl, 
  edgeUrl, 
  dbStatus, 
  r2Status, 
  edgeStatus, 
  checking, 
  checkAll 
} = useAdminSystemStatus()

onMounted(() => {
    checkAll()
})
</script>

<style scoped>
.page-container {
    padding-bottom: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.status-list {
    display: flex;
    flex-direction: column;
}
.status-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 8px 0;
}
.status-label {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 14px;
    color: var(--el-text-color-regular);
}
</style>
