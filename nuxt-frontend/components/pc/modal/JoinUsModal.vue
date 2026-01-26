<template>
  <BaseModal
    v-if="visible"
    :visible="visible"
    title="加入我们的社群"
    width="520px"
    :show-footer="false"
    @close="$emit('close')"
  >
    <p class="modal-subtitle">扫码添加客服微信，获取专属服务</p>
    
    <div class="wechat-content">
      <div class="qr-container">
        <img src="/images/client/pc/weixin.png" alt="微信二维码" class="qr-code" />
      </div>
      
      <div class="wechat-info">
        <div class="wechat-id">
          <span class="wechat-label">客服微信：</span>
          <span class="wechat-value">Companyservice</span>
        </div>
        
        <button class="copy-btn" @click="copyWechatId">📋 复制微信号</button>
      </div>
      
      <!-- 添加客服步骤 -->
      <div class="steps-section">
        <div class="steps-title">添加客服步骤</div>
        <div class="steps-container">
          <div class="step-item">
            <div class="step-number">1</div>
            <div class="step-text">下载二维码图片到电脑</div>
          </div>
          <div class="step-item">
            <div class="step-number">2</div>
            <div class="step-text">打开手机微信扫一扫</div>
          </div>
          <div class="step-item">
            <div class="step-number">3</div>
            <div class="step-text">点击加入社群</div>
          </div>
        </div>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ElMessage } from 'element-plus'

defineProps<{ visible: boolean }>()
defineEmits(['close'])

function copyWechatId() {
  const wechatId = 'Companyservice'
  if (navigator.clipboard) {
    navigator.clipboard.writeText(wechatId).then(() => {
      ElMessage.success('微信号已复制到剪贴板')
    }).catch(() => {
      fallbackCopy(wechatId)
    })
  } else {
    fallbackCopy(wechatId)
  }
}

function fallbackCopy(text: string) {
  const textArea = document.createElement('textarea')
  textArea.value = text
  document.body.appendChild(textArea)
  textArea.select()
  try {
    document.execCommand('copy')
    ElMessage.success('微信号已复制到剪贴板')
  } catch (err) {
    ElMessage.error('复制失败，请手动复制微信号：' + text)
  }
  document.body.removeChild(textArea)
}
</script>

<style scoped>
.modal-subtitle {
  text-align: center;
  color: #94A3B8;
  margin: 0 0 24px 0;
  font-size: 14px;
}

.wechat-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
}

.qr-container {
  width: 200px;
  height: 200px;
  background: #fff;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  box-sizing: border-box;
}

.qr-code {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 8px;
}

.wechat-info {
  text-align: center;
}

.wechat-id {
  margin-bottom: 16px;
}

.wechat-label {
  font-size: 15px;
  color: #94A3B8;
}

.wechat-value {
  font-weight: 600;
  font-size: 16px;
  color: #fff;
}

.copy-btn {
  background: linear-gradient(135deg, var(--primary-blue) 0%, #2563eb 100%);
  color: #fff;
  border: none;
  padding: 10px 24px;
  border-radius: 20px;
  font-weight: 500;
  font-size: 14px;
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;
}

.copy-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
}

.steps-section {
  width: 100%;
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 16px;
  padding: 20px;
}

.steps-title {
  font-weight: 600;
  font-size: 15px;
  text-align: center;
  margin-bottom: 16px;
  color: #fff;
}

.steps-container {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.step-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.step-number {
  width: 32px;
  height: 32px;
  background: var(--primary-blue);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  font-size: 14px;
  color: #fff;
  margin-bottom: 10px;
}

.step-text {
  font-size: 12px;
  color: #94A3B8;
  line-height: 1.4;
}
</style>