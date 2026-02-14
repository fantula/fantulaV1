/**
 * Admin API 自动迁移脚本
 * 将客户端 API 文件转换为服务端 API 结构
 */

const fs = require('fs')
const path = require('path')

// 配置
const SOURCE_DIR = path.join(__dirname, '../api/admin')
const TARGET_DIR = path.join(__dirname, '../server/api/admin')

// API 方法到 HTTP 方法的映射
const METHOD_MAPPING = {
  get: 'get',
  list: 'get',
  fetch: 'get',
  query: 'get',
  create: 'post',
  add: 'post',
  update: 'patch',
  edit: 'patch',
  delete: 'delete',
  remove: 'delete',
  toggle: 'patch'
}

// 生成服务端 API 文件模板
function generateServerAPI(methodName, httpMethod, resourceName) {
  return `/**
 * ${methodName}
 * ${httpMethod.toUpperCase()} /api/admin/${resourceName}
 */
import { requireAdminAuth } from '~/server/utils/admin-auth'
import { successResponse, errorResponse } from '~/server/utils/api-response'
import { getSupabaseServiceClient } from '~/server/utils/supabase'

export default defineEventHandler(async (event) => {
  try {
    // 验证管理员权限
    await requireAdminAuth(event)

    // TODO: 实现具体逻辑
    // 1. 获取请求参数
    // 2. 调用 Supabase
    // 3. 返回结果

    const supabase = getSupabaseServiceClient()

    return successResponse(null, '功能待实现')
  } catch (error: any) {
    return errorResponse(error.message || '操作失败')
  }
})
`
}

// 扫描 API 文件
function scanAPIFile(filename) {
  const content = fs.readFileSync(path.join(SOURCE_DIR, filename), 'utf-8')

  // 提取 API 方法
  const methodRegex = /async (\w+)\(/g
  const methods = []
  let match

  while ((match = methodRegex.exec(content)) !== null) {
    methods.push(match[1])
  }

  return methods
}

// 主函数
function main() {
  console.log('🚀 开始扫描 Admin API 文件...\n')

  const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith('.ts'))

  let totalMethods = 0

  files.forEach(file => {
    const methods = scanAPIFile(file)
    const resourceName = file.replace('.ts', '')

    console.log(`📄 ${file}`)
    console.log(`   方法数: ${methods.length}`)
    console.log(`   方法: ${methods.join(', ')}`)
    console.log('')

    totalMethods += methods.length
  })

  console.log(`\n📊 统计：`)
  console.log(`   文件总数: ${files.length}`)
  console.log(`   方法总数: ${totalMethods}`)
  console.log(`\n💡 建议：由于文件数量较多，建议手工迁移关键 API，其余可参考模板批量生成`)
}

main()
