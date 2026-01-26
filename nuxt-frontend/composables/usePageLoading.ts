export const usePageLoading = () => {
    const isLoading = useState<boolean>('global-loading', () => true)
    const loadingVariant = useState<'initial' | 'navigation' | 'section'>('global-loading-variant', () => 'initial')

    const startLoading = (variant: 'initial' | 'navigation' | 'section' = 'navigation') => {
        loadingVariant.value = variant
        isLoading.value = true
    }

    const stopLoading = () => {
        // 稍微延迟关闭，保证动画流畅
        setTimeout(() => {
            isLoading.value = false
        }, 500) // 500ms 缓冲
    }

    return {
        isLoading,
        loadingVariant,
        startLoading,
        stopLoading
    }
}
