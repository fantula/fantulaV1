<template>
  <el-drawer
    v-model="visible"
    :title="`关联商品列表 - ${tagName || '#' + tag}`"
    size="600px"
    destroy-on-close
  >
    <div class="drawer-container">
      <div class="toolbar">
         <el-button :icon="Refresh" circle @click="loadData" />
      </div>

      <el-table 
        :data="list" 
        v-loading="loading" 
        border 
        stripe 
        height="calc(100vh - 150px)"
      >
        <el-table-column label="商品信息" min-width="250">
           <template #default="{ row }">
             <div class="product-cell">
               <el-image :src="row.image" class="p-thumb" fit="cover">
                  <template #error><div class="image-slot"><el-icon><IconPicture /></el-icon></div></template>
               </el-image>
               <div class="p-info">
                 <div class="p-name">{{ row.product_name }}</div>
                 <div class="p-id">ID: {{ row.id.substring(0, 8) }}...</div>
               </div>
             </div>
           </template>
        </el-table-column>
        


        <el-table-column label="状态" width="80" align="center">
           <template #default="{ row }">
              <el-tag :type="row.status === 'on' ? 'success' : 'info'" size="small">{{ row.status === 'on' ? '上架' : '下架' }}</el-tag>
           </template>
        </el-table-column>
      </el-table>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Refresh, Picture as IconPicture } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { adminSharedSkuApi } from '@/api/admin'

const props = defineProps<{
  modelValue: boolean
  tag: number
  tagName?: string
}>()

const emit = defineEmits(['update:modelValue'])

const visible = ref(false)
const list = ref<any[]>([])
const loading = ref(false)

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val && props.tag) {
    loadData()
  }
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

const loadData = async () => {
  if (!props.tag) return
  loading.value = true
  try {
    const res = await adminSharedSkuApi.getProductsBySharedTag(props.tag)
    if (res.success) {
      list.value = res.products || []
    } else {
      ElMessage.error(res.error || '加载失败')
    }
  } catch (e: any) {
    console.error('getProductsBySharedTag Error:', e)
    ElMessage.error(e.message || '网络异常')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.drawer-container { padding: 0 20px 20px; }
.toolbar { margin-bottom: 16px; display: flex; justify-content: flex-end; }
.product-cell { display: flex; align-items: center; gap: 12px; }
.p-thumb { width: 50px; height: 50px; border-radius: 4px; background: #f5f7fa; border: 1px solid #eee; display: flex; align-items: center; justify-content: center; }
.image-slot { color: #909399; font-size: 20px; }
.p-info { display: flex; flex-direction: column; gap: 4px; }
.p-name { font-weight: 500; color: #333; font-size: 14px; line-height: 1.3; }
.p-id { font-size: 12px; color: #999; font-family: monospace; }
.p-price { font-weight: bold; color: #f56c6c; }
</style>
