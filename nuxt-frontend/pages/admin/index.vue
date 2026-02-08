<template>
  <div class="dashboard-page">
    <div class="page-header">
      <h2>仪表盘</h2>
      <p class="subtitle">欢迎回到凡图拉后台管理系统</p>
    </div>

    <AdminPageSkeleton v-if="loading" type="dashboard" />
    
    <div v-else class="dashboard-content">
      <!-- 核心数据卡片 -->
      <el-row :gutter="20" class="metric-row">
        <el-col :span="6">
          <el-card shadow="hover" class="metric-card">
            <template #header>
              <div class="card-header">
                <span>今日新增订单</span>
                <el-icon class="icon-increase"><Top /></el-icon>
              </div>
            </template>
            <div class="metric-content">
              <el-statistic :value="stats.today_orders" />
              <div class="metric-sub">昨日: {{ stats.yesterday_orders }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="metric-card">
            <template #header>
              <div class="card-header">
                <span>今日营业额</span>
                <el-icon class="icon-money"><Money /></el-icon>
              </div>
            </template>
            <div class="metric-content">
              <el-statistic :value="stats.today_sales" prefix="¥" :precision="2" />
               <div class="metric-sub">昨日: ¥{{ Number(stats.yesterday_sales).toFixed(2) }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="metric-card">
            <template #header>
              <div class="card-header">
                <span>商品总数</span>
                 <el-icon><Goods /></el-icon>
              </div>
            </template>
             <div class="metric-content">
              <el-statistic :value="stats.total_products" />
              <div class="metric-sub">上架中: {{ stats.active_products }}</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="6">
          <el-card shadow="hover" class="metric-card">
            <template #header>
              <div class="card-header">
                <span>今日新增用户</span>
                 <el-icon><User /></el-icon>
              </div>
            </template>
            <div class="metric-content">
              <el-statistic :value="stats.today_new_users" />
              <div class="metric-sub">本月: {{ stats.month_new_users }}</div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <!-- 图表展示区 -->
      <el-row :gutter="20" class="chart-row">
        <el-col :span="12">
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <div class="card-header">
                <span>近7日订单趋势</span>
              </div>
            </template>
            <div class="chart-container">
              <!-- 简单SVG折线图: 订单 -->
              <div class="chart-wrapper">
                 <!-- 这里使用简单的 CSS 柱状图代替复杂 SVG，因为 SVG 需要计算路径 -->
                 <div class="simple-bar-chart">
                    <div v-for="(item, index) in stats.order_trend" :key="index" class="bar-group">
                       <div class="bar-col">
                           <div class="bar-val">{{ item.count }}</div>
                           <div class="bar-fill" :style="{ height: `${calculatePercent(item.count, maxOrderCount)}%` }"></div>
                       </div>
                       <div class="bar-label">{{ formatDate(item.date) }}</div>
                    </div>
                 </div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card shadow="hover" class="chart-card">
            <template #header>
              <div class="card-header">
                <span>近7日销售额趋势</span>
              </div>
            </template>
            <div class="chart-container">
               <div class="chart-wrapper">
                 <div class="simple-bar-chart sales">
                    <div v-for="(item, index) in stats.sales_trend" :key="index" class="bar-group">
                       <div class="bar-col">
                           <div class="bar-val">¥{{ item.amount }}</div>
                           <div class="bar-fill" :style="{ height: `${calculatePercent(item.amount, maxSalesAmount)}%` }"></div>
                       </div>
                       <div class="bar-label">{{ formatDate(item.date) }}</div>
                    </div>
                 </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <div class="secondary-metrics" style="margin-top: 20px;">
         <el-alert
            v-if="stats.cdk_warning_count > 0"
            :title="`CDK 库存预警：有 ${stats.cdk_warning_count} 个热销商品 CDK 库存不足 10 个，请及时补货。`"
            type="warning"
            show-icon
            :closable="false"
          />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { Top, Money, Goods, User } from '@element-plus/icons-vue'
import AdminPageSkeleton from '@/components/admin/base/AdminPageSkeleton.vue'
import { adminDashboardApi, type DashboardStats } from '@/api/admin/dashboard'

definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"],
  title: '仪表盘'
})

