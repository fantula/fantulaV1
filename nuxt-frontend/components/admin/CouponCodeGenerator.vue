<template>
  <el-dialog
    v-model="visible"
    title="生成兑换码"
    width="500px"
    @close="handleClose"
    append-to-body
  >
    <div v-if="coupon" class="coupon-info">
      <div class="info-label">当前优惠券：</div>
      <div class="info-value">{{ coupon.name }}</div>
    </div>

    <el-tabs v-model="activeTab" class="generator-tabs">
      <!-- Mode 1: Batch Random -->
      <el-tab-pane label="批量随机生成" name="random">
        <div class="tab-content">
          <p class="desc">系统将自动生成指定数量的唯一兑换码（如 X7A9-B2C1），每个码仅限使用一次。</p>
          
          <el-form label-position="top">
            <el-form-item label="生成数量">
              <el-input-number v-model="quantity" :min="1" :max="1000" style="width: 100%" />
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>

      <!-- Mode 2: Universal Code -->
      <el-tab-pane label="创建通用码" name="universal">
        <div class="tab-content">
          <p class="desc">创建一个固定的兑换码（如 VIP888），可多人使用或单人多次使用，直到达到总次数限制。</p>
          
          <el-form label-position="top">
            <el-form-item label="自定义兑换码">
              <el-input 
                v-model="customCode" 
                placeholder="例如：VIP888" 
                show-word-limit 
                maxlength="20"
                clearable
              >
                  <template #prefix>#</template>
                  <template #append>
                    <el-button :icon="MagicStick" @click="generateRandomCode" title="随机生成" />
                  </template>
              </el-input>
            </el-form-item>
            
            <el-form-item label="最大使用次数">
               <el-input-number v-model="usageLimit" :min="1" :max="100000" style="width: 100%" />
               <div class="form-help">限制该码总共可被兑换多少次</div>
            </el-form-item>
          </el-form>
        </div>
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" :loading="loading" @click="handleGenerate">
          {{ activeTab === 'random' ? `生成 ${quantity} 个` : '创建通用码' }}
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { MagicStick } from '@element-plus/icons-vue'
import { adminApi } from '@/api/admin-supabase'

const props = defineProps<{
  modelValue: boolean
  coupon: any // The coupon row object
}>()

const emit = defineEmits(['update:modelValue', 'success'])

const visible = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

const activeTab = ref('random')
const loading = ref(false)

// Random Mode
const quantity = ref(50)

// Universal Mode
const customCode = ref('')
const usageLimit = ref(1000)

const handleClose = () => {
  visible.value = false
}

const generateRandomCode = () => {
    // Generate XXX-XXX-XXX-XXX format
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    let str = ''
    for (let i = 0; i < 12; i++) {
        str += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    customCode.value = `${str.slice(0, 3)}-${str.slice(3, 6)}-${str.slice(6, 9)}-${str.slice(9, 12)}`
}

const handleGenerate = async () => {
  if (!props.coupon?.id) return
  
  // Validation
  if (activeTab.value === 'universal') {
      if (!customCode.value || customCode.value.length < 3) {
          ElMessage.warning('通用码至少需要3个字符')
          return
      }
  }

  loading.value = true
  try {
    const res = await adminApi.coupon.generateCouponCodes(
        props.coupon.id,
        activeTab.value === 'random' ? quantity.value : 1,
        activeTab.value as 'random' | 'universal',
        activeTab.value === 'universal' ? customCode.value : undefined,
        activeTab.value === 'universal' ? usageLimit.value : undefined
    )

    if (res.success) {
        ElMessage.success(`成功生成 ${res.count} 个兑换码`)
        emit('success')
        handleClose()
        // Reset specific fields
        customCode.value = ''
        quantity.value = 50
    } else {
        ElMessage.error(res.error || '生成失败')
    }
  } catch (e) {
    ElMessage.error('系统异常')
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.coupon-info {
  background: #f0f9eb;
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #e1f3d8;
}

.info-label {
  color: #67c23a;
  font-weight: 500;
}

.info-value {
  font-weight: bold;
  color: #303133;
}

.tab-content {
  padding: 12px 0;
}

.desc {
  font-size: 13px;
  color: #909399;
  margin-bottom: 24px;
  line-height: 1.5;
}

.form-help {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}
</style>
