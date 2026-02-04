<template>
  <div class="page-container">
    <PageTipHeader 
      title="联系方式设置" 
      description="管理前台显示的微信、Telegram及在线时间信息。内容将实时同步至 PC 端及移动端显示。" 
    />

    <StickyFormHeader 
      title="联系方式" 
      subtitle="配置中心"
      :loading="saving"
      @save="saveConfig"
      :show-back="false"
    />

    <el-card shadow="never" class="mt-4" v-loading="loading">
      <el-form :model="form" label-width="120px" class="py-4">
        
        <!-- Service Time -->
        <el-row>
          <el-col :span="24">
            <h3 class="section-title">🕒 服务时间设置</h3>
            <el-form-item label="在线服务时间">
               <el-input v-model="form.service_time" placeholder="例如: 10:00 - 23:00" style="max-width: 400px"/>
               <div class="form-tip">显示在已联系客服弹窗中的服务时间提示</div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-divider />

        <!-- PC Settings -->
        <h3 class="section-title">🖥️ PC 端设置 (Modal)</h3>
        <div class="p-4 bg-gray-50 rounded mb-6">
            <el-row :gutter="40">
                <el-col :span="12">
                     <div class="sub-title">微信客服 (WeChat)</div>
                     <el-form-item label="微信号 / ID">
                        <el-input v-model="form.wechat_id" placeholder="Spotify-cn" />
                     </el-form-item>
                     <el-form-item label="微信二维码">
                        <ContactImageUploader v-model="form.wechat_qr" folder="contact_materials" tip="建议尺寸: 300x300" />
                     </el-form-item>
                </el-col>
                <el-col :span="12">
                     <div class="sub-title">Telegram 客服</div>
                     <el-form-item label="用户名 / ID">
                        <el-input v-model="form.telegram_id" placeholder="@Fantula_Support" />
                     </el-form-item>
                     <el-form-item label="Telegram二维码">
                        <ContactImageUploader v-model="form.telegram_qr" folder="contact_materials" tip="建议尺寸: 300x300" />
                     </el-form-item>
                </el-col>
            </el-row>
        </div>

        <el-divider />

        <!-- Mobile Settings (Read Only or Sync explanation) -->
         <h3 class="section-title">📱 移动端设置 (H5)</h3>
         <div class="p-4 bg-blue-50 rounded">
            <el-alert title="移动端自动同步" type="info" :closable="false" show-icon>
                <template #default>
                    移动端将自动复用上述配置信息。
                    <ul>
                        <li><strong>微信号/TG号</strong>: 点击可直接复制。</li>
                        <li><strong>二维码</strong>: 移动端暂不展示二维码，仅展示文本ID。</li>
                    </ul>
                </template>
            </el-alert>
         </div>

      </el-form>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import StickyFormHeader from '@/components/admin/base/StickyFormHeader.vue'
import ContactImageUploader from '@/components/admin/base/ContactImageUploader.vue'
import { useAdminContactConfig } from '@/composables/admin/useAdminContactConfig'

definePageMeta({
  layout: 'mgmt', // Mandatory strictly standard layout
  middleware: ["mgmt-auth"],
  title: '联系方式设置'
})

const { form, loading, saving, saveConfig } = useAdminContactConfig()
</script>

<style scoped>
.page-container { padding-bottom: 60px; }
.section-title { font-size: 16px; font-weight: 600; margin-bottom: 16px; color: #303133; display: flex; align-items: center; gap: 8px; }
.sub-title { font-size: 14px; font-weight: 600; margin-bottom: 12px; color: #606266; padding-left: 120px; }
.form-tip { font-size: 12px; color: #909399; margin-top: 4px; line-height: 1.4; }
.bg-gray-50 { background-color: #f9faFc; border: 1px solid #e4e7ed; }
.bg-blue-50 { background-color: #ecf5ff; border: 1px solid #d9ecff; }
.p-4 { padding: 16px; }
.rounded { border-radius: 8px; }
.mb-6 { margin-bottom: 24px; }
</style>
