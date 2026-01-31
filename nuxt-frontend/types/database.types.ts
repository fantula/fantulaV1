// Supabase Database Types (placeholder)
// 可以通过 supabase gen types typescript 生成完整类型

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    balance: number | null
                    wechat_openid: string | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id: string
                    balance?: number | null
                    wechat_openid?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    balance?: number | null
                    wechat_openid?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }
            recharge_orders: {
                Row: {
                    id: string
                    out_trade_no: string
                    user_id: string
                    amount: number
                    amount_cents: number | null
                    status: string
                    pay_type: string | null
                    description: string | null
                    transaction_id: string | null
                    payer_openid: string | null
                    paid_at: string | null
                    created_at: string | null
                    updated_at: string | null
                }
                Insert: {
                    id?: string
                    out_trade_no: string
                    user_id: string
                    amount: number
                    amount_cents?: number | null
                    status?: string
                    pay_type?: string | null
                    description?: string | null
                    transaction_id?: string | null
                    payer_openid?: string | null
                    paid_at?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
                Update: {
                    id?: string
                    out_trade_no?: string
                    user_id?: string
                    amount?: number
                    amount_cents?: number | null
                    status?: string
                    pay_type?: string | null
                    description?: string | null
                    transaction_id?: string | null
                    payer_openid?: string | null
                    paid_at?: string | null
                    created_at?: string | null
                    updated_at?: string | null
                }
            }
            wallet_transactions: {
                Row: {
                    id: string
                    user_id: string
                    type: string
                    amount: number
                    balance_after: number
                    description: string | null
                    created_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    type: string
                    amount: number
                    balance_after: number
                    description?: string | null
                    created_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    type?: string
                    amount?: number
                    balance_after?: number
                    description?: string | null
                    created_at?: string | null
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
