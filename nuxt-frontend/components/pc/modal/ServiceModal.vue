<template>
  <BaseModal
    :visible="true"
    title="联系图拉"
    width="680px"
    :show-close="true"
    :show-footer="false"
    theme-id="suit-001"
    @close="$emit('close')"
  >
    <!-- Header Content injected via default slot or just part of body? 
         BaseModal has a title prop, but ServiceModal had a custom header with logo and subtitle.
         We can keep the custom header inside the body for now to preserve exact look, 
         OR we can use BaseFormModal if it fits better, but BaseModal is more flexible.
         
         Decision: The original design had a very specific header layout with logo and subtitle inside the modal body area 
         (visually). BaseModal's title is standard.
         Let's try to adapt to BaseModal's standard title "联系图拉" and put the subtitle/logo inside the body content 
         to maintain the rich feel, or use the subtitle slot if we switch to BaseFormModal.
         
         However, BaseModal is cleaner. Let's put the Logo and Subtitle at the top of the body.
    -->
    
    <div class="service-modal-content">
        <!-- Brand Header (Custom) -->
        <div class="brand-header">
             <img src="/images/shared/logo_v3.png" alt="Logo" class="brand-logo" />
             <p class="brand-subtitle">7x24小时为您提供专业服务</p>
        </div>

        <!-- QR Code Grid -->
        <div class="qr-grid">
            
            <!-- WeChat -->
            <div class="qr-card wechat">
                <div class="qr-box">
                <img :src="config.wechat_qr" class="qr-img" />
                <div class="scan-tip">
                    <el-icon><Aim /></el-icon> 扫码添加
                </div>
                </div>
                <div class="info-box">
                <div class="icon-label">
                    <el-icon color="#07C160"><ChatDotRound /></el-icon>
                    <span class="label">微信客服</span>
                </div>
                <div class="value copyable" @click="copyText(config.wechat_id)">
                    {{ config.wechat_id }} <el-icon class="copy-icon"><CopyDocument /></el-icon>
                </div>
                </div>
            </div>

            <!-- Telegram -->
            <div class="qr-card telegram">
                <div class="qr-box">
                <img :src="config.telegram_qr" class="qr-img" />
                <div class="scan-tip">
                    <el-icon><Aim /></el-icon> 扫码添加
                </div>
                </div>
                <div class="info-box">
                <div class="icon-label">
                    <el-icon color="#2AABEE"><Position /></el-icon>
                    <span class="label">Telegram</span>
                </div>
                <div class="value copyable" @click="copyText(config.telegram_id)">
                    {{ config.telegram_id }} <el-icon class="copy-icon"><CopyDocument /></el-icon>
                </div>
                </div>
            </div>

        </div>

        <!-- Footer Info -->
        <div class="service-footer">
            <div class="service-tag">
                <el-icon><Timer /></el-icon>
                <span>在线时间: {{ config.service_time }}</span>
            </div>
        </div>
    </div>

  </BaseModal>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { ChatDotRound, Position, Timer, CopyDocument, Aim } from '@element-plus/icons-vue'
import { useSystemConfig } from '@/composables/client/useSystemConfig'
import { ElMessage } from 'element-plus'
import BaseModal from '@/components/shared/BaseModal.vue'

defineEmits(['close'])

const { contactConfig, fetchContactConfig } = useSystemConfig()

const config = computed(() => {
    return contactConfig.value || {
        wechat_id: 'Spotify-cn',
        wechat_qr: '/images/contact/wechat_qr.jpg',
        telegram_id: '@FANTULA_SUPPORT',
        telegram_qr: '/images/contact/telegram_qr.jpg',
        service_time: '10:00 - 23:00'
    }
})

const copyText = (text: string) => {
    if(!text) return
    navigator.clipboard.writeText(text).then(() => {
        ElMessage.success('复制成功')
    }).catch(() => {
        ElMessage.error('复制失败')
    })
}

onMounted(() => {
    fetchContactConfig()
})
</script>

<style scoped>
.service-modal-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 32px;
}

/* Header */
.brand-header {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}
.brand-logo {
    height: 36px;
    width: auto;
}
.brand-subtitle {
    font-size: 13px;
    color: #94a3b8;
    margin: 0;
}

/* Internal Layout preserved but cleaned up */
.qr-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 24px;
    width: 100%;
}

.qr-card {
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
    border-radius: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    transition: transform 0.2s, background 0.2s;
}
.qr-card:hover {
    transform: translateY(-4px);
    background: rgba(255, 255, 255, 0.05);
    border-color: rgba(255, 255, 255, 0.1);
}
.qr-box {
    position: relative;
    width: 160px; /* Slightly smaller to fit constrained width if needed */
    height: 160px;
    background: #fff;
    border-radius: 12px;
    margin-bottom: 20px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
}
.qr-img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    border-radius: 12px;
}
.scan-tip {
    position: absolute;
    bottom: 0px;
    left: 0; right: 0;
    background: rgba(0,0,0,0.6);
    color: #fff;
    font-size: 12px;
    padding: 4px;
    text-align: center;
    display: flex; align-items: center; justify-content: center; gap: 4px;
    opacity: 0;
    transition: opacity 0.2s;
}
.qr-box:hover .scan-tip { opacity: 1; }

.info-box {
    width: 100%;
    text-align: center;
}
.icon-label {
    display: flex; align-items: center; justify-content: center;
    gap: 6px; margin-bottom: 6px;
    font-size: 14px; color: #e2e8f0; font-weight: 500;
}
.value {
    color: #94a3b8; font-size: 13px;
    display: flex; align-items: center; justify-content: center;
    gap: 6px; cursor: pointer; transition: color 0.2s;
}
.value:hover { color: #fff; }
.copy-icon { opacity: 0.5; }

/* Wechat/Telegram Specifics */
.wechat .qr-card:hover { border-color: rgba(7, 193, 96, 0.3); }
.telegram .qr-card:hover { border-color: rgba(42, 171, 238, 0.3); }

/* Footer */
.service-tag {
    display: flex; align-items: center; gap: 8px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    color: #94a3b8; font-size: 13px;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

@media (max-width: 640px) {
    .qr-grid { grid-template-columns: 1fr; }
    .qr-card { flex-direction: row; padding: 16px; gap: 16px; }
    .qr-box { width: 80px; height: 80px; margin-bottom: 0; }
    .info-box { text-align: left; }
    .icon-label, .value { justify-content: flex-start; }
}

/* Telegram Override */
.telegram .qr-box {
    background: transparent;
    box-shadow: none;
}
.telegram .qr-img {
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
}
</style>