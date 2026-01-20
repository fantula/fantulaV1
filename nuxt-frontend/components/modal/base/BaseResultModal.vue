<template>
  <Transition name="modal-fade">
    <div v-if="visible" class="modal-mask" @click.self="handleClose">
      <div class="modal-result">
        <!-- 图标区域 -->
        <div class="result-icon" :class="iconClass">
          <slot name="icon">
            <span v-if="type === 'success'">✓</span>
            <span v-else-if="type === 'error'">✕</span>
            <span v-else-if="type === 'warning'">!</span>
            <span v-else>i</span>
          </slot>
        </div>
        
        <!-- 标题 -->
        <div class="result-title">{{ title }}</div>
        
        <!-- 描述信息 -->
        <div class="result-message" v-if="message">{{ message }}</div>
        
        <!-- 自定义内容 -->
        <div class="result-content" v-if="$slots.default">
          <slot></slot>
        </div>
        
        <!-- 操作按钮 -->
        <div class="result-actions">
          <button 
            v-if="showSecondary"
            class="btn btn-secondary"
            @click="handleSecondary"
          >
            {{ secondaryText }}
          </button>
          <button 
            class="btn" 
            :class="primaryBtnClass"
            @click="handlePrimary"
          >
            {{ primaryText }}
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
/**
 * 基础结果弹窗
 * 用途: 支付成功、操作完成、余额不足等
 * 尺寸: 400px
 */

const props = withDefaults(defineProps<{
  visible: boolean
  type?: 'success' | 'error' | 'warning' | 'info'
  title?: string
  message?: string
  primaryText?: string
  secondaryText?: string
  showSecondary?: boolean
}>(), {
  type: 'success',
  title: '操作成功',
  primaryText: '确定',
  secondaryText: '返回',
  showSecondary: false
})

const emit = defineEmits<{
  (e: 'close'): void
  (e: 'primary'): void
  (e: 'secondary'): void
}>()

const iconClass = computed(() => `icon-${props.type}`)

const primaryBtnClass = computed(() => ({
  'btn-success': props.type === 'success',
  'btn-danger': props.type === 'error',
  'btn-warning': props.type === 'warning',
  'btn-primary': props.type === 'info'
}))

const handleClose = () => emit('close')

const handlePrimary = () => {
  emit('primary')
  emit('close')
}

const handleSecondary = () => {
  emit('secondary')
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
.modal-result {
  width: 400px;
  max-width: 90vw;
  background: rgba(30, 41, 59, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  padding: 40px 32px 32px;
  text-align: center;
}

/* 图标 */
.result-icon {
  width: 72px;
  height: 72px;
  border-radius: 50%;
  margin: 0 auto 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 36px;
  font-weight: 700;
}

.result-icon.icon-success {
  background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
  color: #fff;
  box-shadow: 0 8px 24px rgba(34, 197, 94, 0.3);
}

.result-icon.icon-error {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: #fff;
  box-shadow: 0 8px 24px rgba(239, 68, 68, 0.3);
}

.result-icon.icon-warning {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: #fff;
  box-shadow: 0 8px 24px rgba(245, 158, 11, 0.3);
}

.result-icon.icon-info {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: #fff;
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.3);
}

/* 标题 */
.result-title {
  font-size: 22px;
  font-weight: 700;
  color: #F1F5F9;
  margin-bottom: 12px;
}

/* 描述 */
.result-message {
  font-size: 15px;
  color: #94A3B8;
  line-height: 1.6;
  margin-bottom: 20px;
}

/* 自定义内容 */
.result-content {
  margin-bottom: 24px;
}

/* 按钮区 */
.result-actions {
  display: flex;
  gap: 12px;
  justify-content: center;
}

/* 按钮 */
.btn {
  padding: 12px 28px;
  border-radius: 10px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s;
  border: none;
  min-width: 120px;
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.08);
  color: #94A3B8;
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.btn-secondary:hover {
  background: rgba(255, 255, 255, 0.12);
  color: #F1F5F9;
}

.btn-success {
  background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%);
  color: #fff;
}

.btn-success:hover {
  box-shadow: 0 4px 12px rgba(34, 197, 94, 0.4);
}

.btn-danger {
  background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
  color: #fff;
}

.btn-warning {
  background: linear-gradient(135deg, #F59E0B 0%, #D97706 100%);
  color: #fff;
}

.btn-primary {
  background: linear-gradient(135deg, #3B82F6 0%, #2563EB 100%);
  color: #fff;
}

/* 动画 */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}

.modal-fade-enter-active .modal-result,
.modal-fade-leave-active .modal-result {
  transition: transform 0.25s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-from .modal-result,
.modal-fade-leave-to .modal-result {
  transform: scale(0.95);
}
</style>
