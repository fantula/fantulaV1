<template>
  <div class="status-hero-card">
    <div class="hero-aurora-bg" :class="order.status"></div>
    
    <div class="hero-content">
      <!-- Top Row: Back | Order No | Amount (Right) -->
      <div class="hero-top-row">
        <div class="top-left-group">
          <div class="back-btn" @click="$emit('back')">
            <el-icon><ArrowLeft /></el-icon>
            <span class="back-text">返回</span>
          </div>
          <div class="order-no-badge">
            <span class="label">订单号</span>
            <span class="value">{{ order.order_no || '---' }}</span>
            <el-icon class="copy-icon" @click="$emit('copy', order.order_no)"><CopyDocument /></el-icon>
          </div>
        </div>

        <!-- Amount Display (Top Right) -->
        <div class="amount-display-top">
          <span class="amount-integer">{{ getInteger(order.totalAmount || 0) }}</span>
          <span class="amount-decimal">.{{ getDecimal(order.totalAmount || 0) }}</span>
          <span class="amount-unit">点</span>
        </div>
      </div>

      <!-- Middle/Bottom Row: Status Icon+Text | Action Buttons -->
      <div class="hero-main-row">
        
        <!-- Status Info (Left) -->
        <div class="status-group">
          <div class="status-icon-box" :class="order.status">
            <el-icon v-if="order.status === 'active' || order.status === 'completed'"><CircleCheck /></el-icon>
            <el-icon v-else-if="order.status === 'pending_delivery'"><Box /></el-icon>
            <el-icon v-else-if="order.status === 'refunding' || order.status === 'refunded'"><RefreshLeft /></el-icon>
            <el-icon v-else><InfoFilled /></el-icon>
          </div>
          
          <div class="status-text-wrapper">
            <div class="status-title-row">
              <h1 class="status-title">{{ statusText }}</h1>
              <!-- Countdown Badge for Active -->
              <div v-if="order.status === 'active' && remainingDays !== null" class="time-badge" :class="getTimeLevel(remainingDays)">
                  <el-icon><Timer /></el-icon> 剩余 {{ remainingDays }} 天
              </div>
            </div>
            <!-- Subtitles -->
              <div class="status-desc">
                <span v-if="order.status === 'refunding'">退款申请待审核：{{ pendingRefundReason || '请耐心等待' }}</span>
                <span v-else-if="order.status === 'pending_delivery'">系统正在极速配货中</span>
                <span v-else-if="order.status === 'active'">商品状态正常，到期时间: {{ formatTime(order.expires_at || '') }}</span>
                <span v-else>下单时间: {{ formatTime(order.createdAt || '') }}</span>
              </div>
          </div>
        </div>

        <!-- Action Buttons (Right) -->
        <div class="hero-actions">
            
            <!-- 0. Contact Service (Always Visible) -->
            <button class="hero-btn secondary" @click="$emit('action', 'contact')">
              <el-icon><Headset /></el-icon> 联系客服
            </button>

            <!-- 1. Ticket Action -->
            <button v-if="activeTicketId" class="hero-btn secondary" @click="$emit('action', 'view_ticket')">
              <el-icon><Tickets /></el-icon> 查看工单
            </button>
            <button v-else class="hero-btn secondary" @click="$emit('action', 'create_ticket')">
              <el-icon><Tickets /></el-icon> 申请工单
            </button>

            <!-- 2. Renew Action (Hidden for One-Time) -->
            <button v-if="canRenew" class="hero-btn primary" @click="$emit('action', 'renew')">
              <el-icon><Refresh /></el-icon> 续费
            </button>

            <!-- 3. Refund Action (Hidden for One-Time) -->
            <!-- Case A: Can Cancel Refund -->
            <button v-if="canCancelRefund" class="hero-btn warning" @click="$emit('action', 'cancel_refund')">
              <el-icon><CircleClose /></el-icon> 取消退款
            </button>
            <!-- Case B: Can Apply Refund -->
            <button v-else-if="canRefund" class="hero-btn danger" @click="$emit('action', 'apply_refund')">
              <el-icon><Money /></el-icon> 申请退款
            </button>
            <!-- Case C: Refund Blocked -->
            <button v-else-if="isRefundBlocked" class="hero-btn disabled" disabled>
              <el-icon><CircleClose /></el-icon> 退款已达上限
            </button>

        </div>
      </div>
    </div>
    
    <!-- Optional: Decorator or texture overlay -->
    <div class="noise-overlay"></div>
  </div>
