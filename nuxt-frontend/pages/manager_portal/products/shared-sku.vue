<template>
  <div class="shared-sku-page">
     <PageTipHeader title="共享规格组可被多个商品引用，修改此处将同步更新所有关联商品。" type="warning" />

     <!-- Action Bar -->
     <AdminActionCard>
        <template #actions>
           <el-button @click="loadGroups" :icon="Refresh">刷新</el-button>
           <el-button type="primary" :icon="Plus" @click="openAddDialog">新建共享规格组</el-button>
        </template>
     </AdminActionCard>

     <!-- Data Table -->
     <AdminDataTable 
        :data="groups" 
        :loading="loading"
     >
        <el-table-column label="组 ID" prop="tag" width="100" align="center">
           <template #default="{ row }">
              <el-tag type="info" effect="dark">#{{ row.tag }}</el-tag>
              <div v-if="row.tag_name" style="font-size: 12px; margin-top: 5px; color: #909399;">{{ row.tag_name }}</div>
           </template>
        </el-table-column>

        <el-table-column label="SKU 数量" width="120" align="center">
           <template #default="{ row }">
              <el-tag>{{ row.skus.length }} 个规格</el-tag>
           </template>
        </el-table-column>

        <el-table-column label="包含规格项" min-width="250">
           <template #default="{ row }">
               <div class="spec-preview">
                  <el-tag 
                    v-for="spec in getUniqueSpecs(row)" 
                    :key="spec" 
                    size="small" 
                    type="warning" 
                    effect="plain"
                    class="spec-tag"
                  >
                    {{ spec }}
                  </el-tag>
               </div>
           </template>
        </el-table-column>
        
        <el-table-column label="价格范围" width="180" align="center">
             <template #default="{ row }">
                 {{ getPriceRange(row) }}
             </template>
        </el-table-column>

        <el-table-column label="操作" width="150" fixed="right" align="center">
           <template #default="{ row }">
              <el-button link type="primary" @click="openEditDialog(row)">管理规格</el-button>
              <el-button link type="info" @click="openProductsDialog(row)">查看引用</el-button>
              <el-button link type="danger" @click="confirmDelete(row)">删除</el-button>
           </template>
        </el-table-column>
     </AdminDataTable>
     
     <!-- Edit Dialog -->
     <AdminDataDialog
        v-model="dialogVisible"
        :title="isEdit ? `编辑规格组 #${currentTag}` : '新建共享规格组'"
        width="900px"
        :show-footer="true"
        confirm-text="保存更改"
        :loading="saving"
        @confirm="submitSave"
     >
        <!-- Use standard SkuEditor component -->
        <div style="margin-bottom: 20px;">
            <el-input v-model="tagName" placeholder="请输入共享组标签名（可选，方便记忆）">
                <template #prepend>标签名</template>
            </el-input>
        </div>

        <SkuEditor 
            v-if="dialogVisible"
            ref="editorRef"
            mode="standalone"
            :tag="currentTag"
            :initial-skus="currentSkus"
            :initial-specs="currentSpecs"
        />
     </AdminDataDialog>

     <!-- Linked Products Drawer -->
     <LinkedProductDrawer
        v-model="productsDialogVisible"
        :tag="currentTagForView"
        :tag-name="currentTagNameForView"
     />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Plus, Refresh } from '@element-plus/icons-vue'
import { adminSharedSkuApi, type SharedSkuGroup } from '@/api/admin'
import { ElMessage, ElMessageBox } from 'element-plus'
import AdminActionCard from '@/components/admin/base/AdminActionCard.vue'
import AdminDataTable from '@/components/admin/base/AdminDataTable.vue'
import AdminDataDialog from '@/components/admin/base/AdminDataDialog.vue'
import PageTipHeader from '@/components/admin/base/PageTipHeader.vue'
import SkuEditor from '@/components/admin/SkuEditor.vue'
import LinkedProductDrawer from '@/components/admin/product/LinkedProductDrawer.vue'

definePageMeta({
  layout: 'mgmt', middleware: ["mgmt-auth"], title: '共享规格管理' })

