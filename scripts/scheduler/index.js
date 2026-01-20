/**
 * 定时任务服务
 * 主要任务：清理过期预订单并释放资源
 * 
 * API:
 *   GET  /status     - 获取定时器状态
 *   POST /start      - 启动定时器
 *   POST /stop       - 停止定时器
 *   POST /run/:task  - 手动执行任务
 *   GET  /logs       - 获取执行日志
 */

require('dotenv').config()

const express = require('express')
const cron = require('node-cron')
const { createClient } = require('@supabase/supabase-js')

const app = express()
app.use(express.json())

// 配置
const PORT = process.env.SCHEDULER_PORT || 3001
const SUPABASE_URL = process.env.SUPABASE_URL || 'http://127.0.0.1:54321'
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY

// Supabase 客户端 (使用 service_role 权限)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

// 定时器状态
let schedulerState = {
  isRunning: false,
  cronJob: null,
  lastRun: null,
  lastResult: null
}

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
      return { success: false, error: error.message }
    }

    console.log('[任务] 清理完成:', data)
    return data
  }
}

// ============================================
// 定时执行
// ============================================

function startScheduler() {
  if (schedulerState.isRunning) {
    return { success: false, message: '定时器已在运行' }
  }

  // 每5分钟执行
  schedulerState.cronJob = cron.schedule('*/5 * * * *', async () => {
    console.log(`\n[${new Date().toISOString()}] 执行定时任务...`)

    const result = await tasks.cleanup_expired_preorders()

    schedulerState.lastRun = new Date().toISOString()
    schedulerState.lastResult = result
  })

  schedulerState.isRunning = true
  console.log('[定时器] 已启动，每5分钟执行一次')

  return { success: true, message: '定时器已启动' }
}

function stopScheduler() {
  if (!schedulerState.isRunning) {
    return { success: false, message: '定时器未运行' }
  }

  if (schedulerState.cronJob) {
    schedulerState.cronJob.stop()
    schedulerState.cronJob = null
  }

  schedulerState.isRunning = false
  console.log('[定时器] 已停止')

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
    tasks: Object.keys(tasks)
  })
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

// CORS 支持
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200)
  }
  next()
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
║  API:                                               ║
║    GET  /status      - 获取状态                      ║
║    POST /start       - 启动定时器                    ║
║    POST /stop        - 停止定时器                    ║
║    POST /run/:task   - 手动执行任务                  ║
║    GET  /logs        - 获取执行日志                  ║
╚═══════════════════════════════════════════════════╝
  `)

  // 自动启动定时器
  startScheduler()
})
