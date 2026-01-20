import { getSupabaseClient } from '@/utils/supabase'

export const ticketApi = {
    // 1. Create Ticket
    async create(orderId: string, title: string, content: string, priority: string, attachments: string[] = []) {
        const client = getSupabaseClient()
        const { data, error } = await client.rpc('create_ticket', {
            p_order_id: orderId,
            p_title: title,
            p_content: content,
            p_priority: priority,
            p_attachments: attachments
        })

        if (error) return { success: false, error: error.message }
        // RPC returns { success: bool, ticket_id: uuid, error: string } via JSONB 
        // Wait, the SQL returns JSONB which Supabase JS converts to object.
        const res = data as any
        if (!res.success) return { success: false, error: res.error }
        return { success: true, ticketId: res.ticket_id }
    },

    // 2. Get My Tickets
    async getList(status: string = 'all') {
        const client = getSupabaseClient()
        let query = client
            .from('tickets')
            .select('*, orders(order_no), ticket_messages(content)') // Just get basic info
            .order('created_at', { ascending: false })

        if (status !== 'all') {
            query = query.eq('status', status)
        }

        const { data, error } = await query
        if (error) return { success: false, data: [], error: error.message }

        // Process to get last message content preview if needed
        const processed = data?.map((t: any) => ({
            ...t,
            last_message: t.ticket_messages?.[0]?.content || ''
        })) || []

        return { success: true, data: processed }
    },

    // 3. Get Detail with Messages
    async getDetail(ticketId: string) {
        const client = getSupabaseClient()
        // Get Request Info
        const { data: ticket, error: tErr } = await client
            .from('tickets')
            .select('*, orders(id, order_no, product_snapshot)')
            .eq('id', ticketId)
            .single()

        if (tErr) return { success: false, error: tErr.message }

        // Get Messages
        const { data: messages, error: mErr } = await client
            .from('ticket_messages')
            .select('*, sender_id, is_admin') // is_admin stored in DB
            .eq('ticket_id', ticketId)
            .order('created_at', { ascending: true })

        if (mErr) return { success: false, error: mErr.message }

        return {
            success: true,
            data: {
                ...ticket,
                replies: messages?.map((m: any) => ({
                    id: m.id,
                    sender: m.is_admin ? 'admin' : 'user',
                    content: m.content,
                    attachments: m.attachments,
                    time: m.created_at
                })) || []
            }
        }
    },

    // 4. Client Reply
    async reply(ticketId: string, content: string, attachments: string[] = []) {
        const client = getSupabaseClient()
        const { data, error } = await client.rpc('send_ticket_message', {
            p_ticket_id: ticketId,
            p_content: content,
            p_attachments: attachments
        })

        if (error) return { success: false, error: error.message }
        return { success: true }
    }
}
