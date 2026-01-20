<template>
  <div class="admin-data-table">
     <div class="table-container">
        <el-table 
            v-bind="$attrs" 
            :data="data" 
            v-loading="loading" 
            border 
            style="width: 100%"
            @selection-change="$emit('selection-change', $event)"
        >
            <slot />
            <template #empty>
                 <el-empty description="暂无数据" :image-size="100" />
            </template>
        </el-table>
     </div>
     
     <div class="pagination-wrapper" v-if="total !== undefined">
        <el-pagination 
           background 
           layout="total, sizes, prev, pager, next, jumper" 
           :total="total" 
           :current-page="currentPage"
           :page-size="pageSize"
           :page-sizes="[10, 20, 50, 100]"
           @update:current-page="$emit('update:currentPage', $event)"
           @update:page-size="$emit('update:pageSize', $event)"
        />
     </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  data: any[]
  loading?: boolean
  total?: number
  currentPage?: number
  pageSize?: number
}>()

defineEmits<{
  (e: 'update:currentPage', val: number): void
  (e: 'update:pageSize', val: number): void
  (e: 'selection-change', val: any[]): void
}>()
</script>

<style scoped>
.table-container {
    margin-bottom: 20px;
    border-radius: 4px;
    overflow: hidden;
}
.pagination-wrapper {
    display: flex;
    justify-content: flex-end;
    margin-top: 15px;
    padding-bottom: 10px;
}
</style>
