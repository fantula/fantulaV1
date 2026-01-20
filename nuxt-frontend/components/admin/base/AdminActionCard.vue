<template>
  <div class="admin-action-bar">
    <div class="action-bar-content">
       <div class="filters">
           <slot />
       </div>
       <!-- Vertical Divider if both slots exist -->
       <el-divider direction="vertical" class="action-divider" v-if="$slots.default && $slots.actions" />
       <div class="actions">
           <slot name="actions" />
       </div>
    </div>
  </div>
</template>

<style scoped>
.admin-action-bar {
    display: flex;
    justify-content: center;
    margin-bottom: 20px;
}

.action-bar-content {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px;
    
    background: var(--el-bg-color-overlay); /* Card-like background */
    border: 1px solid var(--el-border-color-light);
    border-radius: 40px; /* Capsule shape / rounded toolbar */
    padding: 10px 30px;
    box-shadow: var(--el-box-shadow-light);
    width: fit-content;
    border: 1px solid var(--el-border-color-lighter);
}

.filters {
    display: flex;
    align-items: center;
    gap: 15px;
    flex-wrap: wrap;
}

.actions {
    display: flex;
    align-items: center;
    gap: 10px;
}

.action-divider {
    height: 20px;
    border-color: var(--el-border-color);
    margin: 0 10px;
}
</style>
