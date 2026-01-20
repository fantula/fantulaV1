<template>
  <div class="modal-mask">
    <div class="ticket-apply-modal">
      <div class="modal-header">
        <div class="modal-title">申请工单</div>
        <div class="modal-subtitle">请填写工单申请信息，我们将尽快为您处理</div>
        <button class="modal-close" @click="$emit('close')">×</button>
      </div>
      <div class="modal-content">
        <div class="modal-left">
          <div class="order-info-title with-icon">
            <img class="section-icon" src="/images/client/pc/shenqing1.png" alt="关联系统信息" />
            关联系统信息
          </div>
          <div class="order-info-row"><span class="order-label">订单编号：</span><span class="order-link">#O202306201234</span></div>
          <div class="order-info-row"><span class="order-label">下单时间：</span><span class="order-value">2023-06-20 14:30</span></div>
          <div class="order-info-row"><span class="order-label">订单状态：</span><span class="order-status">已发货</span></div>
          <div class="order-info-row"><span class="order-label">支付金额：</span><span class="order-amount">￥899.00</span></div>
          <div class="order-info-title with-icon">
            <img class="section-icon" src="/images/client/pc/shenqing2.png" alt="关联商品" />
            关联商品
          </div>
          <div class="product-card">
            <img class="product-img" src="/images/client/pc/netflix.png" alt="Netflix" />
            <div class="product-info">
              <div class="product-name">Netflix月付版</div>
              <div class="product-price">￥899.00</div>
            </div>
          </div>
        </div>
        <div class="modal-right">
          <div class="form-group">
            <label class="form-label with-icon">
              <!-- Using a generic icon or reusing one -->
              <img class="section-icon" src="/images/client/pc/gongdan1.png" alt="关联订单" />
              关联订单
            </label>
            <div class="select-wrapper">
              <select class="form-select" v-model="selectedOrderId">
                <option value="" disabled selected>请选择关联订单</option>
                <option v-for="order in mockOrders" :key="order.id" :value="order.id">
                  {{ order.id }} - {{ order.title }}
                </option>
              </select>
              <span class="select-arrow">▼</span>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label with-icon">
              <img class="section-icon" src="/images/client/pc/shenqing3.png" alt="问题类型" />
              问题类型<span class="required">*</span>
            </label>
            <input class="form-input" v-model="issueType" placeholder="例如：账号无法登录" />
          </div>
          <div class="form-group">
            <label class="form-label with-icon">
              <img class="section-icon" src="/images/client/pc/shenqing4.png" alt="问题优先级" />
              问题优先级<span class="required">*</span>
            </label>
            <div class="priority-group">
              <button
                v-for="level in priorityLevels"
                :key="level.value"
                class="priority-btn"
                :class="{ active: issuePriority === level.value, [level.class]: true }"
                @click="issuePriority = level.value"
                type="button"
              >
                {{ level.label }}
              </button>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label with-icon">
              <img class="section-icon" src="/images/client/pc/shenqing5.png" alt="问题描述" />
              问题描述<span class="required">*</span>
            </label>
            <textarea class="form-textarea" v-model="issueDesc" rows="4" placeholder="请详细描述您遇到的问题，包括错误信息、操作步骤等……"></textarea>
          </div>
          <div class="form-group">
            <label class="form-label with-icon">
              <img class="section-icon" src="/images/client/pc/shenqing6.png" alt="添加附件" />
              添加附件
            </label>
            <div class="upload-box">
              <img class="upload-arrow" src="/images/client/pc/shenqing7.png" alt="上传" />
              <div class="upload-tip">点击或拖拽文件到此处上传</div>
              <div class="upload-desc">支持 JPG, PNG, GIF 格式，单个文件不超过5MB</div>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-actions">
        <button class="btn-cancel" @click="$emit('close')">
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><circle cx="10" cy="10" r="10" fill="#D9D9D9"/><path d="M7.5 7.5L12.5 12.5M12.5 7.5L7.5 12.5" stroke="#888" stroke-width="1.5" stroke-linecap="round"/></svg>
          取消
        </button>
        <button class="btn-confirm">
          <svg class="btn-icon" width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M3 10L17 3L10 17L9 11L3 10Z" fill="#fff"/><path d="M3 10L17 3L10 17L9 11L3 10Z" stroke="#fff" stroke-width="1.5" stroke-linejoin="round"/></svg>
          提交工单
        </button>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const issueType = ref('')
const issuePriority = ref('中')
const issueDesc = ref('')
const selectedOrderId = ref('')

const mockOrders = [
  { id: 'O202306201234', title: 'Netflix月付版' },
  { id: 'O202312150001', title: 'Disney+年付独享' },
  { id: 'O202312100023', title: 'Spotify Premium' }
]

const priorityLevels = [
  { label: '低', value: '低', class: 'low' },
  { label: '中', value: '中', class: 'medium' },
  { label: '高', value: '高', class: 'high' },
]

