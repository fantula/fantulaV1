
import { getAdminSupabaseClient } from '~/utils/supabase-admin'

// Public Endpoint
export default defineEventHandler(async (event) => {
    const client = getAdminSupabaseClient()

    // Cache for 5 minutes
    setHeader(event, 'Cache-Control', 'public, s-maxage=300, stale-while-revalidate=60')

    const { data, error } = await client
        .from('system_configs')
        .select('value')
        .eq('key', 'contact_info')
        .single()

    if (error) {
        // Return safe defaults
        return {
            success: true,
            data: {
                wechat_id: 'Spotify-cn',
                wechat_qr: '/images/contact/wechat_qr.jpg',
                telegram_id: '@FANTULA_SUPPORT',
                telegram_qr: '/images/contact/telegram_qr.jpg',
                service_time: '10:00 - 23:00'
            }
        }
    }

    return { success: true, data: data.value }
})
