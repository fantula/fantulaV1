/**
 * 统一无限滚动逻辑 Composable
 * 支持客户端分页 (Client-Side) 和 服务端分页 (Server-Side)
 */
import { ref, computed, watch, type Ref } from 'vue'

interface UseInfiniteScrollOptions<T> {
    // === 模式选择 ===
    // 如果提供 data，则为客户端模式 (Client-Side Mode)
    // 如果提供 fetchData，则为服务端模式 (Server-Side Mode)
    data?: Ref<T[]>
    fetchData?: (page: number, size: number) => Promise<{ list: T[], total?: number, hasMore?: boolean }>

    // === 通用配置 ===
    pageSize?: number // 默认 10
    manual?: boolean  // 是否手动触发首次加载 (默认 false)
}

export function useInfiniteScroll<T>(options: UseInfiniteScrollOptions<T>) {
    const {
        data,
        fetchData,
        pageSize = 10,
        manual = false
    } = options

    // 状态
    const displayList = ref<T[]>([]) as Ref<T[]>
    const loading = ref(false)
    const finished = ref(false) // 是否全部加载完毕
    const page = ref(1)
    const total = ref(0)
    const error = ref(false)

    // 模式判断
    const isClientMode = !!data

    // === 核心加载逻辑 ===
    const loadMore = async () => {
        if (loading.value || finished.value) return

        loading.value = true
        error.value = false

        try {
            if (isClientMode) {
                // --- Client Side Mode ---
                // 模拟网络延迟 (可选，为了更好体验)
                // await new Promise(resolve => setTimeout(resolve, 300))

                const sourceData = data!.value
                const start = (page.value - 1) * pageSize
                const end = start + pageSize
                const nextBatch = sourceData.slice(start, end)

                if (nextBatch.length > 0) {
                    displayList.value.push(...nextBatch)
                    page.value++
                }

                // 判断是否已加载完所有源数据
                if (displayList.value.length >= sourceData.length) {
                    finished.value = true
                }

            } else if (fetchData) {
                // --- Server Side Mode ---
                const res = await fetchData(page.value, pageSize)

                if (res.list.length > 0) {
                    displayList.value.push(...res.list)
                    page.value++
                }

                // 判断结束条件
                if (res.hasMore === false || res.list.length < pageSize) {
                    finished.value = true
                }

                if (typeof res.total === 'number') {
                    total.value = res.total
                }
            }
        } catch (e) {
            console.error('Infinite Scroll Load Error:', e)
            error.value = true
        } finally {
            loading.value = false
        }
    }

    // === 重置逻辑 (例如切换 Tab 时) ===
    const reset = () => {
        displayList.value = []
        page.value = 1
        finished.value = false
        loading.value = false
        error.value = false
        // 立即加载第一页
        loadMore()
    }

    // === Client Mode 监听源数据变化 ===
    if (isClientMode) {
        watch(data!, () => {
            // 当源数据彻底改变时 (例如 Tab 切换导致 computed 变化)，重置
            reset()
        })
    } else if (!manual) {
        // Server Mode 自动首次加载
        loadMore()
    }

    return {
        displayList,
        loading,
        finished,
        error,
        loadMore,
        reset
    }
}
