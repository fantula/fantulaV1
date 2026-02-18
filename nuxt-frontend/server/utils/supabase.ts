/**
 * Supabase 服务端工具
 * 用于 Nuxt Server API
 *
 * 配置优先级（解决本地 build 烘焙错误值的问题）：
 * URL:  NUXT_PUBLIC_API_BASE > SUPABASE_URL > runtimeConfig.public.apiBase > fallback
 * Key:  NUXT_SUPABASE_KEY > SUPABASE_KEY > runtimeConfig.supabaseKey > fallback
 */
import { createClient } from '@supabase/supabase-js'
import type { H3Event } from 'h3'

const DEFAULT_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
const DEFAULT_SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'

/** 解析 Supabase URL，优先从 process.env 读取 */
function resolveSupabaseUrl(): string {
    const config = useRuntimeConfig()
    return process.env.NUXT_PUBLIC_API_BASE
        || process.env.SUPABASE_URL
        || config.public.apiBase
        || 'http://127.0.0.1:54321'
}

/** 解析 anon key */
function resolveSupabaseKey(): string {
    const config = useRuntimeConfig()
    return process.env.NUXT_SUPABASE_KEY
        || process.env.SUPABASE_KEY
        || String(config.supabaseKey || DEFAULT_ANON_KEY)
}

/** 解析 service role key */
function resolveServiceKey(): string {
    const config = useRuntimeConfig()
    return process.env.NUXT_SUPABASE_SERVICE_KEY
        || process.env.SUPABASE_SERVICE_KEY
        || String(config.supabaseServiceKey || config.supabaseKey || DEFAULT_SERVICE_KEY)
}

// 启动时打印一次配置来源，方便排查
let _configLogged = false
function logConfigOnce() {
    if (_configLogged) return
    _configLogged = true
    const url = resolveSupabaseUrl()
    const key = resolveSupabaseKey()
    const svcKey = resolveServiceKey()
    console.log('[Supabase] Resolved URL:', url)
    console.log('[Supabase] Anon Key:', key.substring(0, 20) + '...')
    console.log('[Supabase] Service Key:', svcKey.substring(0, 20) + '...')
    console.log('[Supabase] URL source:',
        process.env.NUXT_PUBLIC_API_BASE ? 'NUXT_PUBLIC_API_BASE' :
        process.env.SUPABASE_URL ? 'SUPABASE_URL' :
        'runtimeConfig/fallback')
}

// 获取 Supabase 客户端 (使用用户 token)
export function getSupabaseClient(event: H3Event) {
    logConfigOnce()
    const supabaseUrl = resolveSupabaseUrl()
    const supabaseKey = resolveSupabaseKey()

    const authHeader = getHeader(event, 'authorization')

    return createClient(supabaseUrl, supabaseKey, {
        global: {
            headers: authHeader ? { Authorization: authHeader } : {},
        },
    })
}

// 获取 Supabase Service Role 客户端 (用于回调等无用户场景)
export function getSupabaseServiceClient() {
    logConfigOnce()
    const supabaseUrl = resolveSupabaseUrl()
    const serviceKey = resolveServiceKey()

    return createClient(supabaseUrl, serviceKey)
}

// 从 Authorization header 获取当前用户
export async function getCurrentUser(event: H3Event) {
    const authHeader = getHeader(event, 'authorization')
    if (!authHeader) {
        console.warn('[Supabase] getCurrentUser: No Authorization header')
        return null
    }

    const supabase = getSupabaseClient(event)
    const { data: { user }, error } = await supabase.auth.getUser()

    if (error || !user) {
        console.warn('[Supabase] getCurrentUser failed:', error?.message || 'no user',
            '| URL:', resolveSupabaseUrl(),
            '| Token:', authHeader.substring(0, 30) + '...')
        return null
    }

    return user
}
