import { ref } from 'vue'
import { useModalStore } from '@/stores/modal'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'

export function useFavorite(productId: Ref<string>, skuId: Ref<string | undefined>) {
    const modal = useModalStore()
    const userStore = useUserStore()

    const isFavorited = ref(false)
    const favoriteLoading = ref(false)

    const checkFavoriteStatus = async () => {
        if (!userStore.isLoggedIn || !productId.value) return
        const { favoriteApi } = await import('@/api/common')
        const res = await favoriteApi.checkFavorite(productId.value, skuId.value)
        isFavorited.value = res.data || false
    }

    const toggleFavorite = async () => {
        if (!userStore.isLoggedIn) {
            modal.showLogin = true
            return
        }
        if (favoriteLoading.value) return

        favoriteLoading.value = true
        try {
            const { favoriteApi } = await import('@/api/common')
            if (isFavorited.value) {
                ElMessage.info('取消收藏请前往"我的收藏"页面')
            } else {
                const res = await favoriteApi.addFavorite(productId.value, skuId.value)
                if (res.success) {
                    isFavorited.value = true
                    ElMessage.success('收藏成功')
                } else {
                    ElMessage.warning(res.msg || '收藏失败')
                }
            }
        } finally {
            favoriteLoading.value = false
        }
    }

    return {
        isFavorited,
        favoriteLoading,
        checkFavoriteStatus,
        toggleFavorite
    }
}
