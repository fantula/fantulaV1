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
        <el-form label-position="top">
          
          <!-- Order Section -->
          <div class="section-title">订单相关</div>
          
          <div class="setting-item">
            <div class="setting-header">
              <span class="label">下单通知 (Order Created)</span>
              <el-switch v-model="settings.order_created.enable" />
            </div>
            <div class="template-area" v-if="settings.order_created.enable">
              <div class="field-row">
                <el-input v-model="settings.order_created.title" placeholder="消息标题" class="title-input" />
              </div>
              <el-input 
                v-model="settings.order_created.template" 
                type="textarea" 
                :rows="2" 
                placeholder="请输入通知模板"
              />
              <div class="vars-tip">可用变量: {order_no}</div>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-header">
              <span class="label">订单发货 (Order Shipped)</span>
              <el-switch v-model="settings.order_shipped.enable" />
            </div>
            <div class="template-area" v-if="settings.order_shipped.enable">
              <div class="field-row">
                <el-input v-model="settings.order_shipped.title" placeholder="消息标题" class="title-input" />
              </div>
              <el-input 
                v-model="settings.order_shipped.template" 
                type="textarea" 
                :rows="2" 
              />
              <div class="vars-tip">可用变量: {order_no}</div>
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-header">
              <span class="label">虚拟/API回执 (Receipt)</span>
              <el-switch v-model="settings.virtual_order_received.enable" />
            </div>
            <div class="template-area" v-if="settings.virtual_order_received.enable">
              <div class="field-row">
                <el-input v-model="settings.virtual_order_received.title" placeholder="消息标题" class="title-input" />
              </div>
              <el-input 
                v-model="settings.virtual_order_received.template" 
                type="textarea" 
                :rows="2" 
              />
              <div class="vars-tip">可用变量: {order_no}</div>
            </div>
          </div>

          <el-divider />

          <!-- Wallet Section -->
          <div class="section-title">账户与权益</div>

          <div class="setting-item">
            <div class="setting-header">
              <span class="label">优惠券兑换 (Redeemed)</span>
              <el-switch v-model="settings.coupon_redeemed.enable" />
            </div>
            <div class="template-area" v-if="settings.coupon_redeemed.enable">
              <div class="field-row">
                <el-input v-model="settings.coupon_redeemed.title" placeholder="消息标题" class="title-input" />
              </div>
              <el-input 
                v-model="settings.coupon_redeemed.template" 
                type="textarea" 
                :rows="2" 
              />
            </div>
          </div>

          <div class="setting-item">
            <div class="setting-header">
              <span class="label">额度变动 (Quota Changed)</span>
              <el-switch v-model="settings.quota_changed.enable" />
            </div>
            <div class="template-area" v-if="settings.quota_changed.enable">
              <div class="field-row">
                <el-input v-model="settings.quota_changed.title" placeholder="消息标题" class="title-input" />
              </div>
              <el-input 
                v-model="settings.quota_changed.template" 
                type="textarea" 
                :rows="2" 
              />
              <div class="vars-tip">可用变量: {balance}, {amount}</div>
            </div>
          </div>

          <el-divider />

          <!-- Support Section -->
          <div class="section-title">服务支持</div>

          <div class="setting-item">
            <div class="setting-header">
              <span class="label">工单回复 (Ticket Replied)</span>
              <el-switch v-model="settings.ticket_replied.enable" />
            </div>
            <div class="template-area" v-if="settings.ticket_replied.enable">
              <div class="field-row">
                <el-input v-model="settings.ticket_replied.title" placeholder="消息标题" class="title-input" />
              </div>
              <el-input 
                v-model="settings.ticket_replied.template" 
                type="textarea" 
                :rows="2" 
              />
            </div>
          </div>

        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { adminMessageApi } from '@/api/admin/message'

const loading = ref(false)
const saving = ref(false)

// Default structure
const defaultItem = { enable: true, title: '', template: '' }
const settings = reactive({
  order_created: { ...defaultItem },
  order_shipped: { ...defaultItem },
  virtual_order_received: { ...defaultItem },
  coupon_redeemed: { ...defaultItem },
  quota_changed: { ...defaultItem },
  ticket_replied: { ...defaultItem }
})

const loadSettings = async () => {
  loading.value = true
  try {
    const res = await adminMessageApi.getNotificationSettings()
    if (res.success && res.settings) {
      // Merge logic: If saved settings are simple booleans (old format), convert them
      const data = res.settings
      
      for (const key of Object.keys(settings)) {
        if (data[key] !== undefined) {
           if (typeof data[key] === 'boolean') {
             // Handle legacy boolean
             settings[key as keyof typeof settings].enable = data[key]
           } else if (typeof data[key] === 'object') {
             // Handle new object
             settings[key as keyof typeof settings] = { ...settings[key as keyof typeof settings], ...data[key] }
           }
        }
      }
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
  margin: 10px 0 15px 0;
  color: var(--el-text-color-primary);
  border-left: 3px solid var(--el-color-primary);
  padding-left: 10px;
}
.setting-item {
  margin-bottom: 20px;
  background: var(--el-fill-color-light);
  padding: 15px;
  border-radius: 8px;
}
.setting-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.label {
  font-weight: 500;
  color: var(--el-text-color-regular);
}
.template-area {
  margin-top: 10px;
}
.field-row {
  margin-bottom: 8px;
}
.title-input {
  max-width: 300px;
}
.vars-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
  font-family: monospace;
}
</style>
