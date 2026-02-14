import { getSupabaseClient } from '@/utils/supabase'

export interface AdminTicket {
  id: string
  user_id: string
  order_id: string
  title: string
  status: 'processing' | 'resolved'
  priority: 'low' | 'medium' | 'high'
  created_at: string
  updated_at: string
  resolved_at?: string
  // Joins
  profiles?: { email: string }
  orders?: { order_no: string }
}

export interface TicketMessage {
  id: string
  ticket_id: string
  sender_id: string
  is_admin: boolean
  content: string
  message_type: 'text' | 'image'
  attachments: string[]
  created_at: string
  profiles?: { email: string, avatar_url: string }
}

export const adminTicketApi = {
  // 1. Get List
  async getList(params: { page: number, pageSize: number, status?: string }): Promise<{ success: boolean; data: any; total: number; error?: string }> {
    const client = getSupabaseClient()
    const { page, pageSize, status } = params

    let query = client
      .from('tickets')
      .select('*, profiles(email), orders(id, order_no, product_snapshot, sku_snapshot, total_amount, quantity, status, created_at, end_time, expires_at)', { count: 'exact' })
      .order('created_at', { ascending: false })
      .range((page - 1) * pageSize, page * pageSize - 1)

    if (status && status !== 'all') {
      query = query.eq('status', status)
    }

    const { data, error, count } = await query

    if (error) return { success: false, data: [], total: 0, error: error.message }
    return { success: true, data, total: count || 0 }
  },

  // 1.5 Get Detail
  async getDetail(ticketId: string): Promise<{ success: boolean; data: any; error?: string }> {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('tickets')
      .select('*, profiles(email), orders(id, order_no, product_snapshot, sku_snapshot, total_amount, quantity, status, created_at, end_time, expires_at)')
      .eq('id', ticketId)
      .single()

    if (error) return { success: false, data: null, error: error.message }
    return { success: true, data }
  },

  // 2. Get Messages for a Ticket
  async getMessages(ticketId: string): Promise<{ success: boolean; data: TicketMessage[]; error?: string }> {
    const client = getSupabaseClient()
    const { data, error } = await client
      .from('ticket_messages')
      .select('*, profiles(email)')
      .eq('ticket_id', ticketId)
      .order('created_at', { ascending: true })

    if (error) return { success: false, data: [], error: error.message }
    return { success: true, data: data as any }
  },

  // 3. Admin Reply
  async reply(ticketId: string, content: string, attachments: string[] = []): Promise<{ success: boolean; error?: string }> {
    const client = getSupabaseClient()

    // Admin ID logic: ideally we fetch logged in admin profile. 
    // BUT admin API often uses service_role. 
    // We should try to get the 'admin' user profile if possible or leave sender_id NULL for System.
    // For this context, let's leave sender_id NULL to represent "System/Support" or try to find a default admin.

    const { error } = await client
      .from('ticket_messages')
      .insert({
        ticket_id: ticketId,
        sender_id: null, // Null = System/Admin
        is_admin: true,
        content,
        message_type: attachments.length > 0 ? 'image' : 'text',
        attachments
      })

    if (error) return { success: false, error: error.message }
    return { success: true }
  },

  // 4. Resolve Ticket
  async resolve(ticketId: string): Promise<{ success: boolean; error?: string }> {
    const client = getSupabaseClient()
    const { error } = await client
      .from('tickets')
      .update({ status: 'resolved', resolved_at: new Date(), updated_at: new Date() })
      .eq('id', ticketId)

    if (error) return { success: false, error: error.message }
    return { success: true }
  },

  // 5. Cleanup Images (One-Click) - 使用 R2 Edge Function
  async cleanupImages(daysOld: number = 7, token?: string): Promise<{ success: boolean; count: number; error?: string }> {
    const client = getSupabaseClient()
    const dateLimit = new Date();
    dateLimit.setDate(dateLimit.getDate() - daysOld);

    // 1. Find resolved tickets older than limit
    const { data: tickets } = await client
      .from('tickets')
      .select('id')
      .eq('status', 'resolved')
      .lt('resolved_at', dateLimit.toISOString())

    if (!tickets || tickets.length === 0) return { success: true, count: 0 }

    const ticketIds = tickets.map(t => t.id)

    // 2. Find messages with images for these tickets
    const { data: messages } = await client
      .from('ticket_messages')
      .select('id, attachments')
      .in('ticket_id', ticketIds)
      .not('attachments', 'is', null)

    if (!messages || messages.length === 0) return { success: true, count: 0 }

    const filesToDelete: string[] = []

    // 3. Extract paths from R2 URLs
    // R2 URL format: https://img.fantula.com/tickets/filename.png
    // We need "tickets/filename.png"
    messages.forEach(msg => {
      if (Array.isArray(msg.attachments)) {
        msg.attachments.forEach((url: string) => {
          try {
            const urlObj = new URL(url)
            // Pathname: /tickets/abc.png → "tickets/abc.png"
            const path = urlObj.pathname.startsWith('/')
              ? urlObj.pathname.substring(1)
              : urlObj.pathname
            if (path) {
              filesToDelete.push(decodeURIComponent(path))
            }
          } catch (e) {
            // Fallback if relative path stored
            if (url && !url.startsWith('http')) {
              filesToDelete.push(url)
            }
          }
        })
      }
    })

    if (filesToDelete.length === 0) return { success: true, count: 0 }

    // 4. 调用 delete-r2 Edge Function 删除文件
    // 4. 调用 delete-r2 Edge Function 删除文件
    try {
      const { EDGE_FUNCTIONS_URL } = await import('@/utils/supabase')

      if (!token) {
        return { success: false, count: 0, error: '请先登录后台管理员账号' }
      }

      const response = await fetch(`${EDGE_FUNCTIONS_URL}/delete-r2`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ paths: filesToDelete })
      })

      const result = await response.json()

      if (!response.ok || result.error) {
        return { success: false, count: 0, error: result.error || '删除失败' }
      }

      return { success: true, count: result.deleted || 0 }
    } catch (e: any) {
      console.error('Cleanup error:', e)
      return { success: false, count: 0, error: e.message || '清理失败' }
    }
  }
}
