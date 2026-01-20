<template>
  <div class="modal-mask">
    <div class="google-modal">
      <div class="modal-header">
        <div class="modal-title">绑定谷歌邮箱</div>
        <div class="modal-subtitle">关联您的 Google 账号以更快捷登录</div>
        <button class="modal-close" @click="$emit('close')">×</button>
      </div>
      <div class="modal-content">
        <!-- 状态显示 -->
        <div class="status-box" :class="{ bound: isBound }">
          <div class="status-icon">
            <img src="/images/shared/oauth-google.png" alt="Google" class="google-icon" />
          </div>
          <div class="status-info">
            <div class="status-label">当前状态</div>
            <div class="status-text">{{ isBound ? '已绑定' : '未绑定' }}</div>
            <div class="bound-email" v-if="isBound">{{ currentGoogleEmail }}</div>
          </div>
        </div>

        <!-- 换绑/绑定操作 -->
        <div class="action-area" v-if="isBound">
          <div class="action-tip">如需更换绑定的 Google 账号，请点击下方按钮</div>
          <button class="btn-google" @click="handleBind">
            <span class="btn-icon">G</span>
            换绑 Google 账号
          </button>
        </div>
        <div class="action-area" v-else>
          <button class="btn-google" @click="handleBind">
            <span class="btn-icon">G</span>
            立即绑定 Google 账号
          </button>
        </div>

        <div class="modal-footer-tip">
          绑定后可直接使用 Google 账号登录凡图拉
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  isBound: boolean,
  currentGoogleEmail?: string
}>()

const emit = defineEmits(['close', 'bind'])

const handleBind = () => {
  // 模拟调用 Google 登录/授权
  // 实际项目中会跳转 OAuth 流程
  console.log('Initiating Google Binding...')
  emit('bind')
  emit('close')
}
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 2000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}
.google-modal {
  width: 420px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  overflow: hidden;
  animation: modalIn 0.2s cubic-bezier(.4,2,.6,1) 1;
}
@keyframes modalIn {
  0% { transform: scale(0.92); opacity: 0; }
  100% { transform: scale(1); opacity: 1; }
}
.modal-header {
  background: linear-gradient(135deg, #4285F4 0%, #34A853 100%); /* Google Colorsish */
  padding: 32px 32px 24px 32px;
  position: relative;
  text-align: center;
}
.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}
.modal-subtitle {
  color: rgba(255,255,255,0.9);
  font-size: 14px;
}
.modal-close {
  position: absolute;
  top: 18px;
  right: 24px;
  background: none;
  border: none;
  font-size: 28px;
  color: #fff;
  cursor: pointer;
  line-height: 1;
  padding: 0 4px;
}
.modal-content {
  padding: 32px;
}
.status-box {
  background: #f8f9fa;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
  border: 1px solid #eee;
}
.status-box.bound {
  background: #f0f9ff;
  border-color: #bbdefb;
}
.status-icon {
  width: 48px;
  height: 48px;
  background: #fff;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.google-icon {
  width: 24px;
  height: 24px;
}
.status-info {
  flex: 1;
}
.status-label {
  font-size: 12px;
  color: #666;
  margin-bottom: 4px;
}
.status-text {
  font-size: 16px;
  font-weight: 700;
  color: #333;
}
.bound-email {
  font-size: 14px;
  color: #4285F4;
  margin-top: 2px;
}
.action-area {
  text-align: center;
}
.action-tip {
  font-size: 13px;
  color: #666;
  margin-bottom: 12px;
}
.btn-google {
  width: 100%;
  padding: 12px;
  background: #fff;
  border: 1px solid #dadce0;
  border-radius: 24px;
  color: #3c4043;
  font-size: 16px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  transition: all 0.2s;
}
.btn-google:hover {
  background: #f7f8f8;
  box-shadow: 0 1px 3px rgba(0,0,0,0.08);
}
.btn-icon {
  font-weight: bold;
  color: #4285F4;
  font-size: 18px;
}
.modal-footer-tip {
  margin-top: 24px;
  text-align: center;
  font-size: 12px;
  color: #999;
}
</style>
