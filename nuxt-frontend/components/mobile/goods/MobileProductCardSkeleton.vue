<template>
  <div class="goods-card-skeleton">
    <!-- Left: Image -->
    <div class="skeleton-thumb"></div>

    <!-- Right: Info -->
    <div class="skeleton-info">
      <div class="skeleton-title"></div>
      <div class="skeleton-tags"></div>
      
      <div class="skeleton-bottom">
        <div class="skeleton-price"></div>
        <div class="skeleton-btn"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.goods-card-skeleton {
  display: flex;
  gap: 12px;
  padding: 12px;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 12px;
  margin-bottom: 12px; /* Gap between items */
}

.skeleton-thumb {
  width: 110px;
  height: 110px;
  flex-shrink: 0;
  border-radius: 8px;
  background: linear-gradient(90deg, 
    rgba(255,255,255,0.05) 25%, 
    rgba(255,255,255,0.1) 50%, 
    rgba(255,255,255,0.05) 75%
  );
  background-size: 200% 100%;
  animation: shimmer 1.5s infinite;
}

.skeleton-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 2px 0;
}

.skeleton-title {
  height: 20px;
  width: 90%;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  margin-bottom: 8px;
  animation: shimmer 1.5s infinite;
}

.skeleton-tags {
  height: 16px;
  width: 40%;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  animation: shimmer 1.5s infinite;
}

.skeleton-bottom {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
}

.skeleton-price {
  height: 24px;
  width: 30%;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.05);
  animation: shimmer 1.5s infinite;
}

.skeleton-btn {
  height: 28px;
  width: 70px;
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.05);
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
</style>
