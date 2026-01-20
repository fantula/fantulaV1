<template>
  <el-tag :type="tagType" :effect="effect">
    {{ displayLabel }}
  </el-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
  status: string | number
  typeMap?: Record<string, string> // value -> 'success' | 'warning' etc
  labelMap?: Record<string, string> // value -> 'Enabled' etc
  effect?: 'dark' | 'light' | 'plain'
}>()

// Default Mappings
const defaultTypes: Record<string, string> = {
    'on': 'success',
    'off': 'info',
    'active': 'success',
    'inactive': 'danger',
    'pending': 'warning'
}

const defaultLabels: Record<string, string> = {
    'on': '启用',
    'off': '停用',
    'active': '正常',
    'inactive': '禁用',
    'pending': '待处理'
}

const tagType = computed(() => {
    if (props.typeMap && props.typeMap[String(props.status)]) return props.typeMap[String(props.status)] as any
    return defaultTypes[String(props.status)] || ''
})

const displayLabel = computed(() => {
    if (props.labelMap && props.labelMap[String(props.status)]) return props.labelMap[String(props.status)]
    return defaultLabels[String(props.status)] || props.status
})

</script>
