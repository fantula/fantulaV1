<template>
  <BaseFormModal
    :visible="visible"
    title="绑定谷歌邮箱"
    :show-footer="false"
    theme-id="suit-001"
    @close="$emit('close')"
    @update:visible="$emit('update:visible', $event)"
  >
    <div class="google-content">
      <div class="modal-subtitle">关联您的 Google 账号以更快捷登录</div>

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
  </BaseFormModal>
</template>

<script setup lang="ts">
import BaseFormModal from '@/components/modal/base/BaseFormModal.vue'

defineProps<{
  visible?: boolean
  isBound: boolean,
  currentGoogleEmail?: string
}>()

const emit = defineEmits(['close', 'bind', 'update:visible'])

const handleBind = () => {
  console.log('Initiating Google Binding...')
  emit('bind')
  emit('close')
}
</script>

<style scoped>
/* Business Styles Only - No Layout */
.google-content {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.modal-subtitle {
  color: #94A3B8;
  font-size: 14px;
  text-align: center;
  margin-top: -10px;
}

/* Status Box - Dark Glass */
.status-box {
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 16px;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  transition: all 0.3s;
}

.status-box.bound {
  background: rgba(66, 133, 244, 0.1);
  border-color: rgba(66, 133, 244, 0.3);
  box-shadow: 0 0 20px rgba(66, 133, 244, 0.1);
}

.status-icon {
  width: 48px;
  height: 48px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
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
  color: #94A3B8;
  margin-bottom: 4px;
}

.status-text {
  font-size: 16px;
  font-weight: 700;
  color: #fff;
}

.bound-email {
  font-size: 14px;
  color: #60A5FA; /* Blue-400 */
  margin-top: 2px;
  font-family: monospace;
}

.action-area {
  text-align: center;
}

.action-tip {
  font-size: 13px;
  color: #94A3B8;
  margin-bottom: 12px;
}

/* Google Button - Custom to fit Dark Theme but keep brand recognition */
.btn-google {
  width: 100%;
  padding: 14px;
  background: #fff;
  border: 1px solid transparent;
  border-radius: 14px;
  color: #3c4043;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  transition: all 0.2s;
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.btn-google:hover {
  background: #f8f9fa;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0,0,0,0.3);
}

.btn-google:active {
  transform: scale(0.98);
}

.btn-icon {
  font-weight: bold;
  color: #4285F4;
  font-size: 18px;
}

.modal-footer-tip {
  text-align: center;
  font-size: 12px;
  color: #64748B;
  padding: 0 20px;
  line-height: 1.5;
}
</style>
