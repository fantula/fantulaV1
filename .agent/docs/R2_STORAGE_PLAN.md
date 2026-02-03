# R2 对象存储规划文档

## 📁 文件夹结构

```
R2 Bucket: fantula2601 (https://img.fantula.com)
│
├── uploads/           # 图片库（管理员上传的通用图片）
│   ├── 1738xxx-abc.jpg
│   └── ...
│
├── tickets/           # 工单图片（用户/客服上传的工单凭证）
│   ├── 1738xxx-xyz.png
│   └── ...
│
├── products/          # 商品图片（可选，目前商品图用 uploads/）
│
└── avatars/           # 用户头像（可选，未来扩展）
```

## 📝 各文件夹用途

| 文件夹 | 用途 | 清理策略 | 上传来源 |
|--------|------|----------|----------|
| `uploads` | 图片库通用图片 | **永久保留** | 后台图片管理 |
| `tickets` | 工单凭证附件 | **定期清理** - 7天后可删 | 工单聊天 |
| `products` | 商品主图/详情图 | 永久保留 | 后台商品编辑 |
| `avatars` | 用户头像 | 永久保留 | 用户个人中心 |

## 🧹 清理策略

### 工单图片自动清理
- **触发方式**: 后台管理 → 工单管理 → "清理历史图片" 按钮
- **清理规则**: 删除 **7天前已解决** 工单的附件图片
- **保留内容**: 聊天记录文字保留，仅删除图片文件
- **实现**: `adminTicketApi.cleanupImages(7)` → `delete-r2` Edge Function

### 清理流程
1. 查询 `tickets` 表找到 `status='resolved'` 且 `resolved_at < 7天前` 的工单
2. 查询这些工单对应的 `ticket_messages.attachments[]`
3. 解析 URL 提取 R2 路径（如 `tickets/1738xxx.png`）
4. 调用 `delete-r2` Edge Function 批量删除

## 🔑 配置方式

R2 密钥存储在 **Supabase Edge Function 环境变量**：

| 变量名 | 说明 |
|--------|------|
| `R2_ACCOUNT_ID` | Cloudflare 账户 ID |
| `R2_ACCESS_KEY_ID` | API Token 访问密钥 ID |
| `R2_SECRET_ACCESS_KEY` | API Token 密钥 |
| `R2_BUCKET_NAME` | 存储桶名称 (fantula2601) |
| `R2_PUBLIC_BASE_URL` | 公开访问域名 (https://img.fantula.com) |

> ⚠️ 敏感密钥不再存储在数据库 `system_settings` 表

## 🔧 相关 Edge Functions

| 函数名 | 用途 |
|--------|------|
| `upload-r2` | 上传文件到 R2 |
| `delete-r2` | 从 R2 删除文件 |
| `list-r2` | 列出 R2 对象 |
| `test-r2-connection` | 测试 R2 连接 |

## 📋 前端上传调用

```typescript
import { uploadImageToStorage } from '@/utils/uploadImage'

// 上传到图片库（默认）
await uploadImageToStorage(file, 'uploads')

// 上传到工单文件夹
await uploadImageToStorage(file, 'tickets')

// 上传到商品文件夹
await uploadImageToStorage(file, 'products')
```

## 📊 存储监控

- 在 Cloudflare Dashboard → R2 → fantula2601 查看用量
- 建议定期执行工单图片清理以节省存储空间

---

*文档更新: 2026-02-03*