</template>

<script setup lang="ts">
import { 
  ArrowLeft, CopyDocument, CircleCheck, Timer, CircleClose, InfoFilled, 
  Box, Tickets, Refresh, Money, RefreshLeft, Headset
} from '@element-plus/icons-vue'
import { useBizFormat } from '@/composables/common/useBizFormat'

interface Props {
  order: any
  statusText: string
  remainingDays: number | null
  pendingRefundReason?: string
  activeTicketId?: string | null
  canRenew?: boolean
  canRefund?: boolean
  canCancelRefund?: boolean
  isRefundBlocked?: boolean
  getTimeLevel: (days: number) => string
}

const props = defineProps<Props>()
const emit = defineEmits(['back', 'copy', 'action'])

const { formatDate } = useBizFormat()
const formatTime = (t: string) => t ? formatDate(t) : '-'

const getInteger = (val: number) => Math.floor(val).toLocaleString()
const getDecimal = (val: number) => (val % 1).toFixed(2).split('.')[1] || '00'
</script>

<style scoped>
/* --- Sticky Hero Card --- */
.status-hero-card {
  position: relative;
  width: 100%; 
  height: 140px;
  border: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.5);
  flex-shrink: 0;
  background: #0F172A;
}

.noise-overlay {
  position: absolute; inset: 0; pointer-events: none; z-index: 2;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.03'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

.hero-content {
  position: relative; z-index: 3; height: 100%;
  display: flex; flex-direction: column; 
  padding: 20px 32px; 
  justify-content: space-between;
}

.hero-top-row { display: flex; justify-content: space-between; align-items: flex-start; }
.top-left-group { display: flex; align-items: center; gap: 16px; }

.back-btn {
  display: flex; align-items: center; gap: 6px;
  color: #fff; cursor: pointer; font-size: 14px; font-weight: 500;
  opacity: 0.8; transition: opacity 0.2s;
}
.back-btn:hover { opacity: 1; }

.order-no-badge {
  display: flex; align-items: center; gap: 8px;
  background: rgba(0,0,0,0.3); padding: 4px 12px; border-radius: 6px;
  border: 1px solid rgba(255,255,255,0.05); height: 28px;
}
.order-no-badge .label { font-size: 11px; color: #64748B; font-weight: 700; transform: translateY(1px); }
.order-no-badge .value { font-family: 'Monaco', monospace; color: #CBD5E1; font-size: 12px; }
.copy-icon { cursor: pointer; color: #64748B; transition: color 0.2s; }
.copy-icon:hover { color: #fff; }

.amount-display-top { 
  font-family: 'Outfit', sans-serif; display: flex; align-items: baseline; color: #fff; line-height: 1; 
  text-shadow: 0 2px 8px rgba(0,0,0,0.3);
}
.amount-integer { font-size: 28px; font-weight: 700; letter-spacing: -0.5px; }
.amount-decimal { font-size: 16px; font-weight: 500; color: #CBD5E1; }
.amount-unit { font-size: 12px; color: #F59E0B; font-weight: 600; margin-left: 4px; }

.hero-main-row { display: flex; justify-content: space-between; align-items: flex-end; }
.status-group { display: flex; align-items: center; gap: 16px; }

.status-icon-box {
  width: 44px; height: 44px; border-radius: 12px;
  background: rgba(255,255,255,0.1);
  display: flex; align-items: center; justify-content: center;
  font-size: 22px; color: #fff;
  border: 1px solid rgba(255,255,255,0.1);
  box-shadow: 0 4px 12px rgba(0,0,0,0.2);
}

.status-text-wrapper { display: flex; flex-direction: column; gap: 2px; }
.status-title-row { display: flex; align-items: center; gap: 10px; }
.status-title { font-size: 20px; font-weight: 700; color: #fff; margin: 0; }
.status-desc { font-size: 12px; color: #94A3B8; font-weight: 400; }

.time-badge { 
  font-size: 11px; font-weight: 600; display: flex; align-items: center; gap: 4px; 
  padding: 2px 8px; border-radius: 4px; border: 1px solid;
}
.time-badge.critical { color: #FECACA; background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.3); animation: pulse-red 2s infinite; }
.time-badge.warning { color: #FDE68A; background: rgba(245, 158, 11, 0.2); border-color: rgba(245, 158, 11, 0.3); }
.time-badge.safe { color: #A7F3D0; background: rgba(16, 185, 129, 0.2); border-color: rgba(16, 185, 129, 0.3); }

/* Buttons */
.hero-actions { display: flex; gap: 10px; align-items: center; }

.hero-btn {
  display: flex; align-items: center; gap: 6px;
  padding: 8px 16px; border-radius: 10px;
  font-size: 13px; font-weight: 600; cursor: pointer;
  border: none; transition: all 0.2s;
  box-shadow: 0 4px 10px rgba(0,0,0,0.2);
}
.hero-btn:hover { transform: translateY(-1px); box-shadow: 0 6px 15px rgba(0,0,0,0.3); }
.hero-btn:active { transform: translateY(0); }
.hero-btn.secondary { background: rgba(255,255,255,0.1); color: #fff; border: 1px solid rgba(255,255,255,0.1); }
.hero-btn.secondary:hover { background: rgba(255,255,255,0.15); }
.hero-btn.primary { background: #3B82F6; color: #fff; box-shadow: 0 4px 10px rgba(59, 130, 246, 0.3); }
.hero-btn.primary:hover { background: #2563EB; }
.hero-btn.danger { background: rgba(239, 68, 68, 0.15); color: #FCA5A5; border: 1px solid rgba(239, 68, 68, 0.3); }
.hero-btn.danger:hover { background: rgba(239, 68, 68, 0.25); color: #fff; border-color: rgba(239, 68, 68, 0.5); }
.hero-btn.warning { background: rgba(245, 158, 11, 0.15); color: #FDE68A; border: 1px solid rgba(245, 158, 11, 0.3); }
.hero-btn.warning:hover { background: rgba(245, 158, 11, 0.25); color: #fff; border-color: rgba(245, 158, 11, 0.5); }
.hero-btn.disabled { 
    background: rgba(100, 116, 139, 0.1); 
    color: #64748B; 
    border: 1px solid rgba(100, 116, 139, 0.2); 
    cursor: not-allowed; 
    opacity: 0.7;
}
.hero-btn.disabled:hover { transform: none; box-shadow: 0 4px 10px rgba(0,0,0,0.2); }

/* Gradients */
.hero-aurora-bg {
  position: absolute; top: 0; left: 0; width: 100%; height: 100%;
  z-index: 1; transition: all 0.5s;
  background: radial-gradient(circle at 10% 10%, rgba(59, 130, 246, 0.2), transparent 40%),
              linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(10, 15, 30, 0.98) 100%);
}
.hero-aurora-bg.active, .hero-aurora-bg.completed {
  background: radial-gradient(circle at 80% 20%, rgba(16, 185, 129, 0.25), transparent 50%),
              linear-gradient(135deg, rgba(6, 78, 59, 0.3) 0%, rgba(10, 15, 30, 0.98) 100%);
}
.hero-aurora-bg.pending_delivery {
  background: radial-gradient(circle at 90% 10%, rgba(249, 115, 22, 0.25), transparent 50%),
              linear-gradient(135deg, rgba(67, 20, 7, 0.3) 0%, rgba(10, 15, 30, 0.98) 100%);
}
.hero-aurora-bg.refunding {
  background: radial-gradient(circle at 50% 10%, rgba(168, 85, 247, 0.25), transparent 50%),
              linear-gradient(135deg, rgba(88, 28, 135, 0.3) 0%, rgba(10, 15, 30, 0.98) 100%);
}
.hero-aurora-bg.refunded, .hero-aurora-bg.closed {
  background: radial-gradient(circle at 50% 10%, rgba(239, 68, 68, 0.2), transparent 50%),
              linear-gradient(135deg, rgba(69, 10, 10, 0.3) 0%, rgba(10, 15, 30, 0.98) 100%);
}

.status-icon-box.active { color: #34D399; background: rgba(16, 185, 129, 0.2); border-color: rgba(16, 185, 129, 0.3); }
.status-icon-box.pending_delivery { color: #FB923C; background: rgba(249, 115, 22, 0.2); border-color: rgba(249, 115, 22, 0.3); }
.status-icon-box.refunding { color: #A855F7; background: rgba(168, 85, 247, 0.2); border-color: rgba(168, 85, 247, 0.3); }
.status-icon-box.refunded { color: #F87171; background: rgba(239, 68, 68, 0.2); border-color: rgba(239, 68, 68, 0.3); }

/* Animations */
@keyframes pulse-red { 0%, 100% { opacity: 1; } 50% { opacity: 0.7; } }
</style>
