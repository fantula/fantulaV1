<template>
  <Transition name="modal-zoom">
    <div class="service-modal-mask" @click.self="$emit('close')">
      <div class="service-modal">
        <div class="modal-gradient-top">
          <div class="modal-header">
            <span class="modal-title">联系客服</span>
            <button class="modal-close" @click="$emit('close')">×</button>
          </div>
          <div class="modal-desc">我们提供多种便捷的客服渠道，7×24小时为您提供专业服务。扫码添加客服，获取即时帮助。</div>
        </div>
        <div class="modal-main-white">
          <div class="modal-row">
            <div class="modal-card">
              <div class="card-top-row">
                <div class="card-avatar wechat">
                  <img 
                    :src="weixinIcon1" 
                    alt="微信客服图标" 
                    @error="handleImageError"
                    @load="handleImageLoad"
                  />
                </div>
              <div class="card-title">微信客服</div>
              </div>
              <div class="card-icon-box">
                <img 
                  :src="weixinIcon2" 
                  class="card-icon-img" 
                  alt="微信二维码" 
                  @error="handleImageError"
                  @load="handleImageLoad"
                />
              </div>
              <div class="card-desc">使用微信扫描二维码添加客服<br />或搜索微信号：<span class="account-code">kefu_wechat123</span></div>
            </div>
            <div class="modal-card">
              <div class="card-top-row">
                <div class="card-avatar dingtalk">
                  <img 
                    :src="dingdingIcon1" 
                    alt="钉钉客服图标" 
                    @error="handleImageError"
                    @load="handleImageLoad"
                  />
                </div>
                <div class="card-title">钉钉客服</div>
              </div>
              <div class="card-icon-box">
                <img 
                  :src="dingdingIcon2" 
                  class="card-icon-img" 
                  alt="钉钉二维码" 
                  @error="handleImageError"
                  @load="handleImageLoad"
                />
              </div>
              <div class="card-desc">使用钉钉扫描二维码添加客服<br />或搜索ID：<span class="account-code">kefu_dingtalk456</span></div>
            </div>
          </div>
          <div class="modal-row phone-row">
            <div class="modal-card phone">
              <div class="phone-header">
                <div class="modal-card-icon phone">
                  <img 
                    :src="phoneIcon" 
                    alt="电话客服图标" 
                    @error="handleImageError"
                    @load="handleImageLoad"
                  />
                </div>
                <div class="modal-card-title phone">电话客服</div>
              </div>
              <div class="modal-phone-number">400-888-9999</div>
              <div class="modal-phone-desc">服务时间：全天24小时<br />拨打客服热线获取即时支持<br />或发送邮件至 <span class="email-support">support@company.com</span></div>
            </div>
          </div>
          <button class="modal-action">
            <img 
              :src="contactIcon" 
              alt="联系客服图标" 
              class="action-icon"
              @error="handleImageError"
              @load="handleImageLoad"
            />
            联系在线客服
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
// 如果静态路径有问题，可以使用这种方式
const weixinIcon1 = '/images/client/pc/kefuweixin1.png'
const weixinIcon2 = '/images/client/pc/kefuweixin2.png'
const dingdingIcon1 = '/images/client/pc/kefudingding1.png'
const dingdingIcon2 = '/images/client/pc/kefudingding2.png'
const phoneIcon = '/images/client/pc/kefudianhua.png'
const contactIcon = '/images/client/pc/kefulianxi.png'

// 图片加载错误处理
const handleImageError = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.warn('图片加载失败:', img.src)
  // 可以设置默认图片或隐藏
  img.style.display = 'none'
}

// 图片加载成功处理
const handleImageLoad = (event: Event) => {
  const img = event.target as HTMLImageElement
  console.log('图片加载成功:', img.src)
}
</script>

