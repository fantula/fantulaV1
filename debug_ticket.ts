
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseKey = 'sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz' // Local Service Role Key

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

async function debugTicket() {
    console.log('--- Debugging Ticket API ---')

    // 1. List latest ticket
    const { data: tickets, error: listError } = await supabase
        .from('tickets')
        .select('id, ticket_no, user_id, orders(id)')
        .limit(1)

    if (listError) {
        console.error('Error listing tickets:', listError)
        return
    }

    if (!tickets || tickets.length === 0) {
        console.log('No tickets found.')
        return
    }

    const ticket = tickets[0]
    console.log(`Found ticket: ${ticket.id} (${ticket.ticket_no})`)
    console.log('Orders relation check:', ticket.orders)

    // 2. Try getDetail query exact match from frontend
    // .select('*, profiles(email), orders(id, order_no, product_snapshot, sku_snapshot, total_amount, quantity, status, created_at, end_time, expires_at)')
    
    console.log('\n--- Running getDetail Query ---')
    const { data: detail, error: detailError } = await supabase
        .from('tickets')
        .select('*, profiles(email), orders(id, order_no, product_snapshot, sku_snapshot, total_amount, quantity, status, created_at, end_time, expires_at)')
        .eq('id', ticket.id)
        .single()

    if (detailError) {
        console.error('[ERROR] getDetail failed:', detailError)
        console.log('Error details:', JSON.stringify(detailError, null, 2))
    } else {
        console.log('[SUCCESS] getDetail worked.')
        // console.log(JSON.stringify(detail, null, 2))
    }

    // 3. Try with simpler orders relation
    console.log('\n--- Running Simpler Query ---')
    const { data: simple, error: simpleError } = await supabase
        .from('tickets')
        .select('*, orders(*)') // simpler join
        .eq('id', ticket.id)
        .single()

    if (simpleError) {
        console.error('[ERROR] Simple query failed:', simpleError)
    } else {
        console.log('[SUCCESS] Simple query worked.')
    }
}

debugTicket()