const loading = ref(false)
const saving = ref(false)
const groups = ref<SharedSkuGroup[]>([])
const dialogVisible = ref(false)
const isEdit = ref(false)
const currentTag = ref(0)
const tagName = ref('')
const currentSkus = ref<any[]>([])
const currentSpecs = ref<any[]>([])
const editorRef = ref()

const loadGroups = async () => {
    loading.value = true
    try {
        const res = await adminSharedSkuApi.getSharedSkuGroups()
        if(res.success) groups.value = res.groups
    } finally { loading.value = false }
}

const getUniqueSpecs = (group: SharedSkuGroup) => {
    const keys = new Set<string>()
    group.skus.forEach(s => Object.keys(s.spec_combination).forEach(k => keys.add(k)))
    return Array.from(keys)
}

const getPriceRange = (group: SharedSkuGroup) => {
    if(!group.skus.length) return '-'
    const prices = group.skus.map(s => s.price)
    const min = Math.min(...prices)
    const max = Math.max(...prices)
    if(min === max) return `¥${min}`
    return `¥${min} - ¥${max}`
}

// Dialog
const openAddDialog = async () => {
    isEdit.value = false
    // Get next tag
    const res = await adminSharedSkuApi.getNextTag()
    currentTag.value = res.tag || 0
    tagName.value = ''
    currentSkus.value = []
    currentSpecs.value = []
    dialogVisible.value = true
}

const openEditDialog = (row: SharedSkuGroup) => {
    isEdit.value = true
    currentTag.value = row.tag
    tagName.value = row.tag_name || ''
    
    // Parse to Editor format
    const specMap = new Map<string, Set<string>>()
    const skus = row.skus.map(s => {
         Object.entries(s.spec_combination).forEach(([k, v]) => {
            if (!specMap.has(k)) specMap.set(k, new Set())
            specMap.get(k)!.add(v as string)
         })
         return {
            id: s.id,
            specValues: s.spec_combination,
            product_type: s.product_type,
            price: s.price,
            duration: s.duration,
            intro: s.intro,
            image: s.image,
            tag: s.tag
         }
    })
    
    currentSpecs.value = Array.from(specMap.entries()).map(([name, values]) => ({
        name, values: Array.from(values), inputVisible: false, inputValue: ''
    }))
    currentSkus.value = skus
    dialogVisible.value = true
}

const submitSave = async () => {
    if(!editorRef.value) return
    saving.value = true
    try {
        const skusToSave = editorRef.value.getSkus()
        if(skusToSave.length === 0) { ElMessage.warning('请至少添加一个SKU'); return }
        
        const payload = skusToSave.map((s: any, i: number) => ({
            id: s.id,
            spec_combination: s.specValues,
            product_type: s.product_type,
            price: s.price,
            duration: s.duration,
            image: s.image,
            intro: s.intro,
            sort_order: i
        }))
        
        let res
        if(isEdit.value) {
            res = await adminSharedSkuApi.updateSharedSkuGroup(currentTag.value, payload, tagName.value)
        } else {
            res = await adminSharedSkuApi.createSharedSkuGroup(currentTag.value, payload, tagName.value)
        }
        
        if(res.success) {
            ElMessage.success('保存成功')
            dialogVisible.value = false
            loadGroups()
        } else ElMessage.error(res.error)
    } finally { saving.value = false }
}


const confirmDelete = (row: SharedSkuGroup) => {
    ElMessageBox.confirm(`确认删除规格组 #${row.tag}? 此操作无法恢复。`, '警告', { type: 'warning' })
    .then(async () => {
        const res = await adminSharedSkuApi.deleteSharedSkuGroup(row.tag)
        if(res.success) { ElMessage.success('删除成功'); loadGroups() }
        else ElMessage.error(res.error)
    })
}

// Linked Products
const productsDialogVisible = ref(false)
const currentTagForView = ref(0)
const currentTagNameForView = ref('')

const openProductsDialog = (row: SharedSkuGroup) => {
    currentTagForView.value = row.tag
    currentTagNameForView.value = row.tag_name
    productsDialogVisible.value = true
}

onMounted(loadGroups)
</script>

<style scoped>
.spec-tag { margin-right: 5px; }
.spec-preview { display: flex; flex-wrap: wrap; gap: 4px; }
</style>
