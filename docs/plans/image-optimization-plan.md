# 图片优化实施计划

> **目标**: 提升全站（PC+移动端）图片加载速度，尤其是微信内浏览器
> **策略**: ① 后台上传时压缩 + ② 前端 `<NuxtImg>` 响应式展示

---

## ① 后台上传时压缩（源头优化）

### 现状
- 上传链路: `ImageUploadModal.vue` → `uploadImage.ts` → Edge Function `upload-r2` → Cloudflare R2
- 前端限制 10MB，不做压缩，原图直传
- Edge Function 直接把原始文件写入 R2

### 改造方案
**在前端 `uploadImage.ts` 上传前，用 Canvas API 压缩图片**

- 最大宽度: **1200px**（覆盖 PC 和移动端需求）
- 输出格式: **WebP**（体积比 JPEG 小 25-35%）
- 质量: **0.82**（视觉无损，体积大幅下降）
- 预期效果: 2MB 原图 → 压缩后 ~100-200KB

### 修改文件
| 文件 | 改动 |
|------|------|
| `utils/uploadImage.ts` | 新增 `compressImage()` 函数，在上传前调用 |

### 不改的文件
- Edge Function `upload-r2` — 不需要改，它只负责接收文件写 R2
- `ImageUploadModal.vue` — 不需要改，压缩逻辑封装在 `uploadImage.ts` 里

---

## ② 前端 `<NuxtImg>` 替换（展示端优化）

### 现状
- 全站使用原生 `<img>` 标签
- 已安装 `@nuxt/image` 模块 + ipx provider
- ipx 配置: `format: webp, quality: 80`
- 但没有使用 `<NuxtImg>` 组件

### 改造方案
**关键组件的 `<img>` 替换为 `<NuxtImg>`，指定 `sizes` 属性**

移动端，图片自动请求小图；PC 端请求中图。IPX 会在服务端缓存处理后的图片。

### 需要替换的核心组件（按影响范围排序）

| 组件 | 图片类型 | 建议 sizes |
|------|----------|-----------|
| `components/mobile/home/HomeBanner.vue` | Banner 图 | `100vw`，宽度 `width="750"` |
| `pages/mobile/channel.vue` | 商品图 | `50vw`，宽度 `width="400"` |
| `pages/mobile/cart.vue` | 购物车商品图 | `80px` |
| `pages/mobile/profile/favorites/index.vue` | 收藏商品图 | `80px` |
| `pages/mobile/profile/account/index.vue` | 头像 | `80px` |
| `pages/mobile/profile/order/[id].vue` | 教程图 | `100vw` |

### 不改的文件
- Admin 后台图片（内部使用，不需要优化）
- 静态 logo 等（已经是小文件）

---

## 执行顺序

1. **先做 ①** — `utils/uploadImage.ts` 加压缩函数（影响所有新上传的图片）
2. **再做 ②** — 逐个组件替换 `<img>` → `<NuxtImg>`
3. **构建部署**
4. **验证** — 在微信浏览器中测试图片加载速度

---

## 风险评估

- **① 压缩**: 低风险。Canvas API 是浏览器标准 API，WebP 兼容所有现代浏览器。不影响已有图片（只影响新上传的）
- **② NuxtImg**: 低风险。`@nuxt/image` 已安装且配置好 ipx
- **已有大图**: 可以后续在后台批量压缩已上传的旧图片（本次不做）
