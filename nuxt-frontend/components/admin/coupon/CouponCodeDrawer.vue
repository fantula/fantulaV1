<template>
  <el-drawer
    v-model="visible"
    :title="`兑换码列表 - ${couponName}`"
    size="800px"
    destroy-on-close
  >
    <div class="code-list-container">
      <div class="toolbar">
        <div class="toolbar-left">
          <el-button type="primary" :icon="DocumentCopy" @click="batchCopy" :disabled="selectedIds.length === 0">
            批量复制 ({{ selectedIds.length }})
          </el-button>
          <el-button type="danger" :icon="Delete" @click="batchDelete" :disabled="selectedIds.length === 0">
            批量删除
          </el-button>
        </div>
        <el-button :icon="Refresh" circle @click="loadData" />
      </div>

      <el-table 
        :data="list" 
        v-loading="loading" 
        border 
        stripe 
        height="calc(100vh - 200px)"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="code" label="兑换码" width="200">
           <template #default="{ row }">
             <div class="code-text">
               {{ row.code }}
               <el-icon class="copy-icon" @click="copyCode(row.code)"><CopyDocument /></el-icon>
             </div>
           </template>
        </el-table-column>
        <el-table-column label="使用次数" width="120" align="center">
          <template #default="{ row }">
            {{ row.used_count }} / {{ row.max_usage }}
          </template>
        </el-table-column>
        <el-table-column label="生成时间" width="180">
           <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template #default="{ row }">
            <el-button type="danger" size="small" text @click="deleteSingle(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-footer">
        <el-pagination
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[20, 50, 100]"
          layout="total, sizes, prev, pager, next"
          @size-change="loadData"
          @current-change="loadData"
        />
      </div>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Refresh, CopyDocument, Delete, DocumentCopy } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import dayjs from 'dayjs'
import { adminCouponApi } from '@/api/admin-supabase'
import { useClipboard } from '@vueuse/core'

const props = defineProps<{
  modelValue: boolean
  couponId: string
  couponName: string
}>()

const emit = defineEmits(['update:modelValue'])

const visible = ref(false)
const list = ref<any[]>([])
const loading = ref(false)
const total = ref(0)
const page = ref(1)
const pageSize = ref(20)
const selectedIds = ref<string[]>([])

const { copy } = useClipboard()

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val && props.couponId) {
    loadData()
  }
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

const loadData = async () => {
  if (!props.couponId) return
  loading.value = true
  selectedIds.value = []
  try {
    const res = await adminCouponApi.getCouponCodes(props.couponId, {
      page: page.value,
      size: pageSize.value,
      status: 'available'  // 只查询可使用状态
    })
    if (res.success) {
      list.value = res.codes
      total.value = res.total
    } else {
      ElMessage.error(res.error || '加载失败')
    }
  } catch (e) {
    ElMessage.error('网络异常')
  } finally {
    loading.value = false
  }
}

const handleSelectionChange = (selection: any[]) => {
  selectedIds.value = selection.map(s => s.id)
}

const copyCode = (code: string) => {
  copy(code)
  ElMessage.success('已复制')
}

const batchCopy = () => {
  const codes = list.value
    .filter(item => selectedIds.value.includes(item.id))
    .map(item => item.code)
    .join('\n')
  copy(codes)
  ElMessage.success(`已复制 ${selectedIds.value.length} 个兑换码`)
}

const deleteSingle = async (id: string) => {
  try {
    await ElMessageBox.confirm('确定要删除这个兑换码吗？', '删除确认', { type: 'warning' })
    const res = await adminCouponApi.deleteCouponCodes([id])
    if (res.success) {
      ElMessage.success('删除成功')
      loadData()
    } else {
      ElMessage.error(res.error || '删除失败')
    }
  } catch (e) {
    // Cancelled
  }
}

const batchDelete = async () => {
  try {
    await ElMessageBox.confirm(`确定要删除选中的 ${selectedIds.value.length} 个兑换码吗？`, '批量删除', { type: 'warning' })
    const res = await adminCouponApi.deleteCouponCodes(selectedIds.value)
    if (res.success) {
      ElMessage.success(`成功删除 ${res.count} 个兑换码`)
      loadData()
    } else {
      ElMessage.error(res.error || '删除失败')
    }
  } catch (e) {
    // Cancelled
  }
}

const formatDate = (d: string | null) => {
  if (!d) return '-'
  return dayjs(d).format('YYYY-MM-DD HH:mm:ss')
}
</script>

<style scoped>
.code-list-container {
  padding: 0 20px 20px;
}
.toolbar {
  margin-bottom: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.toolbar-left {
  display: flex;
  gap: 12px;
}
.code-text {
  font-family: monospace;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
}
.copy-icon {
  cursor: pointer;
  color: #409eff;
  opacity: 0;
  transition: opacity 0.2s;
}
.code-text:hover .copy-icon {
  opacity: 1;
}
.pagination-footer {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>