const loading = ref(true)
const stats = ref<DashboardStats>({
  today_orders: 0, yesterday_orders: 0,
  today_sales: 0, yesterday_sales: 0,
  total_products: 0, active_products: 0,
  today_new_users: 0, month_new_users: 0,
  cdk_warning_count: 0,
  order_trend: [], sales_trend: []
})

const loadStats = async () => {
    loading.value = true
    try {
        const res = await adminDashboardApi.getStats()
        if (res.success && res.data) {
            stats.value = res.data
        }
    } catch (e) {
        console.error(e)
    } finally {
        loading.value = false
    }
}

// Helpers for Chart
const maxOrderCount = computed(() => {
    if (!stats.value.order_trend.length) return 10
    return Math.max(...stats.value.order_trend.map(i => i.count)) || 10
})

const maxSalesAmount = computed(() => {
    if (!stats.value.sales_trend.length) return 100
    return Math.max(...stats.value.sales_trend.map(i => i.amount)) || 100
})

const calculatePercent = (val: number, max: number) => {
    if (max === 0) return 0
    return Math.min(100, (val / max) * 100)
}

const formatDate = (dateStr: string) => {
    const d = new Date(dateStr)
    return `${d.getMonth() + 1}-${d.getDate()}`
}

onMounted(() => {
  loadStats()
})
</script>

<style scoped>
.dashboard-page {
  padding: 24px;
  background-color: transparent;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 24px;
}
.page-header h2 {
  margin: 0;
  font-size: 24px;
  color: var(--admin-text-primary);
}
.subtitle {
  margin: 5px 0 0;
  color: var(--admin-text-secondary);
  font-size: 14px;
}

.metric-row {
  margin-bottom: 24px;
}

.metric-card {
  height: 100%;
  transition: all 0.3s;
  background-color: var(--el-bg-color-overlay); /* Ensure card uses element plus var */
  border-color: var(--el-border-color-light);
}
.metric-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 14px;
  color: var(--admin-text-regular);
  font-weight: 500;
}

.metric-content {
  text-align: center;
  padding: 10px 0;
}
.metric-sub {
  margin-top: 8px;
  font-size: 12px;
  color: var(--admin-text-secondary);
}

.icon-increase { color: #F56C6C; }
.icon-money { color: #67C23A; }

.chart-card {
  height: 300px;
  background-color: var(--el-bg-color-overlay);
  border-color: var(--el-border-color-light);
}
.chart-container {
  height: 200px;
  display: flex;
  flex-direction: column;
}

/* Simple Bar Chart Styles */
.chart-wrapper { width: 100%; height: 100%; padding-top: 20px; }
.simple-bar-chart {
  display: flex; justify-content: space-between; align-items: flex-end;
  height: 100%; width: 100%; padding-bottom: 20px;
}
.bar-group {
    display: flex; flex-direction: column; align-items: center;
    flex: 1; height: 100%; justify-content: flex-end; gap: 8px;
}
.bar-col {
    width: 20px; background: rgba(64, 158, 255, 0.1);
    border-radius: 4px; position: relative;
    display: flex; align-items: flex-end;
    height: 80%; /* leave space for label */
}
.bar-fill {
    width: 100%; background: #409EFF; border-radius: 4px;
    min-height: 4px; transition: height 0.5s ease;
}
.sales .bar-fill { background: #67C23A; }
.sales .bar-col { background: rgba(103, 194, 58, 0.1); }

.bar-val { font-size: 10px; color: var(--text-muted); margin-bottom: 4px; }
.bar-label { font-size: 12px; color: var(--text-secondary); }

.chart-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  font-size: 12px;
  color: var(--admin-text-secondary);
  margin-top: 5px;
}
</style>
