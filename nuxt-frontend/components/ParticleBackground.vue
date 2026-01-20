<template>
  <canvas ref="canvas" class="particle-bg"></canvas>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
let animationFrameId: number
let particles: Particle[] = []
let mouse = { x: -9999, y: -9999 } // 初始化在屏幕外

// 配置参数
const config = {
  particleColor: 'rgba(147, 197, 253, 0.9)', // Blue-300 (更浅更白)，在亮蓝背景下更清晰
  lineColor: 'rgba(147, 197, 253, 0.3)',     // 线条也对应变浅
  highlightColor: 'rgba(255, 122, 69, 1.0)', // 橙色不变
  particleCount: 100,
  connectionDistance: 160,
  mouseRange: 220,
  speed: 0.6 
}

class Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  color: string

  constructor(w: number, h: number) {
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.vx = (Math.random() - 0.5) * config.speed
    this.vy = (Math.random() - 0.5) * config.speed
    this.size = Math.random() * 2 + 1
    this.color = config.particleColor
  }

  update(w: number, h: number) {
    this.x += this.vx
    this.y += this.vy

    // 边界反弹
    if (this.x < 0 || this.x > w) this.vx *= -1
    if (this.y < 0 || this.y > h) this.vy *= -1
    
    // 鼠标互动：斥力效果
    const dx = mouse.x - this.x
    const dy = mouse.y - this.y
    const distance = Math.sqrt(dx*dx + dy*dy)
    
    if (distance < config.mouseRange) {
        // 靠近鼠标时变橙色
        this.color = config.highlightColor
        if (distance < 100) {
           // 简单的斥力
           const forceDirectionX = dx / distance
           const forceDirectionY = dy / distance
           const force = (config.mouseRange - distance) / config.mouseRange
           // 稍微推开一点
           this.vx -= forceDirectionX * force * 0.05
           this.vy -= forceDirectionY * force * 0.05
        }
    } else {
        // 远离恢复蓝色
        this.color = config.particleColor
    }
  }

  draw() {
    if (!ctx) return
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = this.color
    ctx.fill()
  }
}

const initParticles = () => {
    if (!canvas.value) return
    const w = canvas.value.width
    const h = canvas.value.height
    // 根据屏幕面积动态计算粒子数量，保证密度一致
    const area = w * h
    const count = Math.floor(area / 15000) // 每15000像素一个粒子
    
    particles = []
    for (let i = 0; i < count; i++) {
        particles.push(new Particle(w, h))
    }
}

const animate = () => {
  if (!canvas.value || !ctx) return
  const w = canvas.value.width
  const h = canvas.value.height

  ctx.clearRect(0, 0, w, h)
  
  // 1. 更新所有粒子
  particles.forEach(p => {
    p.update(w, h)
    p.draw()
  })

  // 2. 绘制连线
  for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx*dx + dy*dy)

          if (distance < config.connectionDistance) {
              ctx.beginPath()
              ctx.strokeStyle = config.lineColor
              ctx.lineWidth = 1 - distance / config.connectionDistance
              ctx.moveTo(particles[i].x, particles[i].y)
              ctx.lineTo(particles[j].x, particles[j].y)
              ctx.stroke()
          }
      }
  }

  animationFrameId = requestAnimationFrame(animate)
}

const handleResize = () => {
  if (!canvas.value) return
  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight
  initParticles()
}

const handleMouseMove = (e: MouseEvent) => {
    mouse.x = e.clientX
    mouse.y = e.clientY
}

onMounted(() => {
  if (canvas.value) {
    ctx = canvas.value.getContext('2d')
    canvas.value.width = window.innerWidth
    canvas.value.height = window.innerHeight
    
    initParticles()
    animate()

    window.addEventListener('resize', handleResize)
    window.addEventListener('mousemove', handleMouseMove)
  }
})

onUnmounted(() => {
  window.removeEventListener('resize', handleResize)
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationFrameId)
})
</script>

<style scoped>
.particle-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -999; /* 最底层 */
  background: #020617; /* 深蓝黑底色 */
  pointer-events: none; /* 不阻挡鼠标事件，虽然有 mousemove 监听，但 canvas 本身不应该挡住点击 */
}
</style>
