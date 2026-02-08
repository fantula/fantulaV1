export const usePageLoading = () => {
    const isLoading = useState<boolean>('global-loading', () => true)
    const loadingVariant = useState<'initial' | 'navigation' | 'section'>('global-loading-variant', () => 'initial')

    const startLoading = (variant: 'initial' | 'navigation' | 'section' = 'navigation') => {
        loadingVariant.value = variant
        isLoading.value = true
    }

    const stopLoading = () => {
        // 快速关闭，保证流畅体验
        setTimeout(() => {
            isLoading.value = false
        }, 100) // 100ms 缓冲 (原 500ms)
    }

    return {
        isLoading,
        loadingVariant,
        startLoading,
        stopLoading
    }
}
