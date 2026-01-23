/**
 * 弹窗素材预加载器
 * 在首页访问时预加载所有 mascot 图片，避免弹窗打开时闪烁
 */

import { MODAL_THEMES } from './modalThemeRegistry'

// 缓存已加载状态，避免重复加载
let isPreloaded = false

/**
 * 预加载所有弹窗主题的 mascot 图片
 * 调用时机: 首页 onMounted 或 app 初始化时
 */
export function preloadModalAssets(): void {
    if (isPreloaded) return

    // 收集所有主题的图片路径
    const images = Object.values(MODAL_THEMES)
        .map(theme => theme.mascotImg)
        .filter((img): img is string => !!img)

    // 去重
    const uniqueImages = [...new Set(images)]

    // 静默预加载
    uniqueImages.forEach(src => {
        const img = new Image()
        img.src = src
        // 可选: 监听加载完成
        // img.onload = () => console.log(`[Preloader] Loaded: ${src}`)
    })

    isPreloaded = true
    console.log(`[ModalPreloader] 预加载 ${uniqueImages.length} 个素材`)
}

/**
 * 检查是否已预加载
 */
export function isAssetsPreloaded(): boolean {
    return isPreloaded
}
