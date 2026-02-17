<template>
  <div class="chart-wrapper">
    <div class="simple-bar-chart" :class="{ 'is-sales': isSales }">
      <div v-for="(item, index) in data" :key="index" class="bar-group">
        <div class="bar-col">
          <div class="bar-val">
            <template v-if="valuePrefix">{{ valuePrefix }}</template>{{ item[valueKey] }}
          </div>
          <div 
            class="bar-fill" 
            :style="{ height: `${calculatePercent(item[valueKey] as number)}%` }"
            :title="`${item[labelKey]}: ${valuePrefix || ''}${item[valueKey]}`"
          ></div>
        </div>
        <div class="bar-label">{{ formatDate(item[labelKey] as string) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
  data: {
    type: Array as () => any[],
    required: true,
    default: () => []
  },
  valueKey: {
    type: String,
    default: 'count'
  },
  labelKey: {
    type: String,
    default: 'date'
  },
  valuePrefix: {
    type: String,
    default: ''
  },
  isSales: {
    type: Boolean,
    default: false
  }
})

// Max Value for calculation
const maxValue = computed(() => {
  if (!props.data.length) return 10
  const values = props.data.map(item => Number(item[props.valueKey]) || 0)
  return Math.max(...values) || (props.isSales ? 100 : 10)
})

const calculatePercent = (val: number) => {
  if (maxValue.value === 0) return 0
  return Math.min(100, (val / maxValue.value) * 100)
}

const formatDate = (dateStr: string) => {
  try {
    const d = new Date(dateStr)
    return `${d.getMonth() + 1}-${d.getDate()}`
  } catch {
    return dateStr
  }
}
</script>

<style scoped>
.chart-wrapper { width: 100%; height: 100%; padding-top: 20px; }
.simple-bar-chart {
  display: flex; justify-content: space-between; align-items: flex-end;
  height: 100%; width: 100%; padding-bottom: 20px;
}
.bar-group {
    display: flex; flex-direction: column; align-items: center;
    flex: 1; height: 100%; justify-content: flex-end; gap: 8px;
}
.bar-col {
    width: 20px; background: rgba(64, 158, 255, 0.1);
    border-radius: 4px; position: relative;
    display: flex; align-items: flex-end;
    justify-content: center;
    height: 80%; /* leave space for label */
}
.bar-fill {
    width: 100%; background: #409EFF; border-radius: 4px;
    min-height: 4px; transition: height 0.5s ease;
}

/* Sales Variant */
.is-sales .bar-fill { background: #67C23A; }
.is-sales .bar-col { background: rgba(103, 194, 58, 0.1); }

.bar-val { 
  font-size: 10px; color: var(--el-text-color-secondary); margin-bottom: 4px; 
  position: absolute; bottom: 100%; white-space: nowrap;
}
.bar-label { font-size: 12px; color: var(--el-text-color-secondary); }
</style>
