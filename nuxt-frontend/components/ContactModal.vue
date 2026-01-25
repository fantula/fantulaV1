<template>
  <Transition name="modal-zoom">
    <div v-if="visible" class="modal-mask" @click.self="close">
      <div class="contact-modal">
        <!-- Header -->
        <div class="modal-header">
          <div class="modal-header-inner">
            <div class="modal-title">联系我们</div>
            <div class="modal-subtitle">无论是业务咨询还是商务合作，我们随时为您提供支持</div>
            <button class="modal-close" @click="close">×</button>
          </div>
        </div>

        <!-- Body -->
        <div class="modal-body">
          <div class="contact-items">
            <!-- Customer Service -->
            <div class="contact-item">
              <div class="item-icon">
                <el-icon><Service /></el-icon>
              </div>
              <div class="item-info">
                <h3>客户服务</h3>
                <p>订单咨询、售后处理、使用帮助</p>
              </div>
              <div class="item-action">
                 <button class="copy-btn" @click="copyText('support@fantula.com')">
                   <span>support@fantula.com</span>
                   <el-icon class="copy-icon"><CopyDocument /></el-icon>
                 </button>
              </div>
            </div>

            <!-- Business Cooperation -->
            <div class="contact-item">
              <div class="item-icon">
                <el-icon><Suitcase /></el-icon>
              </div>
              <div class="item-info">
                <h3>商务合作</h3>
                <p>渠道代理、大宗采购、品牌联名</p>
              </div>
              <div class="item-action">
                 <button class="copy-btn" @click="copyText('business@fantula.com')">
                   <span>business@fantula.com</span>
                   <el-icon class="copy-icon"><CopyDocument /></el-icon>
                 </button>
              </div>
            </div>
          </div>
          
          <!-- Social Media -->
          <div class="contact-footer">
             <div class="manual-tip">也可以通过以下方式找到我们</div>
             <div class="social-row">
               <button class="social-pill">
                 <el-icon><ChatDotRound /></el-icon>
                 <span>微信客服</span>
               </button>
               <button class="social-pill">
                 <el-icon><Position /></el-icon>
                 <span>Telegram</span>
               </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { Service, Suitcase, ChatDotRound, Position, CopyDocument } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  visible: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['close'])

function close() {
  emit('close')
}

function copyText(text: string) {
  navigator.clipboard.writeText(text).then(() => {
    ElMessage.success('邮箱地址已复制')
  }).catch(() => {
    ElMessage.error('复制失败，请手动复制')
  })
}
</script>

<style scoped>
-.modal-mask {
  position: fixed;
  z-index: 9999;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.25);
  display: flex;
  align-items: center;
  justify-content: center;
}

.contact-modal {
  width: 480px;
  max-width: 90vw;
  background: rgba(15, 23, 42, 0.75);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 40px 80px -12px rgba(0, 0, 0, 0.6);
  border-radius: 32px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
}

.modal-header {
  width: 100%;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.15) 0%, rgba(14, 165, 233, 0.05) 100%);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
  padding: 32px 32px 24px;
}

.modal-header-inner {
  position: relative;
  text-align: center;
}

.modal-title {
  font-size: 24px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
  letter-spacing: 0.5px;
}

.modal-subtitle {
  font-size: 14px;
  color: #94A3B8;
  line-height: 1.5;
}

.modal-close {
  position: absolute;
  top: -20px;
  right: -20px;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  color: #fff;
  border: none;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s;
}

.modal-close:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: rotate(90deg);
}

.modal-body {
  padding: 32px;
}

.contact-items {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.contact-item {
  display: flex;
  align-items: center;
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 16px;
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: rgba(30, 41, 59, 0.6);
  border-color: rgba(96, 165, 250, 0.2);
  transform: translateY(-2px);
}

.item-icon {
  width: 48px;
  height: 48px;
  background: rgba(96, 165, 250, 0.1);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #60A5FA;
  font-size: 24px;
  margin-right: 16px;
  flex-shrink: 0;
}

.item-info {
  flex: 1;
  min-width: 0; /* Prevent overflow */
}

.item-info h3 {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #F1F5F9;
  font-weight: 600;
}

.item-info p {
  margin: 0;
  font-size: 12px;
  color: #94A3B8;
}

.item-action {
  margin-left: 16px;
}

.copy-btn {
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 6px 12px;
  color: #94A3B8;
  font-family: monospace;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
  gap: 8px;
}

.copy-btn:hover {
  background: rgba(96, 165, 250, 0.1);
  border-color: rgba(96, 165, 250, 0.3);
  color: #60A5FA;
}

.copy-icon {
  font-size: 14px;
}

.contact-footer {
  text-align: center;
  padding-top: 24px;
  border-top: 1px solid rgba(255, 255, 255, 0.05);
}

.manual-tip {
  font-size: 12px;
  color: #64748B;
  margin-bottom: 16px;
}

.social-row {
  display: flex;
  justify-content: center;
  gap: 16px;
}

.social-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.08);
  padding: 8px 20px;
  border-radius: 20px;
  color: #94A3B8;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.2s;
}

.social-pill:hover {
  background: rgba(255, 255, 255, 0.08);
  color: #F1F5F9;
  border-color: rgba(255, 255, 255, 0.15);
}
</style>