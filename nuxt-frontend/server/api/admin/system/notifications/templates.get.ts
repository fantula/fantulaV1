

export default defineEventHandler(async (event) => {
    console.log('[API] /admin/system/notifications/templates called')

    try {
        const client = getSupabaseServiceClient()
        console.log('[API] Client initialized')

        const { data, error } = await client
            .from('notification_templates')
            .select('*')
            .order('event_type')

        if (error) {
            console.error('[API] Supabase Error:', error)
            throw createError({
                statusCode: 500,
                statusMessage: error.message
            })
        }

        console.log(`[API] Found ${data?.length} templates`)
        return {
            success: true,
            data
        }
    } catch (e) {
        console.error('[API] Unexpected Error:', e)
        throw e
    }
})
