
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseServiceKey = 'sb_secret_N7UND0UgjKTVK-Uodkm0Hg_xSvEMPvz' // From .env

const supabase = createClient(supabaseUrl, supabaseServiceKey, {
    auth: {
        autoRefreshToken: false,
        persistSession: false
    }
})

async function testAdminCreate() {
    const email = `jiangdalin1966@gmail.com`
    const password = 'Password123!'
    const name = '大林'

    console.log(`Attempting Admin Create User with ${email} and name ${name}...`)

    const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: { name, role: 'admin' }
    })

    if (error) {
        console.error('Admin Create Failed:', error)
    } else {
        console.log('Admin Create Successful:', data)
    }
}

testAdminCreate()
