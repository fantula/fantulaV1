import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'http://127.0.0.1:54321'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZhbnR1bGEiLCJyb2xlIjoiYW5vbiIsImlhdCI6MTczOTAyODM4MSwiZXhwIjoyMDU0NjA0MzgxfQ.K-0fQ0a-s8f6-5-jK-5f8f8-8-8-8-8-8' // Dummy anon key for local

const supabase = createClient(supabaseUrl, 'sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH')

async function testOtp() {
    const { data, error } = await supabase.auth.signInWithOtp({
        email: 'test@example.com',
        options: {
            shouldCreateUser: true
        }
    })
    if (error) {
        console.error('Error:', error.message)
    } else {
        console.log('OTP sent successfully')
    }
}

testOtp()
