/**
 * 应用常量定义
 */

// 默认头像路径（统一使用）
export const DEFAULT_AVATAR = '/images/avatars/01.png'

// 系统头像列表
export const SYSTEM_AVATARS = [
    '/images/avatars/01.png',
    '/images/avatars/02.png',
    '/images/avatars/03.png',
    '/images/avatars/04.png',
    '/images/avatars/05.png',
    '/images/avatars/06.png',
    '/images/avatars/07.png',
    '/images/avatars/08.png',
    '/images/avatars/09.png'
]

// 头像上传配置
export const AVATAR_CONFIG = {
    maxSize: 5 * 1024 * 1024, // 5MB
    outputSize: 200, // 输出尺寸 200x200
    quality: 0.85, // WebP 压缩质量
    allowedTypes: ['image/jpeg', 'image/png', 'image/webp']
}
