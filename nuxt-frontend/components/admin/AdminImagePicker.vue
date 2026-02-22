<template>
  <el-dialog
    v-model="visible"
    title="从图片库选择"
    width="860px"
    append-to-body
    destroy-on-close
    class="picker-dialog"
  >
    <div class="picker-container">
      <!-- 左侧分类列表 -->
      <div class="picker-sidebar">
        <div
          class="picker-cat-item"
          :class="{ active: activeCategoryId === '' }"
          @click="activeCategoryId = ''; fetchImages()"
        >
          <el-icon><Picture /></el-icon> 全部图片
        </div>
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="picker-cat-item"
          :class="{ active: activeCategoryId === cat.id }"
          @click="activeCategoryId = cat.id; fetchImages()"
        >
          <el-icon><Folder /></el-icon> {{ cat.name }}
        </div>
      </div>

      <!-- 右侧图片区 -->
      <div class="picker-main">
        <!-- 搜索工具栏 -->
        <div class="picker-toolbar">
          <el-input
            v-model="keyword"
            placeholder="搜索图片名称..."
            clearable
            style="width: 220px;"
            @input="fetchImages"
            @clear="fetchImages"
          >
            <template #prefix><el-icon><Search /></el-icon></template>
          </el-input>
          <span class="picker-tip">
            <el-icon><InfoFilled /></el-icon>
            如需上传图片，请前往「图片库」管理
          </span>
        </div>

        <!-- 图片网格 -->
        <div class="picker-grid" v-loading="loading">
          <div
            v-for="img in images"
            :key="img.id"
            class="picker-img-card"
            :class="{ selected: tempSelected?.id === img.id }"
            @click="tempSelected = img"
          >
            <el-image :src="img.url" fit="cover" class="picker-img" lazy />
            <div class="picker-img-name" :title="img.name">{{ img.name }}</div>
            <div v-if="tempSelected?.id === img.id" class="selected-mark">
              <el-icon><Check /></el-icon>
            </div>
          </div>
          <el-empty v-if="images.length === 0 && !loading" description="暂无图片，请先去图片库上传" />
        </div>
      </div>
    </div>

    <template #footer>
      <el-button @click="visible = false">取消</el-button>
      <el-button type="primary" :disabled="!tempSelected" @click="confirmSelect">
        确定选择{{ tempSelected ? `「${tempSelected.name}」` : '' }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { Picture, Folder, Search, Check, InfoFilled } from '@element-plus/icons-vue'
import { adminImageApi, adminImageCategoryApi, type AdminImage, type AdminImageCategory } from '@/api/admin/media'

const props = defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: boolean): void
  (e: 'select', image: AdminImage): void
}>()

const visible = ref(props.modelValue)
const loading = ref(false)
const images = ref<AdminImage[]>([])
const categories = ref<AdminImageCategory[]>([])
const activeCategoryId = ref('')
const keyword = ref('')
const tempSelected = ref<AdminImage | null>(null)

watch(() => props.modelValue, (val) => {
  visible.value = val
  if (val) {
    tempSelected.value = null
    loadCategories()
    fetchImages()
  }
})

watch(visible, (val) => {
  emit('update:modelValue', val)
})

const loadCategories = async () => {
  if (categories.value.length > 0) return // 缓存，避免重复请求
  const res = await adminImageCategoryApi.getCategories()
  if (res.success) categories.value = res.categories
}

const fetchImages = async () => {
  loading.value = true
  const res = await adminImageApi.getImages({
    category_id: activeCategoryId.value || undefined,
    keyword: keyword.value || undefined
  })
  if (res.success) images.value = res.images
  loading.value = false
}

const confirmSelect = () => {
  if (!tempSelected.value) return
  emit('select', tempSelected.value)
  visible.value = false
}
</script>

<style scoped>
.picker-container {
  display: flex;
  height: 520px;
  gap: 0;
  border: 1px solid var(--el-border-color-lighter);
  border-radius: 6px;
  overflow: hidden;
}

/* 左侧分类 */
.picker-sidebar {
  width: 160px;
  flex-shrink: 0;
  background: var(--el-bg-color-page);
  border-right: 1px solid var(--el-border-color-lighter);
  overflow-y: auto;
  padding: 8px 0;
}

.picker-cat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 10px 14px;
  cursor: pointer;
  font-size: 13px;
  color: var(--el-text-color-regular);
  transition: background 0.15s;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.picker-cat-item:hover {
  background: var(--el-fill-color-light);
  color: var(--el-color-primary);
}
.picker-cat-item.active {
  background: var(--el-color-primary-light-9);
  color: var(--el-color-primary);
  font-weight: 600;
  border-right: 3px solid var(--el-color-primary);
}

/* 右侧主区 */
.picker-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  min-width: 0;
  padding: 14px;
  background: var(--el-bg-color);
}

.picker-toolbar {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 14px;
  flex-shrink: 0;
}

.picker-tip {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

/* 网格 */
.picker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(110px, 1fr));
  gap: 12px;
  overflow-y: auto;
  flex: 1;
  padding: 4px 2px;
}

.picker-img-card {
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  position: relative;
  background: var(--el-fill-color-extra-light);
  transition: all 0.2s;
}
.picker-img-card:hover {
  border-color: var(--el-color-primary-light-5);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}
.picker-img-card.selected {
  border-color: var(--el-color-primary);
  box-shadow: 0 0 0 2px var(--el-color-primary-light-7);
}

.picker-img {
  width: 100%;
  height: 80px;
  display: block;
}

.picker-img-name {
  padding: 4px 6px;
  font-size: 11px;
  color: var(--el-text-color-regular);
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: var(--el-bg-color);
}

/* 选中角标 */
.selected-mark {
  position: absolute;
  top: 4px;
  right: 4px;
  background: var(--el-color-primary);
  color: #fff;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}
</style>
