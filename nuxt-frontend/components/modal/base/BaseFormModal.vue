<template>
  <Transition name="modal-fade">
    <div v-if="visible" class="modal-mask" @click.self="handleClose">
      <div class="modal-form">
        <!-- 头部 -->
        <div class="modal-header">
          <div class="modal-title">{{ title }}</div>
          <div class="modal-subtitle" v-if="subtitle">{{ subtitle }}</div>
          <button class="modal-close" @click="handleClose">×</button>
        </div>
        
        <!-- 表单区域 -->
        <div class="modal-body">
          <slot></slot>
        </div>
        
        <!-- 底部按钮 -->
        <div class="modal-footer" v-if="showFooter">
          <button 
            class="btn btn-secondary" 
            @click="handleCancel"
            :disabled="loading"
          >
            {{ cancelText }}
          </button>
          <button 
            class="btn btn-primary"
            @click="handleSubmit"
            :disabled="loading || submitDisabled"
          >
            <span v-if="loading" class="btn-loading"></span>
            {{ submitText }}
          </button>
        </div>
        
        <!-- Phantom Mascot -->
        <img 
          v-if="showMascot"
          src="/images/theme/modal_mascot.png" 
          class="modal-mascot-phantom" 
        />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
/**
 * 基础表单弹窗
 * 用途: 登录注册、修改资料、绑定等
 * 尺寸: 500px
 */

const props = withDefaults(defineProps<{
  visible: boolean
  title?: string
  subtitle?: string
  cancelText?: string
  submitText?: string
  loading?: boolean
  submitDisabled?: boolean
  showFooter?: boolean
  showMascot?: boolean
}>(), {
  title: '表单',
  cancelText: '取消',
  submitText: '提交',
  loading: false,
  submitDisabled: false,
  loading: false,
  submitDisabled: false,
  showFooter: true,
  showMascot: false
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'cancel'): void
  (e: 'submit'): void
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

const handleSubmit = () => {
  emit('submit')
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
.modal-form {
  width: 500px;
  max-width: 90vw;
  max-height: 85vh;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 头部 */
.modal-header {
  padding: 24px 28px;
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  position: relative;
  flex-shrink: 0;
  z-index: 2;
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
  position: absolute;
  top: 20px;
  right: 20px;
  width: 32px;
  height: 32px;
  background: rgba(255, 255, 255, 0.15);
  border: none;
  border-radius: 8px;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.25);
}

/* 内容区 */
.modal-body {
  padding: 24px 28px;
  overflow-y: auto;
  flex: 1;
  position: relative;
  z-index: 2;
}

/* 底部 */
.modal-footer {
  padding: 16px 28px;
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
  flex-shrink: 0;
  position: relative;
  z-index: 2;
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

.modal-fade-enter-active .modal-form,
.modal-fade-leave-active .modal-form {
  transition: transform 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-form,
.modal-fade-leave-to .modal-form {
  transform: scale(0.95);
}

/* Mascot Style */
.modal-mascot-phantom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: auto;
  opacity: 0.1;
  pointer-events: none;
  z-index: 0;
  mask-image: linear-gradient(to top, black 30%, transparent 100%);
  -webkit-mask-image: linear-gradient(to top, black 30%, transparent 100%);
  filter: grayscale(0.4); 
  
  animation: phantom-float 1.2s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  transform-origin: bottom center;
}

@keyframes phantom-float {
  0% {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  100% {
    opacity: 0.1;
    transform: translateY(0) scale(1);
  }
}
</style>
