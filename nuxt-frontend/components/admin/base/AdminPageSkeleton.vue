<template>
  <div class="admin-skeleton">
    <!-- Header Skeleton -->
    <div class="skeleton-header">
      <el-skeleton animated>
        <template #template>
          <div class="header-content">
            <el-skeleton-item variant="h1" style="width: 150px; height: 30px" />
            <el-skeleton-item variant="text" style="width: 300px; margin-top: 10px" />
          </div>
        </template>
      </el-skeleton>
    </div>

    <!-- Dashboard Type Skeleton -->
    <div v-if="type === 'dashboard'" class="skeleton-dashboard">
      <el-row :gutter="20">
        <el-col :span="6" v-for="i in 4" :key="i">
           <el-skeleton animated class="skeleton-card">
              <template #template>
                <div class="card-mock">
                   <div style="display: flex; justify-content: space-between; margin-bottom: 20px">
                      <el-skeleton-item variant="text" style="width: 80px" />
                      <el-skeleton-item variant="circle" style="width: 24px; height: 24px" />
                   </div>
                   <el-skeleton-item variant="h3" style="width: 100px; height: 40px" />
                   <el-skeleton-item variant="text" style="width: 60px; margin-top: 5px" />
                </div>
              </template>
           </el-skeleton>
        </el-col>
      </el-row>
      <el-row :gutter="20" style="margin-top: 24px">
         <el-col :span="12" v-for="i in 2" :key="i">
            <el-skeleton animated class="skeleton-chart" style="height: 300px">
               <template #template>
                  <el-skeleton-item variant="image" style="width: 100%; height: 100%" />
               </template>
            </el-skeleton>
         </el-col>
      </el-row>
    </div>

    <!-- List/Table Type Skeleton (Default) -->
    <div v-else class="skeleton-list">
      <!-- Action Bar Mock -->
      <div class="skeleton-actions">
         <el-skeleton animated>
            <template #template>
               <div style="display: flex; gap: 15px; justify-content: center">
                  <el-skeleton-item variant="button" style="width: 100px" />
                  <el-skeleton-item variant="button" style="width: 120px" />
               </div>
            </template>
         </el-skeleton>
      </div>
      
      <!-- Table Mock -->
      <el-skeleton animated :rows="10" />
    </div>
  </div>
</template>

<script setup lang="ts">
withDefaults(defineProps<{
  type?: 'dashboard' | 'list'
}>(), {
  type: 'list'
})
</script>

<style scoped>
.admin-skeleton {
  padding: 0;
  width: 100%;
}
.skeleton-header {
  margin-bottom: 24px;
  padding: 0 0 20px 0;
  border-bottom: 1px solid var(--el-border-color-lighter);
}
.skeleton-actions {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}
.skeleton-card {
  padding: 20px;
  background: white;
  border-radius: 4px;
  border: 1px solid var(--el-border-color-lighter);
}
.skeleton-chart {
  background: white;
  border-radius: 4px;
}
</style>
