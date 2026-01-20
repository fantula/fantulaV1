<template>
  <canvas ref="canvas" class="circuit-bg"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number
let width = 0
let height = 0

// 配置
const config = {
  gridSize: 40,      // 网格大小
  pathWidth: 1.5,      // 线条宽度
  nodeSize: 3,       // 节点大小
  pulseSpeed: 3,     // 脉冲速度
  pulseCount: 20,    // 同时存在的脉冲数量
  baseColor: 'rgba(35, 92, 220, 0.1)', // 背景网格颜色 (淡蓝)
  pulseColor: '#FF7A45', // 脉冲颜色 (橙色)
  nodeColor: 'rgba(56, 189, 248, 0.4)' // 节点颜色 (亮蓝)
}

interface Pulse {
  x: number
  y: number
  dx: number // x方向速度
  dy: number // y方向速度
  life: number // 生命周期
  path: {x: number, y: number}[] // 轨迹
}

let pulses: Pulse[] = []

// 初始化脉冲
const createPulse = (): Pulse => {
  // 随机从屏幕边缘或中间网格点开始
  const col = Math.floor(Math.random() * (width / config.gridSize))
  const row = Math.floor(Math.random() * (height / config.gridSize))
  
  // 随机方向：上下左右
  const dir = Math.floor(Math.random() * 4)
  let dx = 0, dy = 0
  if (dir === 0) dx = 1 // Right
  else if (dir === 1) dx = -1 // Left
  else if (dir === 2) dy = 1 // Down
  else dy = -1 // Up

  return {
    x: col * config.gridSize,
    y: row * config.gridSize,
    dx,
    dy,
    life: 100 + Math.random() * 100, // 存活帧数
    path: []
  }
}

const drawGrid = () => {
    if (!ctx) return
    ctx.strokeStyle = config.baseColor
    ctx.lineWidth = 1
    
    // 画点阵，连接线太乱了
    /*
    for (let x = 0; x <= width; x += config.gridSize) {
        ctx.beginPath()
        ctx.moveTo(x, 0)
        ctx.lineTo(x, height)
        ctx.stroke()
    }
    for (let y = 0; y <= height; y += config.gridSize) {
        ctx.beginPath()
        ctx.moveTo(0, y)
        ctx.lineTo(width, y)
        ctx.stroke()
    }
    */
   
   // 仅绘制节点十字
   const crossSize = 2
   ctx.fillStyle = config.nodeColor
   for (let x = 0; x <= width; x += config.gridSize) {
       for (let y = 0; y <= height; y += config.gridSize) {
           if (Math.random() > 0.8) { // 随机显示一些节点，不那么密集
               ctx.fillRect(x - crossSize/2, y - 0.5, crossSize, 1)
               ctx.fillRect(x - 0.5, y - crossSize/2, 1, crossSize)
           }
       }
   }
}

const animate = () => {
  if (!ctx || !canvas.value) return
  ctx.clearRect(0, 0, width, height)
  
  // 1. 绘制静态背景网格/节点
  drawGrid()

  // 2. 补充脉冲
  if (pulses.length < config.pulseCount) {
     if (Math.random() > 0.1) pulses.push(createPulse())
  }

  // 3. 更新和绘制脉冲
  for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i]
      
      // 移动
      p.x += p.dx * config.pulseSpeed
      p.y += p.dy * config.pulseSpeed
      p.life--

      // 记录轨迹 (用于画拖尾)
      p.path.push({x: p.x, y: p.y})
      if (p.path.length > 15) p.path.shift() // 限制拖尾长度

      // 随机转向 (在网格点上)
      if (p.life % Math.floor(config.gridSize / config.pulseSpeed) === 0) {
          if (Math.random() > 0.5) {
              // 转向
              if (p.dx !== 0) { // 当前水平，转垂直
                   p.dx = 0
                   p.dy = Math.random() > 0.5 ? 1 : -1
              } else { // 当前垂直，转水平
                   p.dy = 0
                   p.dx = Math.random() > 0.5 ? 1 : -1
              }
          }
      }

      // 绘制拖尾
      ctx.beginPath()
      if (p.path.length > 0) {
        ctx.moveTo(p.path[0].x, p.path[0].y)
        for(let point of p.path) {
            ctx.lineTo(point.x, point.y)
        }
      }
      ctx.strokeStyle = `rgba(255, 122, 69, ${p.life / 200})` // 渐变消失
      ctx.lineWidth = config.pathWidth
      ctx.lineCap = 'round'
      ctx.shadowBlur = 10
      ctx.shadowColor = config.pulseColor // 发光效果
      ctx.stroke()
      ctx.shadowBlur = 0 // 重置

      // 绘制头部亮点
      ctx.beginPath()
      ctx.fillStyle = '#fff'
      ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2)
      ctx.fill()

      // 移除条件
      if (p.life <= 0 || p.x < 0 || p.x > width || p.y < 0 || p.y > height) {
          pulses.splice(i, 1)
      }
  }

  animationFrameId = requestAnimationFrame(animate)
}

const handleResize = () => {
    if (!canvas.value) return
    width = window.innerWidth
    height = window.innerHeight
    canvas.value.width = width
    canvas.value.height = height
}

onMounted(() => {
    if (canvas.value) {
        ctx = canvas.value.getContext('2d')
        handleResize()
        animate()
        window.addEventListener('resize', handleResize)
    }
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    cancelAnimationFrame(animationFrameId)
})
</script>

<style scoped>
.circuit-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -999;
  background: #020617; /* 深蓝黑底色 */
  pointer-events: none;
}
</style>
