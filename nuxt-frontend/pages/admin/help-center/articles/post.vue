<template>
  <div class="admin-page-post">
    <div class="page-header">
      <h2 class="page-title">{{ isEdit ? '编辑文章' : '发布文章' }}</h2>
      <el-button @click="router.back()">返回列表</el-button>
    </div>

    <div class="form-container">
      <el-form :model="form" label-width="120px" ref="formRef" :rules="rules" v-loading="loading">
        <el-form-item label="文章标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入文章标题" />
        </el-form-item>

        <el-form-item label="所属分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.id"
            >
              <span style="float: left">{{ item.icon }} {{ item.name }}</span>
              <span style="float: right; color: var(--el-text-color-placeholder); font-size: 13px" v-if="!item.is_active">已禁用</span>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="封面图片" prop="cover_image">
          <div class="image-select-container">
            <div 
              v-if="form.cover_image" 
              class="cover-preview"
              @click="showImagePicker = true"
            >
              <img :src="form.cover_image" class="cover-image" />
              <div class="cover-mask">
                <el-icon><Edit /></el-icon>
                <span>更换图片</span>
              </div>
            </div>
            <div 
              v-else 
              class="cover-uploader"
              @click="showImagePicker = true"
            >
              <el-icon class="cover-uploader-icon"><Plus /></el-icon>
              <span>选择封面</span>
            </div>
            <div class="tip-text">建议尺寸 800x450 (16:9)，点击选择或上传</div>
          </div>
        </el-form-item>

        <el-form-item label="视频链接" prop="video_url">
          <el-input v-model="form.video_url" placeholder="支持 Bilibili (BV号) 或 YouTube 链接">
            <template #append>
              <el-button @click="checkVideo">预览</el-button>
            </template>
          </el-input>
          <div class="tip-text">示例: https://www.bilibili.com/video/BVxxx 或 https://youtu.be/xxx</div>
          
          <div v-if="videoPreviewUrl" class="video-preview">
            <iframe 
              :src="videoPreviewUrl" 
              scrolling="no" 
              border="0" 
              frameborder="no" 
              framespacing="0" 
              allowfullscreen="true">
            </iframe>
          </div>
        </el-form-item>

        <el-form-item label="简短描述" prop="description">
          <el-input 
            v-model="form.description" 
            type="textarea" 
            :rows="3" 
            placeholder="文章摘要，用于列表展示" 
          />
        </el-form-item>

        <el-form-item label="详细内容" prop="content">
          <el-input 
            v-model="form.content" 
            type="textarea" 
            :rows="15" 
            placeholder="支持 Markdown 格式。如果填写了视频链接，视频将显示在内容上方。" 
          />
        </el-form-item>

        <el-form-item label="发布状态">
          <el-switch v-model="form.is_published" active-text="立即发布" inactive-text="存为草稿" />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm">保存提交</el-button>
          <el-button @click="router.back()">取消</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- Image Picker Component -->
    <AdminImagePicker v-model="showImagePicker" @select="handleImageSelect" />
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, reactive, onMounted, computed, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { Plus, Edit } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { adminCommunityApi, communityApi, type Category } from '@/api/client/community'
// Explicitly import AdminImagePicker
import AdminImagePicker from '@/components/admin/AdminImagePicker.vue'

const router = useRouter()
const route = useRoute()
const formRef = ref()
const loading = ref(false)
const categories = ref<Category[]>([])
const showImagePicker = ref(false)

const isEdit = computed(() => !!route.query.id)

const form = reactive({
  title: '',
  category: '',
  cover_image: '',
  video_url: '',
  description: '',
  content: '',
  is_published: false
})

const rules = {
  title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
  category: [{ required: true, message: '请选择分类', trigger: 'change' }]
}

const fetchCategories = async () => {
  try {
    const { data } = await adminCommunityApi.getCategories()
    categories.value = data || []
  } catch (error) {
    console.error('Failed to fetch categories', error)
  }
}

const handleImageSelect = (url: string) => {
  form.cover_image = url
  ElMessage.success('已选择图片')
}

const videoPreviewUrl = ref('')

const checkVideo = () => {
  const url = form.video_url
  if (!url) {
    videoPreviewUrl.value = ''
    return
  }
  
  const b_match = url.match(/(BV[a-zA-Z0-9]+)/)
  if (b_match) {
    videoPreviewUrl.value = `//player.bilibili.com/player.html?bvid=${b_match[1]}&page=1&high_quality=1&danmaku=0`
    return
  }

  const y_match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/)
  if (y_match) {
    videoPreviewUrl.value = `https://www.youtube.com/embed/${y_match[1]}?rel=0&modestbranding=1`
    return
  }
  
  ElMessage.warning('未能识别视频链接格式，请检查')
  videoPreviewUrl.value = ''
}

const fetchDetail = async () => {
  if (!isEdit.value) return
  loading.value = true
  try {
    // Use admin API to fetch drafts as well
    const { success, data, msg } = await adminCommunityApi.getArticleById(route.query.id as string)
    if (!success) throw new Error(msg)
    
    // Fill form
    Object.assign(form, {
      title: data.title,
      category: data.category,
      cover_image: data.cover_image,
      video_url: data.video_url,
      description: data.description,
      content: data.content,
      is_published: data.is_published
    })
    checkVideo()
  } catch (error: any) {
    ElMessage.error('获取详情失败: ' + error.message)
  } finally {
    loading.value = false
  }
}

const submitForm = async () => {
  if (!formRef.value) return
  await formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      loading.value = true
      try {
        if (isEdit.value) {
          const { error } = await adminCommunityApi.updateArticle(route.query.id as string, form)
          if (error) throw error
          ElMessage.success('更新成功')
        } else {
          const { error } = await adminCommunityApi.createArticle(form)
          if (error) throw error
          ElMessage.success('发布成功')
        }
        router.push('/admin/article')
      } catch (error: any) {
        ElMessage.error('提交失败: ' + error.message)
      } finally {
        loading.value = false
      }
    }
  })
}

onMounted(() => {
  fetchCategories()
  fetchDetail()
})
</script>

<style scoped>
.admin-page-post {
  padding: 20px;
  background: var(--el-bg-color);
  border-radius: 8px;
  min-height: calc(100vh - 100px);
}

.page-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  padding-bottom: 20px;
  border-bottom: 1px solid var(--el-border-color-lighter);
}

.form-container {
  max-width: 800px;
}

/* Image Selector Styles */
.image-select-container {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.cover-uploader {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  width: 240px;
  height: 135px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--el-fill-color-light);
  transition: all 0.3s;
}

.cover-uploader:hover {
  border-color: var(--el-color-primary);
  background-color: var(--el-color-primary-light-9);
}

.cover-uploader-icon {
  font-size: 28px;
  color: var(--el-text-color-secondary);
  margin-bottom: 8px;
}

.cover-preview {
  width: 240px;
  height: 135px;
  border-radius: 6px;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  border: 1px solid var(--el-border-color);
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: var(--el-mask-color);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #fff;
  opacity: 0;
  transition: opacity 0.3s;
}

.cover-preview:hover .cover-mask {
  opacity: 1;
}

.tip-text {
  font-size: 12px;
  color: var(--el-text-color-secondary);
}

.video-preview {
  margin-top: 10px;
  width: 100%;
  max-width: 480px;
  height: 270px;
  background: #000;
}
.video-preview iframe {
  width: 100%;
  height: 100%;
}
</style>
