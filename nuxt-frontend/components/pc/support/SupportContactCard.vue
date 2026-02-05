<template>
    <div class="contact-section">
      <h3 class="contact-title">没有找到您的问题？</h3>
      <p class="contact-desc">我们的客服团队随时为您提供帮助，平均响应时间不超过3分钟，解决率高达99.8%!</p>
      
      <BaseButton 
         theme-id="primary"
         class="contact-btn-wrapper"
      >
         <el-icon class="mr-2"><Service /></el-icon>
         联系在线客服
      </BaseButton>
    </div>
  </template>
  
  <script setup lang="ts">
  import { Service } from '@element-plus/icons-vue'
  import BaseButton from '@/components/shared/BaseButton.vue'
  </script>
  
  <style scoped>
  .contact-section {
    background: rgba(15, 23, 42, 0.6) !important; /* Darker Glass */
    padding: 40px;
    border-radius: 20px;
    box-shadow: none;
    text-align: center;
    border: 1px solid rgba(255, 255, 255, 0.08);
  }
  
  .contact-title {
    font-weight: 600;
    font-size: 24px;
    color: white !important;
    margin-bottom: 15px;
  }
  
  .contact-desc {
    font-size: 16px;
    color: #94A3B8 !important;
    margin-bottom: 30px;
    line-height: 1.6;
  }

  .mr-2 { margin-right: 8px; font-size: 18px; }
  
  .contact-btn-wrapper {
    /* Override BaseButton width if needed, or leave auto */
    padding-left: 32px; 
    padding-right: 32px;
  }
  </style>
