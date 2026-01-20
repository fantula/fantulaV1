
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseKey = 'sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz' // Local Service Role Key

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

async function checkAdmin() {
    console.log('--- Checking Admin Users ---')

    // 1. List all users in auth.users (via listUsers API)
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers()
    if (authError) {
        console.error('Error listing auth users:', authError)
        return
    }

    console.log(`Found ${users.length} auth users:`)
    users.forEach(u => console.log(`- ${u.email} (ID: ${u.id})`))

    // 2. List all users in public.admin_users
    const { data: adminUsers, error: dbError } = await supabase
        .from('admin_users')
        .select('*')

    if (dbError) {
        console.error('Error listing public.admin_users:', dbError)
        return
    }

    console.log(`\nFound ${adminUsers.length} public.admin_users:`)
    adminUsers.forEach(u => console.log(`- ID: ${u.id}, AuthID: ${u.auth_user_id}, Name: ${u.name}, Status: ${u.status}`))

    // 3. Match them
    console.log('\n--- Matching Analysis ---')
    let matched = false
    for (const admin of adminUsers) {
        const authUser = users.find(u => u.id === admin.auth_user_id)
        if (authUser) {
            console.log(`[OK] Admin "${admin.name}" matches Auth User "${authUser.email}"`)
            matched = true
        } else {
            console.log(`[ERROR] Admin "${admin.name}" (AuthID: ${admin.auth_user_id}) has NO MATCHING Auth User!`)
            // Try to find by email
            const emailMatch = users.find(u => u.email === admin.email)
            if (emailMatch) {
                console.log(`  -> BUT found Auth User with same email: ${emailMatch.email} (ID: ${emailMatch.id})`)
                console.log(`  -> FIX REQUIRED: Update admin_users.auth_user_id to ${emailMatch.id}`)
            }
        }
    }

    if (!matched) {
        console.log('\n[CRITICAL] No valid admin link found! This explains the login redirect loop.')
    }
}

checkAdmin()
