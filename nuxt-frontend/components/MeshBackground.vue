<template>
  <div class="mesh-container">
    <div class="mesh-bg">
      <div class="blob blob-1"></div>
      <div class="blob blob-2"></div>
      <div class="blob blob-3"></div>
      <div class="blob blob-4"></div>
    </div>
    <!-- 噪点层增加质感 -->
    <div class="noise-overlay"></div>
  </div>
</template>

<script setup>
// 纯 CSS 动画，无需 JS 逻辑
</script>

<style scoped>
.mesh-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -999;
  background: #020617; /* 深蓝黑底色 */
  overflow: hidden;
}

.mesh-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  filter: blur(80px); /* 核心：通过超大模糊融合颜色 */
  opacity: 0.8;
}

.blob {
  position: absolute;
  border-radius: 50%;
  animation: float 20s infinite ease-in-out alternate;
}

/* 蓝色主基调 */
.blob-1 {
  top: -10%;
  left: -10%;
  width: 70vw;
  height: 70vw;
  background: rgba(35, 92, 220, 0.5);
  animation-name: float1;
  animation-duration: 25s;
}

/* 橙色活跃点 */
.blob-2 {
  bottom: -10%;
  right: -20%;
  width: 60vw;
  height: 60vw;
  background: rgba(255, 122, 69, 0.4);
  animation-name: float2;
  animation-duration: 20s;
  animation-delay: -5s;
}

/* 紫色/青色 增加层次感 */
.blob-3 {
  top: 30%;
  right: 20%;
  width: 50vw;
  height: 50vw;
  background: rgba(124, 58, 237, 0.3); /* 紫色 */
  animation-name: float3;
  animation-duration: 22s;
  animation-delay: -10s;
}

.blob-4 {
  bottom: 10%;
  left: 10%;
  width: 40vw;
  height: 40vw;
  background: rgba(6, 182, 212, 0.2); /* 青色 */
  animation-name: float1; /* 复用动画1 */
  animation-duration: 28s;
  animation-delay: -15s;
}

.noise-overlay {
  position: absolute;
  inset: 0;
  opacity: 0.07;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='1'/%3E%3C/svg%3E");
}

@keyframes float1 {
  0% { transform: translate(0, 0) scale(1); }
  33% { transform: translate(10%, 10%) scale(1.1); }
  66% { transform: translate(-5%, 5%) scale(0.9); }
  100% { transform: translate(0, 0) scale(1); }
}

@keyframes float2 {
  0% { transform: translate(0, 0) scale(1) rotate(0deg); }
  50% { transform: translate(-10%, -10%) scale(1.2) rotate(10deg); }
  100% { transform: translate(0, 0) scale(1) rotate(0deg); }
}

@keyframes float3 {
  0% { transform: translate(0, 0) scale(1); }
  50% { transform: translate(-15%, 5%) scale(0.8); }
  100% { transform: translate(5%, -5%) scale(1); }
}
</style>
