<template>
  <div class="cdk-post-page">
    
    <!-- Header -->
    <div class="wizard-header">
      <div class="header-left">
        <el-button link class="back-btn" @click="router.back()">
          <el-icon class="back-icon"><ArrowLeft /></el-icon> 返回列表
        </el-button>
        <div class="header-titles">
          <div class="main-title">添加资源</div>
          <div class="sub-title">ADD RESOURCES</div>
        </div>
      </div>
      <div class="header-center">
        <el-steps :active="activeStep" finish-status="success" simple style="width: 100%; background: transparent;">
          <el-step title="选择商品" />
          <el-step title="配置资源" />
          <el-step title="确认添加" />
        </el-steps>
      </div>
      <div class="header-right"></div>
    </div>

    <!-- Body -->
    <div class="wizard-body">
      <div class="centered-container">
        
        <!-- Step 1: Product Selection -->
        <div v-show="activeStep === 0" class="step-content">
          <div class="form-card">
            <h3 class="card-title">基础信息</h3>
            <el-form :model="formStep1" label-position="top">
              <el-form-item label="商品分类">
                <el-select v-model="formStep1.categoryId" placeholder="请选择分类" filterable @change="handleCategoryChange" size="large" style="width: 100%">
                  <el-option 
                    v-for="cat in categories" 
                    :key="cat.id" 
                    :label="cat.name" 
                    :value="cat.id"
                  />
                </el-select>
              </el-form-item>

              <el-form-item label="选择商品">
                <el-select v-model="formStep1.productId" placeholder="请选择商品" filterable @change="handleProductChange" size="large" style="width: 100%" :disabled="!formStep1.categoryId">
                  <el-option 
                    v-for="prod in filteredProducts" 
                    :key="prod.id" 
                    :label="prod.product_name" 
                    :value="prod.id"
                  >
                    <span style="float: left">{{ prod.product_name }}</span>
                    <span style="float: right; color: #8492a6; font-size: 13px">{{ getTypeText(prod.product_type) }}</span>
                  </el-option>
                </el-select>
              </el-form-item>

              <el-form-item label="关联 SKU (可多选)">
                <el-select 
                  v-model="formStep1.skuIds" 
                  multiple 
                  placeholder="该资源将应用于哪些 SKU" 
                  size="large" 
                  style="width: 100%"
                  :disabled="!formStep1.productId"
                  :loading="loadingSkus"
                >
                  <el-option
                    v-for="sku in skuOptions"
                    :key="sku.id"
                    :label="sku.label"
                    :value="sku.id"
                  />
                </el-select>
              </el-form-item>

              <el-alert 
                v-if="currentProduct"
                :title="`当前资源类型: ${getTypeText(currentCdkType)}`" 
                type="info" 
                show-icon 
                :closable="false"
                style="margin-top: 20px"
              >
                 <template #default>
                   <div v-if="currentCdkType === 'virtual'">系统将引导您配置库存数量与订单填写字段。</div>
                   <div v-if="currentCdkType === 'shared_account'">系统将引导您输入账号密码及最大并发数。</div>
                   <div v-if="currentCdkType === 'one_time_cdk'">系统将引导您批量导入激活码内容。</div>
                 </template>
              </el-alert>
            </el-form>
          </div>
        </div>

        <!-- Step 2: Configuration -->
        <div v-show="activeStep === 1" class="step-content">
           <div class="form-card">
              <h3 class="card-title">资源配置: {{ getTypeText(currentCdkType) }}</h3>
              
              <!-- Virtual Type UI -->
              <div v-if="currentCdkType === 'virtual'">
                 <el-form :model="formVirtual" label-position="top">
                    <el-form-item label="可用库存数">
                       <el-input-number v-model="formVirtual.stock" :min="1" size="large" style="width: 100%" />
                       <div class="form-tip">设置该资源的可用服务位数量 (如 GPT KEY 的并发上限)</div>
                    </el-form-item>
                    
                    <el-divider content-position="left">订单填写字段配置</el-divider>
                    <div class="dynamic-fields">
                       <div v-for="(field, idx) in formVirtual.fields" :key="idx" class="field-row">
                          <el-input v-model="formVirtual.fields[idx]" placeholder="输入字段名 (如: 游戏账号)" />
                          <el-button type="danger" circle plain @click="removeVirtualField(idx)"><el-icon><Delete /></el-icon></el-button>
                       </div>
                       <el-button type="dashed" class="add-field-btn" @click="addVirtualField">
                          <el-icon><Plus /></el-icon> 添加字段
                       </el-button>
                       <div class="form-tip">用户下单时需要填写的辅助信息字段。</div>
                    </div>
                 </el-form>
              </div>

              <!-- Shared Account Type UI (Single Resource, like edit page) -->
              <div v-if="currentCdkType === 'shared_account'">
                 <el-form label-position="top">
                    <el-form-item label="最大车位数">
                       <el-input-number v-model="formShared.maxSlots" :min="1" :max="10" controls-position="right" />
                       <div class="form-tip">决定该资源可同时服务的用户数</div>
                    </el-form-item>
                    
                    <el-divider content-position="left">属性配置</el-divider>
                    <div class="kv-list">
                       <div v-for="(attr, idx) in formShared.attributes" :key="idx" class="kv-row">
                          <el-input v-model="attr.key" placeholder="字段名(如:账号)" style="width: 140px" />
                          <span class="separator">:</span>
                          <el-input v-model="attr.value" placeholder="字段值" style="flex: 1" />
                          <el-button circle plain size="small" @click="formShared.attributes.splice(idx, 1)" v-if="formShared.attributes.length > 1">
                            <el-icon><Minus /></el-icon>
                          </el-button>
                       </div>
                       <el-button type="dashed" size="small" class="add-attr-btn" @click="formShared.attributes.push({ key: '', value: '' })">
                          + 添加属性
                       </el-button>
                    </div>
                 </el-form>
              </div>

              <!-- One-time CDK Type UI (Parse & Validate) -->
              <div v-if="currentCdkType === 'one_time_cdk'">
                 <el-form :model="formCard" label-position="top">
                    <el-form-item label="批量输入卡密">
                       <el-input 
                         v-model="formCard.rawContent" 
                         type="textarea" 
                         :rows="8" 
                         placeholder="支持直接粘贴，自动去重过滤。&#10;AAAA-BBBB-CCCC&#10;1111-2222-3333"
                         @input="resetCardParse"
                       />
                    </el-form-item>
                    
                    <div class="card-actions">
                       <el-button type="primary" @click="parseCards" :loading="parsing" :disabled="!formCard.rawContent">
                          <el-icon><Cpu /></el-icon> 解析并校验
                       </el-button>
                       <span class="parse-tip" v-if="!cardParsedResult">未解析，请先点击解析按钮</span>
                    </div>
                    
                    <!-- Parse Result Dashboard -->
                    <transition name="el-zoom-in-top">
                      <div v-if="cardParsedResult" class="parse-dashboard">
                         <div class="stat-item success">
                            <span class="num">{{ cardParsedResult.valid.length }}</span>
                            <span class="label">可用数量</span>
                         </div>
                         <div class="stat-item warning">
                            <span class="num">{{ cardParsedResult.duplicates.length }}</span>
                            <span class="label">重复/库存已存</span>
                         </div>
                          <div class="stat-item danger">
                            <span class="num">{{ cardParsedResult.invalid.length }}</span>
                            <span class="label">格式无效</span>
                         </div>
                      </div>
                    </transition>
                    
                    <el-alert 
                      v-if="cardParsedResult && cardParsedResult.valid.length > 0"
                      title="解析完成"
                      type="success"
                      :closable="false"
                      show-icon
                      style="margin-top: 16px"
                    >
                      将仅入库 {{ cardParsedResult.valid.length }} 条有效卡密。重复与无效项将被忽略。
                    </el-alert>
                 </el-form>
              </div>

              <!-- Common: Image -->
              <el-divider />
              <div class="common-section">
                 <span class="section-label">详情页帮助图片 (可选)</span>
                 <div class="image-selector" @click="handleSelectImage">
                    <img v-if="commonImage" :src="commonImage" class="preview-img" />
                    <div v-else class="placeholder">
                       <el-icon><Picture /></el-icon>
                       <span>选择图片</span>
                    </div>
                 </div>
              </div>

           </div>
        </div>

        <!-- Step 3: Confirmation -->
        <div v-show="activeStep === 2" class="step-content">
           <div class="form-card confirmation-card">
              <div class="success-icon"><el-icon><CircleCheckFilled /></el-icon></div>
              <h2>准备就绪</h2>
              <p>请确认以下信息无误后提交</p>
              
              <div class="summary-box">
                 <div class="summary-item">
                    <span class="label">商品:</span>
                    <span class="value">{{ currentProduct?.product_name }}</span>
                 </div>
                 <div class="summary-item">
                    <span class="label">SKU:</span>
                    <span class="value">{{ skuOptions.filter(s => formStep1.skuIds.includes(s.id)).map(s => s.label).join(', ') || '通用' }}</span>
                 </div>
                 <div class="summary-item">
                    <span class="label">类型:</span>
                    <span class="value">{{ getTypeText(currentCdkType) }}</span>
                 </div>
                 
                 <el-divider />
                 
                 <!-- Specific Summary -->
                 <div v-if="currentCdkType === 'virtual'">
                    <div class="summary-item"><span class="label">新增库存:</span> <span class="value">{{ formVirtual.stock }}</span></div>
                    <div class="summary-item"><span class="label">配置字段:</span> <span class="value">{{ formVirtual.fields.join(', ') || '无' }}</span></div>
                 </div>
                 <div v-if="currentCdkType === 'shared_account'">
                     <div class="summary-item"><span class="label">最大车位数:</span> <span class="value">{{ formShared.maxSlots }}</span></div>
                     <div class="summary-item"><span class="label">属性字段:</span> <span class="value">{{ formShared.attributes.map(a => a.key).join('/') }}</span></div>
                 </div>
                 <div v-if="currentCdkType === 'one_time_cdk'">
                     <div class="summary-item"><span class="label">有效激活码:</span> <span class="value highlight">{{ cardParsedResult?.valid?.length || 0 }}</span> 条</div>
                 </div>
              </div>
           </div>
        </div>

      </div>
    </div>
    
    <!-- Footer -->
    <div class="wizard-footer">
       <el-button size="large" @click="prevStep" :disabled="activeStep === 0">上一步</el-button>
       <el-button 
         type="primary" 
         size="large" 
         class="next-btn"
         @click="handleNext"
         :loading="submitting"
       >
         {{ activeStep === 2 ? '确认添加' : '下一步' }}
       </el-button>
    </div>

    <!-- 图库选择弹窗 -->
    <el-dialog v-model="imagePickerVisible" title="图库选择" width="800px" append-to-body destroy-on-close class="picker-dialog">
      <div class="picker-container">
        <div class="picker-sidebar">
          <div 
            class="picker-cat-item" 
            :class="{ active: pickerActiveCatId === '' }"
            @click="pickerActiveCatId = ''; fetchPickerImages()"
          >全部图片</div>
          <div 
            v-for="cat in pickerCategories" 
            :key="cat.id" 
            class="picker-cat-item"
            :class="{ active: pickerActiveCatId === cat.id }"
            @click="pickerActiveCatId = cat.id; fetchPickerImages()"
          >{{ cat.name }}</div>
        </div>
        <div class="picker-main" v-loading="pickerLoading">
          <div class="picker-toolbar">
            <el-upload
              action="#"
              :auto-upload="false"
              :show-file-list="false"
              :on-change="handlePickerUpload"
            >
              <el-button type="primary" size="small">上传新图片</el-button>
            </el-upload>
          </div>
          <div class="picker-grid">
            <div 
              v-for="img in galleryImages" 
              :key="img.id" 
              class="picker-img-card"
              @click="selectGalleryImage(img.url)"
            >
              <el-image :src="img.url" fit="cover" />
              <div class="picker-img-name">{{ img.name }}</div>
            </div>
          </div>
          <el-empty v-if="galleryImages.length === 0" description="暂无图片" />
        </div>
      </div>
    </el-dialog>

  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'mgmt',
  middleware: ["mgmt-auth"]
})

