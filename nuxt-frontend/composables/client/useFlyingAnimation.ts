/**
 * 通用飞行(抛物线)动画 Composable
 * 用于将图片从起点飞入到目标元素(如购物车图标、收藏图标)
 */
export const useFlyingAnimation = () => {

    /**
     * 执行飞入动画
     * @param startEl 起始元素 (点击的按钮)
     * @param imageSrc 要飞入的图片地址
     * @param targetId 目标元素的ID
     * @param onComplete 动画完成后的回调
     */
    const startAnimation = (startEl: HTMLElement | null, imageSrc: string, targetId: string, onComplete?: () => void) => {
        if (!startEl) {
            console.warn('Start element is null')
            onComplete?.()
            return
        }

        // 1. 获取目标元素位置
        const targetEl = document.getElementById(targetId)
        if (!targetEl) {
            console.warn(`Target element #${targetId} not found`)
            onComplete?.()
            return
        }

        // 获取精确的起始位置
        const startRect = startEl.getBoundingClientRect()
        const targetRect = targetEl.getBoundingClientRect()

        // 2. 创建飞行元素
        const flyer = document.createElement('img')
        flyer.src = imageSrc
        flyer.style.position = 'fixed'
        flyer.style.zIndex = '9999'
        flyer.style.width = '50px' // 初始大小
        flyer.style.height = '50px'
        flyer.style.objectFit = 'cover'
        flyer.style.borderRadius = '50%'
        flyer.style.boxShadow = '0 0 10px rgba(239, 68, 68, 0.5)' // Red glow for hearts (optional, good for favorites)
        // 使用 cubic-bezier 模拟抛物线轨迹: 先快后慢，带一点回弹
        flyer.style.transition = 'all 0.8s cubic-bezier(0.2, -0.3, 0.1, 1.2)'

        // 初始位置: 居中于点击按钮
        flyer.style.left = `${startRect.left + startRect.width / 2 - 25}px`
        flyer.style.top = `${startRect.top + startRect.height / 2 - 25}px`
        flyer.style.opacity = '0.9'
        flyer.style.pointerEvents = 'none'

        document.body.appendChild(flyer)

        // 3. 触发动画
        // 强制重绘
        // @ts-ignore
        flyer.offsetHeight

        // 设置结束位置
        requestAnimationFrame(() => {
            flyer.style.left = `${targetRect.left + targetRect.width / 2 - 10}px` // 终点居中
            flyer.style.top = `${targetRect.top + targetRect.height / 2 - 10}px`
            flyer.style.width = '20px' // 变小
            flyer.style.height = '20px'
            flyer.style.opacity = '0' // 消失
        })

        // 4. 可选: 目标元素的震动反馈
        setTimeout(() => {
            targetEl.style.transform = 'scale(1.2)'
            setTimeout(() => {
                targetEl.style.transform = 'scale(1)'
            }, 200)
        }, 600)

        // 5. 清理 & 回调
        setTimeout(() => {
            if (document.body.contains(flyer)) {
                document.body.removeChild(flyer)
            }
            onComplete?.()
        }, 800) // 对应 transition time
    }

    return {
        startAnimation
    }
}
