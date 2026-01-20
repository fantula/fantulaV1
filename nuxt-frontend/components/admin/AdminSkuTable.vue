<template>
  <div class="sku-table-container">
    <div class="panel-title">SKU 配置</div>
    <el-table :data="modelValue" border style="width: 100%">
      <!-- Dynamic Spec Columns -->
      <el-table-column 
        v-for="(spec, index) in specs" 
        :key="index"
        :label="spec.name || '规格'" 
        min-width="100"
      >
        <template #default="{ row }">
          {{ row.specValues[spec.name] }}
        </template>
      </el-table-column>

      <!-- SKU Image -->
      <el-table-column label="SKU图片" width="100" align="center">
        <template #default="{ row }">
          <div class="sku-img-uploader small-box" @click="$emit('select-image', row)">
            <img v-if="row.image" :src="row.image" class="sku-img" />
            <div v-else class="sku-upload-placeholder">
              <el-icon><Picture /></el-icon>
            </div>
          </div>
        </template>
      </el-table-column>

      <!-- Intro -->
      <el-table-column label="简介" min-width="150">
        <template #default="{ row }">
          <el-input v-model="row.intro" size="small" placeholder="简短描述" />
        </template>
      </el-table-column>

      <!-- Duration (not for CDK type) -->
      <el-table-column label="时长/到期" width="120" v-if="productType !== 'cdk'">
        <template #default="{ row }">
          <el-input v-model="row.duration" size="small" placeholder="如: 30天" />
        </template>
      </el-table-column>

      <!-- Price -->
      <el-table-column label="售价 (元)" width="140" align="center">
        <template #default="{ row }">
          <el-input-number v-model="row.price" :min="0" :precision="2" :step="1" size="small" style="width: 100%;" :controls="false" />
        </template>
      </el-table-column>

      <!-- Enabled -->
      <el-table-column label="启用" width="80" align="center">
        <template #default="{ row }">
          <el-switch v-model="row.enabled" size="small" />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">
import { Picture } from '@element-plus/icons-vue'

export interface Spec {
  name: string
  values: string[]
}

export interface SKU {
  id?: string
  key: string
  specValues: Record<string, string>
  price: number
  originalPrice: number
  stock: number
  duration: string
  intro: string
  image: string
  enabled: boolean
}

defineProps<{
  modelValue: SKU[]
  specs: Spec[]
  productType: string
}>()

defineEmits<{
  (e: 'select-image', row: SKU): void
}>()
</script>

<style scoped>
.sku-table-container { 
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ebeef5;
  box-shadow: 0 2px 10px rgba(0,0,0,0.03);
}

.panel-title {
  font-size: 16px; 
  margin-bottom: 16px;
  border-left: 4px solid #409EFF;
  padding-left: 12px;
  font-weight: 600;
  color: #303133;
}

.sku-img-uploader {
  width: 60px;
  height: 60px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fafafa;
  transition: all 0.3s;
  overflow: hidden;
}

.sku-img-uploader:hover {
  border-color: #409EFF;
  background: #fff;
}

.sku-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.sku-upload-placeholder {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #c0c4cc;
  font-size: 18px;
}

:deep(.el-table__row) {
  height: 70px;
}
:deep(.el-table__cell) {
  padding: 8px 0;
  vertical-align: middle;
}
</style>
