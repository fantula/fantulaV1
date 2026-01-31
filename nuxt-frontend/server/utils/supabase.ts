/**
 * Supabase 服务端工具
 * 用于 Nuxt Server API
 */
import { createClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'

// 获取 Supabase 客户端 (使用用户 token)
export function getSupabaseClient(event: H3Event) {
    const config = useRuntimeConfig()
    const supabaseUrl = config.public.apiBase || 'http://127.0.0.1:54321'
    const supabaseKey = String(config.supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0')

    const authHeader = getHeader(event, 'authorization')

    return createClient(supabaseUrl, supabaseKey, {
        global: {
            headers: authHeader ? { Authorization: authHeader } : {},
        },
    })
}

// 获取 Supabase Service Role 客户端 (用于回调等无用户场景)
export function getSupabaseServiceClient() {
    const config = useRuntimeConfig()
    const supabaseUrl = config.public.apiBase || 'http://127.0.0.1:54321'
    const serviceKey = String(config.supabaseServiceKey || config.supabaseKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU')

    return createClient(supabaseUrl, serviceKey)
}

// 从 Authorization header 获取当前用户
export async function getCurrentUser(event: H3Event) {
    const supabase = getSupabaseClient(event)
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        return null
    }

    return user
}
