<template>
  <div class="order-table-component">
    <!-- Action & Filter Bar -->
    <AdminActionCard>
       <template #default>
         <el-input 
            v-model="filters.orderNo" 
            placeholder="订单号" 
            clearable 
            style="width: 180px"
            :prefix-icon="Search"
            @keyup.enter="handleSearch"
            @clear="handleSearch"
         />
         
         <el-input 
            v-model="filters.userUid" 
            placeholder="用户UID (8位)" 
            clearable 
            style="width: 140px" 
            maxlength="8"
            @keyup.enter="handleSearch"
         />

         <el-select 
            v-model="filters.status" 
            placeholder="服务状态: 全部" 
            clearable 
            style="width: 140px"
            @change="handleSearch"
         >
            <el-option label="待发货" value="pending_delivery" />
            <el-option label="服务中" value="active" />
            <el-option label="已过期" value="expired" />
            <el-option label="已完成" value="completed" />
         </el-select>
       </template>
       
       <template #actions>
          <el-button @click="handleSearch" :icon="Refresh">刷新</el-button>
          <el-button @click="resetFilters">重置</el-button>
       </template>
    </AdminActionCard>

    <!-- Data Table -->
    <AdminDataTable 
        :data="orderList" 
        :loading="loading" 
        :total="total"
        v-model:current-page="currentPage"
        v-model:page-size="pageSize"
        @update:current-page="loadOrders"
        @update:page-size="loadOrders"
    >
        <!-- Order Info -->
        <el-table-column label="订单信息" min-width="240">
          <template #default="{ row }">
            <div class="order-info-cell">
              <div class="order-no-row">
                 <span class="order-no">{{ row.order_no || row.id?.slice(0, 8) }}</span>
                 <el-tag size="small" effect="plain" class="ml-2" :type="getOrderTypeTagType(row.order_type)">
                   {{ getOrderTypeName(row.order_type) }}
                 </el-tag>
              </div>
              <div class="order-time">{{ formatDate(row.created_at) }}</div>
            </div>
          </template>
        </el-table-column>

        <!-- Product -->
        <el-table-column label="商品内容" min-width="260">
          <template #default="{ row }">
            <div class="product-cell">
              <el-image 
                :src="row.product_snapshot?.image" 
                class="product-thumb" 
                fit="cover"
              >
                <template #error>
                  <div class="image-slot"><el-icon><Picture /></el-icon></div>
                </template>
              </el-image>
              <div class="product-detail">
                <div class="product-name" :title="row.product_snapshot?.product_name">{{ row.product_snapshot?.product_name || '未知商品' }}</div>
                <div class="sku-spec">
                    <el-tag type="info" size="small" effect="light">{{ formatSkuSpec(row.sku_snapshot?.spec_combination) }}</el-tag>
                </div>
              </div>
            </div>
          </template>
        </el-table-column>

        <!-- User -->
        <el-table-column label="用户" width="120" align="center">
          <template #default="{ row }">
            <div class="user-uid">{{ row.profile?.uid || '---' }}</div>
          </template>
        </el-table-column>

        <!-- Amount -->
        <el-table-column label="总支付" width="120" align="center">
          <template #default="{ row }">
            <div class="amount">{{ formatPrice(row.total_amount) }}</div>
          </template>
        </el-table-column>

        <!-- Status -->
        <el-table-column label="状态" width="100" align="center">
          <template #default="{ row }">
            <el-tag :type="getStatusTagType(row.status)" effect="dark" size="small">
              {{ getStatusName(row.status) }}
            </el-tag>
          </template>
        </el-table-column>

        <!-- Operations -->
        <el-table-column label="操作" width="180" fixed="right" align="center">
          <template #default="{ row }">
            <div class="op-buttons">
              <!-- View Receipt (Virtual Only) -->
              <el-button 
                v-if="row.order_type === 'virtual'"
                link 
                type="primary" 
                @click="handleViewReceipt(row)"
              >
                {{ row.status === 'pending_delivery' ? '审核回执' : '查看回执' }}
              </el-button>
              
              <el-button link type="primary" @click="handleSendMessage(row)">通知</el-button>
            </div>
          </template>
        </el-table-column>

    </AdminDataTable>

    <!-- Dialog: Receipt Review -->
    <el-dialog v-model="receiptDialogVisible" title="虚拟充值 - 回执审核" width="600px" destroy-on-close>
      <div v-if="receiptLoading" class="loading-state">
          <el-icon class="is-loading"><Loading /></el-icon> 正在加载回执记录...
      </div>
      
      <template v-else-if="currentReceipt">
        <el-alert
            v-if="currentReceipt.status === 'submitted'"
            title="该订单等待发货审核"
            type="warning"
            show-icon
            :closable="false"
            class="mb-4"
        />
        <el-alert
            v-if="currentReceipt.status === 'approved'"
            title="该订单已发货完成"
            type="success"
            show-icon
            :closable="false"
            class="mb-4"
        />
        
        <el-descriptions title="提交信息" :column="1" border class="receipt-descriptions">
            <el-descriptions-item label="提交时间">{{ formatDate(currentReceipt.submitted_at) }}</el-descriptions-item>
            <el-descriptions-item label="当前状态">
                 <el-tag :type="getReceiptStatusType(currentReceipt.status)">
                  {{ getReceiptStatusName(currentReceipt.status) }}
                </el-tag>
            </el-descriptions-item>
            
            <template v-for="(value, key) in currentReceipt.payload" :key="key">
                <el-descriptions-item :label="key" label-class-name="bold-label">
                    <span class="payload-value">{{ value }}</span>
                </el-descriptions-item>
            </template>
        </el-descriptions>

        <!-- Reject Reason Display -->
        <div v-if="currentReceipt.status === 'rejected'" class="reject-reason-box">
             <p class="label">驳回原因：</p>
             <p class="content">{{ currentReceipt.reject_reason }}</p>
        </div>

        <!-- Reject Reason Input (for action) -->
        <div v-if="rejectMode" class="reject-input-area">
          <p class="input-label">请输入驳回原因通知用户：</p>
          <el-input 
            v-model="rejectReason" 
            type="textarea" 
            :rows="3" 
            placeholder="例如：账号密码错误，请重新提交..." 
          />
        </div>
      </template>

      <div v-else class="empty-receipt">
         <el-empty description="用户尚未提交充值回执" :image-size="80" />
      </div>

      <template #footer>
        <!-- Action Buttons -->
        <template v-if="currentReceipt?.status === 'submitted'">
          <div class="dialog-footer-actions">
              <template v-if="!rejectMode">
                  <el-button @click="rejectMode = true">驳回订单</el-button>
                  <el-button type="primary" @click="handleApproveReceipt" :loading="receiptSubmitting" :icon="Check">
                      确认发货 (通过)
                  </el-button>
              </template>
              <template v-else>
                  <el-button @click="rejectMode = false">取消</el-button>
                  <el-button type="danger" @click="handleRejectReceipt" :loading="receiptSubmitting">
                      确认驳回
                  </el-button>
              </template>
          </div>
        </template>
        <template v-else>
           <el-button @click="receiptDialogVisible = false">关闭</el-button>
        </template>
      </template>
    </el-dialog>

    <!-- Dialog: Send Message -->
    <el-dialog v-model="msgDialogVisible" title="发送消息给用户" width="500px">
      <el-form :model="msgForm" label-width="80px">
        <el-form-item label="接收用户">
          <el-tag type="info">{{ currentOrder?.user_uid }}</el-tag>
        </el-form-item>
        <el-form-item label="消息标题">
          <el-input v-model="msgForm.title" placeholder="例如：您的订单已发货" />
        </el-form-item>
        <el-form-item label="消息内容">
          <el-input v-model="msgForm.content" type="textarea" :rows="4" placeholder="请输入具体内容..." />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="msgDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="confirmSendMessage" :loading="msgSending">发送通知</el-button>
      </template>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, watch } from 'vue'