<style scoped>
.service-modal-mask {
  position: fixed;
  z-index: 2000;
  left: 0; top: 0; right: 0; bottom: 0;
  background: rgba(0,0,0,0.12);
  display: flex;
  align-items: center;
  justify-content: center;
}
.service-modal {
  height: auto;
  width: 576px;
  max-width: 98vw;
  border-radius: 24px;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  /* Dark Glass Theme */
  background: rgba(15, 23, 42, 0.7);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  /* Removed animation: modalIn ... handled by Vue Transition now */
}
/* Removed @keyframes modalIn */
.modal-gradient-top {
  /* Subtle gradient blend */
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(14, 165, 233, 0.1) 100%);
  border-radius: 24px 24px 0 0;
  padding: 26px 32px 19px 32px;
  text-align: center;
  position: relative;
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}
.modal-header {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  margin-bottom: 10px;
}
.modal-title {
  color: #fff;
  font-size: 21px;
  font-weight: 700;
  letter-spacing: 0.8px;
  flex: 1;
  text-align: center;
}
.modal-close {
  position: absolute;
  right: 0;
  top: 0;
  background: none;
  border: none;
  color: #fff;
  font-size: 22px;
  cursor: pointer;
  line-height: 1;
  padding: 3px 6px;
  border-radius: 5px;
  transition: background 0.2s;
}
.modal-close:hover {
  background: rgba(255,255,255,0.1);
}
.modal-desc {
  color: #94A3B8; /* Slate-400 */
  font-size: 13px;
  margin: 0;
  text-align: center;
  line-height: 1.5;
}
.modal-main-white {
  background: transparent; /* Remove white bg */
  border-radius: 0 0 24px 24px;
  padding: 29px 26px 26px 26px;
  margin-top: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.modal-row {
  display: flex;
  gap: 19px;
  justify-content: center;
  margin-bottom: 22px;
  width: 100%;
}
.phone-row {
  justify-content: center;
  margin-bottom: 26px;
}
.modal-card {
  background: rgba(255, 255, 255, 0.03);
  border-radius: 16px;
  box-shadow: none;
  padding: 22px 16px 19px 16px;
  width: 208px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  border: 1px solid rgba(255, 255, 255, 0.08); /* Subtle border */
  transition: all 0.3s ease;
}
.modal-card:hover {
  border-color: var(--primary-blue);
  background: rgba(255, 255, 255, 0.06);
  transform: translateY(-2px);
}
.card-top-row {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
}
.card-avatar {
  width: 29px;
  height: 29px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.card-avatar img {
  width: 19px;
  height: 19px;
  object-fit: contain;
  border-radius: 50%;
}
.card-avatar.wechat {
  background: #E6F7EE;
}
.card-avatar.dingtalk {
  background: #E6F0FA;
}
.card-title {
  font-size: 14px;
  font-weight: 700;
  color: #F1F5F9; /* Slate-100 */
  margin-bottom: 0;
}
.card-icon-box {
  width: 70px;
  height: 70px;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}
.modal-card:hover .card-icon-box {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}
.card-icon-img {
  width: 38px;
  height: 38px;
}
.card-desc {
  font-family: Noto Sans SC, Noto Sans SC;
  font-weight: 400;
  font-size: 11px;
  color: #94A3B8; /* Slate-400 */
  line-height: 19px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  margin-top: 0;
  padding: 6px 10px;
  letter-spacing: 0.2px;
}
.account-code {
  font-family: Noto Sans SC, Noto Sans SC;
  font-weight: 700;
  font-size: 11px;
  color: #F8FAFC; /* Slate-50 */
  line-height: 19px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  letter-spacing: 0.6px;
  padding: 0 2px;
}
.modal-card.phone {
  width: 272px;
  box-shadow: none;
  margin-top: 0;
  border: 1px solid rgba(255, 255, 255, 0.08);
  flex-direction: column;
  align-items: center;
  padding: 26px 19px 22px 19px;
}
.modal-card.phone:hover {
  border-color: var(--primary-blue);
  background: rgba(255, 255, 255, 0.06);
}
.phone-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 16px;
}
.modal-card-icon.phone {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background: #FFEBEB;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0;
}
.modal-card-icon.phone img {
  width: 22px;
  height: 22px;
  object-fit: contain;
}
.modal-card-title.phone {
  color: #F1F5F9; /* White-ish */
  text-align: center;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 0;
}
.modal-phone-number {
  color: var(--active-orange); /* Use Theme Active Color */
  font-size: 19px;
  font-weight: 700;
  margin: 10px 0 13px 0;
  letter-spacing: 1.2px;
}
.modal-phone-desc {
  font-family: Noto Sans SC, Noto Sans SC;
  font-weight: 400;
  font-size: 11px;
  color: #94A3B8;
  line-height: 19px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  padding: 6px 13px;
  letter-spacing: 0.2px;
}
.email-support {
  font-family: Noto Sans SC, Noto Sans SC;
  font-weight: 700;
  font-size: 11px;
  color: #F8FAFC;
  line-height: 19px;
  text-align: center;
  font-style: normal;
  text-transform: none;
  letter-spacing: 0.4px;
  padding: 0 2px;
}
.modal-action {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  background: linear-gradient(90deg, #2583f6 0%, #3bb3fa 100%);
  color: #fff;
  font-size: 13px;
  font-weight: 700;
  border: none;
  border-radius: 10px;
  padding: 0 26px;
  height: 38px;
  box-shadow: 0 3px 10px rgba(37,131,246,0.15);
  cursor: pointer;
  transition: all 0.3s ease;
  min-width: 128px;
  gap: 6px;
}
.modal-action:hover {
  background: linear-gradient(90deg, #3bb3fa 0%, #2583f6 100%);
  box-shadow: 0 5px 13px rgba(37,131,246,0.2);
  transform: translateY(-1px);
}
.action-icon {
  width: 16px;
  height: 16px;
  object-fit: contain;
  filter: brightness(0) invert(1);
}
@media (max-width: 750px) {
  .service-modal { width: 95vw; }
  .modal-main-white { padding: 19px 13px 16px 13px; }
  .modal-row { flex-direction: column; gap: 13px; align-items: center; }
  .modal-card, .modal-card.phone { width: 100%; max-width: 240px; }
  .phone-row { margin-bottom: 19px; }
}
</style> 