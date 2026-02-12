export function useBizFormat() {
    /**
     * Format date string to standard display format (YYYY/MM/DD HH:mm:ss)
     * using standard locale string for consistency.
     */
    const formatDate = (date: string | number | Date | null | undefined) => {
        if (!date) return '-'
        try {
            const d = new Date(date)
            if (isNaN(d.getTime())) return '-'
            return d.toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: false
            }).replace(/\//g, '-')
        } catch (e) {
            return '-'
        }
    }

    return {
        formatDate
    }
}
