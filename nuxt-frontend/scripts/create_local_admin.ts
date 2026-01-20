
import { createClient } from '@supabase/supabase-js'

// 本地开发配置
const SUPABASE_URL = 'http://127.0.0.1:54321'
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU'

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

async function main() {
  console.log('>>> 开始创建本地管理员账号 <<<')

  // 1. 确保超级管理组存在
  console.log('1. 检查超级管理组...')
  const { error: deptError } = await supabase
    .from('admin_departments')
    .upsert({
      id: 'd1e2f3a4-b5c6-d7e8-f9a0-b1c2d3e4f5a6',
      name: '超级管理组',
      permissions: ['*'],
      created_at: new Date().toISOString()
    }, { onConflict: 'id' })
  
  if (deptError) {
    console.error('❌ 创建部门失败:', deptError)
    return
  }
  console.log('✅ 超级管理组已就绪')

  // 2. 创建或获取 Auth 用户 (admin@fantula.com)
  console.log('2. 处理 Auth 用户 (admin@fantula.com)...')
  const email = 'admin@fantula.com'
  const password = 'admin123456'
  
  // 实际上 service_role 无法直接读取 auth.users 表明文密码，也无法直接 insert 到 auth.users
  // 但可以使用 admin.createUser API
  
  // 先尝试获取现有用户
  const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()
  let userId = ''
  
  const existingUser = users.find(u => u.email === email)
  
  if (existingUser) {
    console.log('ℹ️ 用户已存在，正在更新密码...')
    userId = existingUser.id
    const { error: updateError } = await supabase.auth.admin.updateUserById(userId, {
      password: password,
      email_confirm: true
    })
    if (updateError) {
      console.error('❌ 更新密码失败:', updateError)
      return
    }
  } else {
    console.log('ℹ️ 用户不存在，正在创建...')
    const { data: newUser, error: createError } = await supabase.auth.admin.createUser({
      email,
      password,
      email_confirm: true
    })
    
    if (createError || !newUser.user) {
      console.error('❌ 创建 Auth 用户失败:', createError)
      return
    }
    userId = newUser.user.id
  }
  console.log(`✅ Auth 用户已就绪 (ID: ${userId})`)

  // 3. 创建 admin_users 记录
  console.log('3. 关联 admin_users 表...')
  const { error: adminUserError } = await supabase
    .from('admin_users')
    .upsert({
      auth_user_id: userId,
      email: email,
      name: '超级管理员',
      department_id: 'd1e2f3a4-b5c6-d7e8-f9a0-b1c2d3e4f5a6',
      status: 'enabled',
      password_hash: '8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92', // admin123456 的 SHA256
      created_at: new Date().toISOString()
    }, { onConflict: 'auth_user_id' })

  if (adminUserError) {
    console.error('❌ 创建 admin_users 记录失败:', adminUserError)
  } else {
    console.log('✅ admin_users 记录已创建')
    console.log('\n🎉 管理员账号创建成功！')
    console.log('账号: admin@fantula.com')
    console.log('密码: admin123456')
  }
}

main()
