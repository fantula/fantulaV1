<template>
  <div class="scheduler-page">
    <!-- 状态概览 -->
    <div class="status-grid">
      <div class="status-card" :class="{ active: status.isRunning }">
        <div class="icon-wrapper">
          <el-icon v-if="status.isRunning" class="rotating"><Loading /></el-icon>
          <el-icon v-else><VideoPause /></el-icon>
        </div>
        <div class="info">
          <div class="label">服务状态</div>
          <div class="value">{{ status.isRunning ? '运行中' : '已停止' }}</div>
        </div>
        <div class="actions">
           <el-button 
            v-if="!status.isRunning" 
            type="success" 
            size="small"
            @click="toggleScheduler(true)"
            :loading="actionLoading"
          >启动服务</el-button>
          <el-button 
            v-else 
            type="danger" 
            size="small"
            @click="toggleScheduler(false)"
            :loading="actionLoading"
          >停止服务</el-button>
        </div>
      </div>

      <div class="status-card info">
        <div class="info-item">
          <div class="label">上次执行</div>
          <div class="value">{{ formatTime(status.lastRun) }}</div>
        </div>
        <div class="info-divider"></div>
        <div class="info-item">
          <div class="label">执行频率</div>
          <div class="value">每 5 分钟</div>
        </div>
      </div>
    </div>

    <!-- 任务控制 -->
    <AdminActionCard title="手动触发任务" class="mt-4">
       <div class="tasks-grid">
          <div class="task-item">
             <div class="task-meta">
               <span class="task-name">清理过期预订单</span>
               <span class="task-desc">检测并释放超时的待支付订单库存</span>
             </div>
             <el-button 
                type="primary" 
                plain
                :icon="CaretRight"
                @click="runTask('cleanup_expired_preorders')"
                :loading="runningTask === 'cleanup_expired_preorders'"
             >执行</el-button>
          </div>
       </div>
    </AdminActionCard>

    <!-- 执行日志 -->
    <AdminActionCard title="执行日志" class="mt-4">
        <template #header-actions>
           <el-button :icon="Refresh" circle @click="fetchLogs" :loading="logsLoading" />
        </template>
        
        <el-table :data="logs" style="width: 100%" v-loading="logsLoading" stripe>
           <el-table-column label="执行时间" width="200">
             <template #default="{ row }">
               {{ formatTime(row.executed_at) }}
             </template>
           </el-table-column>
           <el-table-column prop="task_name" label="任务名称" />
           <el-table-column label="状态" width="100">
             <template #default="{ row }">
               <el-tag :type="row.status === 'success' ? 'success' : 'danger'" size="small">
                 {{ row.status === 'success' ? '成功' : '失败' }}
               </el-tag>
             </template>
           </el-table-column>
           <el-table-column prop="affected_count" label="处理数量" width="120" align="right" />
        </el-table>
    </AdminActionCard>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, onMounted, onUnmounted } from 'vue'
import { Loading, VideoPause, CaretRight, Refresh } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { adminSchedulerApi, type SchedulerStatus, type SchedulerLog } from '@/api/admin'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'

// State
const status = ref<SchedulerStatus>({
  isRunning: false,
  lastRun: null,
  lastResult: null
})

const logs = ref<SchedulerLog[]>([])
const actionLoading = ref(false)
const logsLoading = ref(false)
const runningTask = ref('')

// Methods
const fetchStatus = async () => {
  const data = await adminSchedulerApi.getStatus()
  status.value = data
}

const fetchLogs = async () => {
  logsLoading.value = true
  try {
    const res = await adminSchedulerApi.getLogs()
    if (res.success) {
      logs.value = res.logs
    }
  } finally {
    logsLoading.value = false
  }
}

const toggleScheduler = async (start: boolean) => {
  actionLoading.value = true
  try {
    const res = start ? await adminSchedulerApi.start() : await adminSchedulerApi.stop()
    if (res.success) {
      ElMessage.success(start ? '服务已启动' : '服务已停止')
      await fetchStatus()
    } else {
      ElMessage.warning(res.message || '操作失败')
    }
  } catch (e: any) {
    ElMessage.error('操作异常: ' + e.message)
  } finally {
    actionLoading.value = false
  }
}

const runTask = async (taskName: string) => {
  runningTask.value = taskName
  try {
    const res = await adminSchedulerApi.runTask(taskName)
    if (res.success) {
      ElMessage.success(`执行完成，处理 ${res.expired_count || 0} 条数据`)
      await fetchLogs()
    } else {
      ElMessage.error(res.error || '执行失败')
    }
  } catch (e: any) {
    ElMessage.error('执行异常: ' + e.message)
  } finally {
    runningTask.value = ''
  }
}

const formatTime = (time: string | null) => {
  if (!time) return '-'
  return new Date(time).toLocaleString('zh-CN', {
    month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit', second: '2-digit'
  })
}

// Auto Refresh
let interval: any = null

onMounted(() => {
  fetchStatus()
  fetchLogs()
  interval = setInterval(fetchStatus, 30000)
})

onUnmounted(() => {
  if (interval) clearInterval(interval)
})
</script>

<style scoped>
.status-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
}

.status-card {
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 8px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
}
.status-card.active {
    border-color: var(--el-color-success-light-5);
    background: var(--el-color-success-light-9);
}

.icon-wrapper {
  width: 48px;
  height: 48px;
  border-radius: 12px;
  background: var(--el-fill-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: var(--el-text-color-secondary);
}
.active .icon-wrapper {
    background: var(--el-color-success);
    color: white;
}

.info {
    flex: 1;
}
.info .label {
    font-size: 13px;
    color: var(--el-text-color-secondary);
}
.info .value {
    font-size: 18px;
    font-weight: 600;
    color: var(--el-text-color-primary);
}

.status-card.info {
    display: flex;
    justify-content: space-around;
    padding: 20px 0;
}
.info-item {
    text-align: center;
}
.info-divider {
    width: 1px;
    height: 30px;
    background: var(--el-border-color-lighter);
}

.rotating {
    animation: rotate 2s linear infinite;
}
@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.mt-4 {
    margin-top: 20px;
}

.tasks-grid {
    display: flex;
    gap: 20px;
}
.task-item {
    flex: 1;
    background: var(--el-fill-color-light);
    padding: 15px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.task-meta {
    display: flex;
    flex-direction: column;
}
.task-name {
    font-weight: 500;
    margin-bottom: 4px;
}
.task-desc {
    font-size: 12px;
    color: var(--el-text-color-secondary);
}
</style>
