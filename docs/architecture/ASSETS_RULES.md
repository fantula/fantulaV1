# 素材目录使用规范

> **更新日期**: 2026-01-16  
> **适用范围**: nuxt-frontend 项目

---

## 目录结构

```
nuxt-frontend/public/images/
├── client/                    # 客户端素材
│   ├── pc/                    # PC端专用
│   │   ├── avatars/           # 系统内置头像
│   │   │   ├── avatar-cat.png     # 默认头像
│   │   │   ├── avatar-penguin.png
│   │   │   ├── avatar-bunny.png
│   │   │   ├── avatar-owl.png
│   │   │   ├── avatar-frog.png
│   │   │   └── avatar-bear.png
│   │   └── [其他PC端图标/素材]
│   │
│   └── mobile/                # 手机端专用（预留）
│       └── [将来手机端素材]
│
├── admin/                     # 后台管理素材（预留）
│   └── [后台专用图标]
│
└── shared/                    # 共用素材
    ├── logo.png               # 主Logo
    ├── logo_v2.png
    ├── logo_v3.png            # 当前使用的Logo
    └── oauth-*.png            # 第三方登录图标
```

---

## 使用规则

### 1. 客户端 PC 端素材
- **路径前缀**: `/images/client/pc/`
- **头像路径**: `/images/client/pc/avatars/avatar-cat.png`
- **用途**: 客户端界面的小图标、系统头像

### 2. 客户端手机端素材
- **路径前缀**: `/images/client/mobile/`
- **状态**: 预留目录，暂未使用
- **用途**: 将来手机端可能需要不同的头像或图标

### 3. 后台管理素材
- **路径前缀**: `/images/admin/`
- **状态**: 预留目录，暂未使用
- **用途**: 后台管理界面专用图标

### 4. 共用素材
- **路径前缀**: `/images/shared/`
- **用途**: Logo、OAuth登录图标等前后台共用的素材

---

## 重要约定

| 约定 | 说明 |
|------|------|
| **大图片** | 上传到 Supabase Storage 或 R2 对象存储，不放本地 |
| **小图标** | 放在对应的本地目录 |
| **替换头像** | 保持文件名一致，直接替换文件即可 |
| **新增素材** | 按类别放入对应目录 |

---

## 常用路径速查

| 用途 | 路径 |
|------|------|
| 默认头像 | `/images/client/pc/avatars/avatar-cat.png` |
| Logo | `/images/shared/logo_v3.png` |
| Google登录图标 | `/images/shared/oauth-google.png` |

---

## 代码中的常量

```typescript
// utils/constants.ts
export const DEFAULT_AVATAR = '/images/client/pc/avatars/avatar-cat.png'
export const SYSTEM_AVATARS = [
    '/images/client/pc/avatars/avatar-cat.png',
    '/images/client/pc/avatars/avatar-penguin.png',
    // ...
]
```

---

> **注意**: 如需新增素材类别，请先更新本文档。
