import { ref, computed, onUnmounted } from 'vue'
import { supabaseFaqApi } from '@/api/client/supabase'

export function useFaqTicker(productId: Ref<string>) {
    const fetchedFaqs = ref<any[]>([])
    const activeFaqIndex = ref(0)
    const isTransitioning = ref(true)
    let tickerTimer: any = null

    const faqs = computed(() => {
        if (fetchedFaqs.value.length > 0) return fetchedFaqs.value
        return []
    })

    const displayFaqs = computed(() => {
        if (faqs.value.length === 0) return []
        return [...faqs.value, faqs.value[0]]
    })

    const tickerStyle = computed(() => ({
        transform: `translateY(-${activeFaqIndex.value * 40}px)`,
        transition: isTransitioning.value ? 'transform 0.5s ease-in-out' : 'none'
    }))

    const startFaqTicker = () => {
        if (tickerTimer) clearInterval(tickerTimer)
        if (faqs.value.length === 0) return

        tickerTimer = setInterval(() => {
            isTransitioning.value = true
            activeFaqIndex.value++

            if (activeFaqIndex.value === faqs.value.length) {
                setTimeout(() => {
                    isTransitioning.value = false
                    activeFaqIndex.value = 0
                }, 500)
            }
        }, 3000)
    }

    const fetchBoundFaqs = async () => {
        try {
            let finalFaqs: any[] = []

            const res = await supabaseFaqApi.getFaqsByProduct(productId.value)
            if (res.success && res.faqs.length > 0) {
                finalFaqs = [...res.faqs]
            }

            if (finalFaqs.length < 5) {
                const resGen = await supabaseFaqApi.getFaqs()
                if (resGen.success && resGen.faqs.length > 0) {
                    const existingIds = new Set(finalFaqs.map(f => f.id))
                    const generalToAdd = resGen.faqs.filter((f: any) => !existingIds.has(f.id))
                    finalFaqs = [...finalFaqs, ...generalToAdd].slice(0, 5)
                }
            }

            fetchedFaqs.value = finalFaqs
        } catch (e) {
            console.error('Fetch FAQ error:', e)
        }
    }

    const stopTicker = () => {
        if (tickerTimer) clearInterval(tickerTimer)
    }

    onUnmounted(stopTicker)

    return {
        faqs,
        displayFaqs,
        tickerStyle,
        startFaqTicker,
        fetchBoundFaqs,
        stopTicker
    }
}
