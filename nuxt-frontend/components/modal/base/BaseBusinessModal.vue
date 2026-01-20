<template>
  <Transition name="modal-fade">
    <div v-if="visible" class="modal-mask" @click.self="handleClose">
      <div class="modal-business" :style="{ width: width }">
        <!-- 头部 -->
        <div class="modal-header" v-if="showHeader">
          <div class="header-content">
            <div class="modal-title">{{ title }}</div>
            <div class="modal-subtitle" v-if="subtitle">{{ subtitle }}</div>
          </div>
          <button class="modal-close" @click="handleClose">×</button>
        </div>
        
        <!-- 内容区域 -->
        <div class="modal-body" :class="{ 'no-header': !showHeader }">
          <slot></slot>
        </div>
        
        <!-- 底部操作栏 -->
        <div class="modal-footer" v-if="showFooter">
          <div class="footer-left">
            <slot name="footer-left"></slot>
          </div>
          <div class="footer-right">
            <slot name="footer-right">
              <button 
                v-if="showCancel"
                class="btn btn-secondary" 
                @click="handleCancel"
                :disabled="loading"
              >
                {{ cancelText }}
              </button>
              <button 
                v-if="showConfirm"
                class="btn btn-primary"
                @click="handleConfirm"
                :disabled="loading || confirmDisabled"
              >
                <span v-if="loading" class="btn-loading"></span>
                {{ confirmText }}
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
/**
 * 基础业务弹窗
 * 用途: 支付、优惠券选择、充值等复杂业务
 * 尺寸: 600px (可自定义)
 */

const props = withDefaults(defineProps<{
  visible: boolean
  title?: string
  subtitle?: string
  width?: string
  showHeader?: boolean
  showFooter?: boolean
  showCancel?: boolean
  showConfirm?: boolean
  cancelText?: string
  confirmText?: string
  loading?: boolean
  confirmDisabled?: boolean
}>(), {
  title: '业务弹窗',
  width: '600px',
  showHeader: true,
  showFooter: true,
  showCancel: true,
  showConfirm: true,
  cancelText: '取消',
  confirmText: '确定',
  loading: false,
  confirmDisabled: false
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'confirm'): void
}>()

const handleClose = () => {
  if (!props.loading) emit('close')
}

const handleCancel = () => {
  if (!props.loading) {
    emit('cancel')
    emit('close')
  }
}

const handleConfirm = () => {
  emit('confirm')
}
</script>

<style scoped>
/* 遮罩层 */
.modal-mask {
  position: fixed;
  z-index: 2000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* 弹窗容器 */
.modal-business {
  max-width: 90vw;
  max-height: 85vh;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.35);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

/* 头部 */
.modal-header {
  padding: 24px 28px;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  position: relative;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content {
  flex: 1;
}

.modal-title {
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.modal-subtitle {
  font-size: 13px;
  color: rgba(255, 255, 255, 0.8);
  margin-top: 4px;
}

.modal-close {
  width: 36px;
  height: 36px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 10px;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
  flex-shrink: 0;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* 内容区 */
.modal-body {
  padding: 24px 28px;
  overflow-y: auto;
  flex: 1;
  min-height: 100px;
}

.modal-body.no-header {
  padding-top: 32px;
}

/* 底部 */
.modal-footer {
  padding: 16px 28px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
}

.footer-left {
  display: flex;
  align-items: center;
  gap: 12px;
}

.footer-right {
  display: flex;
  gap: 12px;
}

/* 按钮 */
.btn {
  padding: 12px 24px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  display: inline-flex;
  align-items: center;
  gap: 6px;
}

.btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover:not(:disabled) {
  background: rgba(255, 255, 255, 0.12);
  color: #F1F5F9;
}

.btn-primary {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: #fff;
  min-width: 100px;
  justify-content: center;
}

.btn-primary:hover:not(:disabled) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.4);
}

/* Loading */
.btn-loading {
  width: 14px;
  height: 14px;
  border: 2px solid rgba(255,255,255,0.3);
  border-top-color: #fff;
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

/* 动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-active .modal-business,
.modal-fade-leave-active .modal-business {
  transition: transform 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-business,
.modal-fade-leave-to .modal-business {
  transform: scale(0.95);
}
</style>
