
# 🚀 部署与优化标准作业流程 (SOP)

> **版本**: V1.0 | **最后更新**: 2026-02-14
> **适用场景**: 全站优化、Bug排查、版本发布、服务器部署
> **执行原则**: 自下而上 (Backend -> Frontend)，先稳后快 (Fix -> Optimize)

---

## 🗺️ 总体执行顺序图

```mermaid
graph TD
    A[Phase 0: 环境一致性检查] --> B[Phase 1: 后端与数据库排查]
    B --> C[Phase 2: 后台管理系统排查]
    C --> D[Phase 3: 客户端(PC/Mobile)排查]
    D --> E[Phase 4: 预部署验证(Staging)]
    E --> F[Phase 5: 标准化部署执行]
    F --> G[Phase 6: 线上巡检]
```

---

## Phase 0: 环境一致性检查 (Environment Prep)

**目标**: 杜绝 "我本地是好的" (It works on my machine) 问题。

1.  **检查 `.env` 配置**
    - [ ] 对比本地 `.env` 与服务器 `/opt/fantula/nuxt-frontend/.env`。
    - [ ] 确保 `NUXT_PUBLIC_SUPABASE_URL` 一致 (指向生产或预发布)。
    - [ ] 确保服务端 `NUXT_SUPABASE_SERVICE_KEY` 仅在服务器存在。

2.  **数据库同步检查**
    - [ ] 检查 `supabase/migrations` 目录下是否有未执行的 SQL。
    - [ ] 确认本地表结构与线上一致 (使用 `\d table_name` 抽查)。

---

## Phase 1: 后端与数据库排查 (Backend Foundation)

**目标**: 确保数据源头纯净、安全、高效。

1.  **功能完整性 (Functionality)**
    - [ ] 核心 API 测试 (Auth, User, Order)。
    - [ ] 检查 `server/api/` 下是否有报错日志。
    - [ ] 验证定时任务 (Scheduler) 是否正常运行 (`pm2 status fantula-scheduler`)。

2.  **安全性审计 (Security)**
    - [ ] 检查 RLS 策略 (参考 `docs/security/SECURITY_POLICY.md`)。
    - [ ] 确认所有 Admin API 都有权限校验 (`middleware/mgmt-auth.ts`).
    - [ ] 扫描日志中的 `Service Role` 滥用情况。

3.  **性能优化 (Performance)**
    - [ ] 检查慢查询 (Slow Queries)。
    - [ ] 检查索引缺失 (Foreign Key 是否有 Index)。

---

## Phase 2: 后台管理系统排查 (Frontend - Admin)

**目标**: 确保 "控制塔" (Control Plane) 功能正常。

1.  **功能遍历**
    - [ ] **用户管理**: 列表、搜索、详情、封禁。
    - [ ] **订单管理**: 列表加载速度、状态流转 (发货/退款)。
    - [ ] **商品管理**: SKU 编辑、图片上传、库存修改。

2.  **交互体验**
    - [ ] 错误提示是否友好 (是否显示 "Database error" 等生硬代码)。
    - [ ] 表格加载是否有 Skeleton 骨架屏。

---

## Phase 3: 客户端排查 (Frontend - PC & Mobile)

**目标**: 确保用户体验 (UX) 流畅、转化率高。

1.  **核心流程走查 (Smoke Test)**
    - [ ] **注册/登录**: 邮箱+密码、验证码、微信扫码。
    - [ ] **浏览**: 首页 -> 分类 -> 详情页 (加载速度)。
    - [ ] **交易**: 加入购物车 -> 结算 -> 支付 (微信支付调起) -> 回调。
    - [ ] **个人中心**: 订单列表、卡密查看。

2.  **移动端适配 (Mobile Specific)**
    - [ ] 检查 H5 布局在不同屏幕 (iPhone/Android) 下的适配。
    - [ ] 确保触屏事件 (Touch) 响应正常。
    - [ ] **严禁**出现 Element Plus 组件样式残留。

3.  **性能优化 (Lighthouse)**
    - [ ] 图片懒加载 (Lazy Load)。
    - [ ] 静态资源缓存策略 (Cache-Control)。

---

## Phase 4: 预部署验证 (Staging Verification)

**目标**: 模拟生产环境构建，暴露构建期问题。

1.  **本地构建测试**
    ```bash
    npm run build
    npm run preview
    ```
    - [ ] 检查构建产物大小 (Chunk Size)。
    - [ ] 确保 `preview` 模式下页面访问正常 (排除 SSR 独有 bug)。

2.  **类型检查**
    - [ ] `npx nuxi typecheck` (确保无 TS 错误)。

---

## Phase 5: 标准化部署执行 (Deployment Execution)

**目标**: 使用脚本自动化部署，减少人为失误。

**参考文档**: `docs/SERVER_DEPLOYMENT.md`

1.  **执行部署脚本 (标准流程)**
    ```bash
    # 1. 本地构建
    npm run build

    # 2. 同步文件 (Rsync)
    rsync -az --delete .output/ root@<IP>:/opt/fantula/nuxt-frontend/.output/

    # 3. 远程重启
    ssh root@<IP> "pm2 restart fantula --update-env"
    ```

2.  **数据库变更 (如有)**
    - 绝不使用 `db reset`。
    - 使用 SQL 脚本在服务器执行 (`docker exec ... psql ...`).

---

## Phase 6: 线上巡检 (Post-Deployment)

**目标**: 确认上线成功，无回滚必要。

1.  **实时日志监控**
    ```bash
    ssh root@<IP> "pm2 logs fantula --lines 100"
    ```
    - [ ] 观察是否有启动报错。
    - [ ] 观察是否有 500 错误。

2.  **冒烟测试**
    - [ ] 访问首页。
    - [ ] 登录后台。
    - [ ] 模拟下单 (不支付或使用测试额度)。

---

## 🚨 异常处理流程

如果 Phase 6 发现严重问题：
1.  **立即回滚**:
    - 如果是代码问题：回退 Git 版本 -> 重新 Build -> 重新 Rsync。
    - 如果是数据库问题：无法自动回滚，需人工介入修复数据。
2.  **记录事故**:
    - 更新 `docs/guides/TROUBLESHOOTING.md` (如无则创建)。
