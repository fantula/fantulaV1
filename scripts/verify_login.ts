
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'http://127.0.0.1:54321'
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY)

async function verifyLogin() {
    console.log('Verifying login for admin@fantula.com...')

    // 1. Try Auth Login
    const { data, error } = await supabase.auth.signInWithPassword({
        email: 'admin@fantula.com',
        password: 'admin123456'
    })

    if (error) {
        console.error('Login Failed:', error.message)
        return
    }

    console.log('Auth Login Successful!')
    console.log('User ID:', data.user.id)

    // 2. Verify Admin Role
    const { data: adminUser, error: dbError } = await supabase
        .from('admin_users')
        .select('*')
        .eq('auth_user_id', data.user.id)
        .single()

    if (dbError || !adminUser) {
        console.error('Admin Role Verification Failed:', dbError?.message || 'User not found in admin_users table')
    } else {
        console.log('Admin Role Verified!')
        console.log('Admin Name:', adminUser.name)
        console.log('Role:', adminUser.role)
    }
}

verifyLogin()
