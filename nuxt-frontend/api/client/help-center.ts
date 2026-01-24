
import { getSupabaseClient } from '@/utils/supabase'

export interface ClientFaq {
    id: string
    question: string
    answer: string
    sort_order: number
}

export const clientFaqApi = {
    // Get FAQs that are marked for checkout display
    async getCheckoutFaqs() {
        const client = getSupabaseClient()

        // 1. Get Categories visible in checkout
        const { data: categories, error: catError } = await client
            .from('faq_categories')
            .select('id')
            .eq('is_active', true)
            .eq('is_checkout_visible', true)

        if (catError || !categories || categories.length === 0) {
            return { success: true, faqs: [] }
        }

        const catIds = categories.map(c => c.id)

        // 2. Get FAQs in those categories
        const { data, error } = await client
            .from('faqs')
            .select('id, question, answer, sort_order')
            .in('category_id', catIds)
            .eq('is_active', true)
            .order('sort_order', { ascending: true })
            .limit(5) // Max 5 items as requested

        if (error) {
            console.error('Fetch checkout FAQ error', error)
            return { success: false, faqs: [] }
        }

        return { success: true, faqs: data || [] }
    }
}
