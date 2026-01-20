<template>
  <div class="message-page">
    <div class="page-header">
      <h2>消息发送管理</h2>
    </div>

    <!-- Layout: Left (Recipients) / Right (Content) -->
    <div class="content-layout">
      
      <!-- Left: Recipient Management -->
      <el-card shadow="never" class="recipient-card">
        <template #header>
          <div class="card-header">
            <span>接收用户</span>
            <el-tag type="info" round>{{ recipients.length }} 人</el-tag>
          </div>
        </template>
        
        <div class="recipient-input-area">
          <el-input 
            v-model="uidInput" 
            placeholder="请输入8位用户UID" 
            maxlength="8" 
            clearable
            @keyup.enter="addUser"
            style="margin-bottom: 10px;"
          >
            <template #append>
              <el-button @click="addUser" :loading="validating">添加</el-button>
            </template>
          </el-input>
          <div class="input-tip">请输入精准UID，系统将自动校验用户是否存在。</div>
        </div>

        <el-divider content-position="center">已添加用户列表</el-divider>

        <div class="recipient-list">
          <transition-group name="list">
            <div v-for="user in recipients" :key="user.uid" class="recipient-item">
              <el-avatar :size="32" :src="user.avatar">
                {{ user.email?.charAt(0).toUpperCase() }}
              </el-avatar>
              <div class="recipient-info">
                <div class="recipient-name">{{ user.email || '用户' }}</div>
                <div class="recipient-uid">UID: {{ user.uid }}</div>
              </div>
              <el-button link type="danger" :icon="Close" @click="removeUser(user.uid)" />
            </div>
          </transition-group>
          <div v-if="recipients.length === 0" class="empty-list">
            <el-empty description="暂无接收对象" :image-size="60" />
          </div>
        </div>
      </el-card>

      <!-- Right: Message Content -->
      <el-card shadow="never" class="message-card">
        <template #header>
          <div class="card-header">
            <span>消息内容</span>
          </div>
        </template>

        <el-form label-position="top" :model="form" :rules="rules" ref="formRef">
          <el-form-item label="消息类型" prop="type">
            <el-select v-model="form.type" placeholder="选择消息类型" style="width: 100%">
              <el-option label="📢 系统通知" value="system" />
              <el-option label="📦 订单消息" value="order" />
              <el-option label="🎉 活动推广" value="activity" />
              <el-option label="🔒 安全提醒" value="security" />
            </el-select>
          </el-form-item>
          <el-form-item label="消息标题" prop="title">
            <el-input v-model="form.title" placeholder="请输入消息标题" />
          </el-form-item>
          <el-form-item label="消息正文" prop="content">
            <el-input 
              v-model="form.content" 
              type="textarea" 
              :rows="8" 
              placeholder="请输入消息正文内容..." 
              resize="none"
            />
          </el-form-item>
          <el-form-item label="跳转链接" prop="link">
            <el-input v-model="form.link" placeholder="可选，如 /profile/orders 让用户点击跳转" />
            <div class="input-tip">用户点击消息时将跳转到此路径。留空则无跳转。</div>
          </el-form-item>
          
          <el-form-item>
            <el-alert title="发送后将生成站内信，不可撤回。" type="warning" show-icon :closable="false" style="margin-bottom: 15px;" />
            <el-button type="primary" size="large" @click="handleSend" :loading="sending" style="width: 100%;">
              确认发送消息
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>

    </div>

    <!-- Recent Messages -->
    <el-card shadow="never" class="history-card" style="margin-top: 24px;">
      <template #header>
        <div class="card-header">
          <span>最近发送记录</span>
          <el-button text @click="loadMessages">刷新</el-button>
        </div>
      </template>
      
      <el-table :data="messageList" style="width: 100%" v-loading="loadingMessages">
        <el-table-column prop="user_uid" label="用户UID" width="120" />
        <el-table-column prop="title" label="标题" min-width="200" />
        <el-table-column prop="content" label="内容" min-width="300" show-overflow-tooltip />
        <el-table-column label="已读" width="80" align="center">
          <template #default="{ row }">
            <el-tag :type="row.is_read ? 'success' : 'info'" size="small">
              {{ row.is_read ? '已读' : '未读' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="发送时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.created_at) }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { Close } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox, type FormInstance, type FormRules } from 'element-plus'
import { adminUserApi, adminMessageApi, type AdminUser, type AdminMessage } from '@/api/admin-supabase'

definePageMeta({
  title: '消息发送管理'
})

// --- Interfaces ---
interface RecipientInfo {
  uid: string
  email?: string
  avatar?: string
}

// --- State ---
const uidInput = ref('')
const validating = ref(false)
const sending = ref(false)
const loadingMessages = ref(false)
const recipients = ref<RecipientInfo[]>([])
const messageList = ref<AdminMessage[]>([])
const formRef = ref<FormInstance>()
const form = reactive({
  type: 'system' as 'system' | 'order' | 'activity' | 'security',
  title: '',
  content: '',
  link: ''
})

// --- Rules ---
const rules = reactive<FormRules>({
  title: [{ required: true, message: '请输入消息标题', trigger: 'blur' }],
  content: [{ required: true, message: '请输入消息正文', trigger: 'blur' }]
})

// --- Helpers ---
const formatDate = (dateStr: string) => {
  return new Date(dateStr).toLocaleString('zh-CN')
}

// --- Load Messages History ---
const loadMessages = async () => {
  loadingMessages.value = true
  try {
    const result = await adminMessageApi.getMessages({ limit: 20 })
    if (result.success) {
      messageList.value = result.messages
    }
  } catch (e: any) {
    console.error('加载消息失败:', e)
  } finally {
    loadingMessages.value = false
  }
}

// --- Methods ---
const addUser = async () => {
  const uid = uidInput.value.trim()
  if (!uid) return
  if (uid.length !== 8) {
    ElMessage.warning('UID 格式错误，应为8位数字')
    return
  }
  if (recipients.value.some(u => u.uid === uid)) {
    ElMessage.warning('该用户已在列表中')
    uidInput.value = ''
    return
  }

  validating.value = true
  try {
    const result = await adminUserApi.getUserByUid(uid)
    if (result.success && result.user) {
      recipients.value.unshift({
        uid: result.user.uid,
        email: result.user.email,
      })
      ElMessage.success(`添加用户 ${result.user.email} 成功`)
      uidInput.value = ''
    } else {
      ElMessage.error('用户不存在，请检查UID')
    }
  } catch (e: any) {
    ElMessage.error(e.message || '查询用户失败')
  } finally {
    validating.value = false
  }
}

const removeUser = (uid: string) => {
  recipients.value = recipients.value.filter(u => u.uid !== uid)
}

const handleSend = async () => {
  if (recipients.value.length === 0) {
    ElMessage.warning('请至少添加一个接收用户')
    return
  }
  if (!formRef.value) return
  
  await formRef.value.validate(async (valid) => {
    if (valid) {
      try {
        await ElMessageBox.confirm(
          `确认向 ${recipients.value.length} 位用户发送消息吗？\n发送后不可撤回。`,
          '发送确认',
          {
            confirmButtonText: '确认发送',
            cancelButtonText: '取消',
            type: 'warning'
          }
        )
        
        sending.value = true
        
        // 逐个发送消息
        let successCount = 0
        let failCount = 0
        
        for (const user of recipients.value) {
          const result = await adminMessageApi.sendMessage(user.uid, form.title, form.content, form.type, form.link || undefined)
          if (result.success) {
            successCount++
          } else {
            failCount++
            console.error(`发送给 ${user.uid} 失败:`, result.error)
          }
        }
        
        if (successCount > 0) {
          ElMessage.success(`成功发送 ${successCount} 条消息${failCount > 0 ? `，失败 ${failCount} 条` : ''}`)
        } else {
          ElMessage.error('消息发送失败')
        }
        
        // Reset
        recipients.value = []
        form.type = 'system'
        form.title = ''
        form.content = ''
        form.link = ''
        formRef.value?.resetFields()
        
        // Refresh history
        await loadMessages()
        
      } catch (e) {
        // User cancelled
      } finally {
        sending.value = false
      }
    }
  })
}

// --- Init ---
onMounted(() => {
  loadMessages()
})
</script>

<style scoped>
.message-page { /* Padding handled jointly by Layout */ }
.page-header { margin-bottom: 24px; }
.page-header h2 { margin: 0; font-size: 28px; color: var(--el-text-color-primary); font-weight: 600; }

.content-layout {
  display: flex;
  gap: 24px;
  align-items: flex-start;
}

.recipient-card {
  width: 320px;
  flex-shrink: 0;
  min-height: 500px;
}

.message-card {
  flex: 1;
  min-height: 500px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
}

.input-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.recipient-list {
  max-height: 350px;
  overflow-y: auto;
}

.recipient-item {
  display: flex;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  margin-bottom: 8px;
  background-color: #f5f7fa;
  transition: all 0.2s;
}
.recipient-item:hover {
  background-color: #ecf5ff;
}

.recipient-info {
  flex: 1;
  margin-left: 10px;
  overflow: hidden;
}

.recipient-name {
  font-size: 14px;
  font-weight: 500;
  color: var(--el-text-color-primary);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.recipient-uid {
  font-size: 12px;
  color: #909399;
  font-family: monospace;
}

.empty-list {
  padding: 40px 0;
  display: flex;
  justify-content: center;
}

/* Transitions */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(-20px);
}
</style>
