
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../.env') })

const supabaseUrl = process.env.SUPABASE_URL || 'https://fantula-supabase.zeabur.app'
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

const supabase = createClient(supabaseUrl, supabaseKey!)

async function checkSchema() {
    console.log('Checking profiles table structure...')
    // Select one row to see keys
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .limit(1)

    if (error) {
        console.error('Error selecting profiles:', error)
        return
    }

    if (data && data.length > 0) {
        console.log('Columns found:', Object.keys(data[0]))
        if (!Object.keys(data[0]).includes('updated_at')) {
            console.error('🚨 CRITICAL: updated_at column is MISSING in profiles table!')
        } else {
            console.log('✅ updated_at column exists.')
        }
    } else {
        console.log('No profiles found to check columns. Creating a dummy one might be needed but skipping for now.')
    }
}

checkSchema()
