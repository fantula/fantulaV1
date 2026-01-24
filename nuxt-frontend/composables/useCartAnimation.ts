/**
 * 购物车飞入动画 Composable
 */
export const useCartAnimation = () => {

    /**
     * 执行飞入动画
     * @param startEl 起始元素 (通常是点击的按钮或者商品图片)
     * @param imageSrc 要飞入的图片地址
     * @param onComplete 动画完成后的回调
     */
    const startAnimation = (startEl: HTMLElement, imageSrc: string, onComplete?: () => void) => {
        // 1. 获取目标元素位置 (购物车图标)
        const targetEl = document.getElementById('cart-icon-ref')
        if (!targetEl) {
            console.warn('Cart icon target not found')
            onComplete?.()
            return
        }

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
        flyer.style.transition = 'all 0.8s cubic-bezier(0.2, -0.3, 0.1, 1.2)' // 贝塞尔曲线模拟抛物线效果(简单版)
        // 或者使用更复杂的 JS 动画来实现真正的抛物线，这里用简单的 CSS transition 模拟

        // 初始位置
        flyer.style.left = `${startRect.left + startRect.width / 2 - 25}px`
        flyer.style.top = `${startRect.top + startRect.height / 2 - 25}px`
        flyer.style.opacity = '0.8'
        flyer.style.pointerEvents = 'none'

        document.body.appendChild(flyer)

        // 3. 触发动画
        // 强制重绘
        flyer.offsetHeight

        // 设置结束位置
        requestAnimationFrame(() => {
            flyer.style.left = `${targetRect.left + targetRect.width / 2 - 10}px` // 缩小并在中心
            flyer.style.top = `${targetRect.top + targetRect.height / 2 - 10}px`
            flyer.style.width = '20px'
            flyer.style.height = '20px'
            flyer.style.opacity = '0.5'
        })

        // 4. 清理
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
