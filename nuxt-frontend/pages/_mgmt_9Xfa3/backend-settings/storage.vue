<template>
  <div class="r2-settings-page">
    <AdminActionCard title="R2 存储配置">
      <el-alert
        title="安全提示"
        type="warning"
        :closable="false"
        show-icon
        class="mb-4"
      >
        <template #default>
          <ul class="safe-tips">
            <li>R2 密钥存储在数据库中，仅允许后端 Edge Function 读取</li>
            <li>前端无法直接获取这些密钥，所有上传操作都通过服务端完成</li>
            <li>R2 存储桶不直接暴露公网，所有访问必须通过 Cloudflare Worker 代理</li>
          </ul>
        </template>
      </el-alert>

      <el-form :model="form" label-width="180px" label-position="left" v-loading="loading">
        <el-form-item label="Cloudflare 账号 ID">
          <el-input v-model="form.R2_ACCOUNT_ID" placeholder="请输入 Cloudflare Account ID" />
        </el-form-item>

        <el-form-item label="Access Key ID">
          <el-input v-model="form.R2_ACCESS_KEY_ID" placeholder="请输入 R2 Access Key ID" />
        </el-form-item>

        <el-form-item label="Secret Access Key">
          <el-input 
            v-model="form.R2_SECRET_ACCESS_KEY" 
            :type="showSecret ? 'text' : 'password'"
            placeholder="请输入 R2 Secret Access Key"
          >
            <template #suffix>
              <el-icon class="cursor-pointer" @click="showSecret = !showSecret">
                <View v-if="!showSecret" />
                <Hide v-else />
              </el-icon>
            </template>
          </el-input>
          <div class="form-tip">密钥仅在服务端使用，不会暴露给前端</div>
        </el-form-item>

        <el-form-item label="存储桶名称">
          <el-input v-model="form.R2_BUCKET_NAME" placeholder="fantula2601" />
        </el-form-item>

        <el-form-item label="公开访问域名">
          <el-input v-model="form.R2_PUBLIC_BASE_URL" placeholder="https://img.fantula.com" />
          <div class="form-tip">通过 Cloudflare Worker 代理的自定义域名</div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="saving" @click="handleSave" :icon="Check">保存配置</el-button>
          <el-button :loading="testing" @click="testConnection" :icon="Connection" style="margin-left: 12px;">测试连接</el-button>
        </el-form-item>

        <el-form-item v-if="testResult">
          <el-alert
            :title="testResult.message"
            :type="testResult.success ? 'success' : 'error'"
            :closable="true"
            @close="testResult = null"
            show-icon
          />
        </el-form-item>
      </el-form>
    </AdminActionCard>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue'
import { View, Hide, Check, Connection } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { adminSettingsApi } from '@/api/admin'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'

const loading = ref(false)
const saving = ref(false)
const showSecret = ref(false)
const testing = ref(false)
const testResult = ref<{ success: boolean; message: string } | null>(null)
const originalSecretKey = ref('')

const form = reactive({
  R2_ACCOUNT_ID: '',
  R2_ACCESS_KEY_ID: '',
  R2_SECRET_ACCESS_KEY: '',
  R2_BUCKET_NAME: 'fantula2601',
  R2_PUBLIC_BASE_URL: 'https://img.fantula.com'
})

const loadSettings = async () => {
  loading.value = true
  try {
    const res = await adminSettingsApi.getR2Settings()
    if (res.success && res.settings) {
      Object.assign(form, res.settings)
      originalSecretKey.value = res.settings.R2_SECRET_ACCESS_KEY || ''
    }
  } catch (e: any) {
    ElMessage.error('加载配置失败: ' + e.message)
  } finally {
    loading.value = false
  }
}

const handleSave = async () => {
  saving.value = true
  try {
    const payload: any = {
      R2_ACCOUNT_ID: form.R2_ACCOUNT_ID,
      R2_ACCESS_KEY_ID: form.R2_ACCESS_KEY_ID,
      R2_BUCKET_NAME: form.R2_BUCKET_NAME,
      R2_PUBLIC_BASE_URL: form.R2_PUBLIC_BASE_URL
    }
    
    if (form.R2_SECRET_ACCESS_KEY !== originalSecretKey.value) {
      payload.R2_SECRET_ACCESS_KEY = form.R2_SECRET_ACCESS_KEY
    }
    
    const res = await adminSettingsApi.updateR2Settings(payload)
    if (res.success) {
      ElMessage.success('配置保存成功')
      await loadSettings()
    } else {
      ElMessage.error('保存失败: ' + res.error)
    }
  } catch (e: any) {
    ElMessage.error('保存失败: ' + e.message)
  } finally {
    saving.value = false
  }
}

const testConnection = async () => {
  testing.value = true
  testResult.value = null
  
  try {
    const { getAdminAuthToken } = await import('@/utils/supabase-admin')
    const token = await getAdminAuthToken()
    
    if (!token) {
      testResult.value = { success: false, message: '请先登录后台管理员账号' }
      return
    }

    const { EDGE_FUNCTIONS_URL } = await import('@/utils/supabase')
    // Note: Assuming existing test-r2-connection function exists or logic is compatible
    // If not, we might need to update this URL or logic. 
    // The previous file used 'http://127.0.0.1:54321/functions/v1/test-r2-connection'
    // I will use EDGE_FUNCTIONS_URL if possible, or fallback.
    // Given user env is Mac local, EDGE_FUNCTIONS_URL likely points to local.
    
    const response = await fetch(`${EDGE_FUNCTIONS_URL}/test-r2-connection`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })

    const result = await response.json()
    testResult.value = {
      success: result.success,
      message: result.message
    }
  } catch (e: any) {
    testResult.value = {
      success: false,
      message: '测试请求失败: ' + (e.message || '网络错误')
    }
  } finally {
    testing.value = false
  }
}

onMounted(() => {
  loadSettings()
})
</script>

<style scoped>
.safe-tips {
  margin: 0;
  padding-left: 20px;
}
.safe-tips li {
  font-size: 13px;
  line-height: 1.6;
}
.form-tip {
  font-size: 12px;
  color: var(--el-text-color-secondary);
  line-height: 1.4;
  margin-top: 4px;
}
.cursor-pointer {
  cursor: pointer;
}
.mb-4 {
    margin-bottom: 20px;
}
</style>
