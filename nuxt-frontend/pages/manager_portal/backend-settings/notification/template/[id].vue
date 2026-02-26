<template>
  <div class="template-edit-page">
    <div v-if="pending" class="loading-state">
      <el-skeleton :rows="5" animated />
    </div>

    <template v-else-if="template">
      <div class="page-header">
        <el-page-header @back="router.back()">
          <template #content>
            <span class="text-large font-600 mr-3">编辑模板: {{ template.name }}</span>
          </template>
        </el-page-header>
      </div>

      <div class="content-grid">
        <!-- 左侧：编辑表单 -->
        <div class="edit-section">
          <el-card shadow="never">
            <template #header>
              <div class="card-header">
                <span>模板内容</span>
                <el-switch
                  v-model="form.is_enabled"
                  active-text="启用"
                  inactive-text="禁用"
                />
              </div>
            </template>

            <el-form label-position="top">
              <el-form-item label="邮件标题">
                <el-input v-model="form.subject_template" placeholder="请输入邮件标题" />
                <div class="form-tip">支持使用变量，如 {{ '{' + '{' }}order_no{{ '}' + '}' }}</div>
              </el-form-item>

              <el-form-item label="邮件内容 (HTML)">
                <el-input
                  v-model="form.body_template"
                  type="textarea"
                  :rows="15"
                  placeholder="请输入邮件内容（支持 HTML）"
                />
              </el-form-item>

              <el-form-item>
                <el-button type="primary" :loading="saving" @click="handleSave">保存修改</el-button>
              </el-form-item>
            </el-form>
          </el-card>
        </div>

        <!-- 右侧：变量参考 & 测试 -->
        <div class="side-section">
          <el-card shadow="never" class="mb-4">
            <template #header>
              <div class="card-header"><span>可用变量</span></div>
            </template>
            <el-table :data="template.variables || []" size="small" border>
              <el-table-column prop="key" label="变量名" width="100">
                <template #default="{ row }">
                  <code>{{ row.key }}</code>
                </template>
              </el-table-column>
              <el-table-column prop="desc" label="描述" />
            </el-table>
          </el-card>

          <el-card shadow="never">
            <template #header>
              <div class="card-header"><span>发送测试邮件</span></div>
            </template>
            <el-form label-position="top">
              <el-form-item label="收件人邮箱">
                <el-input v-model="testEmail" placeholder="name@example.com" />
              </el-form-item>

              <div v-if="template.variables && template.variables.length > 0" class="mb-4">
                <div class="text-sm text-gray-500 mb-2">测试数据 (可选 JSON)</div>
                <el-input
                  v-model="testDataJson"
                  type="textarea"
                  :rows="3"
                  placeholder='{"order_no": "TEST001"}'
                />
              </div>

              <el-button block @click="handleSendTest" :loading="sendingTest">发送测试</el-button>
            </el-form>
          </el-card>
        </div>
      </div>
    </template>

    <el-empty v-else description="模板不存在" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'

definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

const route = useRoute()
const router = useRouter()
const adminStore = useAdminStore()
const templateId = route.params.id as string

const pending = ref(false)
const allTemplates = ref<any[]>([])

const getAuthToken = (): string | null => adminStore.accessToken

const fetchTemplates = async () => {
  pending.value = true
  try {
    const token = getAuthToken()
    const res = await $fetch<{ data: any[] }>('/api/admin/system/notifications/templates', {
      headers: token ? { Authorization: `Bearer ${token}` } : {}
    })
    allTemplates.value = res?.data || []
  } catch (e: any) {
    ElMessage.error('加载模板失败')
    if (import.meta.dev) console.error('[TemplateEdit] fetch error:', e)
  } finally {
    pending.value = false
  }
}

const template = computed(() => allTemplates.value.find((t: any) => t.id === templateId) || null)

// Form State
const form = ref({
  subject_template: '',
  body_template: '',
  is_enabled: true
})

watch(template, (newVal) => {
  if (newVal) {
    form.value = {
      subject_template: newVal.subject_template,
      body_template: newVal.body_template,
      is_enabled: newVal.is_enabled
    }
  }
}, { immediate: true })

// Actions
const saving = ref(false)
const handleSave = async () => {
  if (!template.value) return
  saving.value = true
  try {
    const token = getAuthToken()
    await $fetch('/api/admin/system/notifications/templates', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: {
        id: template.value.id,
        event_type: template.value.event_type,
        ...form.value
      }
    })
    ElMessage.success('保存成功')
    fetchTemplates()
  } catch (e: any) {
    ElMessage.error(e.data?.statusMessage || '保存失败')
  } finally {
    saving.value = false
  }
}

// Test Email
const testEmail = ref('')
const testDataJson = ref('')
const sendingTest = ref(false)

const handleSendTest = async () => {
  if (!testEmail.value) {
    ElMessage.warning('请输入收件人邮箱')
    return
  }
  if (!template.value) return

  let testData: any = {}
  try {
    if (testDataJson.value) {
      testData = JSON.parse(testDataJson.value)
    } else {
      template.value.variables?.forEach((v: any) => {
        testData[v.key] = `[TEST_${v.key.toUpperCase()}]`
      })
    }
  } catch (e) {
    ElMessage.error('测试数据 JSON 格式错误')
    return
  }

  sendingTest.value = true
  try {
    const token = getAuthToken()
    await $fetch('/api/admin/system/notifications/test', {
      method: 'POST',
      headers: token ? { Authorization: `Bearer ${token}` } : {},
      body: {
        event_type: template.value.event_type,
        to: testEmail.value,
        data: testData
      }
    })
    ElMessage.success('测试邮件已发送')
  } catch (e: any) {
    ElMessage.error(e.data?.statusMessage || '发送失败')
  } finally {
    sendingTest.value = false
  }
}

onMounted(() => fetchTemplates())
</script>

<style scoped>
.template-edit-page {
  padding: 20px;
  background: var(--el-bg-color);
  border-radius: 8px;
}

.page-header {
  margin-bottom: 24px;
}

.content-grid {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-tip {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  margin-top: 4px;
}

.mb-4 { margin-bottom: 16px; }

@media (max-width: 1024px) {
  .content-grid {
    grid-template-columns: 1fr;
  }
}
</style>
