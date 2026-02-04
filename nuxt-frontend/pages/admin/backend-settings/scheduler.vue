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

      <div class="status-card stats">
        <div class="stat-item">
          <div class="stat-value">{{ Object.keys(taskGroups).length }}</div>
          <div class="stat-label">任务组</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-value">{{ taskList.length }}</div>
          <div class="stat-label">任务数</div>
        </div>
        <div class="stat-divider"></div>
        <div class="stat-item">
          <div class="stat-value">{{ formatTime(status.lastRun) }}</div>
          <div class="stat-label">上次执行</div>
        </div>
      </div>
    </div>

    <!-- 任务分组 -->
    <div class="task-groups">
      <template v-for="(group, groupKey) in taskGroups" :key="groupKey">
        <div class="group-card" :class="`group-${groupKey}`">
          <div class="group-header">
            <div class="group-title">
              <el-icon class="group-icon">
                <Timer v-if="groupKey === 'frequent'" />
                <Sunny v-else-if="groupKey === 'daily'" />
                <Calendar v-else />
              </el-icon>
              <span>{{ group.description }}</span>
            </div>
            <el-tag :type="getGroupTagType(groupKey)" size="small" effect="plain">
              {{ group.cron }}
            </el-tag>
          </div>

          <div class="task-list">
            <div 
              v-for="task in getTasksByGroup(groupKey)" 
              :key="task.key" 
              class="task-item"
            >
              <div class="task-info">
                <div class="task-name">{{ task.name }}</div>
                <div class="task-desc">{{ task.description }}</div>
              </div>
              <el-button 
                type="primary" 
                plain
                size="small"
                :icon="CaretRight"
                @click="runTask(task.key)"
                :loading="runningTask === task.key"
              >执行</el-button>
            </div>
          </div>
        </div>
      </template>
    </div>

    <!-- 执行日志 -->
    <div class="logs-section">
      <div class="section-header">
        <h3>
          <el-icon><Document /></el-icon>
          执行日志
        </h3>
        <el-button :icon="Refresh" circle @click="fetchLogs" :loading="logsLoading" />
      </div>
      
      <el-table :data="paginatedLogs" style="width: 100%" v-loading="logsLoading" stripe>
        <el-table-column label="执行时间" width="160">
          <template #default="{ row }">
            {{ formatTime(row.executed_at) }}
          </template>
        </el-table-column>
        <el-table-column prop="task_name" label="任务" min-width="180">
          <template #default="{ row }">
            <div class="task-cell">
              <span class="task-key">{{ getTaskDisplayName(row.task_name) }}</span>
              <el-tag 
                v-if="getTaskGroup(row.task_name)"
                :type="getGroupTagType(getTaskGroup(row.task_name))" 
                size="small" 
                effect="light"
              >
                {{ getTaskGroup(row.task_name) }}
              </el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="row.status === 'success' ? 'success' : 'danger'" size="small">
              {{ row.status === 'success' ? '成功' : '失败' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="affected_count" label="处理数" width="100" align="right">
          <template #default="{ row }">
            <span class="affected-count">{{ row.affected_count || 0 }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="error" label="错误信息" show-overflow-tooltip />
      </el-table>

      <!-- 分页 -->
      <div class="logs-pagination" v-if="logs.length > pageSize">
        <el-pagination
          v-model:current-page="currentPage"
          :page-size="pageSize"
          :total="logs.length"
          layout="prev, pager, next"
          background
          small
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, computed, onMounted } from 'vue'
import { Loading, VideoPause, CaretRight, Refresh, Timer, Sunny, Calendar, Document } from '@element-plus/icons-vue'

// Task display name mapping
const taskDisplayNames: Record<string, string> = {
  cleanup_expired_preorders: '清理过期预订单',
  expire_active_orders: '过期订单处理',
  cleanup_unverified_users: '清理未验证用户',
  cleanup_expired_wechat_sessions: '清理过期微信会话',
  cleanup_expired_order_fulfillments: '清理过期订单回执',
  cleanup_old_expired_preorders: '清理老旧预订单'
}

const getTaskDisplayName = (key: string) => taskDisplayNames[key] || key

// Pagination
const currentPage = ref(1)
const pageSize = 15

// Use Composable
const {
  status,
  logs,
  taskList,
  taskGroups,
  actionLoading,
  logsLoading,
  runningTask,
  fetchLogs,
  toggleScheduler,
  runTask,
  startAutoRefresh,
  formatTime
} = useAdminScheduler()

// Computed
const paginatedLogs = computed(() => {
  const start = (currentPage.value - 1) * pageSize
  return logs.value.slice(start, start + pageSize)
})

// Methods
const getTasksByGroup = (groupKey: string) => {
  return taskList.value.filter(t => t.group === groupKey)
}

const getTaskGroup = (taskName: string) => {
  const task = taskList.value.find(t => t.key === taskName)
  return task?.group || ''
}

const getGroupTagType = (groupKey: string): 'warning' | 'info' | 'primary' | 'success' => {
  const types: Record<string, 'warning' | 'info' | 'primary' | 'success'> = {
    frequent: 'warning',
    daily: 'info',
    weekly: 'primary'
  }
  return types[groupKey] || 'info'
}

// Lifecycle
onMounted(() => {
  startAutoRefresh()
})
</script>

<style scoped>
.scheduler-page {
  padding: 0;
}

/* Status Grid */
.status-grid {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 20px;
  margin-bottom: 24px;
}

.status-card {
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 12px;
  padding: 20px 24px;
  display: flex;
  align-items: center;
  gap: 20px;
  transition: all 0.3s ease;
}

.status-card.active {
  border-color: var(--el-color-success-light-5);
  background: linear-gradient(135deg, var(--el-color-success-light-9), var(--el-bg-color));
}

.icon-wrapper {
  width: 52px;
  height: 52px;
  border-radius: 14px;
  background: var(--el-fill-color);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 26px;
  color: var(--el-text-color-secondary);
}

.active .icon-wrapper {
  background: var(--el-color-success);
  color: white;
  box-shadow: 0 4px 12px rgba(103, 194, 58, 0.3);
}

.info {
  flex: 1;
}
.info .label {
  font-size: 13px;
  color: var(--el-text-color-secondary);
  margin-bottom: 4px;
}
.info .value {
  font-size: 20px;
  font-weight: 600;
  color: var(--el-text-color-primary);
}

/* Stats Card */
.status-card.stats {
  display: flex;
  justify-content: space-around;
  padding: 20px 32px;
}

.stat-item {
  text-align: center;
}
.stat-value {
  font-size: 22px;
  font-weight: 600;
  color: var(--el-text-color-primary);
  margin-bottom: 4px;
}
.stat-label {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}
.stat-divider {
  width: 1px;
  height: 40px;
  background: var(--el-border-color-lighter);
}

.rotating {
  animation: rotate 2s linear infinite;
}
@keyframes rotate {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* Task Groups */
.task-groups {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
  gap: 20px;
  margin-bottom: 24px;
}

.group-card {
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 12px;
  overflow: hidden;
}

.group-header {
  padding: 16px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.group-frequent .group-header {
  background: linear-gradient(135deg, rgba(230, 162, 60, 0.1), transparent);
}
.group-daily .group-header {
  background: linear-gradient(135deg, rgba(64, 158, 255, 0.1), transparent);
}
.group-weekly .group-header {
  background: linear-gradient(135deg, rgba(103, 194, 58, 0.1), transparent);
}

.group-title {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 500;
  color: var(--el-text-color-primary);
}

.group-icon {
  font-size: 18px;
}
.group-frequent .group-icon { color: var(--el-color-warning); }
.group-daily .group-icon { color: var(--el-color-primary); }
.group-weekly .group-icon { color: var(--el-color-success); }

.task-list {
  padding: 12px;
}

.task-item {
  background: var(--el-fill-color-light);
  padding: 14px 16px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
  transition: all 0.2s ease;
}
.task-item:last-child {
  margin-bottom: 0;
}
.task-item:hover {
  background: var(--el-fill-color);
}

.task-info {
  flex: 1;
  margin-right: 12px;
}
.task-name {
  font-weight: 500;
  color: var(--el-text-color-primary);
  margin-bottom: 2px;
}
.task-desc {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

/* Logs Section */
.logs-section {
  background: var(--el-bg-color);
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 12px;
  padding: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}
.section-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--el-text-color-primary);
}

.task-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}
.task-key {
  font-weight: 500;
}

.affected-count {
  font-weight: 600;
  color: var(--el-color-primary);
}

.logs-pagination {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}

/* Responsive */
@media (max-width: 768px) {
  .status-grid {
    grid-template-columns: 1fr;
  }
  .task-groups {
    grid-template-columns: 1fr;
  }
}
</style>
