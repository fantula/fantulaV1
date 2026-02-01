/**
 * 定时任务服务
 * 支持多任务组，按频率分类执行
 * 
 * API:
 *   GET  /status     - 获取定时器状态
 *   POST /start      - 启动定时器
 *   POST /stop       - 停止定时器
 *   POST /run/:task  - 手动执行任务
 *   GET  /logs       - 获取执行日志
 *   GET  /tasks      - 获取任务列表
 */

require('dotenv').config()

const express = require('express')
const cron = require('node-cron')
const { createClient } = require('@supabase/supabase-js')

const app = express()
app.use(express.json())

// CORS 支持 (必须在路由之前)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
})

// 配置
const PORT = process.env.SCHEDULER_PORT || 3001
const SUPABASE_URL = process.env.SUPABASE_URL || 'http://127.0.0.1:54321'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

// Supabase 客户端 (使用 service_role 权限)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// ============================================
// 任务定义
// ============================================

const tasks = {
  /**
   * 清理过期预订单
   */
  cleanup_expired_preorders: async () => {
    console.log('[任务] 开始清理过期预订单...')

    const { data, error } = await supabase.rpc('cleanup_expired_preorders')

    if (error) {
      console.error('[任务] 清理失败:', error.message)
      await logTaskExecution('cleanup_expired_preorders', 'error', 0, error.message)
      return { success: false, error: error.message }
    }

    const expiredCount = data?.expired_count || 0
    await logTaskExecution('cleanup_expired_preorders', 'success', expiredCount)
    console.log('[任务] 清理完成:', data)
    return data
  },

  /**
   * 清理未验证用户 (超过24小时未验证邮箱)
   */
  cleanup_unverified_users: async () => {
    console.log('[任务] 开始清理未验证用户...')

    const { data, error } = await supabase.rpc('cleanup_unverified_users')

    if (error) {
      console.error('[任务] 清理失败:', error.message)
      await logTaskExecution('cleanup_unverified_users', 'error', 0, error.message)
      return { success: false, error: error.message }
    }

    const expiredCount = data?.expired_count || 0
    await logTaskExecution('cleanup_unverified_users', 'success', expiredCount)
    console.log('[任务] 清理完成:', data)
    return data
  },

  /**
   * 清理过期微信登录会话
   */
  cleanup_expired_wechat_sessions: async () => {
    console.log('[任务] 开始清理过期微信登录会话...')

    const { data, error } = await supabase
      .from('wechat_login_sessions')
      .delete()
      .lt('expires_at', new Date().toISOString())
      .select()

    if (error) {
      console.error('[任务] 清理失败:', error.message)
      await logTaskExecution('cleanup_expired_wechat_sessions', 'error', 0, error.message)
      return { success: false, error: error.message }
    }

    const expiredCount = data?.length || 0
    await logTaskExecution('cleanup_expired_wechat_sessions', 'success', expiredCount)
    console.log('[任务] 清理完成, 删除', expiredCount, '条')
    return { success: true, expired_count: expiredCount, task_name: 'cleanup_expired_wechat_sessions' }
  }
}

// 任务元信息
const taskMeta = {
  cleanup_expired_preorders: {
    name: '清理过期预订单',
    description: '检测并释放超时的待支付订单库存',
    group: 'frequent',
    cron: '*/5 * * * *'
  },
  cleanup_unverified_users: {
    name: '清理未验证用户',
    description: '删除超过24小时未验证邮箱的用户',
    group: 'daily',
    cron: '0 3 * * *'
  },
  cleanup_expired_wechat_sessions: {
    name: '清理过期微信会话',
    description: '删除已过期的微信扫码登录会话',
    group: 'daily',
    cron: '0 3 * * *'
  }
}

// 任务分组配置
const taskGroups = {
  frequent: {
    cron: '*/5 * * * *',
    description: '高频任务 (每5分钟)',
    tasks: ['cleanup_expired_preorders']
  },
  daily: {
    cron: '0 3 * * *',
    description: '每日任务 (凌晨3点)',
    tasks: ['cleanup_unverified_users', 'cleanup_expired_wechat_sessions']
  }
}

// ============================================
// 日志记录
// ============================================

