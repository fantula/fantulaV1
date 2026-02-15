/**
 * 设备检测工具函数
 * 用于统一 middleware 和 client 端的设备判断逻辑
 */

// 移动端 UserAgent 正则
const MOBILE_UA_REGEX = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i

/**
 * 检查 UserAgent 是否为移动设备
 * @param userAgent UserAgent 字符串
 */
export const isMobileUserAgent = (userAgent: string): boolean => {
    return MOBILE_UA_REGEX.test(userAgent)
}

/**
 * 检查当前环境是否为 PC (客户端专用)
 * 包含屏幕宽度检测
 */
export const isPC = (): boolean => {
    if (import.meta.server) return false

    // 1. 检查屏幕宽度
    const isLargeScreen = window.innerWidth >= 768

    // 2. 检查UserAgent
    const ua = navigator.userAgent
    const isMobile = isMobileUserAgent(ua)

    // 3. 综合判断
    return isLargeScreen && !isMobile
}
