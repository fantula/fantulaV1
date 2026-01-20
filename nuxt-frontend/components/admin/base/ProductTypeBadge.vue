<template>
  <el-tag :type="tagType" :effect="effect" :size="size">
    {{ label }}
  </el-tag>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  type: string
  size?: 'large' | 'default' | 'small'
  effect?: 'dark' | 'light' | 'plain'
}>(), {
  size: 'default',
  effect: 'light'
})

const typeConfig: Record<string, { label: string; tag: string }> = {
  'virtual': { label: '虚拟充值', tag: 'primary' },
  'shared_account': { label: '账号合租', tag: 'success' },
  'one_time_cdk': { label: '一次性/CDK', tag: 'warning' },
  'shared': { label: '账号合租', tag: 'success' },
  'one_time': { label: '一次性', tag: 'warning' },
  'cdk': { label: '激活码', tag: 'warning' },
  'account': { label: '账号合租', tag: 'success' },
  'renew': { label: '续费订单', tag: 'warning' },
  'new': { label: '新订单', tag: 'primary' }
}

const label = computed(() => typeConfig[props.type]?.label || props.type || '普通')
const tagType = computed(() => typeConfig[props.type]?.tag || 'info')
</script>