async function logTaskExecution(taskName, status, affectedCount, errorMsg = null) {
  try {
    await supabase.from('scheduled_task_logs').insert({
      task_name: taskName,
      status: status,
      affected_count: affectedCount,
      error: errorMsg,
      executed_at: new Date().toISOString()
    })
  } catch (e) {
    console.error('[日志] 记录失败:', e.message)
  }
}

// ============================================
// 定时器状态管理
// ============================================

let schedulerState = {
  isRunning: false,
  cronJobs: {},
  lastRun: null,
  lastResult: null
}

function startScheduler() {
  if (schedulerState.isRunning) {
    return { success: false, message: '定时器已在运行' }
  }

  // 为每个任务组创建定时器
  for (const [groupName, group] of Object.entries(taskGroups)) {
    schedulerState.cronJobs[groupName] = cron.schedule(group.cron, async () => {
      console.log(`\n[${new Date().toISOString()}] 执行任务组: ${groupName}...`)

      for (const taskName of group.tasks) {
        if (tasks[taskName]) {
          const result = await tasks[taskName]()
          schedulerState.lastRun = new Date().toISOString()
          schedulerState.lastResult = result
        }
      }
    })
    console.log(`[定时器] 任务组 ${groupName} 已启动 (${group.cron})`)
  }

  schedulerState.isRunning = true
  return { success: true, message: '定时器已启动' }
}

function stopScheduler() {
  if (!schedulerState.isRunning) {
    return { success: false, message: '定时器未运行' }
  }

  for (const [groupName, job] of Object.entries(schedulerState.cronJobs)) {
    if (job) {
      job.stop()
      console.log(`[定时器] 任务组 ${groupName} 已停止`)
    }
  }
  schedulerState.cronJobs = {}
  schedulerState.isRunning = false

  return { success: true, message: '定时器已停止' }
}

// ============================================
// API 路由
// ============================================

// 获取状态
app.get('/status', (req, res) => {
  res.json({
    isRunning: schedulerState.isRunning,
    lastRun: schedulerState.lastRun,
    lastResult: schedulerState.lastResult,
    taskGroups: Object.keys(taskGroups)
  })
})

// 获取任务列表
app.get('/tasks', (req, res) => {
  const taskList = Object.entries(taskMeta).map(([key, meta]) => ({
    key,
    ...meta
  }))
  res.json({ success: true, tasks: taskList, groups: taskGroups })
})

// 启动定时器
app.post('/start', (req, res) => {
  const result = startScheduler()
  res.json(result)
})

// 停止定时器
app.post('/stop', (req, res) => {
  const result = stopScheduler()
  res.json(result)
})

// 手动执行任务
app.post('/run/:taskName', async (req, res) => {
  const { taskName } = req.params

  if (!tasks[taskName]) {
    return res.status(404).json({ success: false, error: '任务不存在' })
  }

  console.log(`[手动] 执行任务: ${taskName}`)
  const result = await tasks[taskName]()

  schedulerState.lastRun = new Date().toISOString()
  schedulerState.lastResult = result

  res.json(result)
})

// 获取执行日志
app.get('/logs', async (req, res) => {
  const limit = parseInt(req.query.limit) || 20

  const { data, error } = await supabase
    .from('scheduled_task_logs')
    .select('*')
    .order('executed_at', { ascending: false })
    .limit(limit)

  if (error) {
    return res.status(500).json({ success: false, error: error.message })
  }

  res.json({ success: true, logs: data })
})

// ============================================
// 启动服务
// ============================================

app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════╗
║           定时任务服务 - Fantula Scheduler         ║
╠═══════════════════════════════════════════════════╣
║  端口: ${PORT}                                       ║
║  状态: 已启动                                        ║
║                                                     ║
║  任务组:                                            ║
║    frequent: 每 5 分钟                              ║
║    daily:    每日 03:00                             ║
║                                                     ║
║  API:                                               ║
║    GET  /status      - 获取状态                      ║
║    GET  /tasks       - 获取任务列表                  ║
║    POST /start       - 启动定时器                    ║
║    POST /stop        - 停止定时器                    ║
║    POST /run/:task   - 手动执行任务                  ║
║    GET  /logs        - 获取执行日志                  ║
╚═══════════════════════════════════════════════════╝
  `)

  // 自动启动定时器
  startScheduler()
})