// 交互逻辑可后续补充
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
.ticket-apply-modal {
  width: 900px;
  background: #fff;
  border-radius: 18px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  overflow: hidden;
  display: flex;
  flex-direction: column;
}
.modal-header {
  background: linear-gradient(135deg, #2196F3 0%, #2575FC 100%);
  padding: 32px 32px 18px 32px;
  position: relative;
  text-align: center;
}
.modal-title {
  font-size: 28px;
  font-weight: 700;
  color: #fff;
  margin-bottom: 8px;
}
.modal-subtitle {
  color: #e3f0ff;
  font-size: 16px;
  margin-bottom: 0;
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
  border-radius: 4px;
  transition: background 0.2s;
}
.modal-content {
  display: flex;
  flex-direction: row;
  padding: 32px 32px 0 32px;
  gap: 32px;
}
.modal-left {
  width: 340px;
  background: #f4f8ff;
  border-radius: 16px;
  padding: 24px 18px 18px 18px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.order-info-title {
  font-family: 'Noto Sans SC', Noto Sans SC;
  font-weight: 900;
  font-size: 20px;
  color: #2A5298;
  line-height: 22px;
  text-align: left;
  font-style: normal;
  text-transform: none;
  margin-bottom: 16px;
}
.order-info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  color: #444;
  padding: 8px 0 8px 0;
  border-bottom: 1px solid #e3eaf2;
  line-height: 22px;
  white-space: nowrap;
}
.order-info-row:last-child {
  border-bottom: none;
}
.order-label {
  font-weight: 400;
  color: #444;
}
.order-value, .order-link {
  font-weight: 900;
  font-size: 17px;
  color: #2A5298;
  font-family: 'Noto Sans SC', Noto Sans SC;
}
.order-status {
  font-weight: 900;
  color: #1890FF;
  font-size: 17px;
  font-family: 'Noto Sans SC', Noto Sans SC;
}
.order-amount {
  font-weight: 900;
  color: #ff4d4f;
  font-size: 17px;
  font-family: 'Noto Sans SC', Noto Sans SC;
}
.product-card {
  display: flex;
  align-items: center;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(24,144,255,0.08);
  padding: 10px 16px;
  margin-top: 8px;
  gap: 12px;
}
.product-img {
  width: 48px;
  height: 48px;
  border-radius: 8px;
  object-fit: cover;
}
.product-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}
.product-name {
  font-size: 15px;
  color: #222;
  font-weight: 600;
}
.product-price {
  color: #ff4d4f;
  font-size: 15px;
  font-weight: 600;
}
.modal-right {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.form-group {
  margin-bottom: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
}
.form-label {
  font-size: 15px;
  color: #222;
  font-weight: 500;
}
.required {
  color: #ff4d4f;
  margin-left: 2px;
}
.form-input {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  background: #f8f9fa;
  color: #333;
  outline: none;
  transition: border 0.2s;
}
.form-input:focus {
  border-color: #4A90E2;
}
/* Select Styles */
.select-wrapper { position: relative; width: 100%; }
.form-select { width: 100%; padding: 12px 16px; border: 1px solid #e0e0e0; border-radius: 8px; font-size: 15px; background: #f8f9fa; color: #333; outline: none; appearance: none; cursor: pointer; transition: border 0.2s; }
.form-select:focus { border-color: #4A90E2; }
.select-arrow { position: absolute; right: 16px; top: 50%; transform: translateY(-50%); pointer-events: none; color: #999; font-size: 12px; }

.priority-group {
  display: flex;
  gap: 12px; /* Smaller gap */
}
.priority-btn {
  min-width: 80px; /* Reducing from 128px */
  height: 36px; /* Reducing from 56px */
  padding: 0 16px;
  border-radius: 20px; /* High radius for pill shape */
  font-size: 14px; /* Smaller font */
  border: 1px solid #e3eaf2;
  background: #fff;
  color: #444;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.18s;
  outline: none;
  box-shadow: none;
}
.priority-btn.active.low { background: #E8F5E9; color: #4CAF50; border-color: #4CAF50; }
.priority-btn.active.medium { background: #FFF8E1; color: #FFC107; border-color: #FFC107; }
.priority-btn.active.high { background: #FFEBEE; color: #F44336; border-color: #F44336; }
.priority-btn:not(.active):hover {
  border-color: #b3c6e6;
}
.form-textarea {
  width: 100%;
  padding: 12px 16px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-size: 15px;
  background: #f8f9fa;
  color: #333;
  outline: none;
  resize: vertical;
  min-height: 80px;
  transition: border 0.2s;
}
.form-textarea:focus {
  border-color: #4A90E2;
}
.upload-box {
  border: 2px dashed #b3c6e6;
  border-radius: 12px;
  background: #f8f9fa;
  padding: 24px 0 16px 0;
  text-align: center;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
}
.upload-arrow {
  width: 44px;
  height: 44px;
  margin-bottom: 4px;
  display: block;
}
.upload-tip {
  color: #2575FC;
  font-size: 15px;
  font-weight: 500;
}
.upload-desc {
  color: #888;
  font-size: 13px;
}
.modal-actions {
  display: flex;
  justify-content: flex-end;
  gap: 16px;
  padding: 18px 32px 24px 32px;
  background: #f8f9fa;
}
.btn-cancel {
  background: #f5f5f5;
  color: #888;
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  font-size: 15px;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-cancel:hover {
  background: #e0e0e0;
}
.btn-confirm {
  background: linear-gradient(90deg, #1A57DC 0%, #2575FC 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 10px 28px;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}
.btn-confirm:disabled {
  background: #b3c6e6;
  cursor: not-allowed;
}
.section-icon {
  width: 22px;
  height: 22px;
  margin-right: 8px;
  vertical-align: middle;
}
.with-icon {
  display: flex;
  align-items: center;
  gap: 6px;
}
.btn-icon {
  margin-right: 8px;
  vertical-align: middle;
}
</style> 