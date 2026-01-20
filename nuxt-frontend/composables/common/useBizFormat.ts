
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
    const formatDate = (dateStr: string | null | undefined): string => {
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

    return {
        formatPrice,
        formatDate
    }
}
