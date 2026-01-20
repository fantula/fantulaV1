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
              <el-statistic :value="128" />
              <div class="metric-sub">昨日: 105</div>
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
              <el-statistic :value="12880" prefix="¥" :precision="2" />
               <div class="metric-sub">昨日: ¥11,200.00</div>
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
              <el-statistic :value="356" />
              <div class="metric-sub">上架中: 350</div>
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
              <el-statistic :value="42" />
              <div class="metric-sub">本月: 1,204</div>
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
              <svg viewBox="0 0 500 200" class="line-chart">
                <!-- Grid lines -->
                <line x1="50" y1="150" x2="450" y2="150" stroke="#eee" />
                <line x1="50" y1="100" x2="450" y2="100" stroke="#eee" />
                <line x1="50" y1="50" x2="450" y2="50" stroke="#eee" />
                
                <!-- Data path -->
                <path d="M50,140 L116,120 L182,145 L248,80 L314,90 L380,40 L446,60" 
                      fill="none" 
                      stroke="#409EFF" 
                      stroke-width="3" />
                <!-- Points -->
                <circle cx="50" cy="140" r="4" fill="#fff" stroke="#409EFF" stroke-width="2"/>
                <circle cx="116" cy="120" r="4" fill="#fff" stroke="#409EFF" stroke-width="2"/>
                <circle cx="182" cy="145" r="4" fill="#fff" stroke="#409EFF" stroke-width="2"/>
                <circle cx="248" cy="80" r="4" fill="#fff" stroke="#409EFF" stroke-width="2"/>
                <circle cx="314" cy="90" r="4" fill="#fff" stroke="#409EFF" stroke-width="2"/>
                <circle cx="380" cy="40" r="4" fill="#fff" stroke="#409EFF" stroke-width="2"/>
                <circle cx="446" cy="60" r="4" fill="#fff" stroke="#409EFF" stroke-width="2"/>
              </svg>
              <div class="chart-labels">
                <span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span><span>周日</span>
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
              <!-- 简单SVG折线图: 销售额 -->
              <svg viewBox="0 0 500 200" class="line-chart">
                 <!-- Grid lines -->
                <line x1="50" y1="150" x2="450" y2="150" stroke="#eee" />
                <line x1="50" y1="100" x2="450" y2="100" stroke="#eee" />
                <line x1="50" y1="50" x2="450" y2="50" stroke="#eee" />

                <!-- Data path -->
                <path d="M50,130 L116,140 L182,110 L248,100 L314,60 L380,50 L446,30" 
                      fill="none" 
                      stroke="#67C23A" 
                      stroke-width="3" />
                 <!-- Points -->
                 <circle cx="50" cy="130" r="4" fill="#fff" stroke="#67C23A" stroke-width="2"/>
                 <circle cx="116" cy="140" r="4" fill="#fff" stroke="#67C23A" stroke-width="2"/>
                 <circle cx="182" cy="110" r="4" fill="#fff" stroke="#67C23A" stroke-width="2"/>
                 <circle cx="248" cy="100" r="4" fill="#fff" stroke="#67C23A" stroke-width="2"/>
                 <circle cx="314" cy="60" r="4" fill="#fff" stroke="#67C23A" stroke-width="2"/>
                 <circle cx="380" cy="50" r="4" fill="#fff" stroke="#67C23A" stroke-width="2"/>
                 <circle cx="446" cy="30" r="4" fill="#fff" stroke="#67C23A" stroke-width="2"/>
              </svg>
               <div class="chart-labels">
                <span>周一</span><span>周二</span><span>周三</span><span>周四</span><span>周五</span><span>周六</span><span>周日</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>

      <div class="secondary-metrics" style="margin-top: 20px;">
         <el-alert
            title="CDK 库存预警：部分热销商品 CDK 库存不足 10 个，请及时补货。"
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

definePageMeta({
  title: '仪表盘'
})

const loading = ref(true)

onMounted(async () => {
  // Simulate data fetch
  setTimeout(() => {
    loading.value = false
  }, 1000)
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
.line-chart {
  width: 100%;
  height: 100%;
}
.chart-labels {
  display: flex;
  justify-content: space-between;
  padding: 0 40px;
  font-size: 12px;
  color: var(--admin-text-secondary);
  margin-top: 5px;
}
</style>
