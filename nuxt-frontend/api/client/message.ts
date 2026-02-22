/**
 * Client-side Message API
 * Handles fetching notifications and marking them as read
 */

import { getSupabaseClient } from '@/utils/supabase'
import type { ApiResponse } from './auth'

// ==================== Types ====================
export interface UserMessage {
  id: string
  type: 'system' | 'order' | 'activity' | 'security'
  title: string
  content: string
  link: string | null
  is_read: boolean
  created_at: string
  data?: Record<string, any>
}

// ==================== API ====================
export const messageApi = {
  /**
   * Get paginated messages for the current user
   */
  async getMessages(page = 1, limit = 20): Promise<ApiResponse<{ messages: UserMessage[]; total: number }>> {
    const client = getSupabaseClient()
    const { data: { user } } = await client.auth.getUser()

    if (!user) {
      return { code: 401, msg: '未登录', success: false }
    }

    const offset = (page - 1) * limit

    // Get messages with count
    try {
      const { data, error, count } = await client
        .from('messages')
        .select('*', { count: 'exact' })
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .range(offset, offset + limit - 1)

      if (error) {
        if (import.meta.dev) console.error('getMessages error:', error)
        return { code: 500, msg: error.message, success: false }
      }

      return {
        code: 0,
        msg: 'success',
        success: true,
        data: {
          messages: data || [],
          total: count || 0
        }
      }
    } catch (error: any) {
      if (import.meta.dev) console.error('getMessages error:', error)
      return { code: 500, msg: error.message || '获取消息失败', success: false }
    }
  },

  /**
   * Get unread message count (for badge display)
   */
  async getUnreadCount(): Promise<ApiResponse<number>> {
    const client = getSupabaseClient()
    const { data: { user } } = await client.auth.getUser()

    if (!user) {
      return { code: 401, msg: '未登录', success: false }
    }

    try {
      const { count, error } = await client
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('user_id', user.id)
        .eq('is_read', false)

      if (error) {
        if (import.meta.dev) console.error('getUnreadCount error:', error)
        return { code: 500, msg: error.message, success: false }
      }

      return { code: 0, msg: 'success', success: true, data: count || 0 }
    } catch (error: any) {
      if (import.meta.dev) console.error('getUnreadCount error:', error)
      return { code: 500, msg: error.message || '获取未读消息数量失败', success: false }
    }
  },

  /**
   * Mark a single message as read
   */
  async markAsRead(messageId: string): Promise<ApiResponse<null>> {
    const client = getSupabaseClient()

    try {
      const { error } = await client
        .from('messages')
        .update({ is_read: true })
        .eq('id', messageId)

      if (error) {
        if (import.meta.dev) console.error('markAsRead error:', error)
        return { code: 500, msg: error.message, success: false }
      }

      return { code: 0, msg: 'success', success: true }
    } catch (error: any) {
      if (import.meta.dev) console.error('markAsRead error:', error)
      return { code: 500, msg: error.message || '更新消息状态失败', success: false }
    }
  },

  /**
   * Mark all messages as read for the current user
   */
  async markAllAsRead(): Promise<ApiResponse<null>> {
    const client = getSupabaseClient()
    const { data: { user } } = await client.auth.getUser()

    if (!user) {
      return { code: 401, msg: '未登录', success: false }
    }

    try {
      const { error } = await client
        .from('messages')
        .update({ is_read: true })
        .eq('user_id', user.id)
        .eq('is_read', false)

      if (error) {
        if (import.meta.dev) console.error('markAllAsRead error:', error)
        return { code: 500, msg: error.message, success: false }
      }

      return { code: 0, msg: 'success', success: true }
    } catch (error: any) {
      if (import.meta.dev) console.error('markAllAsRead error:', error)
      return { code: 500, msg: error.message || '更新所有消息状态失败', success: false }
    }
  }
}
