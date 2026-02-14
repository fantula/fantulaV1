# Edge Functions 开发指南

> **技术栈**: Deno + TypeScript + Supabase Edge Runtime
> **虽然名为 Edge Function，但在我们的自托管架构中，它们运行在本地 Docker 容器中。**

---

## 🏗 架构说明

在 Fantula 自托管环境中，Edge Functions 是一个运行在 Docker 容器 (`supabase-edge-functions`) 中的 Deno 服务。
Nginx 将 `/functions/v1/*` 的请求代理到这个容器 (端口 8000 -> Kong -> Function)。

主要用途：
1.  **复杂业务逻辑**: 处理无法仅用 SQL/RPC 完成的逻辑。
2.  **第三方服务集成**: 如 Cloudflare R2 上传、微信支付回调处理。
3.  **Webhook 接收**: 接收外部系统的通知。

---

## 🚀 开发新函数 (Scenario A)

### 1. 创建函数目录
```bash
# 本地开发环境
supabase functions new my-new-function
```

### 2. 编写代码 (`index.ts`)
```typescript
import "jsr:@supabase/functions-js/edge-runtime.d.ts"
import { createClient } from "https://esm.sh/@supabase/supabase-js@2"

Deno.serve(async (req) => {
  // 1. 处理 CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  // 2. 鉴权 (必须!)
  // 因为 Nginx 代理不验证 Token，必须在代码里验证
  const authHeader = req.headers.get('Authorization')
  // ... verify logic ...

  return new Response(JSON.stringify({ message: "Hello" }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
  })
})
```

> **注意**: 由于网络限制，尽量**内联**简单的工具函数（如 R2 签名），减少对外部 `deno.land` 三方库的依赖。

### 3. 本地调试
```bash
supabase functions serve my-new-function --no-verify-jwt
```

---

## 📦 部署 (Deployment)

由于我们是**自托管 + 内网环境**，不能使用 `supabase functions deploy`。
必须使用**手动部署流程**。

### 1. 准备代码
确保 `index.ts` 单文件包含了所有需要的逻辑（或者把依赖文件一起上传）。

### 2. 上传到服务器
将代码上传到服务器挂载卷：
```bash
scp supabase/functions/my-new-function/index.ts root@<IP>:/opt/supabase/docker/volumes/functions/my-new-function/index.ts
```

### 3. 重启运行时
```bash
ssh root@<IP> "docker restart supabase-edge-functions"
```

### 4. 环境变量
如果函数需要新的环境变量（如 API Key）：
1.  **不要**只改 `.env`。
2.  **必须** 修改 `/opt/supabase/docker/docker-compose.yml`。
3.  在 `functions` 服务的 `environment` 部分添加变量。
4.  执行 `docker compose up -d --force-recreate functions`。

---

## ☁️ 特殊集成：Cloudflare R2

我们在 `upload-r2` 函数中实现了 R2 上传。
关键配置（已注入到 Docker）：
*   `R2_ACCOUNT_ID`
*   `R2_ACCESS_KEY_ID`
*   `R2_SECRET_ACCESS_KEY`
*   `R2_BUCKET_NAME`

如果开发新的文件上传功能，**请直接复用 `upload-r2` 函数**，不要重复造轮子。
前端调用：`POST /functions/v1/upload-r2` (FormData: file, folder)。
