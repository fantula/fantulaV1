/**
 * Custom implementation of useSupabaseSession
 * Replaces @nuxtjs/supabase functionality to avoid build conflicts
 */
import { ref, onMounted, onUnmounted } from 'vue'
import { getSupabaseClient } from '@/utils/supabase'

export const useSupabaseSession = () => {
    const session = ref<any>(null)
    // Initialize session
    const initSession = async () => {
        const client = getSupabaseClient()
        const { data } = await client.auth.getSession()
        session.value = data.session
        return client
    }

    // Subscribe to changes
    let subscription: any = null

    onMounted(async () => {
        // Initial fetch
        if (process.client) {
            const client = await initSession()

            // Listen for changes
            const { data } = client.auth.onAuthStateChange((_event, _session) => {
                session.value = _session
            })
            subscription = data.subscription
        }
    })

    onUnmounted(() => {
        if (subscription) {
            subscription.unsubscribe()
        }
    })

    // If SSR, we might want to try getting it from initial state if available,
    // but for now, we'll stick to client-side hydration for admin panel safety.

    return session
}

export default useSupabaseSession
