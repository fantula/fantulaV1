import { createClient } from 'npm:@supabase/supabase-js@2'

export class Logger {
    private serviceName: string

    constructor(serviceName: string) {
        this.serviceName = serviceName
    }

    async error(message: string, error?: any, metadata?: Record<string, any>) {
        // 1. Console Log (Immediate Visibility in Docker Logs)
        console.error(`[${this.serviceName}] ERROR: ${message}`, error)

        // 2. DB Persistence (Async)
        try {
            const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? ''
            const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''

            if (!supabaseUrl || !supabaseKey) {
                console.warn(`[${this.serviceName}] Defaulting to console log only (Missing ENV)`)
                return
            }

            const client = createClient(supabaseUrl, supabaseKey)

            // Serialize error
            const stackTrace = error instanceof Error ? error.stack : String(error)
            const errorMsg = error instanceof Error ? error.message : String(error)

            // We explicitly DO NOT await this to avoid blocking the main thread 
            // unless it's critical. For now, we prefer speed.
            // But in Deno Edge, if the runtime terminates, background tasks might die.
            // So we SHOULD await it, or use `EdgeRuntime.waitUntil` if available.
            // Since self-hosted Deno is standard, awaiting is safer.
            const { error: dbError } = await client.from('error_logs').insert({
                service: this.serviceName,
                level: 'error',
                message: `${message}: ${errorMsg}`,
                stack_trace: stackTrace,
                metadata: metadata || {},
                resolved: false
            })

            if (dbError) {
                console.error(`[${this.serviceName}] Failed to log to DB:`, dbError)
            }

        } catch (loggingError) {
            console.error(`[${this.serviceName}] Logger Internal Error:`, loggingError)
        }
    }
}