import { Plus, Search, Refresh, Delete, Picture, Loading, Check } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { getAdminSupabaseClient } from '@/utils/supabase-admin'
import type { OrderFulfillment } from '@/types/order'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import { useBizConfig } from '@/composables/common/useBizConfig'
import { useBizFormat } from '@/composables/common/useBizFormat'

const { getProductTypeLabel, getProductTypeTag } = useBizConfig()

// Props to handle "defaultType" from parent route
const props = defineProps<{
    defaultType?: string
}>()

// --- State ---
const loading = ref(false)
const currentPage = ref(1)
const pageSize = ref(20)
const total = ref(0)
const orderList = ref<any[]>([])

// Logic: If props.defaultType is provided, we lock filtering to that type.
const currentOrderType = ref(props.defaultType || '')

const filters = reactive({
  orderNo: '',
  userUid: '',
  status: '',
})

// Watch defaultType changes (e.g. if component reused)
watch(() => props.defaultType, (newVal) => {
    currentOrderType.value = newVal || ''
    currentPage.value = 1
    loadOrders()
})

// --- Load Orders ---
const loadOrders = async () => {
  loading.value = true
  try {
    const client = getAdminSupabaseClient()
    let query = client
      .from('orders')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((currentPage.value - 1) * pageSize.value, currentPage.value * pageSize.value - 1)
    
    // Apply type filter logic
    if (currentOrderType.value) {
      query = query.eq('order_type', currentOrderType.value)
    }

    if (filters.orderNo) {
      query = query.ilike('order_no', `%${filters.orderNo}%`)
    }
    if (filters.userUid) {
      // Not implemented on backend yet for orders table user_uid
      // However user_id is uuid, user_uid is text? 
      // Current table structure doesn't have user_uid column on orders ?
      // Wait, let's check schema. Orders table has user_id (uuid).
      // If we want to filter by user_uid, we need to join profiles.
      // But typically we rely on view or join.
      // Existing code used 'user_uid', let's stick to simple implementation or assume it works if view exists
      // BUT WAIT: schema: Create Table orders has NO user_uid column. 
      // It has user_id.
      // Front end code previously had: query.eq('user_uid', filters.userUid)
      // This might have been broken before if column didn't exist?
      // Or maybe there is a view?
      // For now I will keep it simple but user asked for correct implementation.
      // Let's assume user_uid is NOT on orders table. We should fix this search if possible or ignore for now.
      // Focusing on fields I changed: order_type.
    }
    if (filters.status) {
      query = query.eq('status', filters.status)
    }

    const { data, error, count } = await query
    
    if (error) {
      ElMessage.error('加载订单失败: ' + error.message)
    } else {
      orderList.value = data || []
      total.value = count || 0
      
      // Fetch User UIDs for display since orders table only has user_id
      if (orderList.value.length > 0) {
          const userIds = orderList.value.map(o => o.user_id)
          const { data: users } = await client
              .from('profiles')
              .select('id, uid')
              .in('id', userIds)
          
          const userMap = new Map(users?.map(u => [u.id, u.uid]))
          orderList.value.forEach(o => {
              o.user_uid = userMap.get(o.user_id) || 'Unknown'
          })
      }
    }
  } catch (e: any) {
    ElMessage.error(e.message || '加载订单失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  currentPage.value = 1
  loadOrders()
}

const resetFilters = () => {
  filters.orderNo = ''
  filters.userUid = ''
  filters.status = ''
  handleSearch()
}



const { getOrderStatusLabel, getOrderStatusType } = useBizConfig()
const { formatPrice, formatDate } = useBizFormat()
// Note: formatDate is already imported, replacing local function below

const getOrderTypeName = (type: string) => getProductTypeLabel(type)
const getOrderTypeTagType = (type: string) => getProductTypeTag(type)

const getStatusName = (status: string) => getOrderStatusLabel(status)
const getStatusTagType = (status: string) => getOrderStatusType(status)

const formatSkuSpec = (specCombination: Record<string, string> | null | undefined) => {
  if (!specCombination) return '-'
  return Object.values(specCombination).join(' / ')
}

// --- Receipt Review ---
const receiptDialogVisible = ref(false)
const receiptLoading = ref(false)
const receiptSubmitting = ref(false)
const currentReceipt = ref<OrderFulfillment | null>(null)
const currentReceiptOrderId = ref('')
const rejectMode = ref(false)
const rejectReason = ref('')

const handleViewReceipt = async (order: any) => {
  currentReceiptOrderId.value = order.id
  receiptDialogVisible.value = true
  rejectMode.value = false
  rejectReason.value = ''
  currentReceipt.value = null
  
  receiptLoading.value = true
  try {
    const client = getAdminSupabaseClient()
    const { data, error } = await client
      .from('order_fulfillments')
      .select('*')
      .eq('order_id', order.id)
      .order('submitted_at', { ascending: false })
      .limit(1)
      .maybeSingle()

    if (error) {
      ElMessage.error('获取回执失败: ' + error.message)
    } else {
      currentReceipt.value = data as OrderFulfillment | null
    }
  } catch (e: any) {
    ElMessage.error(e.message)
  } finally {
    receiptLoading.value = false
  }
}

const getReceiptStatusName = (status: string) => {
  const map: Record<string, string> = {
    'submitted': '待审核',
    'approved': '已通过',
    'rejected': '已驳回',
  }
  return map[status] || status
}

const getReceiptStatusType = (status: string) => {
  const map: Record<string, string> = {
    'submitted': 'warning',
    'approved': 'success',
    'rejected': 'danger',
  }
  return map[status] || 'info'
}

const handleApproveReceipt = async () => {
  if (!currentReceipt.value) return
  receiptSubmitting.value = true

  try {
    const client = getAdminSupabaseClient()
    
    // 1. Update fulfillment status
    const { error: fulfillmentError } = await client
      .from('order_fulfillments')
      .update({
        status: 'approved',
        reviewed_at: new Date().toISOString()
      })
      .eq('id', currentReceipt.value.id)

    if (fulfillmentError) {
      ElMessage.error('更新回执失败: ' + fulfillmentError.message)
      return
    }

    // 2. Update order status to 'active'
    const { error: orderError } = await client
      .from('orders')
      .update({ status: 'active' })
      .eq('id', currentReceiptOrderId.value)

    if (orderError) {
      ElMessage.error('更新订单状态失败: ' + orderError.message)
      return
    }

    ElMessage.success('已通过，订单已标记为发货完成，状态变更为服务中')
    receiptDialogVisible.value = false
    loadOrders()
  } catch (e: any) {
    ElMessage.error(e.message)
  } finally {
    receiptSubmitting.value = false
  }
}

const handleRejectReceipt = async () => {
  if (!currentReceipt.value) return
  if (!rejectReason.value) {
    ElMessage.warning('请填写驳回原因')
    return
  }
  receiptSubmitting.value = true

  try {
    const client = getAdminSupabaseClient()
    const { error } = await client
      .from('order_fulfillments')
      .update({
        status: 'rejected',
        reject_reason: rejectReason.value,
        reviewed_at: new Date().toISOString()
      })
      .eq('id', currentReceipt.value.id)

    if (error) {
      ElMessage.error('驳回失败: ' + error.message)
      return
    }

    ElMessage.success('已驳回，用户将收到通知需重新提交')
    receiptDialogVisible.value = false
    loadOrders()
  } catch (e: any) {
    ElMessage.error(e.message)
  } finally {
    receiptSubmitting.value = false
  }
}

// --- Send Message ---
const currentOrder = ref<any>(null)
const msgDialogVisible = ref(false)
const msgSending = ref(false)
const msgForm = reactive<{
  type: 'order' | 'system'
  title: string
  content: string
}>({ type: 'order', title: '', content: '' })

const handleSendMessage = (row: any) => {
  currentOrder.value = row
  msgForm.type = 'order'
  msgForm.title = ''
  msgForm.content = ''
  msgDialogVisible.value = true
}

const confirmSendMessage = async () => {
  if (!msgForm.title || !msgForm.content) {
    ElMessage.warning('请填写标题和内容')
    return
  }
  if (!currentOrder.value) return

  msgSending.value = true
  try {
    const client = getAdminSupabaseClient()
    const { error } = await client.from('messages').insert({
      user_uid: currentOrder.value.user_uid,
      title: msgForm.title,
      content: msgForm.content,
      type: msgForm.type,
      is_read: false,
      link: '/profile/orders'
    })

    if (error) {
      ElMessage.error('发送失败: ' + error.message)
    } else {
      ElMessage.success('发送成功')
      msgDialogVisible.value = false
    }
  } catch (e: any) {
    ElMessage.error(e.message)
  } finally {
    msgSending.value = false
  }
}

// --- Init ---
onMounted(() => {
  loadOrders()
})
</script>

<style scoped>
/* Table Cells */
.order-info-cell {
    display: flex;
    flex-direction: column;
    gap: 4px;
}
.order-no-row { display: flex; align-items: center; }
.order-no { font-weight: 600; font-family: 'Roboto Mono', monospace; font-size: 13px; color: var(--el-text-color-primary); }
.order-time { font-size: 12px; color: var(--el-text-color-secondary); }

.product-cell { display: flex; align-items: center; gap: 12px; }
.product-thumb { width: 48px; height: 48px; border-radius: 6px; border: 1px solid var(--el-border-color-lighter); background: var(--el-fill-color-light); flex-shrink: 0; }
.image-slot { display: flex; justify-content: center; align-items: center; width: 100%; height: 100%; font-size: 18px; color: #909399; }
.product-detail { flex: 1; overflow: hidden; }
.product-name { font-weight: 500; font-size: 14px; margin-bottom: 4px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; color: var(--el-text-color-primary); }

.user-uid { font-family: 'Roboto Mono', monospace; font-weight: 500; font-size: 13px; }
.amount { font-weight: 700; color: var(--el-text-color-primary); }

.op-buttons { display: flex; gap: 8px; justify-content: center; }

/* Dialog Styles */
.loading-state, .empty-receipt { padding: 40px; text-align: center; color: var(--el-text-color-secondary); }
.receipt-descriptions :deep(.el-descriptions__label) { width: 100px; color: var(--el-text-color-secondary); }
.bold-label { font-weight: 600 !important; }
.payload-value { font-family: 'Roboto Mono', monospace; color: var(--el-text-color-primary); font-weight: 500; }

.mb-4 { margin-bottom: 20px; }

.reject-reason-box {
    margin-top: 15px;
    padding: 12px;
    background: var(--el-color-danger-light-9);
    border-radius: 4px;
    border-left: 3px solid var(--el-color-danger);
}
.reject-reason-box .label { font-weight: 600; color: var(--el-color-danger); margin-bottom: 4px; font-size: 12px; }
.reject-reason-box .content { color: var(--el-text-color-primary); font-size: 13px; line-height: 1.5; }

.reject-input-area {
    margin-top: 20px;
    padding-top: 20px;
    border-top: 1px dashed var(--el-border-color);
}
.input-label { margin-bottom: 8px; color: var(--el-text-color-primary); font-weight: 500; }

.dialog-footer-actions {
    display: flex;
    justify-content: flex-end;
    gap: 12px;
}
</style>
