<template>
  <div class="product-detail-skeleton">
    <div class="skeleton-content">
      <!-- Left Panel: Image -->
      <div class="skeleton-left">
        <el-skeleton animated>
          <template #template>
            <el-skeleton-item variant="image" class="skeleton-main-img" />
            <div class="skeleton-thumbs">
              <el-skeleton-item variant="image" class="skeleton-thumb" />
              <el-skeleton-item variant="image" class="skeleton-thumb" />
              <el-skeleton-item variant="image" class="skeleton-thumb" />
              <el-skeleton-item variant="image" class="skeleton-thumb" />
            </div>
            <div class="skeleton-service">
              <el-skeleton-item variant="text" style="width: 100%; height: 80px;" />
            </div>
          </template>
        </el-skeleton>
      </div>

      <!-- Right Panel: Info -->
      <div class="skeleton-right">
        <el-skeleton animated>
          <template #template>
            <!-- Title -->
            <el-skeleton-item variant="h1" style="width: 80%; height: 32px; margin-bottom: 16px;" />
            <!-- Sales Badge -->
            <el-skeleton-item variant="text" style="width: 120px; height: 24px; margin-bottom: 24px;" />
            
            <!-- FAQ Ticker -->
            <el-skeleton-item variant="rect" style="width: 100%; height: 40px; margin-bottom: 30px; border-radius: 20px;" />

            <!-- Specs -->
            <div style="margin-bottom: 30px;">
              <el-skeleton-item variant="text" style="width: 60px; margin-bottom: 10px;" />
              <div style="display: flex; gap: 10px;">
                <el-skeleton-item variant="button" style="width: 80px; height: 36px;" />
                <el-skeleton-item variant="button" style="width: 80px; height: 36px;" />
                <el-skeleton-item variant="button" style="width: 80px; height: 36px;" />
              </div>
            </div>

            <!-- Price & Stock -->
            <div style="margin-bottom: 30px; display: flex; align-items: baseline; gap: 10px;">
              <el-skeleton-item variant="h3" style="width: 150px; height: 40px;" />
              <el-skeleton-item variant="text" style="width: 80px;" />
            </div>

            <!-- Buttons -->
            <div style="display: flex; gap: 10px; height: 52px;">
              <el-skeleton-item variant="button" style="flex: 1; height: 100%;" />
              <el-skeleton-item variant="button" style="width: 140px; height: 100%;" />
              <el-skeleton-item variant="button" style="width: 100px; height: 100%;" />
            </div>
          </template>
        </el-skeleton>
      </div>
    </div>
  </div>
</template>

<style scoped>
.product-detail-skeleton {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.skeleton-content {
  display: flex;
  gap: 40px;
}

.skeleton-left {
  width: 480px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.skeleton-right {
  flex: 1;
  padding-top: 10px;
}

.skeleton-main-img {
  width: 100%;
  height: 360px;
  border-radius: 16px;
  margin-bottom: 16px;
}

.skeleton-thumbs {
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
}

.skeleton-thumb {
  width: 64px;
  height: 64px;
  border-radius: 10px;
}

@media (max-width: 768px) {
  .skeleton-content {
    flex-direction: column;
  }
  .skeleton-left {
    width: 100%;
  }
}
</style>
