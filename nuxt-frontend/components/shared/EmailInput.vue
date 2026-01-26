<template>
  <div class="email-input-wrapper" ref="wrapperRef">
    <input
      ref="inputRef"
      :value="modelValue"
      :type="type"
      :placeholder="placeholder"
      :required="required"
      :disabled="disabled"
      class="custom-email-input"
      @input="handleInput"
      @focus="handleFocus"
      @blur="handleBlur"
      @keydown="handleKeydown"
    />
    
    <!-- Autocomplete Dropdown -->
    <ul v-if="showDropdown && filteredSuffixes.length > 0" class="suffix-list">
      <li 
        v-for="(suffix, index) in filteredSuffixes" 
        :key="suffix"
        :class="{ active: activeIndex === index }"
        @mousedown.prevent="selectSuffix(suffix)"
        @mouseenter="activeIndex = index"
      >
        <span class="prefix">{{ currentPrefix }}</span>@<span class="suffix-highlight">{{ suffix }}</span>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: '' },
  placeholder: { type: String, default: '请输入您的邮箱' },
  type: { type: String, default: 'email' },
  required: { type: Boolean, default: false },
  disabled: { type: Boolean, default: false }
})

const emit = defineEmits(['update:modelValue', 'blur', 'focus'])

// Top commonly used email domains
const DOMAIN_SUFFIXES = [
  'gmail.com',
  'qq.com',
  '163.com',
  'outlook.com',
  'icloud.com'
]

const wrapperRef = ref<HTMLElement | null>(null)
const inputRef = ref<HTMLInputElement | null>(null)
const showDropdown = ref(false)
const activeIndex = ref(0)

const currentPrefix = computed(() => {
  const val = props.modelValue || ''
  const atIndex = val.indexOf('@')
  return atIndex > -1 ? val.slice(0, atIndex) : val
})

const currentSuffixInput = computed(() => {
  const val = props.modelValue || ''
  const atIndex = val.indexOf('@')
  return atIndex > -1 ? val.slice(atIndex + 1) : ''
})

const filteredSuffixes = computed(() => {
  const input = currentSuffixInput.value.toLowerCase()
  // specific logic: if no @ typed yet, usually don't show list or show all? 
  // User convention: typically show list AFTER @ is typed.
  const val = props.modelValue || ''
  if (!val.includes('@')) return []

  return DOMAIN_SUFFIXES.filter(domain => 
    domain.startsWith(input)
  )
})

function handleInput(e: Event) {
  const val = (e.target as HTMLInputElement).value
  emit('update:modelValue', val)
  
  if (val.includes('@')) {
    showDropdown.value = true
    activeIndex.value = 0
  } else {
    showDropdown.value = false
  }
}

function selectSuffix(suffix: string) {
  const newValue = `${currentPrefix.value}@${suffix}`
  emit('update:modelValue', newValue)
  showDropdown.value = false
  // keep focus? 
  nextTick(() => {
    // inputRef.value?.focus() // Optional, depends on UX
  })
}

function handleBlur(e: FocusEvent) {
  // Delay hiding to allow click event on list item to fire
  setTimeout(() => {
    showDropdown.value = false
    emit('blur', e)
  }, 200)
}

function handleFocus(e: FocusEvent) {
  emit('focus', e)
  if (props.modelValue.includes('@')) {
    showDropdown.value = true
  }
}

function handleKeydown(e: KeyboardEvent) {
  if (!showDropdown.value || filteredSuffixes.value.length === 0) return

  if (e.key === 'ArrowDown') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value + 1) % filteredSuffixes.value.length
  } else if (e.key === 'ArrowUp') {
    e.preventDefault()
    activeIndex.value = (activeIndex.value - 1 + filteredSuffixes.value.length) % filteredSuffixes.value.length
  } else if (e.key === 'Enter') {
    e.preventDefault()
    selectSuffix(filteredSuffixes.value[activeIndex.value])
  } else if (e.key === 'Escape') {
    showDropdown.value = false
  }
}

// Expose focus/blur methods if parent needs them
defineExpose({
  focus: () => inputRef.value?.focus()
})
</script>

<style scoped>
.email-input-wrapper {
  position: relative;
  width: 100%;
}

/* Inherit styles from parent container context usually, 
   but specific styling here facilitates reuse */
.custom-email-input {
  width: 100%;
  height: 46px; /* Match standard input height */
  border-radius: 12px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(0, 0, 0, 0.25);
  color: #fff;
  padding: 0 14px;
  font-size: 15px;
  outline: none;
  transition: all 0.2s;
  font-family: inherit;
}

.custom-email-input:focus {
  border-color: #3B82F6; /* Primary Blue */
  background: rgba(0, 0, 0, 0.35);
}

.custom-email-input:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Dropdown */
.suffix-list {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgba(30, 41, 59, 0.95); /* Slate 800 */
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0,0,0,0.5);
  margin-top: 6px;
  padding: 6px;
  list-style: none;
  z-index: 1000;
  backdrop-filter: blur(12px);
  max-height: 240px;
  overflow-y: auto;
}

.suffix-list li {
  padding: 10px 14px;
  cursor: pointer;
  color: #94A3B8;
  font-size: 14px;
  border-radius: 8px;
  transition: all 0.1s;
  display: flex;
  align-items: center;
}

.suffix-list li:hover, .suffix-list li.active {
  background: rgba(59, 130, 246, 0.15);
  color: #fff;
}

.prefix {
  color: #fff;
}

.suffix-highlight {
  color: #60A5FA; /* Blue highlight */
  font-weight: 500;
}
</style>
