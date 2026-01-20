<template>
  <div class="skeleton-container">
    <div class="skeleton-card header-card">
      <div class="skeleton-line status-bar"></div>
      <div class="skeleton-content">
        <div class="skeleton-img"></div>
        <div class="skeleton-info">
          <div class="skeleton-line title"></div>
          <div class="skeleton-line subtitle"></div>
        </div>
      </div>
      <div class="skeleton-grid">
        <div class="skeleton-line item"></div>
        <div class="skeleton-line item"></div>
        <div class="skeleton-line item"></div>
        <div class="skeleton-line item"></div>
      </div>
    </div>
    
    <div class="skeleton-card fulfillment-card">
      <div class="skeleton-line title"></div>
      <div class="skeleton-line content"></div>
    </div>
  </div>
</template>

<style scoped>
.skeleton-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  animation: fade-in 0.5s ease-out;
}

.skeleton-card {
  background: rgba(30, 41, 59, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  overflow: hidden;
}

.header-card { height: 280px; padding: 20px; }
.fulfillment-card { height: 150px; padding: 20px; }

.skeleton-line {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
  margin-bottom: 12px;
}

.status-bar { height: 40px; margin-bottom: 24px; border-radius: 8px; }

.skeleton-content { display: flex; gap: 16px; margin-bottom: 24px; }
.skeleton-img { width: 72px; height: 72px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; }
.skeleton-info { flex: 1; display: flex; flex-direction: column; justify-content: center; }
.skeleton-info .title { width: 60%; height: 20px; }
.skeleton-info .subtitle { width: 40%; height: 16px; }

.skeleton-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
.skeleton-grid .item { height: 40px; }

.fulfillment-card .title { width: 30%; height: 24px; margin-bottom: 20px; }
.fulfillment-card .content { width: 100%; height: 60px; }

.skeleton-line, .skeleton-img {
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% { opacity: 0.6; }
  50% { opacity: 0.3; }
  100% { opacity: 0.6; }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
