
/**
 * 全局业务格式化工具
 * 统一全站的价格和时间显示格式
 */

export function useBizFormat() {

    /**
     * 格式化价格
     * 规则: 不显示货币符号，始终保留2位小数
     * @param price 价格数值或字符串
     * @param fallback 默认值 (默认 0.00)
     */
    const formatPrice = (price: number | string | null | undefined, fallback = '0.00'): string => {
        if (price === null || price === undefined || price === '') return fallback
        const num = Number(price)
        if (isNaN(num)) return fallback
        return num.toFixed(2)
    }

    /**
     * 格式化日期时间
     * 规则: YYYY-MM-DD HH:mm:ss
     * @param dateStr ISO 日期字符串
     */
    const formatDate = (dateStr: string | number | Date | null | undefined): string => {
        if (!dateStr) return '-'
        const date = new Date(dateStr)
        if (isNaN(date.getTime())) return '-'

        const year = date.getFullYear()
        const month = String(date.getMonth() + 1).padStart(2, '0')
        const day = String(date.getDate()).padStart(2, '0')
        const hours = String(date.getHours()).padStart(2, '0')
        const minutes = String(date.getMinutes()).padStart(2, '0')
        const seconds = String(date.getSeconds()).padStart(2, '0')

        return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
    }

    /**
     * 计算并格式化剩余时间
     * @param expiryStr ISO 过期时间字符串
     */
    const formatRemainingTime = (expiryStr: string | null | undefined): string | null => {
        if (!expiryStr) return null

        const expiry = new Date(expiryStr).getTime()
        const now = new Date().getTime()
        const diff = expiry - now

        if (diff <= 0) return '已过期'

        const days = Math.floor(diff / (1000 * 60 * 60 * 24))
        const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

        if (days > 0) return `${days}天 ${hours}小时`
        if (hours > 0) return `${hours}小时 ${minutes}分`
        return `${minutes}分钟`
    }

    /**
     * 格式化销量
     * 规则: >= 10000 显示 Xw+，>= 1000 显示 Xk+，其余显示原数字
     * @param val 销量数值或字符串
     */
    const formatSales = (val: number | string | null | undefined): string => {
        const num = Number(val)
        if (isNaN(num)) return '0'
        if (num >= 10000) return (num / 10000).toFixed(1) + 'w+'
        if (num >= 1000) return (num / 1000).toFixed(1) + 'k+'
        return String(num)
    }

    return {
        formatPrice,
        formatDate,
        formatRemainingTime,
        formatSales
    }
}
