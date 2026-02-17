
import { createClient } from '@supabase/supabase-js'
import { readFileSync, existsSync } from 'fs'
import { resolve } from 'path'

// Manually load .env from root
const envPath = resolve(__dirname, '../.env')
if (existsSync(envPath)) {
    const envConfig = readFileSync(envPath, 'utf-8')
    envConfig.split('\n').forEach(line => {
        const match = line.match(/^([^=]+)=(.*)$/)
        if (match) {
            const key = match[1].trim()
            const value = match[2].trim().replace(/^['"]|['"]$/g, '') // remove quotes
            process.env[key] = value
        }
    })
}

const supabaseUrl = process.env.SUPABASE_URL || 'http://127.0.0.1:54321'
const supabaseKey = process.env.SUPABASE_SERVICE_KEY

if (!supabaseUrl || !supabaseKey) {
    console.error('Error: SUPABASE_URL or SUPABASE_SERVICE_KEY not found in .env')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { autoRefreshToken: false, persistSession: false }
})

async function listAdmins() {
    console.log('\n--- Admin Users ---')
    const { data: admins, error } = await supabase.from('admin_users').select('*, admin_departments(name)')
    if (error) {
        console.error(error)
        return
    }
    console.table(admins.map(a => ({
        Name: a.name,
        Email: a.email,
        Role: a.admin_departments?.name,
        Status: a.status
    })))
}

async function listDepartments() {
    console.log('\n--- Departments ---')
    const { data: depts, error } = await supabase.from('admin_departments').select('id, name')
    if (error) {
        console.error(error)
        return
    }
    console.table(depts)
}

async function upgradeUser(email: string, departmentId: string, name: string) {
    console.log(`\nUpgrading ${email}...`)

    // 1. Find Auth User
    const { data: { users }, error } = await supabase.auth.admin.listUsers()
    const user = users.find(u => u.email === email)

    if (!user) {
        console.error(`Error: User ${email} not found in Auth.`)
        return
    }

    // 2. Check if already admin
    const { data: existing } = await supabase.from('admin_users').select('id').eq('auth_user_id', user.id).single()
    if (existing) {
        console.log(`User is already an admin (ID: ${existing.id}). Updating role...`)
        const { error: updateErr } = await supabase.from('admin_users')
            .update({ department_id: departmentId, status: 'enabled' })
            .eq('id', existing.id)

        if (updateErr) console.error(updateErr)
        else console.log('Success: Admin role updated.')
        return
    }

    // 3. Insert new admin
    const { error: insertErr } = await supabase.from('admin_users').insert({
        auth_user_id: user.id,
        email: email,
        name: name,
        department_id: departmentId,
        status: 'enabled'
    })

    if (insertErr) console.error(insertErr)
    else console.log('Success: User promoted to Admin.')
}

const args = process.argv.slice(2)
const command = args[0]

async function main() {
    if (command === 'list') {
        await listAdmins()
    } else if (command === 'depts') {
        await listDepartments()
    } else if (command === 'upgrade') {
        const [_, email, deptId, name] = args
        if (!email || !deptId || !name) {
            console.log('Usage: npx tsx scripts/manage_admin.ts upgrade <email> <dept_id> <name>')
            return
        }
        await upgradeUser(email, deptId, name)
    } else {
        console.log('Usage:')
        console.log('  npx tsx scripts/manage_admin.ts list             # List admins')
        console.log('  npx tsx scripts/manage_admin.ts depts            # List departments')
        console.log('  npx tsx scripts/manage_admin.ts upgrade <email> <dept_id> <name>  # Upgrade user')
    }
}

main()
