<template>
  <div class="goods-card-skeleton">
    <div style="padding: 24px;">
      <el-skeleton animated>
        <template #template>
          <el-skeleton-item variant="image" class="skeleton-img" />
          <el-skeleton-item variant="h3" style="width: 80%; margin: 0 auto 10px;" />
          <el-skeleton-item variant="text" style="width: 50%; margin: 0 auto 20px;" />
          <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
            <el-skeleton-item variant="text" style="width: 30%;" />
            <el-skeleton-item variant="text" style="width: 30%;" />
          </div>
          <el-skeleton-item variant="button" style="width: 100%; height: 40px; border-radius: 20px;" />
        </template>
      </el-skeleton>
    </div>
  </div>
</template>

<style scoped>
.goods-card-skeleton {
  border-radius: 24px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.02);
  height: 100%;
}

.skeleton-img {
  width: 100%;
  height: 160px;
  border-radius: 12px;
  margin-bottom: 20px;
}
</style>
