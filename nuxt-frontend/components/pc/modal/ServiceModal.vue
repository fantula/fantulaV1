<template>
  <Transition name="modal-fade">
    <div class="modal-backdrop" @click.self="$emit('close')">
      <div class="modal-container">
        
        <!-- Decoration -->
        <div class="glow-effect"></div>

        <!-- Header -->
        <div class="modal-header">
           <div class="header-content">
             <img src="/images/shared/logo_v3.png" alt="Logo" class="brand-logo" />
             <h2 class="title">联系图拉</h2>
             <p class="subtitle">7x24小时为您提供专业服务</p>
           </div>
           <button class="close-btn" @click="$emit('close')">
             <el-icon><Close /></el-icon>
           </button>
        </div>

        <!-- Content -->
        <div class="modal-body">
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
        </div>

        <!-- Footer -->
        <div class="modal-footer">
            <div class="service-tag">
                <el-icon><Timer /></el-icon>
                <span>在线时间: {{ config.service_time }}</span>
            </div>
        </div>

      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { Close, ChatDotRound, Position, Timer, CopyDocument, Aim } from '@element-plus/icons-vue'
import { useSystemConfig } from '@/composables/client/useSystemConfig' // Assuming this exists or create it
import { ElMessage } from 'element-plus'

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
.modal-backdrop {
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: rgba(0, 0, 0, 0.6);
    backdrop-filter: blur(8px);
    display: flex;
    align-items: center;
    justify-content: center;
}

.modal-container {
    position: relative;
    width: 680px;
    background: rgba(20, 20, 25, 0.9);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 24px;
    padding: 40px;
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: hidden;
}

.glow-effect {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    background: radial-gradient(circle at center, rgba(37, 99, 235, 0.15) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
}

/* Header */
.modal-header {
    width: 100%;
    display: flex;
    justify-content: center;
    position: relative;
    z-index: 1;
    margin-bottom: 32px;
}
.header-content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
}
.brand-logo {
    height: 40px;
    width: auto;
    margin-bottom: 8px;
}
.title {
    font-size: 24px;
    font-weight: 700;
    color: #fff;
    margin: 0;
}
.subtitle {
    font-size: 14px;
    color: #94a3b8;
    margin: 0;
}
.close-btn {
    position: absolute;
    top: -10px;
    right: -10px;
    background: rgba(255,255,255,0.05);
    border: none;
    color: #94a3b8;
    width: 32px; height: 32px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.2s;
    display: flex; align-items: center; justify-content: center;
}
.close-btn:hover {
    background: rgba(255,255,255,0.1);
    color: #fff;
    transform: rotate(90deg);
}

/* Content */
.modal-body {
    width: 100%;
    z-index: 1;
}

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
    width: 180px;
    height: 180px;
    background: #fff; /* Restored white background */
    border-radius: 12px;
    padding: 0; /* REMOVED white edge/padding as requested */
    margin-bottom: 20px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    display: flex;
    align-items: center;
    justify-content: center;
}
.qr-box:hover {
    transform: none; /* Removed scale effect for cleaner feel */
}
.qr-img {
    width: 100%;
    height: 100%;
    object-fit: contain; /* Ensure code is visible */
    border-radius: 12px;
}
.scan-tip {
    position: absolute;
    bottom: 0px;
    left: 0;
    right: 0;
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
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    margin-bottom: 6px;
    font-size: 14px;
    color: #e2e8f0;
    font-weight: 500;
}
.value {
    color: #94a3b8;
    font-size: 13px;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
    cursor: pointer;
    transition: color 0.2s;
}
.value:hover { color: #fff; }
.copy-icon { opacity: 0.5; }

/* Wechat Specifics */
.wechat .qr-card:hover { border-color: rgba(7, 193, 96, 0.3); }

/* Telegram Specifics */
.telegram .qr-card:hover { border-color: rgba(42, 171, 238, 0.3); }

/* Footer */
.modal-footer {
    margin-top: 32px;
    z-index: 1;
}
.service-tag {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 20px;
    color: #94a3b8;
    font-size: 13px;
    border: 1px solid rgba(255, 255, 255, 0.05);
}

/* Animations */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.3s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active .modal-container {
    animation: modal-pop 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.modal-fade-leave-active .modal-container {
    animation: modal-pop 0.2s reverse ease-in;
}

@keyframes modal-pop {
    0% { transform: scale(0.95); opacity: 0; }
    100% { transform: scale(1); opacity: 1; }
}

@media (max-width: 640px) {
    .modal-container { width: 95vw; padding: 24px; }
    .qr-grid { grid-template-columns: 1fr; }
    .qr-card { flex-direction: row; padding: 16px; gap: 16px; }
    .qr-box { width: 80px; height: 80px; margin-bottom: 0; }
    .info-box { text-align: left; }
    .icon-label, .value { justify-content: flex-start; }
}

/* Telegram Specific Override: Remove white box for the dark poster */
.telegram .qr-box {
    background: transparent;
    box-shadow: none;
}
.telegram .qr-img {
    border-radius: 8px;
    /* Optional: Add a subtle drop shadow to the image itself instead of the box */
    filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
}
</style>