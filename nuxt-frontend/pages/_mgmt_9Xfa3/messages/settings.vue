<template>
  <div class="settings-page">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <span>客户消息通知配置</span>
          <el-button type="primary" @click="saveSettings" :loading="saving">保存配置</el-button>
        </div>
      </template>

      <div class="settings-list" v-loading="loading">
        <el-form label-position="left" label-width="200px">
          
          <div class="section-title">订单相关</div>
          <el-form-item label="下单通知 (Order Created)">
            <el-switch v-model="settings.order_created" />
            <div class="form-tip">用户下单成功后发送站内信通知</div>
          </el-form-item>
          <el-form-item label="订单发货 (Order Shipped)">
            <el-switch v-model="settings.order_shipped" />
            <div class="form-tip">实体商品发货或虚拟商品发货时通知</div>
          </el-form-item>
          <el-form-item label="虚拟/API回执 (Receipt)">
            <el-switch v-model="settings.virtual_order_received" />
            <div class="form-tip">API 对接订单收到回执结果时通知</div>
          </el-form-item>

          <el-divider />

          <div class="section-title">账户与权益</div>
          <el-form-item label="优惠券兑换 (Redeemed)">
            <el-switch v-model="settings.coupon_redeemed" />
            <div class="form-tip">用户成功兑换优惠券后通知</div>
          </el-form-item>
          <el-form-item label="额度变动 (Quota Changed)">
            <el-switch v-model="settings.quota_changed" />
            <div class="form-tip">用户余额或相关额度发生变动时通知</div>
          </el-form-item>

          <el-divider />

          <div class="section-title">服务支持</div>
          <el-form-item label="工单回复 (Ticket Replied)">
            <el-switch v-model="settings.ticket_replied" />
            <div class="form-tip">管理员回复工单时通知用户</div>
          </el-form-item>

        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { adminMessageApi } from '@/api/admin/message'

const loading = ref(false)
const saving = ref(false)

const settings = reactive({
  order_created: true,
  order_shipped: true,
  virtual_order_received: true,
  coupon_redeemed: true,
  quota_changed: true,
  ticket_replied: true
})

const loadSettings = async () => {
  loading.value = true
  try {
    const res = await adminMessageApi.getNotificationSettings()
    if (res.success && res.settings) {
      Object.assign(settings, res.settings)
    }
  } catch (e) {
    ElMessage.error('加载配置失败')
  } finally {
    loading.value = false
  }
}

const saveSettings = async () => {
  saving.value = true
  try {
    const res = await adminMessageApi.updateNotificationSettings(settings)
    if (res.success) {
      ElMessage.success('配置已保存')
    } else {
      ElMessage.error(res.error || '保存失败')
    }
  } catch (e) {
    ElMessage.error('保存失败')
  } finally {
    saving.value = false
  }
}

onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
.settings-page {
  max-width: 800px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}
.section-title {
  font-size: 16px;
  font-weight: 600;
  margin: 10px 0 20px 0;
  color: var(--el-text-color-primary);
}
.form-tip {
  font-size: 12px;
  color: #909399;
  margin-left: 10px;
}
</style>
