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
                 <AdminSimpleChart 
                    :data="stats.order_trend" 
                    value-key="count" 
                    label-key="date" 
                 />
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
                 <AdminSimpleChart 
                    :data="stats.sales_trend" 
                    value-key="amount" 
                    label-key="date" 
                    value-prefix="¥"
                    is-sales
                 />
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
import { ref, onMounted } from 'vue'
import { Top, Money, Goods, User } from '@element-plus/icons-vue'
import AdminPageSkeleton from '@/components/admin/base/AdminPageSkeleton.vue'
import AdminSimpleChart from '@/components/admin/base/AdminSimpleChart.vue'
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
        ElMessage.error('加载统计数据失败，请刷新重试')
    } finally {
        loading.value = false
    }
}

// Helpers for Chart removed (moved to component)

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

/* Simple Bar Chart Styles Removed - see AdminSimpleChart */
.chart-wrapper { width: 100%; height: 100%; padding-top: 20px; }

.chart-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  font-size: 12px;
  color: var(--admin-text-secondary);
  margin-top: 5px;
}
</style>
