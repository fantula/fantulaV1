<template>
  <div class="goods-page-container">
    <!-- Blurred Background (Image of the product) -->
    <!-- We need to fetch goods info briefly to show the background, or just show a default bg and let the sheet handle data.
         To improve speed, we can fetch basic info here OR just use the sheet.
         But since the Sheet fetches its own data on 'visible', we can rely on it.
         However, for the background to match product, we need the image.
         Let's invoke a simple fetch or wait for sheet to populate?
         Actually, simplicity first: Just show the sheet. The sheet has its own background/overlay logic.
    -->
    
    <!-- 
      The requirement: "下拉了一个从下往上的一个弹窗". 
      Typically means the user enters the page, and the sheet slides up. 
      Closing the sheet -> Back.
    -->
    <ProductDetailSheet 
        v-model:visible="sheetVisible" 
        :goodsId="goodsId"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductDetailSheet from '@/components/mobile/goods/ProductDetailSheet.vue'

definePageMeta({ layout: 'mobile', hideTabBar: true })

const route = useRoute()
const router = useRouter()
const goodsId = route.params.id as string
const sheetVisible = ref(false)

onMounted(() => {
    // Open sheet immediately on enter
    setTimeout(() => {
        sheetVisible.value = true
    }, 100)
})

// If user closes sheet (visible -> false), we should navigate back
watch(sheetVisible, (val) => {
    if (!val) {
        // Wait for animation to finish then go back
        setTimeout(() => {
            router.back()
        }, 300)
    }
})
</script>

<style scoped>
.goods-page-container {
    min-height: 100vh;
    background: #000; /* Dark background behind the sheet */
}
</style>