import { ref, reactive, computed, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { 
  ArrowLeft, Picture, Delete, Plus, CircleCheckFilled, Minus, Cpu 
} from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { adminCategoryApi, adminProductApi, adminCdkApi, adminApi, type AdminProduct, type AdminImage, type AdminImageCategory } from '@/api/admin';
import { getAdminSupabaseClient } from '@/utils/supabase-admin';

const router = useRouter();
const route = useRoute();
const activeStep = ref(0);
const submitting = ref(false);

// --- Data ---
const categories = ref<any[]>([]);
const products = ref<AdminProduct[]>([]);
const loadingSkus = ref(false);
const skuOptions = ref<{ id: string, label: string }[]>([]);

// --- Forms ---
const formStep1 = reactive({
  categoryId: '',
  productId: '',
  skuIds: [] as string[]
});

// Map URL type query to DB product_type values
const typeMap: Record<string, string> = { 'virtual': 'virtual', 'shared': 'shared_account', 'one_time': 'one_time_cdk' };
const currentCdkType = computed(() => {
  const urlType = route.query.type as string;
  return typeMap[urlType] || 'virtual';
});

const filteredProducts = computed(() => {
  if (!formStep1.categoryId) return [];
  // Show all products in the selected category (no type filter on products)
  return products.value.filter(p => p.category_id === formStep1.categoryId);
});

const currentProduct = computed(() => products.value.find(p => p.id === formStep1.productId));

const formVirtual = reactive({
  stock: 10,
  fields: ['邮箱'] // Default field example
});

// Shared Account Form (和编辑页一致)
const formShared = reactive({
  maxSlots: 5,
  attributes: [{ key: '账号', value: '' }, { key: '密码', value: '' }] as { key: string; value: string }[]
});


// Card Parsing Logic
const formCard = reactive({
  rawContent: ''
});
const parsing = ref(false);
const cardParsedResult = ref<{ valid: string[], duplicates: string[], invalid: string[] } | null>(null);

const resetCardParse = () => {
  cardParsedResult.value = null; // Reset when user types
};

const parseCards = async () => {
  if (!formCard.rawContent) return;
  parsing.value = true;
  
  try {
    // 1. 解析输入，去重
    const lines = formCard.rawContent.split('\n').map(l => l.trim()).filter(l => l);
    const uniqueLines = [...new Set(lines)];
    
    // 2. 查询当前选择 SKU 关联的 CDK codes（优化：不再查全库）
    const targetSkuIds = formStep1.skuIds.length > 0 
      ? formStep1.skuIds 
      : skuOptions.value.map(s => s.id);
    
    let existingCodes = new Set<string>();
    
    if (targetSkuIds.length > 0) {
      // 通过 cdk_sku_map 找到这些 SKU 关联的 CDK
      const { data: mappings } = await getAdminSupabaseClient()
        .from('cdk_sku_map')
        .select('cdk:cdks!inner(code, cdk_type)')
        .in('sku_id', targetSkuIds)
        .eq('cdk.cdk_type', 'one_time');
      
      if (mappings) {
        existingCodes = new Set(mappings.map((m: any) => m.cdk?.code).filter(Boolean));
      }
    }
    
    // 3. 分类
    const valid: string[] = [];
    const duplicates: string[] = [];
    const invalid: string[] = [];
    
    uniqueLines.forEach(line => {
      // 基本格式校验：至少4个字符
      if (line.length < 4) {
        invalid.push(line);
      } else if (existingCodes.has(line)) {
        duplicates.push(line);
      } else {
        valid.push(line);
      }
    });
    
    // 检查输入中的重复
    const inputDuplicates = lines.length - uniqueLines.length;
    if (inputDuplicates > 0) {
      ElMessage.info(`已自动去除 ${inputDuplicates} 条重复输入`);
    }
    
    cardParsedResult.value = {
      valid,
      duplicates,
      invalid
    };
  } catch (err) {
    ElMessage.error('解析校验失败，请重试');
    cardParsedResult.value = null;
  } finally {
    parsing.value = false;
  }
};

const commonImage = ref('');

// --- Lifecycle ---
onMounted(async () => {
  const [catRes, prodRes] = await Promise.all([
    adminCategoryApi.getCategories(),
    adminProductApi.getProducts()
  ]);
  
  if (catRes.success) categories.value = catRes.categories;
  if (prodRes.success) products.value = prodRes.products;
});

// --- Methods ---
const handleCategoryChange = () => {
  formStep1.productId = '';
  formStep1.skuIds = [];
  skuOptions.value = [];
};

const handleProductChange = async (productId: string) => {
  formStep1.skuIds = [];
  skuOptions.value = [];
  if (!productId) return;

  loadingSkus.value = true;
  try {
    const res = await adminProductApi.getProductWithSkus(productId);
    if (res.success && res.skus) {
      // Filter SKUs by current CDK type (from URL query)
      const targetType = currentCdkType.value;
      const filteredSkus = res.skus.filter((sku: any) => sku.product_type === targetType);
      
      // Virtual 类型: 额外过滤掉已绑定 CDK 的 SKU
      let availableSkus = filteredSkus;
      if (targetType === 'virtual') {
        const { data: boundSkuIds } = await getAdminSupabaseClient()
          .from('cdk_sku_map')
          .select('sku_id, cdk:cdks!inner(cdk_type)')
          .eq('cdk.cdk_type', 'virtual');
        
        const boundSet = new Set((boundSkuIds || []).map((m: any) => m.sku_id));
        availableSkus = filteredSkus.filter((sku: any) => !boundSet.has(sku.id));
      }
      
      skuOptions.value = availableSkus.map((sku: any) => {
        const specValues = Object.values(sku.spec_combination || {}).join(' ');
        return {
          id: sku.id,
          label: specValues || '默认规格'
        };
      });
    }
  } finally {
    loadingSkus.value = false;
  }

  // Reset Configs
  cardParsedResult.value = null;
  formCard.rawContent = '';
  formShared.maxSlots = 5;
  formShared.attributes.splice(0, formShared.attributes.length, { key: '账号', value: '' }, { key: '密码', value: '' });
};

const getTypeText = (type: string | undefined) => {
  const map: any = { 
    'virtual': '虚拟充值', 
    'shared_account': '账号/合租', 
    'one_time_cdk': '激活码' 
  };
  return map[type] || type || '-';
};

const addVirtualField = () => formVirtual.fields.push('');
const removeVirtualField = (idx: number) => formVirtual.fields.splice(idx, 1);

// --- 图库选择器逻辑 ---
const imagePickerVisible = ref(false);
const pickerLoading = ref(false);
const galleryImages = ref<AdminImage[]>([]);
const pickerCategories = ref<AdminImageCategory[]>([]);
const pickerActiveCatId = ref('');

const openImagePicker = async () => {
  imagePickerVisible.value = true;
  
  if (pickerCategories.value.length === 0) {
    const res = await adminApi.imageCategory.getCategories();
    if (res.success) pickerCategories.value = res.categories;
  }
  
  fetchPickerImages();
};

const fetchPickerImages = async () => {
  pickerLoading.value = true;
  const res = await adminApi.image.getImages({
    category_id: pickerActiveCatId.value
  });
  if (res.success) galleryImages.value = res.images;
  pickerLoading.value = false;
};

const selectGalleryImage = (url: string) => {
  commonImage.value = url;
  imagePickerVisible.value = false;
  ElMessage.success('已选择图片');
};

const handlePickerUpload = async (file: any) => {
  pickerLoading.value = true;
  try {
    const { uploadImageToStorage } = await import('@/utils/uploadImage');
    const upRes = await uploadImageToStorage(file.raw);
    if (upRes.success) {
      await adminApi.image.createImage({
        name: file.name,
        url: upRes.url!,
        category_id: pickerActiveCatId.value || undefined
      });
      selectGalleryImage(upRes.url!);
      fetchPickerImages();
    }
  } finally {
    pickerLoading.value = false;
  }
};

const handleSelectImage = () => {
  openImagePicker();
};

const handleNext = async () => {
  if (activeStep.value === 0) {
    if (!formStep1.productId) return ElMessage.warning('请先选择商品');
    activeStep.value = 1;
  } else if (activeStep.value === 1) {
    // Validate Step 1 based on currentCdkType (from URL)
    if (currentCdkType.value === 'shared_account') {
       // Check if entries are valid
       if (formShared.attributes.some(a => !a.key || !a.value)) {
          return ElMessage.warning('请补全所有账号资源的字段名称与内容');
       }
    }
    
    if (currentCdkType.value === 'one_time_cdk') {
       if (!cardParsedResult.value) {
          return ElMessage.warning('请先点击解析并校验激活码');
       }
       if (cardParsedResult.value.valid.length === 0) {
          return ElMessage.warning('没有可用的有效激活码，请检查输入');
       }
    }
    
    activeStep.value = 2;
  } else {
    // Submit - 调用真实API
    submitting.value = true;
    try {
      const productType = currentCdkType.value;
      
      // 映射 cdk_type
      const cdkTypeMap: Record<string, 'virtual' | 'shared' | 'one_time'> = {
        'virtual': 'virtual',
        'shared_account': 'shared',
        'one_time_cdk': 'one_time'
      };
      const cdkType = cdkTypeMap[productType || ''] || 'one_time';
      
      // 构造 codes 数组
      let codes: string[] = [];
      // account_data 统一只存图片
      let accountData: Record<string, any> | undefined = commonImage.value 
        ? { image: commonImage.value } 
        : undefined;
      
      if (productType === 'one_time_cdk') {
        // 一次性兑换码：使用解析后的有效卡密（纯文本）
        codes = cardParsedResult.value?.valid || [];
      } else if (productType === 'virtual') {
        // 虚拟充值：code 存储字段配置 JSON
        const fieldsData = {
          fields: formVirtual.fields.filter(f => f.trim())
        };
        codes = [JSON.stringify(fieldsData)];
      } else if (productType === 'shared_account') {
        // 账号合租：单个资源，code 存属性键值对
        const attrObj: Record<string, string> = {};
        formShared.attributes.forEach(a => {
          if (a.key) attrObj[a.key] = a.value;
        });
        codes = [JSON.stringify(attrObj)];
      }
      
      if (codes.length === 0) {
        ElMessage.warning('没有可添加的资源');
        submitting.value = false;
        return;
      }
      
      // 获取选中的 SKU IDs（如果没选则使用所有 SKU）
      let targetSkuIds = formStep1.skuIds.length > 0 
        ? formStep1.skuIds 
        : skuOptions.value.map(s => s.id);
      
      if (targetSkuIds.length === 0) {
        ElMessage.warning('该商品没有可用的 SKU，请先创建 SKU');
        submitting.value = false;
        return;
      }
      
      // 使用选中的 SKU IDs 数组一次性创建 CDK
      let successCount = 0;
      let errors: string[] = [];
      
      // 统一 API 调用 (包含商品快照)
      const result = await adminCdkApi.createCdks({
        sku_ids: targetSkuIds,
        cdk_type: cdkType,
        codes,
        max_slots: productType === 'shared_account' ? formShared.maxSlots : 1,
        stock: productType === 'virtual' ? formVirtual.stock : 1,
        account_data: accountData,
        product_snapshot: currentProduct.value ? {
          product_id: currentProduct.value.id,
          product_name: currentProduct.value.product_name,
          product_image: currentProduct.value.image || undefined
        } : undefined
      });
  
      if (result.success) {
        successCount += result.count;
      } else {
        errors.push(result.error || '未知错误');
      }
      
      // 显示结果
      if (successCount > 0) {
        ElMessage.success(`成功添加 ${successCount} 条资源`);
        // Navigate back to the correct CDK type page
        const typeRouteMap: Record<string, string> = {
          'virtual': 'virtual',
          'shared': 'accounts',
          'one_time': 'keys'
        };
        const targetRoute = typeRouteMap[route.query.type as string] || 'virtual';
        router.push(`/admin/cdk/${targetRoute}`);
      } else if (errors.length > 0) {
        ElMessage.error(errors[0]);
      }
    } catch (err: any) {
      ElMessage.error(err.message || '添加失败');
    } finally {
      submitting.value = false;
    }
  }
};

const prevStep = () => {
  if (activeStep.value > 0) activeStep.value--;
};

</script>

<style scoped>
.cdk-post-page {
  width: 100%;
  display: flex;
  flex-direction: column;
  background: transparent;
  padding-bottom: 80px; /* Space for footer */
}

/* Header */
.wizard-header {
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  background: var(--el-bg-color);
  border-bottom: 1px solid #ebeef5;
  border-radius: 8px 8px 0 0;
  margin-bottom: 24px;
}
.header-left { flex: 0 0 200px; display: flex; align-items: center; }
.back-btn { padding: 0 !important; color: #606266; font-weight: normal; }
.back-btn:hover { color: #409EFF; }
.back-icon { margin-right: 6px; }
.header-titles { margin-left: 16px; border-left: 1px solid #dcdfe6; padding-left: 16px; line-height: 1.2; }
.main-title { font-size: 14px; font-weight: 600; color: var(--el-text-color-primary); }
.sub-title { font-size: 10px; color: #909399; }
.header-center { flex: 1; max-width: 600px; display: flex; justify-content: center; }
.header-right { flex: 0 0 200px; }

/* Body */
.wizard-body {
  width: 100%;
}
.centered-container {
  max-width: 800px;
  margin: 0 auto;
}

.form-card {
  background: var(--el-bg-color);
  padding: 32px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0,0,0,0.05);
}
.card-title {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 24px 0;
  color: var(--el-text-color-primary);
}

/* Dynamic Fields */
.field-row { display: flex; gap: 8px; margin-bottom: 12px; }
.add-field-btn { width: 100%; border-style: dashed; }
.form-tip { font-size: 12px; color: #909399; margin-top: 4px; line-height: 1.5; }

/* Image Selector */
.image-selector {
  width: 100px; height: 100px;
  border: 1px dashed #dcdfe6;
  border-radius: 6px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer;
  background: #fbfbfc;
}
.image-selector:hover { border-color: #409EFF; }
.preview-img { width: 100%; height: 100%; border-radius: 6px; object-fit: cover; }
.placeholder { display: flex; flex-direction: column; align-items: center; color: #909399; font-size: 12px; gap: 4px; }
.section-label { display: block; margin-bottom: 12px; font-weight: 500; color: #606266; }

/* Rental Dynamic Cards */
.rental-entry-card {
  border: 1px solid #ebeef5;
  background: #fdfdfd;
  padding: 16px;
  border-radius: 6px;
  margin-bottom: 16px;
}
.entry-header { display: flex; justify-content: space-between; margin-bottom: 12px; }
.entry-title { font-weight: 500; font-size: 14px; color: #606266; }

.kv-list { background: var(--el-bg-color); border: 1px dashed var(--el-border-color-lighter); padding: 12px; border-radius: 4px; }
.kv-header { font-size: 12px; color: #909399; margin-bottom: 8px; }
.kv-row { display: flex; align-items: center; margin-bottom: 8px; gap: 8px; }
.separator { color: #dcdfe6; }
.add-attr-btn { margin-top: 4px; }

.add-entry-btn { width: 100%; border-style: dashed; padding: 12px; height: auto; }

/* Card Parser */
.card-actions { margin-top: 8px; display: flex; align-items: center; gap: 12px; }
.parse-tip { color: #e6a23c; font-size: 12px; }

.parse-dashboard {
  display: flex; gap: 16px; margin-top: 24px;
}
.stat-item {
  flex: 1;
  background: #f4f6fa;
  border-radius: 6px;
  padding: 16px;
  display: flex; flex-direction: column; align-items: center; justify-content: center;
}
.stat-item .num { font-size: 24px; font-weight: bold; line-height: 1.2; }
.stat-item .label { font-size: 12px; color: #909399; margin-top: 4px; }

.stat-item.success .num { color: #67C23A; }
.stat-item.warning .num { color: #E6A23C; }
.stat-item.danger .num { color: #F56C6C; }

/* Confirmation */
.confirmation-card {
  text-align: center;
}
.success-icon { font-size: 48px; color: #67C23A; margin-bottom: 16px; }
.summary-box {
  background: #f5f7fa;
  padding: 24px;
  border-radius: 8px;
  margin-top: 24px;
  text-align: left;
}
.summary-item {
  display: flex; justify-content: space-between; margin-bottom: 12px; font-size: 14px;
}
.summary-item .label { color: #909399; }
.summary-item .value { font-weight: 500; color: var(--el-text-color-primary); }
.summary-item .value.highlight { color: #409EFF; font-weight: bold; font-size: 16px; margin-right: 4px; }

/* Footer */
.wizard-footer {
  position: fixed;
  bottom: 0; left: 0; right: 0;
  padding-left: 250px; /* Sidebar width */
  height: 72px;
  background: var(--el-bg-color);
  border-top: 1px solid #ebeef5;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 99;
  transition: padding-left 0.3s;
}
/* Helper for sidebar collapse (Mock logic, in real app bind to layout state) */
@media (max-width: 1200px) {
    /* .wizard-footer { padding-left: 64px; } */
}
.next-btn { min-width: 120px; }

/* Image Picker Dialog Styles */
.picker-container {
  display: flex;
  height: 500px;
}
.picker-sidebar {
  width: 160px;
  border-right: 1px solid #ebeef5;
  padding: 12px 0;
  overflow-y: auto;
}
.picker-cat-item {
  padding: 10px 16px;
  cursor: pointer;
  font-size: 13px;
  color: #606266;
  transition: all 0.2s;
}
.picker-cat-item:hover { background: #f5f7fa; }
.picker-cat-item.active {
  background: #ecf5ff;
  color: #409EFF;
  font-weight: 500;
}
.picker-main {
  flex: 1;
  padding: 16px;
  overflow-y: auto;
}
.picker-toolbar {
  margin-bottom: 16px;
}
.picker-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 12px;
}
.picker-img-card {
  border: 1px solid #ebeef5;
  border-radius: 6px;
  overflow: hidden;
  cursor: pointer;
  transition: all 0.2s;
}
.picker-img-card:hover {
  border-color: #409EFF;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
}
.picker-img-card .el-image {
  width: 100%;
  height: 100px;
  display: block;
}
.picker-img-name {
  padding: 6px 8px;
  font-size: 12px;
  color: #909399;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  background: #fafafa;
}
</style>
